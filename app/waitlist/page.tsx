import type { Metadata } from "next";
import { Suspense } from "react";
import { WaitlistJoin } from "@/app/components/waitlist-join";

export const metadata: Metadata = {
  title: "Join the Waitlist | Linguatude",
  description:
    "Join the Linguatude waitlist for Cambridge and TOEFL preparation.",
  alternates: { canonical: "/waitlist" },
  robots: { index: false, follow: false },
};

export default function WaitlistPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#F5F7FF] text-sm text-[#64748B]">
          Loading…
        </div>
      }
    >
      <WaitlistJoin />
    </Suspense>
  );
}
