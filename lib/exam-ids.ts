import type { ExamChoice } from "@/app/components/onboarding/onboarding-state";

/** App exam → Firestore exam id (matches mobile OnboardingAnswers.examId). */
export function toExamId(exam: ExamChoice): string | null {
  if (exam === "pte") return "pte";
  if (exam === "academic") return "ielts_ac";
  return null;
}

export function fromExamId(examId: string): Exclude<ExamChoice, null | "ukvi"> {
  return examId === "pte" ? "pte" : "academic";
}
