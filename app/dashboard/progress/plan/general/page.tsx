import type { Metadata } from "next";
import { GeneralImprovementPlan } from "@/app/components/dashboard/general-improvement-plan";

export const metadata: Metadata = {
  title: "General Improvement Plan | Linguatude",
  description:
    "A personalized plan to help you build your skills and improve over time.",
  robots: { index: false, follow: false },
};

export default function GeneralImprovementPlanPage() {
  return <GeneralImprovementPlan />;
}
