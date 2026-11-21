import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  callScoreTextAttempt,
  callScoreWritingAttempt,
} from "@/lib/functions-learning";

export type AttemptDoc = {
  uid: string;
  examId: string;
  itemId: string;
  mode: string;
  sessionId?: string;
  response: Record<string, unknown>;
  status: string;
  scores?: Record<string, unknown>;
  createdAt?: unknown;
  scoredAt?: unknown;
  error?: string;
};

export function newAttemptId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `att_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function createAttempt(input: {
  attemptId?: string;
  examId: string;
  itemId: string;
  mode: string;
  response: Record<string, unknown>;
  sessionId?: string;
}): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in.");
  const attemptId = input.attemptId ?? newAttemptId();
  await setDoc(doc(db, "attempts", attemptId), {
    uid: user.uid,
    examId: input.examId,
    itemId: input.itemId,
    mode: input.mode,
    sessionId: input.sessionId ?? null,
    response: input.response,
    status: "created",
    createdAt: serverTimestamp(),
  });
  return attemptId;
}

export function watchAttempt(
  attemptId: string,
  onNext: (attempt: AttemptDoc | null) => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, "attempts", attemptId),
    (snap) => {
      onNext(snap.exists() ? (snap.data() as AttemptDoc) : null);
    },
    () => onNext(null),
  );
}

/** Create + score an objective (reading/listening) attempt. */
export async function submitAndScoreText(input: {
  examId: string;
  itemId: string;
  mode?: string;
  response: Record<string, unknown>;
}): Promise<string> {
  const attemptId = await createAttempt({
    examId: input.examId,
    itemId: input.itemId,
    mode: input.mode ?? "practice",
    response: input.response,
  });
  await callScoreTextAttempt(attemptId);
  return attemptId;
}

/** Create + score a writing attempt (AI allowance). */
export async function submitAndScoreWriting(input: {
  examId: string;
  itemId: string;
  mode?: string;
  response: Record<string, unknown>;
}): Promise<string> {
  const attemptId = await createAttempt({
    examId: input.examId,
    itemId: input.itemId,
    mode: input.mode ?? "practice",
    response: input.response,
  });
  await callScoreWritingAttempt(attemptId);
  return attemptId;
}
