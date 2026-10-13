import type { Metadata } from "next";
import { AccountSettings } from "@/app/components/dashboard/account-settings";

export const metadata: Metadata = {
  title: "Account & Settings | Linguatude",
  description: "Manage your Linguatude account and settings.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountSettings />;
}
