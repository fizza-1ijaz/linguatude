import type { Metadata } from "next";
import { ProgressSkillDetailWriting } from "@/app/components/dashboard/progress-skill-detail";

export const metadata: Metadata = {
  title: "Skill Detail — Writing | Linguatude",
  description: "See how you're performing in Writing and where to focus next.",
  robots: { index: false, follow: false },
};

export default function ProgressWritingSkillPage() {
  return <ProgressSkillDetailWriting />;
}
