import type { Metadata } from "next";
import { LessonMidCheck } from "@/app/components/dashboard/lesson-mid-check";

export const metadata: Metadata = {
  title: "Mid-Check | Linguatude",
  description: "Check your understanding so far.",
  robots: { index: false, follow: false },
};

export default function EssayDevelopmentMidCheckPage() {
  return <LessonMidCheck />;
}
