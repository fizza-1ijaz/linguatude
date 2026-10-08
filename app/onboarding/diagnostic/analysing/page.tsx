import type { Metadata } from "next";
import { DiagnosticAnalysing } from "@/app/components/diagnostic/diagnostic-analysing";

export const metadata: Metadata = {
  title: "Analysing diagnostic | Linguatude",
  description: "IELTS Master Diagnostics — analysing your results.",
  robots: { index: false, follow: false },
};

export default function DiagnosticAnalysingPage() {
  return <DiagnosticAnalysing />;
}
