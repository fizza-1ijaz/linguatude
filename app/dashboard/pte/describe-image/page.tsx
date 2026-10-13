import type { Metadata } from "next";
import { PteDescribeImage } from "@/app/components/dashboard/pte-describe-image";

export const metadata: Metadata = {
  title: "Describe Image | Linguatude",
  description: "PTE Describe Image practice.",
  robots: { index: false, follow: false },
};

export default function PteDescribeImagePage() {
  return <PteDescribeImage />;
}
