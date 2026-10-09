import type { Metadata } from "next";
import { MockHome } from "@/app/components/dashboard/mock-home";

export const metadata: Metadata = {
  title: "Mock Tests | Linguatude",
  description: "Full mock tests, history, and recommendations.",
  robots: { index: false, follow: false },
};

export default function MockTestsPage() {
  return <MockHome />;
}
