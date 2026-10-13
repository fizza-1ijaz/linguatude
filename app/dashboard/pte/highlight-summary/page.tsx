import type { Metadata } from "next";
import { PteHighlightSummary } from "@/app/components/dashboard/pte-highlight-summary";

export const metadata: Metadata = {
  title: "Highlight Correct Summary | Linguatude",
  description: "PTE Highlight Correct Summary practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteHighlightSummary />;
}
