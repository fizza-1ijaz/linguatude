import type { Metadata } from "next";
import { SpeakSessionComplete } from "@/app/components/dashboard/speak-session-complete";

export const metadata: Metadata = {
  title: "Session Complete | Linguatude",
  description: "Your speaking exam session summary.",
  robots: { index: false, follow: false },
};

export default function SpeakSessionCompletePage() {
  return <SpeakSessionComplete />;
}
