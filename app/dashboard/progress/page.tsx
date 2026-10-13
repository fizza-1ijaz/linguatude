import type { Metadata } from "next";
import { ProgressDashboard } from "@/app/components/dashboard/progress-dashboard";

export const metadata: Metadata = {
  title: "Progress Dashboard | Linguatude",
  description: "See how you're progressing towards your target score.",
  robots: { index: false, follow: false },
};

export default function ProgressPage() {
  return <ProgressDashboard />;
}
