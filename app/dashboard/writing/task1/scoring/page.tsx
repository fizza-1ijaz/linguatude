import type { Metadata } from "next";
import { WritingTask1Scoring } from "@/app/components/dashboard/writing-task1-scoring";

export const metadata: Metadata = {
  title: "Scoring | Linguatude",
  description: "Evaluating your Writing Task 1 response.",
  robots: { index: false, follow: false },
};

export default function WritingTask1ScoringPage() {
  return <WritingTask1Scoring />;
}
