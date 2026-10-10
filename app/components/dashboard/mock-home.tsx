"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const HISTORY = [
  {
    date: "18 May 2026",
    overall: "7.0",
    overallTone: "green" as const,
    tagTone: "blue" as const,
    scores: [
      { k: "L", v: "7.5", tone: "blue" },
      { k: "R", v: "7.0", tone: "green" },
      { k: "W", v: "6.5", tone: "orange" },
      { k: "S", v: "7.0", tone: "green" },
    ],
  },
  {
    date: "11 May 2026",
    overall: "6.5",
    overallTone: "orange" as const,
    tagTone: "orange" as const,
    scores: [
      { k: "L", v: "6.5", tone: "orange" },
      { k: "R", v: "6.0", tone: "orange" },
      { k: "W", v: "6.5", tone: "orange" },
      { k: "S", v: "7.0", tone: "green" },
    ],
  },
  {
    date: "4 May 2026",
    overall: "6.0",
    overallTone: "orange" as const,
    tagTone: "orange" as const,
    scores: [
      { k: "L", v: "6.0", tone: "orange" },
      { k: "R", v: "6.0", tone: "orange" },
      { k: "W", v: "5.5", tone: "red" },
      { k: "S", v: "6.5", tone: "orange" },
    ],
  },
  {
    date: "20 Apr 2026",
    overall: "7.5",
    overallTone: "green" as const,
    tagTone: "blue" as const,
    scores: [
      { k: "L", v: "8.0", tone: "blue" },
      { k: "R", v: "7.5", tone: "green" },
      { k: "W", v: "7.0", tone: "green" },
      { k: "S", v: "7.5", tone: "green" },
    ],
  },
  {
    date: "13 Apr 2026",
    overall: "5.5",
    overallTone: "red" as const,
    tagTone: "orange" as const,
    scores: [
      { k: "L", v: "5.5", tone: "red" },
      { k: "R", v: "5.0", tone: "red" },
      { k: "W", v: "5.5", tone: "red" },
      { k: "S", v: "6.0", tone: "orange" },
    ],
  },
] as const;

const TONE = {
  green: { text: "text-[#16A34A]", ring: "border-[#16A34A]", bg: "bg-[#DCFCE7]" },
  orange: { text: "text-[#EA580C]", ring: "border-[#EA580C]", bg: "bg-[#FFEDD5]" },
  red: { text: "text-[#DC2626]", ring: "border-[#DC2626]", bg: "bg-[#FEE2E2]" },
  blue: { text: "text-[#2563EB]", ring: "border-[#2563EB]", bg: "bg-[#DBEAFE]" },
} as const;

export function MockHome() {
  return (
    <DashboardShell
      title="Mock Tests"
      subtitle="Practice with timed full exams and track your history."
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl space-y-5 pb-10">
        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex flex-col gap-5">
            <section className="overflow-hidden rounded-2xl border border-[#FDBA74] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.14)] ui-fade-up-delay-1">
              <div className="h-1.5 bg-[#F97316]" />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#F97316] text-white">
                    <BoltIcon />
                  </span>
                  <h2 className="text-lg font-bold text-[#141B2B]">Full Mock Tests</h2>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["30 minutes", "All 4 skills", "Free (1 per month)"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#FFEDD5] px-3 py-1 text-xs font-semibold text-[#EA580C]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[#64748B]">
                  Test your skills with a complete mock experience. Available with Premium
                </p>
                <Link
                  href="/dashboard/premium"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
                >
                  Upgrade to Premium
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.14)] ui-fade-up-delay-2">
              <div className="h-1.5 bg-[#2b5ce6]" />
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
                      <ShieldCheckIcon />
                    </span>
                    <h2 className="text-lg font-bold text-[#141B2B]">Full Mock Test</h2>
                  </div>
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]">
                    <LockIcon />
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["30 minutes", "Full exam format", "Premium"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  Full-length simulation matching real exam timing exactly.
                  <br />
                  The most accurate band estimate available on the platform.
                </p>
                <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#F1F5F9] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                  <p className="inline-flex items-center gap-2 text-sm text-[#64748B]">
                    <LockIcon />
                    Full Mock Tests are available with a Premium subscription.
                  </p>
                  <Link
                    href="/dashboard/mock/full"
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-[#BFDBFE] bg-white px-4 text-sm font-bold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
                  >
                    Start Full Mock
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <section className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-6 ui-fade-up-delay-3">
            <h2 className="text-base font-bold text-[#141B2B]">Your mock test history</h2>
            <ul className="mt-4 flex flex-1 flex-col justify-between gap-2.5">
              {HISTORY.map((row) => {
                const overall = TONE[row.overallTone];
                const tag =
                  row.tagTone === "blue"
                    ? "bg-[#DBEAFE] text-[#2563EB]"
                    : "bg-[#FFEDD5] text-[#EA580C]";
                return (
                  <li key={row.date}>
                    <Link
                      href="/dashboard/mock/full"
                      className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 transition hover:border-[#BFDBFE] sm:gap-3.5 sm:px-3.5"
                    >
                      <div className="min-w-[5.5rem] shrink-0">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold ${tag}`}
                        >
                          Full Mock
                        </span>
                        <p className="mt-1 text-xs text-[#94A3B8]">{row.date}</p>
                      </div>
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${overall.ring} ${overall.text}`}
                      >
                        {row.overall}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 gap-y-1">
                        {row.scores.map((s) => {
                          const t = TONE[s.tone as keyof typeof TONE];
                          return (
                            <span
                              key={s.k}
                              className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${t.bg} ${t.text}`}
                            >
                              {s.k} {s.v}
                            </span>
                          );
                        })}
                      </div>
                      <span className="shrink-0 text-[#CBD5E1]" aria-hidden>
                        ›
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/mock/full"
                className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
              >
                View all results →
              </Link>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D1FAE5] bg-[#F4FAF6] px-4 py-4 sm:px-5 ui-fade-up">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D1FAE5] text-[#166534]">
              <CalendarCheckIcon />
            </span>
            <div>
              <p className="text-sm font-bold text-[#1A4D32]">Ready for your next mock?</p>
              <p className="text-sm text-[#5C7C67]">Your last mock was on 18 May 2026.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#D1FAE5] bg-white px-3.5 py-2.5">
            <CalendarTiny className="text-[#166534]" />
            <div>
              <p className="text-[0.6875rem] font-medium text-[#5C7C67]">
                Your next recommended mock:
              </p>
              <p className="text-sm font-bold text-[#1A4D32]">25 May 2026</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M9.2 1.5 3.5 9h4l-.7 5.5L13 7H9l.2-5.5Z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.2 13 4.2v3.5c0 2.8-1.9 4.9-5 5.6-3.1-.7-5-2.8-5-5.6V4.2L8 2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m5.8 7.8 1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m8 12 1.4 1.4L12.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarTiny({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`size-3.5 ${className ?? ""}`} fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 5.5h10M5 1.5v2M9 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
