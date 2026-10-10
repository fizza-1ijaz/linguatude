import type { Metadata } from "next";
import { MockReading } from "@/app/components/dashboard/mock-reading";

export const metadata: Metadata = {
  title: "Mock Reading | Linguatude",
  description: "Reading section of the full mock test.",
  robots: { index: false, follow: false },
};

export default function MockReadingPage() {
  return <MockReading />;
}
