import type { Metadata } from "next";
import { SkillProgressUpdated } from "@/app/components/dashboard/skill-progress-updated";

export const metadata: Metadata = {
  title: "Skill Progress Updated | Linguatude",
  description: "Your skill progress has been updated.",
  robots: { index: false, follow: false },
};

export default function SkillProgressUpdatedPage() {
  return <SkillProgressUpdated />;
}
