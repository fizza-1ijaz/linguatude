import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import type { ExamChoice, StudyDayId } from "@/app/components/onboarding/onboarding-state";
import { auth, db } from "@/lib/firebase";
import { toExamId } from "@/lib/exam-ids";

const DAY_INDEX: Record<StudyDayId, number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};

function uidOrNull(): string | null {
  return auth.currentUser?.uid ?? null;
}

async function saveWorkspace(
  examId: string,
  answers: Record<string, unknown>,
): Promise<void> {
  const uid = uidOrNull();
  if (!uid) return;
  await setDoc(
    doc(db, "users", uid, "workspaces", examId),
    { ...answers, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

async function setActiveExam(examId: string): Promise<void> {
  const uid = uidOrNull();
  if (!uid) return;
  await updateDoc(doc(db, "users", uid), { activeExam: examId });
}

function fireAndForget(action: () => Promise<void>, label: string) {
  void action().catch((err) => {
    console.warn(`OnboardingAnswers.${label}:`, err);
  });
}

export function examChosen(exam: ExamChoice) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(async () => {
    await saveWorkspace(examId, {});
    await setActiveExam(examId);
    try {
      const { ensureEntitlement } = await import("@/lib/entitlements");
      await ensureEntitlement(examId);
    } catch (err) {
      console.warn("OnboardingAnswers.ensureEntitlement:", err);
    }
  }, "examChosen");
}

export function saveDailyMinutes(exam: ExamChoice, minutes: number) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(
    () => saveWorkspace(examId, { dailyMinutes: minutes }),
    "dailyMinutes",
  );
}

export function savePreviousScore(
  exam: ExamChoice,
  input: { hadPriorTest: boolean; scores?: Record<string, number> | null },
) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(
    () =>
      saveWorkspace(examId, {
        hadPriorTest: input.hadPriorTest,
        previousScore: input.hadPriorTest ? input.scores ?? null : null,
      }),
    "previousScore",
  );
}

export function saveTarget(
  exam: ExamChoice,
  input: {
    target: Record<string, number> | null;
    testDate: string | null;
  },
) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(
    () =>
      saveWorkspace(examId, {
        target: input.target,
        testDate: input.testDate ? new Date(input.testDate) : null,
      }),
    "target",
  );
}

export function saveStudyDays(exam: ExamChoice, days: StudyDayId[]) {
  const examId = toExamId(exam);
  if (!examId) return;
  const sorted = [...new Set(days.map((d) => DAY_INDEX[d]))].sort((a, b) => a - b);
  fireAndForget(
    () => saveWorkspace(examId, { studyDays: sorted }),
    "studyDays",
  );
}

export function saveFocus(exam: ExamChoice, preference: string) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(
    () => saveWorkspace(examId, { focusPreference: preference }),
    "focus",
  );
}

export function markWorkspaceOnboardingComplete(exam: ExamChoice) {
  const examId = toExamId(exam);
  if (!examId) return;
  fireAndForget(
    () => saveWorkspace(examId, { onboardingComplete: true }),
    "complete",
  );
}

export async function switchActiveExam(exam: ExamChoice): Promise<void> {
  const examId = toExamId(exam);
  if (!examId) return;
  await setActiveExam(examId);
}

export async function readWorkspace(
  examId: string,
): Promise<Record<string, unknown> | null> {
  const uid = uidOrNull();
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid, "workspaces", examId));
  if (!snap.exists()) return null;
  return snap.data() as Record<string, unknown>;
}
