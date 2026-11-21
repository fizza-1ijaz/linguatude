import {
  GoogleAuthProvider,
  OAuthProvider,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  verifyBeforeUpdateEmail,
  type User,
  type UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ONBOARDING_STORAGE_KEY } from "@/app/components/onboarding/onboarding-state";
import {
  callSendPasswordReset,
  callSendVerificationEmail,
  mapFunctionsAuthError,
} from "@/lib/functions-auth";
import { getUserProfile, touchLastActive, updateUserProfileFields } from "@/lib/user-profile";

const googleProvider = new GoogleAuthProvider();

const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

const DELIVERY_FAILURE_CODES = new Set([
  "functions/internal",
  "functions/unavailable",
  "functions/not-found",
  "functions/permission-denied",
  "functions/unknown",
  "functions/deadline-exceeded",
  "internal",
  "unavailable",
  "not-found",
  "permission-denied",
  "unknown",
  "deadline-exceeded",
]);

function errorCode(err: unknown): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code: unknown }).code === "string"
  ) {
    return (err as { code: string }).code;
  }
  return "";
}

function isDeliveryFailure(err: unknown): boolean {
  return DELIVERY_FAILURE_CODES.has(errorCode(err));
}

export function mapAuthError(err: unknown): string {
  const code = errorCode(err);

  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Pop-up was blocked. Allow pop-ups and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/expired-action-code":
      return "This reset link has expired. Request a new one.";
    case "auth/invalid-action-code":
      return "This reset link is invalid. Request a new one.";
    case "auth/requires-recent-login":
      return "Sign out and sign in again, then retry.";
    case "auth/operation-not-allowed":
      return "Email for this account cannot be changed here.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      if (code.startsWith("functions/")) {
        return mapFunctionsAuthError(err);
      }
      return err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
  }
}

async function afterAuthSession(user: User): Promise<void> {
  await touchLastActive(user);
  try {
    await user.getIdToken(true);
  } catch {
    /* ignore */
  }
}

async function sendVerificationWithFallback(user: User): Promise<void> {
  try {
    await callSendVerificationEmail();
  } catch (err) {
    if (!isDeliveryFailure(err)) throw err;
    console.warn(
      "sendVerificationEmail function failed; falling back to Firebase sender",
      err,
    );
    await sendEmailVerification(user);
  }
}

export async function signUpEmail(
  email: string,
  password: string,
  fullName: string,
): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName.trim()) {
    await updateProfile(cred.user, { displayName: fullName.trim() });
  }
  await afterAuthSession(cred.user);
  try {
    await sendVerificationWithFallback(cred.user);
  } catch {
    // Non-blocking — user can resend on /verify-email
  }
  return cred;
}

export async function signInEmail(
  email: string,
  password: string,
): Promise<UserCredential> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await afterAuthSession(cred.user);
  return cred;
}

export async function signInGoogle(): Promise<UserCredential> {
  const cred = await signInWithPopup(auth, googleProvider);
  await afterAuthSession(cred.user);
  return cred;
}

export async function signInApple(): Promise<UserCredential> {
  const cred = await signInWithPopup(auth, appleProvider);
  await afterAuthSession(cred.user);
  return cred;
}

/** Uses deployed Cloud Function `sendPasswordReset`, with Firebase fallback. */
export async function sendPasswordReset(email: string): Promise<void> {
  const trimmed = email.trim().toLowerCase();
  try {
    await callSendPasswordReset(trimmed);
  } catch (err) {
    if (!isDeliveryFailure(err)) throw err;
    console.warn(
      "sendPasswordReset function failed; falling back to Firebase sender",
      err,
    );
    try {
      await sendPasswordResetEmail(auth, trimmed);
    } catch (fallback) {
      // Keep the no-enumeration guarantee of the Cloud Function.
      if (errorCode(fallback) !== "auth/user-not-found") throw fallback;
    }
  }
}

export async function confirmPasswordReset(
  oobCode: string,
  newPassword: string,
): Promise<void> {
  await firebaseConfirmPasswordReset(auth, oobCode, newPassword);
}

export async function resendVerificationEmail(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to verify your email.");
  await sendVerificationWithFallback(user);
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function getUserDisplayName(user: User | null | undefined): string {
  const fromProfile = user?.displayName?.trim();
  if (fromProfile) return fromProfile;
  const fromEmail = user?.email?.split("@")[0]?.trim();
  if (fromEmail) return fromEmail;
  return "there";
}

export async function updateDisplayName(displayName: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be signed in to update your profile.");
  }
  const next = displayName.trim();
  if (!next) {
    throw new Error("Please enter your full name.");
  }
  await updateProfile(user, { displayName: next });
  await user.reload();
  try {
    await updateUserProfileFields({ displayName: next });
  } catch {
    /* profile doc may not exist */
  }
}

/**
 * Sends a verification link to the new email. Current email stays until verified.
 * Returns false when unchanged.
 */
export async function requestEmailChange(email: string): Promise<boolean> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes("@")) {
    throw Object.assign(new Error("Please enter a valid email address."), {
      code: "auth/invalid-email",
    });
  }
  const user = auth.currentUser;
  if (!user) {
    throw Object.assign(new Error("Sign out and sign in again, then retry."), {
      code: "auth/requires-recent-login",
    });
  }
  const current = (user.email ?? "").trim().toLowerCase();
  if (trimmed === current) return false;

  const canChange = user.providerData.some((p) => p.providerId === "password");
  if (!canChange) {
    throw Object.assign(
      new Error("Email for this account cannot be changed here."),
      { code: "auth/operation-not-allowed" },
    );
  }

  await verifyBeforeUpdateEmail(user, trimmed);
  return true;
}

export async function deleteAccount(): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw Object.assign(new Error("Sign out and sign in again, then retry."), {
      code: "auth/requires-recent-login",
    });
  }
  await deleteUser(user);
}

export function isPasswordProvider(user: User | null | undefined): boolean {
  return Boolean(user?.providerData.some((p) => p.providerId === "password"));
}

export function needsEmailVerification(user: User | null | undefined): boolean {
  if (!user) return false;
  return isPasswordProvider(user) && !user.emailVerified;
}

function localOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { completed?: boolean };
    return Boolean(parsed.completed);
  } catch {
    return false;
  }
}

/** Prefer Firestore onboardingComplete when present; else localStorage. */
export async function postAuthPath(): Promise<string> {
  const user = auth.currentUser;
  if (needsEmailVerification(user)) return "/verify-email";

  const uid = user?.uid;
  if (uid) {
    try {
      const profile = await getUserProfile(uid);
      if (profile?.onboardingComplete === true) return "/dashboard";
      if (profile?.onboardingComplete === false) return "/onboarding";
    } catch {
      /* fall through */
    }
  }
  return localOnboardingComplete() ? "/dashboard" : "/onboarding";
}

export type { User };
