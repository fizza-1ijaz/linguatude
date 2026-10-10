import type { Metadata } from "next";
import { MockWriting } from "@/app/components/dashboard/mock-writing";

export const metadata: Metadata = {
  title: "Mock Writing | Linguatude",
  description: "Writing section of the full mock test.",
  robots: { index: false, follow: false },
};

export default function MockWritingPage() {
  return <MockWriting />;
}
