"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const RESULTS = [
  { n: 1, ok: true },
  { n: 2, ok: true },
  { n: 3, ok: true },
  { n: 4, ok: true },
  { n: 5, ok: false },
] as const;

export function LessonExitComplete() {
  return (
    <DashboardShell
      title="Lesson Complete"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-6"
      headerLeft={
        <Link
          href="/dashboard/skills/essay-development/exit-assessment"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="text-right">
          <p className="text-xs font-medium text-[#94A3B8]">Auto-submitted</p>
          <p className="text-xl font-bold tabular-nums text-[#2b5ce6]">00:00</p>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center pb-8">
        <div className="rounded-3xl border border-[#E2E8F0] bg-white px-8 py-8 text-center shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)] sm:px-10 sm:py-10 ui-fade-up">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#DCFCE7] ui-soft-pulse">
            <CheckBig />
          </div>
          <p className="mt-5 text-sm font-medium text-[#64748B]">Exit Assessment</p>

          <div className="my-6 border-t border-[#E2E8F0]" />

          <p className="text-sm text-[#64748B]">Your Score</p>
          <p className="mt-1 text-4xl font-bold tabular-nums">
            <span className="text-[#16A34A]">4</span>
            <span className="text-[#141B2B]"> / 5</span>
          </p>
          <p className="mt-1 text-lg font-bold text-[#16A34A]">80%</p>
          <p className="mt-2 text-sm font-bold text-[#16A34A]">Assessment complete</p>

          <div className="my-6 border-t border-[#E2E8F0]" />

          <p className="text-sm font-semibold text-[#475569]">Answer Summary</p>
          <div className="mt-3 flex justify-center gap-2">
            {RESULTS.map((r) => (
              <div
                key={r.n}
                className="flex size-12 flex-col items-center justify-center gap-1 rounded-xl border border-[#E2E8F0] bg-white"
              >
                <span className="text-xs font-bold text-[#141B2B]">{r.n}</span>
                <span
                  className={`flex size-4 items-center justify-center rounded-full text-white ${
                    r.ok ? "bg-[#22C55E]" : "bg-[#EF4444]"
                  }`}
                >
                  {r.ok ? <CheckMini /> : <XMini />}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/skills/progress-updated"
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            Continue
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M10 3.5 5.5 8 10 12.5" stroke="#141b2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckBig() {
  return (
    <svg viewBox="0 0 28 28" className="size-8 text-[#15803D]" fill="none" aria-hidden>
      <path d="M7 14.5 12 19.5 21 9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path d="M2 5.2 4 7l4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path d="M2.5 2.5 7.5 7.5M7.5 2.5 2.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
