import type { Metadata } from "next";
import { WritingTask1Feedback } from "@/app/components/dashboard/writing-task1-feedback";

export const metadata: Metadata = {
  title: "Your Feedback | Linguatude",
  description: "IELTS Writing Task 1 AI feedback.",
  robots: { index: false, follow: false },
};

export default function WritingTask1FeedbackPage() {
  return <WritingTask1Feedback />;
}
