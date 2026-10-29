import type { Metadata } from "next";
import { SubscriptionFreeAfter } from "@/app/components/dashboard/subscription-free-after";

export const metadata: Metadata = {
  title: "Premium Expired | Linguatude",
  description:
    "Your premium has expired. Continue on the free plan or upgrade to Premium.",
  robots: { index: false, follow: false },
};

export default function PremiumExpiredPage() {
  return <SubscriptionFreeAfter variant="premium-expired" />;
}
