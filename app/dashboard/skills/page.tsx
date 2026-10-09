import type { Metadata } from "next";
import { SkillLibrary } from "@/app/components/dashboard/skill-library";

export const metadata: Metadata = {
  title: "Skill Library | Linguatude",
  description: "Browse skills and track your learning progress.",
  robots: { index: false, follow: false },
};

export default function SkillsPage() {
  return <SkillLibrary />;
}
