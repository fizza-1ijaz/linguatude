import type { Metadata } from "next";
import { PteReadingFib } from "@/app/components/dashboard/pte-reading-fib";

export const metadata: Metadata = {
  title: "Reading Fill in the Blanks | Linguatude",
  description: "PTE Reading Fill in the Blanks practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteReadingFib />;
}
