import type { Metadata } from "next";
import { NotFoundContent } from "@/app/components/not-found-content";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Page not found | Linguatude",
  description:
    "This page took the wrong exam. The link may be old or mistyped — head back home or explore PTE, IELTS, features, and more.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <NotFoundContent />
      </main>
    </div>
  );
}
