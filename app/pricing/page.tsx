import type { Metadata } from "next";
import { PricingPageContent } from "@/app/components/pricing-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Pricing | Linguatude",
  description:
    "Simple Linguatude pricing with both PTE and IELTS included. Start free, or choose Monthly or Annual plans.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <PricingPageContent />
      </main>
    </div>
  );
}
