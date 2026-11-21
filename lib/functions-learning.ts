import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

/** Ensures Free entitlement exists for an exam workspace (deployed callable). */
export async function callEnsureEntitlement(
  examId: string,
): Promise<Record<string, unknown>> {
  const call = httpsCallable<{ examId: string }, Record<string, unknown>>(
    functions,
    "ensureEntitlement",
  );
  const result = await call({ examId });
  return result.data;
}

/** Objective scoring for reading/listening attempts. */
export async function callScoreTextAttempt(
  attemptId: string,
): Promise<Record<string, unknown>> {
  const call = httpsCallable<{ attemptId: string }, Record<string, unknown>>(
    functions,
    "scoreTextAttempt",
  );
  const result = await call({ attemptId });
  return result.data;
}

/** AI scoring for writing attempts (uses AI allowance). */
export async function callScoreWritingAttempt(
  attemptId: string,
): Promise<Record<string, unknown>> {
  const call = httpsCallable<{ attemptId: string }, Record<string, unknown>>(
    functions,
    "scoreWritingAttempt",
  );
  const result = await call({ attemptId });
  return result.data;
}

/**
 * One-play audio token (signed URL, ~60s).
 * Pass either attemptId or itemId depending on the player.
 */
export async function callIssueAudioPlayToken(input: {
  attemptId?: string;
  itemId?: string;
  examId?: string;
}): Promise<{ url?: string; expiresAt?: string } & Record<string, unknown>> {
  const call = httpsCallable<
    { attemptId?: string; itemId?: string; examId?: string },
    { url?: string; expiresAt?: string } & Record<string, unknown>
  >(functions, "issueAudioPlayToken");
  const result = await call(input);
  return result.data;
}

/**
 * Admin-only debug helper. Do not call from normal learner UI.
 * Kept for local tooling / admin pages later.
 */
export async function callDebugSetEntitlement(input: {
  examId: string;
  state: string;
  plan?: string | null;
}): Promise<Record<string, unknown>> {
  const call = httpsCallable<
    { examId: string; state: string; plan?: string | null },
    Record<string, unknown>
  >(functions, "debugSetEntitlement");
  const result = await call(input);
  return result.data;
}
