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
    icon: "listening" as const,
  },
  {
    title: "Reading",
    score: "7.0",
    tone: "green" as const,
    detail: "32 / 40 correct",
    meta: "40 questions",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    icon: "reading" as const,
  },
  {
    title: "Writing",
    score: "6.5",
    tone: "orange" as const,
    detail: "Task 1: 6.5 | Task 2: 6.5",
    meta: "2 tasks",
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    icon: "writing" as const,
  },
  {
    title: "Speaking",
    score: "7.0",
    tone: "green" as const,
    detail: "Completed",
    meta: "3 parts",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
    icon: "speaking" as const,
  },
] as const;

function SkillIcon({ name }: { name: (typeof SKILLS)[number]["icon"] }) {
  if (name === "listening") return <HeadphonesIcon />;
  if (name === "reading") return <BookIcon />;
  if (name === "writing") return <PencilIcon />;
  return <MicIcon />;
}

const HISTORY = [
  {
    label: "2 Weeks Ago",
    sub: "(10 Aug 2026)",
    scores: [7.5, 6.5, 6.0, 6.5],
    current: false,
  },
  {
    label: "1 Week Ago",
    sub: "(17 Aug 2026)",
    scores: [7.5, 6.5, 6.5, 7.0],
    current: false,
  },
  {
    label: "This Mock",
    sub: "(24 Aug 2026)",
    scores: [8.0, 7.0, 6.5, 7.0],
    current: true,
  },
] as const;

const OVERALL_TRENDS = [
  { label: "Listening", kind: "up" as const },
  { label: "Reading", kind: "up" as const },
  { label: "Writing", kind: "same" as const },
  { label: "Speaking", kind: "up" as const },
] as const;

const BAR_COLORS = ["#2563EB", "#16A34A", "#F97316", "#7C3AED"] as const;
const Y_TICKS = [9, 8, 7, 6, 5, 4] as const;

export function MockTestResults() {
  return (
    <DashboardShell
      title="Test Results"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5 sm:px-[1cm] lg:px-[1cm]"
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 pb-10">
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
                className="flex flex-col items-center justify-center rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-4 text-center"
              >
                <p className="text-sm font-semibold text-[#141B2B]">{s.title}</p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    s.tone === "green" ? "text-[#16A34A]" : "text-[#EA580C]"
                  }`}
                >
                  {s.score}
                </p>
                <p className="mt-0.5 text-[0.6875rem] text-[#64748B]">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
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

            <div className="mt-5 flex gap-3">
              <div className="flex min-w-0 flex-1 gap-2">
                <div className="flex w-7 shrink-0 flex-col justify-between py-1 text-right text-[0.625rem] tabular-nums text-[#94A3B8]">
                  {Y_TICKS.map((t) => (
                    <span key={t}>{t.toFixed(1)}</span>
                  ))}
                </div>
                <div className="relative min-w-0 flex-1">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {Y_TICKS.map((t) => (
                      <span key={t} className="border-t border-[#F1F5F9]" />
                    ))}
                  </div>
                  <div className="relative grid h-48 grid-cols-3 gap-2 sm:gap-4">
                    {HISTORY.map((h) => (
                      <div
                        key={h.label}
                        className={`flex flex-col items-center justify-end rounded-lg px-1 pb-1 pt-2 ${
                          h.current ? "bg-[#DBEAFE]/70" : ""
                        }`}
                      >
                        <div className="flex w-full items-end justify-center gap-1 sm:gap-1.5">
                          {h.scores.map((score, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                              <span className="text-[0.625rem] font-bold text-[#64748B]">
                                {score.toFixed(1)}
                              </span>
                              <span
                                className="w-3 rounded-t-sm sm:w-4"
                                style={{
                                  height: `${((score - 4) / 5) * 140}px`,
                                  minHeight: "12px",
                                  background: BAR_COLORS[i],
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[0.625rem] leading-4 sm:gap-4">
                    {HISTORY.map((h) => (
                      <div
                        key={h.label}
                        className={h.current ? "font-semibold text-[#2b5ce6]" : "text-[#94A3B8]"}
                      >
                        <p>{h.label}</p>
                        <p>{h.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden w-[7.5rem] shrink-0 flex-col sm:flex">
                <p className="mb-3 text-xs font-semibold text-[#94A3B8]">Overall Trend</p>
                <div className="flex flex-1 flex-col justify-center gap-2">
                  {OVERALL_TRENDS.map((t) => (
                    <span
                      key={t.label}
                      className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-[0.625rem] font-bold ${
                        t.kind === "up"
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#FEF3C7] text-[#D97706]"
                      }`}
                    >
                      {t.kind === "up" ? "↑ Improved" : "→ Same"}
                    </span>
                  ))}
                </div>
              </div>
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
                      <SkillIcon name={s.icon} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#141B2B]">{s.title}</p>
                      <p className="text-xs text-[#94A3B8]">{s.meta}</p>
                    </div>
                    <p className="hidden text-xs text-[#64748B] sm:block">{s.detail}</p>
                    <span
                      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        s.tone === "green"
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : "bg-[#FFEDD5] text-[#EA580C]"
                      }`}
                    >
                      {s.score}
                    </span>
                    <span className="text-[#CBD5E1]" aria-hidden>
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
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
                <span className="text-[#64748B]">Strong on opinions &amp; attitudes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-bold text-[#16A34A]">
                  Reading
                </span>
                <span className="text-[#64748B]">Strong matching headings.</span>
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
                <span className="text-[#64748B]">Task achievement &amp; support.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-bold text-[#7C3AED]">
                  Speaking
                </span>
                <span className="text-[#64748B]">Fluency &amp; fewer pauses.</span>
              </li>
            </ul>
          </section>

          <Link
            href="/dashboard/mock/recommended"
            className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:border-[#BFDBFE]"
          >
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
            <span className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white">
              Start Practising ›
            </span>
          </Link>
        </div>

        <div className="max-w-xs">
          <p className="text-sm font-bold text-[#141B2B]">More actions</p>
          <div className="mt-3 space-y-2.5">
            <Link
              href="/dashboard/mock/full"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#2b5ce6] bg-white text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
            >
              <RefreshIcon />
              Take Another Mock
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              <GridIcon />
              Study Dashboard
            </Link>
          </div>
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

function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <path d="M3.5 10v2a1.5 1.5 0 0 0 1.5 1.5h1V10H5a1.5 1.5 0 0 0-1.5 1.5V10a5.5 5.5 0 1 1 11 0v1.5A1.5 1.5 0 0 1 13 10h-1v3.5h1A1.5 1.5 0 0 0 14.5 12v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <path d="M4 4.5h5v9H5.2A1.2 1.2 0 0 0 4 14.7V4.5Zm5.5 0H15v9h-3.8a1.2 1.2 0 0 0-1.2 1.2V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <path d="m11.5 3.5 3 3L7 14H4v-3l7.5-7.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <rect x="6.5" y="2.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 8.5a4.5 4.5 0 0 0 9 0M9 13v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M11.5 5.2A4.5 4.5 0 0 0 3.6 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3.5 2.8V5.2H5.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 8.8A4.5 4.5 0 0 0 10.4 9.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10.5 11.2V8.8H8.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
