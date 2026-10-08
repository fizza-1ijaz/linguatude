import type { Metadata } from "next";
import { SpeakSetup } from "@/app/components/dashboard/speak-setup";

export const metadata: Metadata = {
  title: "Practice Setup | Linguatude",
  description: "Configure your IELTS speaking practice session.",
  robots: { index: false, follow: false },
};

export default function SpeakSetupPage() {
  return <SpeakSetup />;
}
