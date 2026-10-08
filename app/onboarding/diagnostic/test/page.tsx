import type { Metadata } from "next";
import { DiagnosticListeningTest } from "@/app/components/diagnostic/diagnostic-listening-test";

export const metadata: Metadata = {
  title: "Listening diagnostic | Linguatude",
  description: "IELTS Master Diagnostics — Listening section.",
  robots: { index: false, follow: false },
};

export default function DiagnosticTestPage() {
  return <DiagnosticListeningTest />;
}
