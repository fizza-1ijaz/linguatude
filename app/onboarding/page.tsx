import type { Metadata } from "next";
import { OnboardingExamStep } from "@/app/components/onboarding/onboarding-exam-step";

export const metadata: Metadata = {
  title: "Get ready | Linguatude",
  description: "Choose the exam you're preparing for with Linguatude.",
  robots: { index: false, follow: false },
};

export default function OnboardingExamPage() {
  return <OnboardingExamStep />;
}
