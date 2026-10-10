import type { Metadata } from "next";
import { MockResultsLoading } from "@/app/components/dashboard/mock-results-loading";

export const metadata: Metadata = {
  title: "Results Loading | Linguatude",
  description: "Your mock test results are being evaluated.",
  robots: { index: false, follow: false },
};

export default function MockResultsLoadingPage() {
  return <MockResultsLoading />;
}
