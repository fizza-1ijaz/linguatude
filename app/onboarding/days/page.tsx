import type { Metadata } from "next";
import { OnboardingDaysStep } from "@/app/components/onboarding/onboarding-days-step";

export const metadata: Metadata = {
  title: "Study days | Linguatude",
  description: "Choose which days you want to study.",
  robots: { index: false, follow: false },
};

export default function OnboardingDaysPage() {
  return <OnboardingDaysStep />;
}
