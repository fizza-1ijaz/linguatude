import type { Metadata } from "next";
import { Suspense } from "react";
import { WaitlistSuccess } from "@/app/components/waitlist-success";

export const metadata: Metadata = {
  title: "You're on the list | Linguatude",
  description: "Your waitlist interest has been recorded successfully.",
  alternates: { canonical: "/waitlist/success" },
  robots: { index: false, follow: false },
};

export default function WaitlistSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#F5F7FF] text-sm text-[#64748B]">
          Loading…
        </div>
      }
    >
      <WaitlistSuccess />
    </Suspense>
  );
}
