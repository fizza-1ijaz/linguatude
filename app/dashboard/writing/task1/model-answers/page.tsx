import type { Metadata } from "next";
import { WritingModelAnswers } from "@/app/components/dashboard/writing-model-answers";

export const metadata: Metadata = {
  title: "Model Answers | Linguatude",
  description: "IELTS Writing Task 1 model answers with teacher notes.",
  robots: { index: false, follow: false },
};

export default function WritingTask1ModelAnswersPage() {
  return <WritingModelAnswers />;
}
