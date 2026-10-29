import type { Metadata } from "next";
import { DiagnosticRetakeLocked } from "@/app/components/dashboard/diagnostic-retake-locked";

export const metadata: Metadata = {
  title: "Diagnostic Retake Locked | Linguatude",
  description:
    "Diagnostic retake is available once every 30 days per exam. Earlier results stay visible.",
  robots: { index: false, follow: false },
};

export default function DiagnosticRetakeLockedPage() {
  return <DiagnosticRetakeLocked />;
}
