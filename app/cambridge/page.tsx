import type { Metadata } from "next";
import { CambridgePageContent } from "@/app/components/cambridge-page-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Cambridge Exams Coming Soon | Linguatude",
  description:
    "Cambridge B2 First and C1 Advanced prep is coming in 2027. Join the Linguatude waitlist to be notified at launch.",
  alternates: { canonical: "/cambridge" },
};

export default function CambridgePage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <CambridgePageContent />
      </main>
    </div>
  );
}
