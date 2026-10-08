import type { Metadata } from "next";
import { SpeakTestResults } from "@/app/components/dashboard/speak-test-results";

export const metadata: Metadata = {
  title: "Test Results | Linguatude",
  description: "IELTS Academic Speaking Simulation results.",
  robots: { index: false, follow: false },
};

export default function SpeakTestResultsPage() {
  return <SpeakTestResults />;
}
