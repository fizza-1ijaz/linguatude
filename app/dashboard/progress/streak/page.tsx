import type { Metadata } from "next";
import { ProgressStreakCalendar } from "@/app/components/dashboard/progress-streak-calendar";

export const metadata: Metadata = {
  title: "Streak & Calendar | Linguatude",
  description: "Your consistency and activity over time.",
  robots: { index: false, follow: false },
};

export default function ProgressStreakPage() {
  return <ProgressStreakCalendar />;
}
