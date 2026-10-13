import type { Metadata } from "next";
import { PteReorderParagraphs } from "@/app/components/dashboard/pte-reorder-paragraphs";

export const metadata: Metadata = {
  title: "Re-order Paragraphs | Linguatude",
  description: "PTE Re-order Paragraphs practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteReorderParagraphs />;
}
