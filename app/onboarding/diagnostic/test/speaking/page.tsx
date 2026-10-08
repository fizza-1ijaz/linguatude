import type { Metadata } from "next";
import { DiagnosticSpeakingTest } from "@/app/components/diagnostic/diagnostic-speaking-test";

export const metadata: Metadata = {
  title: "Speaking diagnostic | Linguatude",
  description: "IELTS Master Diagnostics — Speaking section.",
  robots: { index: false, follow: false },
};

export default function DiagnosticSpeakingPage() {
  return <DiagnosticSpeakingTest />;
}
