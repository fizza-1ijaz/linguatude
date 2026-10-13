import type { Metadata } from "next";
import { ProgressScoreHistory } from "@/app/components/dashboard/progress-score-history";

export const metadata: Metadata = {
  title: "Score History | Linguatude",
  description: "Track how your estimated scores have changed over time.",
  robots: { index: false, follow: false },
};

export default function ProgressHistoryPage() {
  return <ProgressScoreHistory />;
}
