import type { Metadata } from "next";
import { SwitchExam } from "@/app/components/dashboard/switch-exam";

export const metadata: Metadata = {
  title: "Switch exam | Linguatude",
  description: "Choose a different exam type. Your progress is saved separately.",
  robots: { index: false, follow: false },
};

export default function SwitchExamPage() {
  return <SwitchExam />;
}
