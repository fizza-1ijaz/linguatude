import type { Metadata } from "next";
import { LessonExitAssessment } from "@/app/components/dashboard/lesson-exit-assessment";

export const metadata: Metadata = {
  title: "Exit Assessment | Linguatude",
  description: "Complete the exit assessment for this lesson.",
  robots: { index: false, follow: false },
};

export default function ExitAssessmentPage() {
  return <LessonExitAssessment />;
}
