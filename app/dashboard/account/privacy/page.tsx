import type { Metadata } from "next";
import { AccountPrivacy } from "@/app/components/dashboard/account-privacy";

export const metadata: Metadata = {
  title: "Data & Privacy | Linguatude",
  description: "Manage how your data is used, stored and protected.",
  robots: { index: false, follow: false },
};

export default function AccountPrivacyPage() {
  return <AccountPrivacy />;
}
