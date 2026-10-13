import type { Metadata } from "next";
import { PteSummarizeText } from "@/app/components/dashboard/pte-summarize-text";

export const metadata: Metadata = {
  title: "Summarize Written Text | Linguatude",
  description: "PTE Summarize Written Text practice.",
  robots: { index: false, follow: false },
};

export default function PteSummarizeTextPage() {
  return <PteSummarizeText />;
}
