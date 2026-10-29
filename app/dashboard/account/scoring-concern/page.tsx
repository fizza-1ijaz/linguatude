import type { Metadata } from "next";
import { ScoringConcernForm } from "@/app/components/dashboard/scoring-concern-form";

export const metadata: Metadata = {
  title: "Scoring Concern Form | Linguatude",
  description:
    "Share your concern about a recent score or feedback. We'll review it carefully.",
  robots: { index: false, follow: false },
};

export default function ScoringConcernPage() {
  return <ScoringConcernForm />;
}
