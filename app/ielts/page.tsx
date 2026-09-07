import type { Metadata } from "next";
import { IeltsCtaBanner } from "@/app/components/ielts-cta-banner";
import { IeltsFeatures } from "@/app/components/ielts-features";
import { IeltsFeedback } from "@/app/components/ielts-feedback";
import { IeltsHero } from "@/app/components/ielts-hero";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "IELTS Academic | Linguatude",
  description:
    "IELTS Academic prep coached by AI. Band-scored speaking and writing with examiner-style feedback for university, AHPRA, and skilled visas.",
  alternates: { canonical: "/ielts" },
};

export default function IeltsPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <IeltsHero />
        <IeltsFeedback />
        <IeltsFeatures />
        <IeltsCtaBanner />
      </main>
    </div>
  );
}
