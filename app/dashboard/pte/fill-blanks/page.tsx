import type { Metadata } from "next";
import { PteFillBlanks } from "@/app/components/dashboard/pte-fill-blanks";

export const metadata: Metadata = {
  title: "R&W Fill in the Blanks | Linguatude",
  description: "PTE Reading & Writing Fill in the Blanks practice.",
  robots: { index: false, follow: false },
};

export default function PteFillBlanksPage() {
  return <PteFillBlanks />;
}
