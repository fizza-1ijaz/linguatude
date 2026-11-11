import { httpsCallable, type FunctionsError } from "firebase/functions";
import { functions } from "@/lib/firebase";

type Success = { success: true; alreadyVerified?: boolean };

function callableMessage(err: unknown): string {
  if (typeof err === "object" && err !== null) {
    const code = "code" in err ? String((err as FunctionsError).code) : "";
    const message =
      "message" in err && typeof (err as { message: unknown }).message === "string"
        ? (err as { message: string }).message
        : "";
    const cleaned = message
      .replace(/^Firebase:\s*/i, "")
      .replace(/\s*\([^)]*\)\s*$/, "")
      .trim();

    if (code.includes("unauthenticated")) {
      return "Please sign in again and retry.";
    }
    if (code.includes("resource-exhausted")) {
      return cleaned || "Too many requests. Please wait and try again.";
    }
    if (code.includes("invalid-argument")) {
      return cleaned || "Invalid request.";
    }
    if (code.includes("failed-precondition")) {
      return cleaned || "Please request a new code and try again.";
    }
    if (cleaned) return cleaned;
  }
  return err instanceof Error
    ? err.message
    : "Something went wrong. Please try again.";
}

export function mapFunctionsAuthError(err: unknown): string {
  return callableMessage(err);
}

/** Deployed callable: sendPasswordReset — no auth required. */
export async function callSendPasswordReset(email: string): Promise<Success> {
  const call = httpsCallable<{ email: string }, Success>(
    functions,
    "sendPasswordReset",
  );
  const result = await call({ email: email.trim().toLowerCase() });
  return result.data;
}

/** Deployed callable: sendVerificationEmail — requires signed-in user. */
export async function callSendVerificationEmail(): Promise<Success> {
  const call = httpsCallable<Record<string, never>, Success>(
    functions,
    "sendVerificationEmail",
  );
  const result = await call({});
  return result.data;
}

/** Deployed callable: verifyEmailCode — requires signed-in user + 6-digit code. */
export async function callVerifyEmailCode(code: string): Promise<Success> {
  const call = httpsCallable<{ code: string }, Success>(
    functions,
    "verifyEmailCode",
  );
  const result = await call({ code: code.trim() });
  return result.data;
}
