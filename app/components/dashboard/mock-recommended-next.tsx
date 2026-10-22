"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function MockRecommendedNext() {
  const [showCloseTip, setShowCloseTip] = useState(false);

  return (
    <DashboardShell
      title={<span className="sr-only">Recommended next step</span>}
      hideHeader
      contentBgClassName="bg-white"
      mainClassName="relative flex flex-1 flex-col px-4 sm:px-6 lg:px-[1cm] py-6"
    >
      <div className="absolute right-[1cm] top-4 z-10 sm:top-6">
        <div className="relative">
          <Link
            href="/dashboard/mock/results"
            className="inline-flex size-9 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#64748B]"
            aria-label="Close"
            onMouseEnter={() => setShowCloseTip(true)}
            onMouseLeave={() => setShowCloseTip(false)}
          >
            <CloseIcon />
          </Link>
          {showCloseTip ? (
            <span className="absolute right-0 top-full mt-1 rounded bg-[#141B2B] px-2 py-1 text-[0.625rem] font-bold tracking-wide text-white">
              CLOSE
            </span>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center pb-10 pt-8 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#2b5ce6] text-sm font-bold text-white">
          6
        </span>
        <h1 className="mt-4 text-2xl font-bold text-[#141B2B] sm:text-3xl">
          Recommended next step
        </h1>
        <p className="mt-4 max-w-md text-base text-[#64748B]">
          Based on these results, focus on{" "}
          <span className="font-bold text-[#EA580C]">Writing</span>.
        </p>
        <Link
          href="/dashboard/skills"
          className="mt-8 inline-flex h-12 w-full max-w-sm items-center justify-center gap-1 rounded-xl bg-[#2b5ce6] text-base font-semibold text-white transition hover:bg-[#244FE6]"
        >
          Start Practising ›
        </Link>
      </div>
    </DashboardShell>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
