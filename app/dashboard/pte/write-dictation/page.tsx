import type { Metadata } from "next";
import { PteWriteDictation } from "@/app/components/dashboard/pte-write-dictation";

export const metadata: Metadata = {
  title: "Write from Dictation | Linguatude",
  description: "PTE Write from Dictation practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteWriteDictation />;
}
