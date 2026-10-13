import type { Metadata } from "next";
import { PteSummarizeSpoken } from "@/app/components/dashboard/pte-summarize-spoken";

export const metadata: Metadata = {
  title: "Summarize Spoken Text | Linguatude",
  description: "PTE Summarize Spoken Text practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteSummarizeSpoken />;
}
