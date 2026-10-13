import type { Metadata } from "next";
import { ProgressPlanReview } from "@/app/components/dashboard/progress-plan-review";

export const metadata: Metadata = {
  title: "Plan Review | Linguatude",
  description: "Here's what your adaptive plan expects this week.",
  robots: { index: false, follow: false },
};

export default function ProgressPlanPage() {
  return <ProgressPlanReview />;
}
