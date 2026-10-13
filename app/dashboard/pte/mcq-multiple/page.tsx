import type { Metadata } from "next";
import { PteMcqMultiple } from "@/app/components/dashboard/pte-mcq-multiple";

export const metadata: Metadata = {
  title: "MCQ Multiple · Reading | Linguatude",
  description: "PTE MCQ Multiple · Reading practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteMcqMultiple />;
}
