import type { Metadata } from "next";
import { WritingTask1 } from "@/app/components/dashboard/writing-task1";

export const metadata: Metadata = {
  title: "Writing Task 1 | Linguatude",
  description: "Configure and start IELTS Writing Task 1 practice.",
  robots: { index: false, follow: false },
};

export default function WritingTask1Page() {
  return <WritingTask1 />;
}
