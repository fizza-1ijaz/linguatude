import type { Metadata } from "next";
import { LessonPaused } from "@/app/components/dashboard/lesson-paused";

export const metadata: Metadata = {
  title: "Lesson Paused | Linguatude",
  description: "Resume or exit your paused lesson.",
  robots: { index: false, follow: false },
};

export default function LessonPausedPage() {
  return <LessonPaused />;
}
