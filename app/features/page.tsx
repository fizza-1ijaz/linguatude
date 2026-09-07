import type { Metadata } from "next";
import { FeaturesPageContent } from "@/app/components/features-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Features | Linguatude",
  description:
    "Powerful AI features for PTE and IELTS prep — speaking scores, writing feedback, mock tests, adaptive plans, and more. One subscription.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <FeaturesPageContent />
      </main>
    </div>
  );
}
