import type { Metadata } from "next";
import { LessonIceBreaker } from "@/app/components/dashboard/lesson-ice-breaker";

export const metadata: Metadata = {
  title: "Ice-Breaker | Linguatude",
  description: "Warm up with a short reading and listening ice-breaker.",
  robots: { index: false, follow: false },
};

export default function EssayDevelopmentIceBreakerPage() {
  return <LessonIceBreaker />;
}
