import type { Metadata } from "next";
import { PteRetellLecture } from "@/app/components/dashboard/pte-retell-lecture";

export const metadata: Metadata = {
  title: "Re-tell Lecture | Linguatude",
  description: "PTE Re-tell Lecture practice.",
  robots: { index: false, follow: false },
};

export default function PteRetellLecturePage() {
  return <PteRetellLecture />;
}
