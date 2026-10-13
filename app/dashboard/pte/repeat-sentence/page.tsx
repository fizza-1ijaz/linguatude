import type { Metadata } from "next";
import { PteRepeatSentence } from "@/app/components/dashboard/pte-repeat-sentence";

export const metadata: Metadata = {
  title: "Repeat Sentence | Linguatude",
  description: "PTE Repeat Sentence practice.",
  robots: { index: false, follow: false },
};

export default function PteRepeatSentencePage() {
  return <PteRepeatSentence />;
}
