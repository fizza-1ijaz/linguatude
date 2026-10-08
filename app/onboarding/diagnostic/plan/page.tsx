import type { Metadata } from "next";
import { OnboardingPlanStep } from "@/app/components/onboarding/onboarding-plan-step";

export const metadata: Metadata = {
  title: "Your study plan | Linguatude",
  description: "Your personalised IELTS study plan after the diagnostic.",
  robots: { index: false, follow: false },
};

export default function DiagnosticPlanPage() {
  return <OnboardingPlanStep />;
}
