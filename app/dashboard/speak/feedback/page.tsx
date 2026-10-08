import type { Metadata } from "next";
import { SpeakFeedback } from "@/app/components/dashboard/speak-feedback";

export const metadata: Metadata = {
  title: "Your Feedback | Linguatude",
  description: "Review AI coaching feedback from your speaking practice.",
  robots: { index: false, follow: false },
};

export default function SpeakFeedbackPage() {
  return <SpeakFeedback />;
}
