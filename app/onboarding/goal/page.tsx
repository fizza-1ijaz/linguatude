import type { Metadata } from "next";
import { OnboardingGoalStep } from "@/app/components/onboarding/onboarding-goal-step";

export const metadata: Metadata = {
  title: "Previous IELTS scores | Linguatude",
  description: "Tell us if you've taken IELTS before and enter your most recent band scores.",
  robots: { index: false, follow: false },
};

export default function OnboardingGoalPage() {
  return <OnboardingGoalStep />;
}
