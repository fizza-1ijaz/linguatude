import type { Metadata } from "next";
import { LessonQueue } from "@/app/components/dashboard/lesson-queue";

export const metadata: Metadata = {
  title: "Lesson Queue | Linguatude",
  description: "Follow the recommended order to master Essay Development.",
  robots: { index: false, follow: false },
};

export default function EssayDevelopmentQueuePage() {
  return <LessonQueue />;
}
