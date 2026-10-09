import type { Metadata } from "next";
import { SpeakExamSetup } from "@/app/components/dashboard/speak-exam-setup";

export const metadata: Metadata = {
  title: "Exam Simulation | Linguatude",
  description: "Full IELTS-style speaking exam simulation.",
  robots: { index: false, follow: false },
};

export default function SpeakExamPage() {
  return <SpeakExamSetup />;
}
