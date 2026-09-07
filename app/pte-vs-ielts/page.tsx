import type { Metadata } from "next";
import { ScoreGuidePageContent } from "@/app/components/score-guide-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "PTE vs IELTS Score Guide | Linguatude",
  description:
    "PTE vs IELTS score concordance for Australian migration. Compare Competent, Proficient and Superior English levels, DHA points, and how to pick your test.",
  alternates: { canonical: "/pte-vs-ielts" },
};

export default function ScoreGuidePage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <ScoreGuidePageContent />
      </main>
    </div>
  );
}
