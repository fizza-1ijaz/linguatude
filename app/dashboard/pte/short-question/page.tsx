import type { Metadata } from "next";
import { PteShortQuestion } from "@/app/components/dashboard/pte-short-question";

export const metadata: Metadata = {
  title: "Answer Short Question | Linguatude",
  description: "PTE Answer Short Question practice.",
  robots: { index: false, follow: false },
};

export default function PteShortQuestionPage() {
  return <PteShortQuestion />;
}
