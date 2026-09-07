import type { Metadata } from "next";
import { HomeTestimonials } from "@/app/components/home-testimonials";
import { PteCtaBanner } from "@/app/components/pte-cta-banner";
import { PteHero } from "@/app/components/pte-hero";
import { PteModules } from "@/app/components/pte-modules";
import { PteScoreGoals } from "@/app/components/pte-score-goals";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "PTE Academic for Australia | Linguatude",
  description:
    "PTE Academic prep built for Australia. DHA component targets, AU-accent audio, and AI scoring for migration, study, and work goals.",
  alternates: { canonical: "/pte" },
};

export default function PtePage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <PteHero />
        <PteScoreGoals />
        <PteModules />
        <HomeTestimonials heading="Loved by PTE Australia test takers" />
        <PteCtaBanner />
      </main>
    </div>
  );
}
