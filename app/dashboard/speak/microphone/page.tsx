import type { Metadata } from "next";
import { SpeakMicrophone } from "@/app/components/dashboard/speak-microphone";

export const metadata: Metadata = {
  title: "Microphone Access | Linguatude",
  description: "Enable microphone access for speaking practice.",
  robots: { index: false, follow: false },
};

export default function SpeakMicrophonePage() {
  return <SpeakMicrophone />;
}
