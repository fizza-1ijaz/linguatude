"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const SECTIONS = [
  { name: "1. Listening", duration: "10 minutes", questions: "10 questions" },
  { name: "2. Reading", duration: "10 minutes", questions: "15 questions" },
  { name: "3. Writing", duration: "5 minutes", questions: "Task 1 + Task 2" },
  { name: "4. Speaking", duration: "5 minutes", questions: "Part 1 (4-5 questions)" },
] as const;

const RULES = [
  "Once a section begins, you cannot pause it.",
  "You cannot return to a previous section.",
  "Timers run continuously — backgrounding the app does not pause the timer.",
  "Your answers are saved automatically after each question.",
  "Speak clearly for the Speaking section — find a quiet place before you begin.",
] as const;

const PREP = [
  { label: "Headphones recommended", Icon: HeadphoneIcon },
  { label: "Find a quiet place", Icon: QuietIcon },
  { label: "Check your internet connection", Icon: WifiIcon },
  { label: "Make sure your device is charged", Icon: BatteryIcon },
] as const;

export function MockFull() {
  const [pct, setPct] = useState(12);
  const ready = pct >= 100;

  useEffect(() => {
    if (ready) return;
    const id = window.setInterval(() => {
      setPct((p) => Math.min(100, p + 4));
    }, 280);
    return () => window.clearInterval(id);
  }, [ready]);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <DashboardShell
      title="Full Mock Test"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-4 sm:px-[1cm] lg:px-[1cm]"
      headerLeft={
        <Link
          href="/dashboard/mock"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto w-full max-w-6xl space-y-4 pb-8">
        <div className="flex flex-col gap-3 rounded-xl border border-[#FDBA74] bg-[#FFF7ED] px-4 py-3 sm:flex-row sm:items-center sm:justify-between ui-fade-up">
          <p className="inline-flex items-start gap-2 text-sm text-[#141B2B]">
            <WarnIcon />
            Your previous test was interrupted. Your answers have been saved.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/mock/listening"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-[#EA580C] px-3.5 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
            >
              Resume Test
            </Link>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-[#EA580C] bg-white px-3.5 text-sm font-semibold text-[#EA580C] transition hover:bg-[#FFF7ED]"
            >
              Start Fresh
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.85fr)]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] ui-fade-up">
            <h2 className="inline-flex items-center gap-2 text-base font-bold text-[#141B2B]">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2b5ce6]">
                <ClipboardIcon />
              </span>
              Test overview
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#EEF2FF] text-left text-[#64748B]">
                    <th className="px-3 py-2.5 font-semibold">Section</th>
                    <th className="px-3 py-2.5 font-semibold">Duration</th>
                    <th className="px-3 py-2.5 font-semibold">Questions</th>
                  </tr>
                </thead>
                <tbody>
                  {SECTIONS.map((s) => (
                    <tr key={s.name} className="border-t border-[#E2E8F0]">
                      <td className="px-3 py-2.5 font-semibold text-[#141B2B]">{s.name}</td>
                      <td className="px-3 py-2.5 text-[#475569]">{s.duration}</td>
                      <td className="px-3 py-2.5 text-[#475569]">{s.questions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2.5 text-sm font-bold text-[#1D4ED8]">
              <ClockIcon />
              Total duration: 30 minutes
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] ui-fade-up-delay-1">
            <h2 className="inline-flex items-center gap-2 text-base font-bold text-[#141B2B]">
              <span className="text-[#2b5ce6]">
                <ShieldIcon />
              </span>
              Important rules
            </h2>
            <ol className="mt-4 space-y-3">
              {RULES.map((rule, i) => (
                <li key={rule} className="flex items-start gap-2.5 text-sm text-[#334155]">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>
          </section>

          <div className="space-y-4 ui-fade-up-delay-2">
            <section className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#EA580C] text-[0.625rem] font-bold text-white">
                  i
                </span>
                About your scores
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                All band scores from this test are AI-estimated for self-assessment
                purposes only. They are not official IELTS results and should not be
                used as proof of English proficiency.
              </p>
            </section>

            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <h3 className="inline-flex items-center gap-2 text-sm font-bold text-[#141B2B]">
                <span className="text-[#16A34A]">
                  <CalendarCheckIcon />
                </span>
                Before you begin
              </h3>
              <ul className="mt-3 space-y-2.5">
                {PREP.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <li
                      key={item.label}
                      className="inline-flex w-full items-center gap-2.5 text-sm text-[#334155]"
                    >
                      <span className="text-[#16A34A]">
                        <Icon />
                      </span>
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-5 ui-fade-up-delay-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative mx-auto size-16 shrink-0 sm:mx-0">
              <svg viewBox="0 0 64 64" className="size-full -rotate-90" aria-hidden>
                <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#2b5ce6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="skill-progress-ring"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#141B2B]">
                {pct}%
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#141B2B]">
                Preparing your test... {pct}%
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Please wait while we load all test content. This ensures a smooth test
                experience.
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="h-full rounded-full bg-[#2b5ce6] transition-[width] duration-200"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {ready ? (
          <Link
            href="/dashboard/mock/listening"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            Start Mock Test
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#E2E8F0] text-sm font-semibold text-[#94A3B8]"
          >
            <LockIcon />
            Loading test...
          </button>
        )}
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

function WarnIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-[#EA580C]" fill="none" aria-hidden>
      <path d="M8 2.5 14 13.5H2L8 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="4" y="3.5" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 3.5V2.8a1.2 1.2 0 0 1 1.2-1.2h1.6A1.2 1.2 0 0 1 10 2.8v.7M6.5 8h3M6.5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.2 13 4.2v3.5c0 2.8-1.9 4.9-5 5.6-3.1-.7-5-2.8-5-5.6V4.2L8 2.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 6.5h11M5.5 2v2M10.5 2v2M6 10l1.2 1.2L10 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 7.5v2A1.5 1.5 0 0 0 4 11h.8V7.5H4A1.5 1.5 0 0 0 2.5 9V7.5a4.5 4.5 0 1 1 9 0V9A1.5 1.5 0 0 1 10 7.5h-.8V11H10A1.5 1.5 0 0 0 11.5 9.5v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function QuietIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 5.5h2L7.5 3v8L4.5 8.5h-2v-3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m9.5 5.5 3 3M12.5 5.5l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2 6a7 7 0 0 1 10 0M4 8a4.5 4.5 0 0 1 6 0M6.2 10a1.8 1.8 0 0 1 1.6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="11.5" r="0.7" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="1.5" y="4.5" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11.5 6.2h1v1.6h-1M3 6.2h5.5v1.6H3z" fill="currentColor" />
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
