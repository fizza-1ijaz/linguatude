import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Free Plan | Linguatude",
  description: "Your free plan allowances and upgrade options.",
  robots: { index: false, follow: false },
};

export default function SubscriptionFreePage() {
  return <AccountSubscription variant="free" />;
}
