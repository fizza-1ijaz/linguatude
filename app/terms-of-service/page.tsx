import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/site-header";
import { TermsPageContent } from "@/app/components/terms-page-content";

export const metadata: Metadata = {
  title: "Terms of Service | Linguatude",
  description:
    "Linguatude Terms of Service. AI practice scores are estimates — not official Pearson or IELTS results. Last updated 23 Jul 2026.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <TermsPageContent />
      </main>
    </div>
  );
}
