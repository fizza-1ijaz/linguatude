import type { Metadata } from "next";
import { OnboardingDiagnosticStep } from "@/app/components/onboarding/onboarding-diagnostic-step";

export const metadata: Metadata = {
  title: "Diagnostic test | Linguatude",
  description: "Start a quick diagnostic to find your starting point.",
  robots: { index: false, follow: false },
};

export default function OnboardingDiagnosticPage() {
  return <OnboardingDiagnosticStep />;
}
