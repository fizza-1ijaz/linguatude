"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const SECTIONS = [
  {
    id: "listening",
    title: "Listening",
    accent: "border-l-[#16A34A]",
    done: true,
    status: "Complete",
    statusColor: "text-[#16A34A]",
    detail: "Your Listening section has been evaluated.",
  },
  {
    id: "reading",
    title: "Reading",
    accent: "border-l-[#16A34A]",
    done: true,
    status: "Complete",
    statusColor: "text-[#16A34A]",
    detail: "Your Reading section has been evaluated.",
  },
  {
    id: "writing",
    title: "Writing",
    accent: "border-l-[#2b5ce6]",
    done: false,
    status: "Evaluating Writing...",
    statusColor: "text-[#2b5ce6]",
    detail: "AI is evaluating your Writing responses. This usually takes 15-60 seconds.",
  },
  {
    id: "speaking",
    title: "Speaking",
    accent: "border-l-[#2b5ce6]",
    done: false,
    status: "Evaluating Speaking...",
    statusColor: "text-[#2b5ce6]",
    detail:
      "AI is evaluating your Speaking responses. This usually takes 10-30 seconds per question.",
  },
] as const;

export function MockResultsLoading() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <DashboardShell
      title="Results Loading"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-6 sm:px-[1cm] lg:px-[1cm]"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 pb-8">
        {SECTIONS.map((s) => (
          <div
            key={s.id}
            className={`flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] border-l-4 bg-white px-4 py-4 shadow-sm sm:px-5 ${s.accent}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-9 items-center justify-center rounded-full ${
                  s.done || ready ? "bg-[#16A34A] text-white" : "bg-[#2b5ce6] text-white"
                }`}
              >
                {s.done || ready ? <CheckIcon /> : <SpinnerIcon />}
              </span>
              <div>
                <p className="text-sm font-bold text-[#141B2B]">{s.title}</p>
                <p className={`mt-0.5 text-xs font-semibold ${s.done || ready ? "text-[#16A34A]" : s.statusColor}`}>
                  {s.done || ready ? "Complete" : s.status}
                </p>
              </div>
            </div>
            <p className="max-w-[16rem] text-right text-xs leading-5 text-[#64748B] sm:text-sm">
              {s.done || ready
                ? `Your ${s.title} section has been evaluated.`
                : s.detail}
            </p>
          </div>
        ))}

        <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full border border-[#FDBA74] bg-[#FFF7ED] px-4 py-2 text-sm font-semibold text-[#EA580C]">
          <ClockTiny />
          Usually ready in 1-2 minutes
        </div>

        <div className="mt-4 rounded-2xl border border-[#BFDBFE] bg-[#F5F8FF] p-5 shadow-sm sm:p-6">
          <div className="relative grid gap-6 sm:grid-cols-2 sm:gap-0">
            <div className="flex flex-col items-center text-center sm:px-6">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#15803D]">
                <StarTiny />
                When all sections are complete
              </p>
              <Link
                href="/dashboard/mock/results"
                className={`mt-4 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition ${
                  ready
                    ? "bg-[#15803D] hover:bg-[#166534]"
                    : "pointer-events-none bg-[#86EFAC]/80"
                }`}
              >
                <ChartTiny />
                See Your Results
              </Link>
              <p className="mt-2 text-xs italic text-[#94A3B8]">
                This button will appear when your results are ready.
              </p>
            </div>

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
              aria-hidden
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-xs font-medium text-[#94A3B8] shadow-sm">
                or
              </span>
            </div>

            <div className="flex flex-col items-center border-t border-[#E2E8F0] pt-6 text-center sm:border-l sm:border-t-0 sm:px-6 sm:pt-0">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8]">
                <ClockTiny className="text-[#2b5ce6]" />
                Taking longer than expected?
              </p>
              <Link
                href="/dashboard"
                className="mt-4 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl border border-[#2b5ce6] bg-white text-sm font-semibold text-[#1D4ED8] transition hover:bg-[#EFF6FF]"
              >
                <HomeTiny />
                Go to Home we&apos;ll notify you when ready
              </Link>
              <p className="mt-2 text-xs text-[#94A3B8]">
                You&apos;ll get a notification when your results are ready.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-[#EFF6FF] px-4 py-3.5">
          <ClockTiny className="mt-0.5 text-[#2b5ce6]" />
          <div>
            <p className="text-sm font-bold text-[#1E40AF]">
              You can safely leave this page. We&apos;ll continue processing your results
              in the background.
            </p>
            <p className="mt-0.5 text-sm text-[#3B82F6]">
              You&apos;ll receive a notification when everything is ready.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 6.2 5 8.5 9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 animate-spin" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockTiny({ className = "text-[#EA580C]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`size-3.5 shrink-0 ${className}`} fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function StarTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-[#16A34A]" fill="currentColor" aria-hidden>
      <path d="m7 1.8 1.4 2.8 3.1.5-2.25 2.2.5 3.1L7 8.9l-2.75 1.5.5-3.1L2.5 5.1l3.1-.5L7 1.8Z" />
    </svg>
  );
}

function ChartTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <rect x="2" y="7" width="2.5" height="5" rx="0.5" />
      <rect x="5.75" y="4" width="2.5" height="8" rx="0.5" />
      <rect x="9.5" y="2" width="2.5" height="10" rx="0.5" />
    </svg>
  );
}

function HomeTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 6.5 7 2.5l4.5 4V12H9V8.5H5V12H2.5V6.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
