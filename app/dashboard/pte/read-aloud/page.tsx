import type { Metadata } from "next";
import { PteReadAloud } from "@/app/components/dashboard/pte-read-aloud";

export const metadata: Metadata = {
  title: "Read Aloud | Linguatude",
  description: "PTE Read Aloud practice.",
  robots: { index: false, follow: false },
};

export default function PteReadAloudPage() {
  return <PteReadAloud />;
}
