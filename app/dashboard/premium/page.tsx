import type { Metadata } from "next";
import { PremiumPurchase } from "@/app/components/dashboard/premium-purchase";

export const metadata: Metadata = {
  title: "Premium | Linguatude",
  description: "Upgrade to Linguatude Premium and unlock your full learning experience.",
  robots: { index: false, follow: false },
};

export default function PremiumPage() {
  return <PremiumPurchase />;
}
