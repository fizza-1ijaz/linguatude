import type { Metadata } from "next";
import { DiagnosticReadingTest } from "@/app/components/diagnostic/diagnostic-reading-test";

export const metadata: Metadata = {
  title: "Reading diagnostic | Linguatude",
  description: "IELTS Master Diagnostics — Reading section.",
  robots: { index: false, follow: false },
};

export default function DiagnosticReadingPage() {
  return <DiagnosticReadingTest />;
}
