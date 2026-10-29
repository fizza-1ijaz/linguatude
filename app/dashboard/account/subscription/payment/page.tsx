import type { Metadata } from "next";
import { AccountSubscription } from "@/app/components/dashboard/account-subscription";

export const metadata: Metadata = {
  title: "Payment Issue | Linguatude",
  description: "Resolve a payment issue on your subscription.",
  robots: { index: false, follow: false },
};

export default function SubscriptionPaymentPage() {
  return <AccountSubscription variant="payment" />;
}
