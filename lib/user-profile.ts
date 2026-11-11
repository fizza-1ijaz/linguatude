import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export type UserProfileDoc = {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  onboardingComplete?: boolean;
  activeExam?: string | null;
  settings?: Record<string, unknown>;
  entitlement?: Record<string, unknown>;
  privacy?: Record<string, unknown>;
  createdAt?: unknown;
  lastActiveAt?: unknown;
};

export async function getUserProfile(
  uid = auth.currentUser?.uid,
): Promise<UserProfileDoc | null> {
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfileDoc;
}

export async function updateUserProfileFields(
  fields: Partial<
    Pick<
      UserProfileDoc,
      | "displayName"
      | "photoURL"
      | "activeExam"
      | "settings"
      | "privacy"
      | "onboardingComplete"
    >
  >,
): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in to update your profile.");
  await updateDoc(doc(db, "users", user.uid), {
    ...fields,
    lastActiveAt: serverTimestamp(),
  });
}

export async function touchLastActive(user: User): Promise<void> {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      lastActiveAt: serverTimestamp(),
    });
  } catch {
    // Profile doc may not exist yet.
  }
}

export async function getIdToken(forceRefresh = false): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken(forceRefresh);
}
