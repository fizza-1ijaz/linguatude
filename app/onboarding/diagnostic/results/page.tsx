import type { Metadata } from "next";
import { OnboardingResultsStep } from "@/app/components/onboarding/onboarding-results-step";

export const metadata: Metadata = {
  title: "Diagnostic results | Linguatude",
  description: "Your estimated IELTS diagnostic scores and focus areas.",
  robots: { index: false, follow: false },
};

export default function DiagnosticResultsPage() {
  return <OnboardingResultsStep />;
}
