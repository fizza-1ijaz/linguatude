import type { Metadata } from "next";
import { AccountNotifications } from "@/app/components/dashboard/account-notifications";

export const metadata: Metadata = {
  title: "Notification Preferences | Linguatude",
  description: "Choose how you want to stay informed.",
  robots: { index: false, follow: false },
};

export default function AccountNotificationsPage() {
  return <AccountNotifications />;
}
