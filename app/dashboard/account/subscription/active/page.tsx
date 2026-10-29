import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Premium Active | Linguatude",
  description: "Your active Premium subscription details.",
  robots: { index: false, follow: false },
};

export default function SubscriptionActivePage() {
  return <AccountSubscription variant="active" />;
}
