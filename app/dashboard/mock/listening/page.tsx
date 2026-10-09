import type { Metadata } from "next";
import { MockListening } from "@/app/components/dashboard/mock-listening";

export const metadata: Metadata = {
  title: "Mock Listening | Linguatude",
  description: "Listening section of the full mock test.",
  robots: { index: false, follow: false },
};

export default function MockListeningPage() {
  return <MockListening />;
}
