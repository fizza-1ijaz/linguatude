import type { Metadata } from "next";
import { WritingTask1Write } from "@/app/components/dashboard/writing-task1-write";

export const metadata: Metadata = {
  title: "Write Task 1 | Linguatude",
  description: "Practice IELTS Writing Task 1.",
  robots: { index: false, follow: false },
};

export default function WritingTask1WritePage() {
  return <WritingTask1Write />;
}
