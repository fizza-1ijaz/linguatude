import type { Metadata } from "next";
import { OnboardingFocusStep } from "@/app/components/onboarding/onboarding-focus-step";

export const metadata: Metadata = {
  title: "Learning focus | Linguatude",
  description: "Choose how Linguatude should focus your practice.",
  robots: { index: false, follow: false },
};

export default function OnboardingFocusPage() {
  return <OnboardingFocusStep />;
}
