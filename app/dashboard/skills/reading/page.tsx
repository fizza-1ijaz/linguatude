import type { Metadata } from "next";
import { LessonReading } from "@/app/components/dashboard/lesson-reading";

export const metadata: Metadata = {
  title: "Reading Comprehension | Linguatude",
  description: "Core reading comprehension lesson.",
  robots: { index: false, follow: false },
};

export default function ReadingLessonPage() {
  return <LessonReading />;
}
