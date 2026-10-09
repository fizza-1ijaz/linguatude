import type { Metadata } from "next";
import { LessonListening } from "@/app/components/dashboard/lesson-listening";

export const metadata: Metadata = {
  title: "Listening Practice | Linguatude",
  description: "Listening practice with timed audio and questions.",
  robots: { index: false, follow: false },
};

export default function ListeningLessonPage() {
  return <LessonListening />;
}
