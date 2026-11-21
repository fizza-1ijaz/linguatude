import { httpsCallable, type FunctionsError } from "firebase/functions";
import { functions } from "@/lib/firebase";

export type DiagnosticStartResult = {
  runId: string;
  status: string;
};

export type DiagnosticLockedDetails = {
  reason: "retake_locked";
  unlockAt?: string;
};

function functionsCode(err: unknown): string {
  if (typeof err === "object" && err !== null && "code" in err) {
    return String((err as FunctionsError).code);
  }
  return "";
}

export function mapDiagnosticError(err: unknown): string {
  const code = functionsCode(err);
  const message =
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
      ? (err as { message: string }).message
          .replace(/^Firebase:\s*/i, "")
          .replace(/\s*\([^)]*\)\s*$/, "")
          .trim()
      : "";

  if (code.includes("unauthenticated")) {
    return "Please sign in again and retry.";
  }
  if (code.includes("failed-precondition") && message) return message;
  if (code.includes("invalid-argument") && message) return message;
  if (message) return message;
  return err instanceof Error
    ? err.message
    : "Something went wrong. Please try again.";
}

export function getDiagnosticLockDetails(
  err: unknown,
): DiagnosticLockedDetails | null {
  if (typeof err !== "object" || err === null) return null;
  const code = functionsCode(err);
  if (!code.includes("failed-precondition")) return null;
  const details =
    "details" in err ? (err as { details?: unknown }).details : undefined;
  if (
    typeof details === "object" &&
    details !== null &&
    "reason" in details &&
    (details as { reason: unknown }).reason === "retake_locked"
  ) {
    const unlockAt =
      "unlockAt" in details &&
      typeof (details as { unlockAt: unknown }).unlockAt === "string"
        ? (details as { unlockAt: string }).unlockAt
        : undefined;
    return { reason: "retake_locked", unlockAt };
  }
  return null;
}

/** Deployed callable: startDiagnostic */
export async function callStartDiagnostic(
  examId: string,
): Promise<DiagnosticStartResult> {
  const call = httpsCallable<{ examId: string }, DiagnosticStartResult>(
    functions,
    "startDiagnostic",
  );
  const result = await call({ examId });
  return result.data;
}

/** Deployed callable: finalizeDiagnostic */
export async function callFinalizeDiagnostic(
  runId: string,
): Promise<{ status: string }> {
  const call = httpsCallable<{ runId: string }, { status: string }>(
    functions,
    "finalizeDiagnostic",
  );
  const result = await call({ runId });
  return result.data;
}

/** Deployed callable: skipDiagnostic */
export async function callSkipDiagnostic(
  examId: string,
): Promise<Record<string, unknown>> {
  const call = httpsCallable<{ examId: string }, Record<string, unknown>>(
    functions,
    "skipDiagnostic",
  );
  const result = await call({ examId });
  return result.data;
}

/** Deployed callable: getDiagnosticAudio — returns base64 audio */
export async function callGetDiagnosticAudio(
  runId: string,
  itemId: string,
): Promise<{ audio: string; contentType?: string }> {
  const call = httpsCallable<
    { runId: string; itemId: string },
    { audio: string; contentType?: string }
  >(functions, "getDiagnosticAudio");
  const result = await call({ runId, itemId });
  return result.data;
}

/** Deployed callable: getNextItems */
export async function callGetNextItems(input: {
  examId: string;
  type: string;
  count?: number;
}): Promise<{ items: Array<Record<string, unknown>> }> {
  const call = httpsCallable<
    { examId: string; type: string; count?: number },
    { items: Array<Record<string, unknown>> }
  >(functions, "getNextItems");
  const result = await call(input);
  return result.data;
}
