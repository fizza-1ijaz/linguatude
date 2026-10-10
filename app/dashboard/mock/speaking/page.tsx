import type { Metadata } from "next";
import { MockSpeaking } from "@/app/components/dashboard/mock-speaking";

export const metadata: Metadata = {
  title: "Mock Speaking | Linguatude",
  description: "Speaking section of the full mock test.",
  robots: { index: false, follow: false },
};

export default function MockSpeakingPage() {
  return <MockSpeaking />;
}
