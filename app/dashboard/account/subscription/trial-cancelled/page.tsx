import type { Metadata } from "next";
import { SubscriptionFreeAfter } from "@/app/components/dashboard/subscription-free-after";

export const metadata: Metadata = {
  title: "Trial Cancelled | Linguatude",
  description: "Your trial was cancelled. Continue on the free plan or upgrade.",
  robots: { index: false, follow: false },
};

export default function TrialCancelledPage() {
  return <SubscriptionFreeAfter variant="trial-cancelled" />;
}
