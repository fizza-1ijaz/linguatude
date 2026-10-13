import type { Metadata } from "next";
import { PteMcqSingle } from "@/app/components/dashboard/pte-mcq-single";

export const metadata: Metadata = {
  title: "MCQ Single · Reading | Linguatude",
  description: "PTE MCQ Single · Reading practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteMcqSingle />;
}
