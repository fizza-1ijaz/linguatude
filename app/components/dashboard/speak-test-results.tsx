"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CRITERIA = [
  { label: "Fluency and Coherence", value: 6.5 },
  { label: "Lexical Resource", value: 7.0 },
  { label: "Grammatical Range and Accuracy", value: 6.0 },
  { label: "Pronunciation", value: 6.5 },
] as const;

const PARTS = [
  { title: "Part 1: Introduction", band: "8.5", value: 8.5 },
  { title: "Part 2: Long Turn", band: "7.0", value: 7.0 },
  { title: "Part 3: Discussion", band: "6.0", value: 6.0 },
] as const;

export function SpeakTestResults() {
  return (
    <DashboardShell
      title="Test Results"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 pb-8">
        {/* Summary */}
        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] border-l-[4px] border-l-[#2b5ce6] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col items-center lg:shrink-0">
              <div className="relative flex size-[8.5rem] items-center justify-center sm:size-[9.5rem]">
                <svg
                  viewBox="0 0 120 120"
                  className="absolute inset-0 size-full"
                  aria-hidden
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#DBEAFE"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#2b5ce6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${0.78 * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="relative text-center">
                  <p className="text-[0.625rem] font-bold tracking-wide text-[#2b5ce6]">
                    OVERALL
                  </p>
                  <p className="text-3xl font-bold tabular-nums text-[#2b5ce6] sm:text-4xl">
                    7.0
                  </p>
                  <p className="text-[0.625rem] font-bold tracking-wide text-[#2b5ce6]">
                    BAND
                  </p>
                </div>
              </div>
              <span className="mt-2 rounded-full bg-[#DBEAFE] px-3 py-1 text-[0.6875rem] font-bold tracking-wide text-[#1E40AF]">
                ESTIMATED
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-[#141B2B] sm:text-xl">
                IELTS Academic Speaking Simulation
              </h2>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#64748B]">
                <CalendarIcon />
                August 24, 2026
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Part 1 Completed", "Part 2 Completed", "Part 3 Completed"].map(
                  (label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#86EFAC] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]"
                    >
                      <CheckSmallIcon />
                      {label}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#F1F5F9] px-3.5 py-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                  i
                </span>
                <p className="text-sm leading-6 text-[#475569]">
                  This is an AI-estimated score for self-assessment only. Not an
                  official IELTS result.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Criterion Scores */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
          <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
            Criterion Scores
          </h2>
          <div className="mt-5 space-y-4">
            {CRITERIA.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#334155]">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold tabular-nums text-[#141B2B]">
                    {item.value.toFixed(1)}
                  </p>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#E8EEF7]">
                  <div
                    className="h-full rounded-full bg-[#2b5ce6]"
                    style={{ width: `${(item.value / 9) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How you spoke + Strength / Focus */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
            <h2 className="text-[0.6875rem] font-bold tracking-wide text-[#94A3B8]">
              HOW YOU SPOKE
            </h2>
            <div className="mt-4 space-y-4">
              <SpokeRow
                icon={<SpeedIcon />}
                label="Average Pace"
                value="142 wpm"
              />
              <SpokeRow
                icon={<FillerIcon />}
                label="Filler Words"
                value="14 instances"
              />
              <SpokeRow
                icon={<TimerIcon />}
                label="Total Duration"
                value="12:45 min"
              />
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-2xl border border-[#BFDBFE]/80 bg-[#EFF6FF] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
                  <TrendUpIcon />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-wide text-[#2b5ce6]">
                    YOUR STRENGTH
                  </p>
                  <p className="mt-1 text-base font-bold text-[#141B2B]">
                    Lexical Resource
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#475569]">
                    Strong use of idiomatic expressions in Part 2.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#FED7AA]/80 bg-[#FFF7ED] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C]">
                  <AlertIcon />
                </span>
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-wide text-[#EA580C]">
                    PRIORITY FOCUS
                  </p>
                  <p className="mt-1 text-base font-bold text-[#141B2B]">
                    Grammatical Accuracy
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#475569]">
                    Frequent article omission errors across all parts.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Part breakdown + actions */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Part Breakdown</h2>
            <div className="mt-4 space-y-3">
              {PARTS.map((part) => (
                <div
                  key={part.title}
                  className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] px-3.5 py-3.5"
                >
                  <div className="h-2.5 w-16 shrink-0 overflow-hidden rounded-full bg-[#E8EEF7] sm:w-20">
                    <div
                      className="h-full rounded-full bg-[#2b5ce6]"
                      style={{ width: `${(part.value / 9) * 100}%` }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#141B2B]">
                      {part.title}
                    </p>
                    <p className="mt-0.5 text-sm italic text-[#94A3B8]">
                      Average band: {part.band}
                    </p>
                  </div>
                  <Link
                    href="/dashboard/speak/feedback"
                    className="shrink-0 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
                  >
                    View detail →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
              <p className="text-sm font-medium text-[#475569]">
                Academic Speaking Simulation
              </p>
              <p className="mt-1 text-base font-bold text-[#141B2B]">
                October 24, 2023
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Part 1", "Part 2", "Part 3"].map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-full border border-[#BFDBFE] bg-white px-2.5 py-1 text-xs font-semibold text-[#64748B]"
                  >
                    <CheckSmallIcon />
                    {p}
                  </span>
                ))}
              </div>
            </section>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/speak/exam"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
              >
                Try Again
              </Link>
              <Link
                href="/dashboard/speak/setup"
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
              >
                <PlaySmallIcon />
                Practice This Skill
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function SpokeRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2b5ce6]">
        {icon}
      </span>
      <p className="min-w-0 flex-1 text-sm text-[#64748B]">{label}</p>
      <p className="shrink-0 text-base font-bold text-[#141B2B]">{value}</p>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect
        x="3"
        y="4.5"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 8h14M7 3v3M13 3v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6-6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 10l3.2-2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FillerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v4A2.5 2.5 0 0 1 13.5 12H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 9.5v-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 8v3.2l2 1.3M8 3.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 13.5 8 9l3 3 5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 6.5H16.5V10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 17 16H3L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.5v3.5M10 14.2v.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlaySmallIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <path d="M3.5 2v8l7-4-7-4Z" />
    </svg>
  );
}
