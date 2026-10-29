import type { Metadata } from "next";
import { ScoringConcernSubmitted } from "@/app/components/dashboard/scoring-concern-submitted";

export const metadata: Metadata = {
  title: "Concern Submitted | Linguatude",
  description: "Your scoring concern has been submitted successfully.",
  robots: { index: false, follow: false },
};

export default function ScoringConcernSubmittedPage() {
  return <ScoringConcernSubmitted />;
}
