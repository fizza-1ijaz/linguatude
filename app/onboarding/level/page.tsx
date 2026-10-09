import type { Metadata } from "next";
import { OnboardingLevelStep } from "@/app/components/onboarding/onboarding-level-step";

export const metadata: Metadata = {
  title: "Study routine | Linguatude",
  description: "Choose how much time you can study each day.",
  robots: { index: false, follow: false },
};

export default function OnboardingRoutinePage() {
  return <OnboardingLevelStep />;
}
