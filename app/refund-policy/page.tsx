import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { RefundPolicyPageContent } from "@/app/components/refund-policy-page-content";

export const metadata: Metadata = {
  title: "Payment, Subscription, Cancellation and Refund Policy | Linguatude",
  description:
    "Linguatude payment, subscription, cancellation and refund policy. Operated by Skyen Systems Pty Ltd. Effective 29 October 2026.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <RefundPolicyPageContent />
      </main>

      <SiteFooter />
    </div>
  );
}
