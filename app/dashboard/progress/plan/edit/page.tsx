import type { Metadata } from "next";
import { ProgressPlanEditor } from "@/app/components/dashboard/progress-plan-editor";

export const metadata: Metadata = {
  title: "Plan Editor | Linguatude",
  description: "Adjust your study plan to match your available time and days.",
  robots: { index: false, follow: false },
};

export default function ProgressPlanEditPage() {
  return <ProgressPlanEditor />;
}
