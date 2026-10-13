import type { Metadata } from "next";
import { MockRecommendedNext } from "@/app/components/dashboard/mock-recommended-next";

export const metadata: Metadata = {
  title: "Recommended Next Step | Linguatude",
  description: "Your recommended next practice step after the mock test.",
  robots: { index: false, follow: false },
};

export default function MockRecommendedPage() {
  return <MockRecommendedNext />;
}
