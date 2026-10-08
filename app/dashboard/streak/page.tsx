import type { Metadata } from "next";
import { StreakAchievements } from "@/app/components/dashboard/streak-achievements";

export const metadata: Metadata = {
  title: "Streak & Achievements | Linguatude",
  description: "Track your Linguatude streak, XP, and weekly progress.",
  robots: { index: false, follow: false },
};

export default function StreakPage() {
  return <StreakAchievements />;
}
