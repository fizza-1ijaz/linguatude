import type { Metadata } from "next";
import { AdaptiveSkip } from "@/app/components/dashboard/adaptive-skip";

export const metadata: Metadata = {
  title: "Adaptive Skip | Linguatude",
  description: "Confirm your adaptive practice skip.",
  robots: { index: false, follow: false },
};

export default function AdaptiveSkipPage() {
  return <AdaptiveSkip />;
}
