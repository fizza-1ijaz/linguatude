import type { Metadata } from "next";
import { ContactPageContent } from "@/app/components/contact-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Contact Us | Linguatude",
  description:
    "Get in touch with Linguatude. Ask a question, get product support, or talk partnerships — we typically reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <ContactPageContent />
      </main>
    </div>
  );
}
