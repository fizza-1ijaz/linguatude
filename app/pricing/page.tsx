import type { Metadata } from "next";
import { PricingPageContent } from "@/app/components/pricing-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Pricing | Linguatude",
  description:
    "Choose your exam and plan. Flexible Linguatude pricing for PTE and IELTS — start free, try Premium, or go Monthly or Yearly.",
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
