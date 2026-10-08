import type { Metadata } from "next";
import { OnboardingScheduleStep } from "@/app/components/onboarding/onboarding-schedule-step";

export const metadata: Metadata = {
  title: "Your goals | Linguatude",
  description: "Set your target IELTS band scores and test date.",
  robots: { index: false, follow: false },
};

export default function OnboardingSchedulePage() {
  return <OnboardingScheduleStep />;
}
