import type { Metadata } from "next";
import { SecondExamSetup } from "@/app/components/dashboard/second-exam-setup";

export const metadata: Metadata = {
  title: "Second Exam Setup | Linguatude",
  description:
    "Set up your additional exam details to personalize your learning plan.",
  robots: { index: false, follow: false },
};

export default function SecondExamSetupPage() {
  return <SecondExamSetup />;
}
