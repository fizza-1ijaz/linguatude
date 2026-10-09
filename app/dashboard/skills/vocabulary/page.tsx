import type { Metadata } from "next";
import { LessonVocabulary } from "@/app/components/dashboard/lesson-vocabulary";

export const metadata: Metadata = {
  title: "Vocabulary Drill | Linguatude",
  description: "Practice vocabulary with flashcards.",
  robots: { index: false, follow: false },
};

export default function VocabularyLessonPage() {
  return <LessonVocabulary />;
}
