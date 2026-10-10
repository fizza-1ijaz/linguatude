import type { Metadata } from "next";
import { PremiumConfirm } from "@/app/components/dashboard/premium-confirm";

export const metadata: Metadata = {
  title: "Confirm Trial | Linguatude",
  description: "Confirm your Linguatude Premium free trial.",
  robots: { index: false, follow: false },
};

export default function PremiumConfirmPage() {
  return <PremiumConfirm />;
}
