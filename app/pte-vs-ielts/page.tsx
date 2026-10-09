import type { Metadata } from "next";
import { ScoreGuidePageContent } from "@/app/components/score-guide-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "PTE vs IELTS Score Guide | Linguatude",
  description:
    "Compare indicative PTE and IELTS scores and understand Australian English requirements, migration points, and how to choose the right exam.",
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
