import type { Metadata } from "next";
import { PremiumWelcome } from "@/app/components/dashboard/premium-welcome";

export const metadata: Metadata = {
  title: "Welcome to Premium | Linguatude",
  description: "Your Linguatude Premium trial is active.",
  robots: { index: false, follow: false },
};

export default function PremiumWelcomePage() {
  return <PremiumWelcome />;
}
