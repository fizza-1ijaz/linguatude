import type { Metadata } from "next";
import { AccountSpeaking } from "@/app/components/dashboard/account-speaking";

export const metadata: Metadata = {
  title: "Speaking Preferences | Linguatude",
  description: "Customize how speaking practice content is delivered to you.",
  robots: { index: false, follow: false },
};

export default function AccountSpeakingPage() {
  return <AccountSpeaking />;
}
