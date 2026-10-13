import type { Metadata } from "next";
import { AccountProfile } from "@/app/components/dashboard/account-profile";

export const metadata: Metadata = {
  title: "Profile | Linguatude",
  description: "Update your personal information.",
  robots: { index: false, follow: false },
};

export default function AccountProfilePage() {
  return <AccountProfile />;
}
