import type { Metadata } from "next";
import { PteEssay } from "@/app/components/dashboard/pte-essay";

export const metadata: Metadata = {
  title: "Essay | Linguatude",
  description: "PTE Essay practice.",
  robots: { index: false, follow: false },
};

export default function PteEssayPage() {
  return <PteEssay />;
}
