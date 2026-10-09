import type { Metadata } from "next";
import { LessonExitComplete } from "@/app/components/dashboard/lesson-exit-complete";

export const metadata: Metadata = {
  title: "Lesson Complete | Linguatude",
  description: "Your exit assessment results.",
  robots: { index: false, follow: false },
};

export default function ExitAssessmentCompletePage() {
  return <LessonExitComplete />;
}
