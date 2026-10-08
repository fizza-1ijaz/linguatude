import type { Metadata } from "next";
import { SpeakHome } from "@/app/components/dashboard/speak-home";

export const metadata: Metadata = {
  title: "Speaking | Linguatude",
  description: "Practice IELTS speaking with AI coaching and exam simulation.",
  robots: { index: false, follow: false },
};

export default function SpeakPage() {
  return <SpeakHome />;
}
