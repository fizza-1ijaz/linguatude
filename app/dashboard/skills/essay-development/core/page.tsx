import type { Metadata } from "next";
import { LessonCoreContent } from "@/app/components/dashboard/lesson-core-content";

export const metadata: Metadata = {
  title: "Core Content | Linguatude",
  description: "Study the primary skill content and answer questions.",
  robots: { index: false, follow: false },
};

export default function EssayDevelopmentCorePage() {
  return <LessonCoreContent />;
}
