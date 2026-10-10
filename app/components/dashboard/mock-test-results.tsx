"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const SKILLS = [
  {
    title: "Listening",
    score: "8.0",
    tone: "green" as const,
    detail: "32 / 40 correct",
    meta: "40 questions",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
  },
  {
    title: "Reading",
    score: "7.0",
    tone: "green" as const,
    detail: "32 / 40 correct",
    meta: "40 questions",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    title: "Writing",
    score: "6.5",
    tone: "orange" as const,
    detail: "Task 1: 6.5 | Task 2: 6.5",
    meta: "2 tasks",
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
  },
  {
    title: "Speaking",
    score: "7.0",
    tone: "green" as const,
    detail: "Completed",
    meta: "3 parts",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
  },
] as const;

const HISTORY = [
  { label: "2 Weeks Ago (10 Aug 2026)", scores: [7.5, 6.5, 6.0, 6.5], trends: ["up", "up", "same", "up"], current: false },
  { label: "1 Week Ago (17 Aug 2026)", scores: [7.5, 6.5, 6.5, 7.0], trends: ["up", "up", "up", "up"], current: false },
  { label: "This Mock (24 Aug 2026)", scores: [8.0, 7.0, 6.5, 7.0], trends: ["up", "up", "same", "up"], current: true },
] as const;

const BAR_COLORS = ["#2563EB", "#16A34A", "#F97316", "#7C3AED"] as const;

export function MockTestResults() {
  return (
    <DashboardShell
      title="Test Results"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex flex-1 flex-col px-4 py-5 sm:px-6"
      headerRight={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#334155]"
          >
            <ShareIcon />
            Share results
          </button>
          <button
            type="button"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#334155] sm:inline-flex"
          >
            <DownloadIcon />
            Download Report
          </button>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        {/* Overall */}
        <section className="grid gap-0 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="border-b border-[#E2E8F0] p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                1
              </span>
              Overall Result
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <div className="relative flex size-28 items-center justify-center">
                <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(7.5 / 9) * 2 * Math.PI * 50} ${2 * Math.PI * 50}`}
                  />
                </svg>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#141B2B]">7.5</p>
                  <p className="text-xs font-semibold text-[#16A34A]">Estimated</p>
                </div>
              </div>
              <div>
                <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#2563EB]">
                  Full Mock
                </span>
                <p className="mt-2 text-xs text-[#94A3B8]">Test Date</p>
                <p className="text-sm font-semibold text-[#141B2B]">
                  24 Aug 2026 • 10:30 AM
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3 py-2.5 text-xs leading-5 text-[#1E40AF]">
                <ClockTiny className="mt-0.5 text-[#2b5ce6]" />
                This is an AI-estimated score for self-assessment only. Not an official IELTS result.
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-[#FFF7ED] px-3 py-2.5 text-xs leading-5 text-[#9A3412]">
                <WarnTiny />
                Quick Mock scores are approximate. Full Mock gives a more accurate estimate.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5 sm:p-6">
            {SKILLS.map((s) => (
              <div
                key={s.title}
                className="flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] px-3 py-4 text-center"
              >
                <p className="text-sm font-semibold text-[#141B2B]">{s.title}</p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    s.tone === "green" ? "text-[#16A34A]" : "text-[#EA580C]"
                  }`}
                >
                  {s.score}
                </p>
                <p className="mt-0.5 text-[0.6875rem] text-[#94A3B8]">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Progress + section results */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                2
              </span>
              Your Progress (Band History)
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
              {["Listening", "Reading", "Writing", "Speaking"].map((l, i) => (
                <span key={l} className="inline-flex items-center gap-1.5 text-[#64748B]">
                  <span className="size-2.5 rounded-sm" style={{ background: BAR_COLORS[i] }} />
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              {HISTORY.map((h) => (
                <div key={h.label} className="flex items-end gap-3">
                  <div className="w-28 shrink-0 text-[0.625rem] leading-4 text-[#94A3B8] sm:w-36">
                    <span className={h.current ? "font-semibold text-[#2b5ce6]" : ""}>
                      {h.label}
                    </span>
                  </div>
                  <div className="flex flex-1 items-end gap-1.5">
                    {h.scores.map((score, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[0.625rem] font-bold text-[#64748B]">
                          {score.toFixed(1)}
                        </span>
                        <span
                          className="w-full max-w-[1.75rem] rounded-t-sm"
                          style={{
                            height: `${((score - 4) / 5) * 64 + 16}px`,
                            background: BAR_COLORS[i],
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="hidden w-20 shrink-0 flex-col gap-1 sm:flex">
                    {h.trends.slice(0, 1).map((t, i) => (
                      <span
                        key={i}
                        className={`inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-bold ${
                          t === "up"
                            ? "bg-[#DCFCE7] text-[#16A34A]"
                            : "bg-[#FFEDD5] text-[#EA580C]"
                        }`}
                      >
                        {t === "up" ? "↑ Improved" : "→ Same"}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EFF6FF] px-3 py-2.5 text-xs font-medium text-[#1E40AF]">
              <InfoTiny />
              Keep it up! You&apos;re making steady progress.
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                3
              </span>
              Section results
            </p>
            <ul className="mt-4 space-y-2.5">
              {SKILLS.map((s) => (
                <li key={s.title}>
                  <Link
                    href="/dashboard/mock/results"
                    className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] px-3 py-3 transition hover:border-[#BFDBFE]"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${s.iconBg} ${s.iconColor}`}
                    >
                      ●
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#141B2B]">{s.title}</p>
                      <p className="text-xs text-[#94A3B8]">{s.meta}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#64748B]">{s.detail}</p>
                      <span
                        className={`mt-1 inline-flex size-9 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          s.tone === "green"
                            ? "border-[#16A34A] text-[#16A34A]"
                            : "border-[#EA580C] text-[#EA580C]"
                        }`}
                      >
                        {s.score}
                      </span>
                    </div>
                    <span className="text-[#CBD5E1]" aria-hidden>
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Insights */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_12rem]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                4
              </span>
              What went well
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                  Listening
                </span>
                <span className="text-[#64748B]">
                  You excelled in identifying speaker opinions and attitudes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-bold text-[#16A34A]">
                  Reading
                </span>
                <span className="text-[#64748B]">Strong performance in matching headings</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                5
              </span>
              Focus areas
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#FFEDD5] px-2.5 py-0.5 text-xs font-bold text-[#EA580C]">
                  Writing
                </span>
                <span className="text-[#64748B]">
                  Work on task achievement and supporting ideas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-bold text-[#7C3AED]">
                  Speaking
                </span>
                <span className="text-[#64748B]">
                  Improve fluency and reduce pauses between ideas.
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-xs text-white">
                6
              </span>
              Recommended next step
            </p>
            <p className="mt-4 text-sm text-[#64748B]">
              Based on these results, focus on{" "}
              <span className="font-bold text-[#EA580C]">Writing</span>.
            </p>
            <Link
              href="/dashboard/skills"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              Start Practising ›
            </Link>
          </section>

          <aside className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-[#141B2B]">More actions</p>
            <div className="mt-4 space-y-2">
              <Link
                href="/dashboard/mock/full"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#2b5ce6] text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
              >
                Take Another Mock
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
              >
                Study Dashboard
              </Link>
            </div>
          </aside>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-4 py-3 text-sm text-[#1E40AF]">
          <InfoTiny />
          You can download the detailed report or share your results. All AI feedback is for
          self-improvement and exam preparation only.
        </div>
      </div>
    </DashboardShell>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m4.3 6.3 5.4-2.6M4.3 7.7l5.4 2.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M7 2v7M4 6.5 7 9.5 10 6.5M3 11.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockTiny({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`size-3.5 shrink-0 ${className}`} fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function WarnTiny() {
  return (
    <svg viewBox="0 0 14 14" className="mt-0.5 size-3.5 shrink-0 text-[#EA580C]" fill="none" aria-hidden>
      <path d="M7 2.2 12.5 12H1.5L7 2.2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 5.8v2.8M7 10.2h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="mt-0.5 size-3.5 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.2V10M7 4.3h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
