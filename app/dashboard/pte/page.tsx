import type { Metadata } from "next";
import { PtePracticeHub } from "@/app/components/dashboard/pte-practice-hub";

export const metadata: Metadata = {
  title: "PTE Practice Hub | Linguatude",
  description: "Master all 20 PTE Academic task types.",
  robots: { index: false, follow: false },
};

export default function PtePracticeHubPage() {
  return <PtePracticeHub />;
}
