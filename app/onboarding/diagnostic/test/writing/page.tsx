import type { Metadata } from "next";
import { DiagnosticWritingTest } from "@/app/components/diagnostic/diagnostic-writing-test";

export const metadata: Metadata = {
  title: "Writing diagnostic | Linguatude",
  description: "IELTS Master Diagnostics — Writing section.",
  robots: { index: false, follow: false },
};

export default function DiagnosticWritingPage() {
  return <DiagnosticWritingTest />;
}
