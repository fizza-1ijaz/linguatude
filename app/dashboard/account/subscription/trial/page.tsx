import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Premium Trial | Linguatude",
  description: "Your Premium trial status and allowance.",
  robots: { index: false, follow: false },
};

export default function SubscriptionTrialPage() {
  return <AccountSubscription variant="trial" />;
}
