import type { Metadata } from "next";
import { WritingHome } from "@/app/components/dashboard/writing-home";

export const metadata: Metadata = {
  title: "Writing | Linguatude",
  description: "Practice IELTS Writing Task 1 and Task 2 with AI feedback.",
  robots: { index: false, follow: false },
};

export default function WritingPage() {
  return <WritingHome />;
}
