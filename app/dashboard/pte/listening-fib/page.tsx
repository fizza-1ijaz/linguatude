import type { Metadata } from "next";
import { PteListeningFib } from "@/app/components/dashboard/pte-listening-fib";

export const metadata: Metadata = {
  title: "Listening Fill in the Blanks | Linguatude",
  description: "PTE Listening Fill in the Blanks practice.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PteListeningFib />;
}
