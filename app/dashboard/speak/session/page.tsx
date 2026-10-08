import type { Metadata } from "next";
import { SpeakSession } from "@/app/components/dashboard/speak-session";

export const metadata: Metadata = {
  title: "Speaking Practice | Linguatude",
  description: "Answer IELTS speaking questions with AI coaching.",
  robots: { index: false, follow: false },
};

export default function SpeakSessionPage() {
  return <SpeakSession />;
}
