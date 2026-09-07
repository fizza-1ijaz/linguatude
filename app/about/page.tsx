import type { Metadata } from "next";
import { AboutPageContent } from "@/app/components/about-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "About | Linguatude",
  description:
    "Why we built Linguatude — honest AI feedback and Australia-focused prep for PTE and IELTS, without unnecessary stress.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <AboutPageContent />
      </main>
    </div>
  );
}
