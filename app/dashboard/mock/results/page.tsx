import type { Metadata } from "next";
import { MockTestResults } from "@/app/components/dashboard/mock-test-results";

export const metadata: Metadata = {
  title: "Test Results | Linguatude",
  description: "View your full mock test results and progress.",
  robots: { index: false, follow: false },
};

export default function MockResultsPage() {
  return <MockTestResults />;
}
