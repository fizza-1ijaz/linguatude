import type { Metadata } from "next";
import { SubscriptionManagement } from "@/app/components/dashboard/subscription-management";

export const metadata: Metadata = {
  title: "Subscription Management | Linguatude",
  description:
    "View and manage your active subscriptions for PTE and IELTS.",
  robots: { index: false, follow: false },
};

export default function SubscriptionManagementPage() {
  return <SubscriptionManagement />;
}
