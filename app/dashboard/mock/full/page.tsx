import type { Metadata } from "next";
import { MockFull } from "@/app/components/dashboard/mock-full";

export const metadata: Metadata = {
  title: "Full Mock Test | Linguatude",
  description: "Prepare and start a full mock test.",
  robots: { index: false, follow: false },
};

export default function FullMockTestPage() {
  return <MockFull />;
}
