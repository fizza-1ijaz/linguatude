import type { Metadata } from "next";
import { PteHighlightIncorrect } from "@/app/components/dashboard/pte-highlight-incorrect";

export const metadata: Metadata = {
  title: "Highlight Incorrect Words | Linguatude",
  description: "PTE Highlight Incorrect Words practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteHighlightIncorrect />;
}
