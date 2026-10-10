import type { Metadata } from "next";
import { PremiumRestore } from "@/app/components/dashboard/premium-restore";

export const metadata: Metadata = {
  title: "Restore Purchase | Linguatude",
  description: "Restore your Linguatude Premium purchase.",
  robots: { index: false, follow: false },
};

export default function PremiumRestorePage() {
  return <PremiumRestore />;
}
