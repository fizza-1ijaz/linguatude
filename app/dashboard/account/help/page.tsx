import type { Metadata } from "next";
import { AccountHelp } from "@/app/components/dashboard/account-help";

export const metadata: Metadata = {
  title: "Help & Support | Linguatude",
  description: "Find answers or get in touch with support.",
  robots: { index: false, follow: false },
};

export default function AccountHelpPage() {
  return <AccountHelp />;
}
