import type { Metadata } from "next";
import { PteScoreReport } from "@/app/components/dashboard/pte-score-report";

export const metadata: Metadata = {
  title: "Score Report | Linguatude",
  description: "PTE AI-estimated score report.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteScoreReport />;
}
