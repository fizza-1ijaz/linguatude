import type { Metadata } from "next";
import { OnboardingLevelStep } from "@/app/components/onboarding/onboarding-level-step";

export const metadata: Metadata = {
  title: "Choose your level | Linguatude",
  description: "Select your IELTS UKVI / Life Skills level.",
  robots: { index: false, follow: false },
};

export default function OnboardingLevelPage() {
  return <OnboardingLevelStep />;
}
