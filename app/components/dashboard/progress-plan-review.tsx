"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  BackToProgress,
  ProgressHeaderRight,
  PteBadge,
} from "@/app/components/dashboard/progress-shared";

const WEEK_ROWS = [
  {
    when: "Mon–Tue",
    days: "2 days",
    tone: "purple" as const,
    task: "Essay x2",
    detail: "Write two timed essays and review feedback.",
    tag: "2 tasks",
  },
  {
    when: "Wed",
    days: "1 day",
    tone: "green" as const,
    task: "SWT drills",
    detail: "Short Writing Task practice drills.",
    tag: "Drills",
  },
  {
    when: "Thu–Fri",
    days: "2 days",
    tone: "blue" as const,
    task: "Repeat Sentence",
    detail: "Focus on accuracy and fluency.",
    tag: "Drills",
  },
  {
    when: "Sat",
    days: "1 day",
    tone: "orange" as const,
    task: "Quick Mock",
    detail: "Full-length practice test.",
    tag: "Mock",
  },
] as const;

const TONE = {
  purple: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#7C3AED]",
    pill: "bg-[#F3E8FF] text-[#7C3AED]",
  },
  green: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#16A34A]",
    pill: "text-[#16A34A]",
  },
  blue: {
    bg: "bg-[#DBEAFE]",
    text: "text-[#2563EB]",
    pill: "text-[#2563EB]",
  },
  orange: {
    bg: "bg-[#FFEDD5]",
    text: "text-[#EA580C]",
    pill: "text-[#EA580C]",
  },
} as const;

export function ProgressPlanReview() {
  return (
    <DashboardShell
      title="Plan Review — Wk 3/8"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToProgress />}
      headerRight={
        <div className="flex items-center gap-2.5">
          <ProgressHeaderRight />
          <PteBadge className="hidden sm:inline-flex" />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#EEF2FF] px-4 py-4 shadow-sm sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
              <CheckIcon />
            </span>
            <div>
              <p className="font-bold text-[#141B2B]">On track for 8 Sep</p>
              <p className="text-sm text-[#64748B]">
                You&apos;re making good progress towards your target.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2">
            <CalIcon className="text-[#2b5ce6]" />
            <div>
              <p className="text-[0.625rem] font-bold uppercase tracking-wide text-[#94A3B8]">
                Target Date
              </p>
              <p className="text-sm font-bold text-[#141B2B]">8 Sep 2026</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#141B2B]">This week&apos;s plan</h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Tasks are scheduled based on your goals and current progress.
              </p>
            </div>
            <Link
              href="/dashboard/progress/plan/edit"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#2b5ce6] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
            >
              <PencilIcon />
              Edit plan
            </Link>
          </div>

          <div className="mt-5 divide-y divide-[#E2E8F0] border-t border-[#E2E8F0]">
            {WEEK_ROWS.map((row) => {
              const tone = TONE[row.tone];
              return (
                <div
                  key={row.when}
                  className="flex flex-wrap items-center gap-3 py-4 sm:flex-nowrap sm:gap-4"
                >
                  <div className="flex w-full items-center gap-2.5 sm:w-36">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}
                    >
                      <CalIcon />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#141B2B]">{row.when}</p>
                      <p className="text-xs text-[#94A3B8]">{row.days}</p>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}
                    >
                      <TaskIcon tone={row.tone} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#141B2B]">{row.task}</p>
                      <p className="text-xs text-[#64748B]">{row.detail}</p>
                    </div>
                  </div>
                  <span
                    className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                      row.tone === "purple" ? tone.pill : tone.pill
                    }`}
                  >
                    {row.tag}
                  </span>
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ›
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <p className="inline-flex items-center justify-center gap-1.5 text-center text-xs text-[#94A3B8]">
          <LockTiny />
          Your plan updates automatically based on meaningful progress.
        </p>
      </div>
    </DashboardShell>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-4" fill="none" aria-hidden>
      <path d="M3 7.2 5.8 10 11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 ${className}`} fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7h11M5.5 2.5v2M10.5 2.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="m9 2.5 2.5 2.5L5 11.5H2.5V9L9 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function TaskIcon({ tone }: { tone: keyof typeof TONE }) {
  if (tone === "green") {
    return (
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <path d="M4 5h3v3H4V5Zm5 0h3v3H9V5ZM4 10h3v3H4v-3Zm5 1.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "blue") {
    return (
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <rect x="5.5" y="2.5" width="5" height="7" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "orange") {
    return (
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 2.5h5L12 5.5V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function LockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
