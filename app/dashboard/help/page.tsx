import type { Metadata } from "next";
import { HelpCenter } from "@/app/components/dashboard/help-center";

export const metadata: Metadata = {
  title: "Help Center | Linguatude",
  description: "Meet Ayra, your Linguatude AI language and support guide.",
  robots: { index: false, follow: false },
};

export default function HelpCenterPage() {
  return <HelpCenter />;
}
