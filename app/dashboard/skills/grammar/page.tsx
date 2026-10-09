import type { Metadata } from "next";
import { LessonGrammar } from "@/app/components/dashboard/lesson-grammar";

export const metadata: Metadata = {
  title: "Grammar Practice | Linguatude",
  description: "Practice grammar items from your logged errors.",
  robots: { index: false, follow: false },
};

export default function GrammarLessonPage() {
  return <LessonGrammar />;
}
