import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Subscription Cancelled | Linguatude",
  description: "Your cancelled subscription status and remaining access.",
  robots: { index: false, follow: false },
};

export default function SubscriptionCancelledPage() {
  return <AccountSubscription variant="cancelled" />;
}
