import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Subscription | Linguatude",
  description: "Manage your plan, payment details and billing.",
  robots: { index: false, follow: false },
};

export default function AccountSubscriptionPage() {
  return <AccountSubscription variant="manage" />;
}
