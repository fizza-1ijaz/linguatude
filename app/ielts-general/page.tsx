import type { Metadata } from "next";
import { IeltsGeneralCta } from "@/app/components/ielts-general-cta";
import { IeltsGeneralDifference } from "@/app/components/ielts-general-difference";
import { IeltsGeneralHero } from "@/app/components/ielts-general-hero";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "IELTS General Training | Linguatude",
  description:
    "IELTS General Training for life in Australia. Letters, everyday reading, and migration-ready bands for work visas.",
  alternates: { canonical: "/ielts-general" },
};

export default function IeltsGeneralPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <IeltsGeneralHero />
        <IeltsGeneralDifference />
        <IeltsGeneralCta />
      </main>
    </div>
  );
}
