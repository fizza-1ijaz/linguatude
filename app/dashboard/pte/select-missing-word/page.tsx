import type { Metadata } from "next";
import { PteSelectMissingWord } from "@/app/components/dashboard/pte-select-missing-word";

export const metadata: Metadata = {
  title: "Select Missing Word | Linguatude",
  description: "PTE Select Missing Word practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteSelectMissingWord />;
}
