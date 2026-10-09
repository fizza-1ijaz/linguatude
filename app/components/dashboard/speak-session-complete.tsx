"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const SKILLS = [
  { label: "Fluency", value: 6.2 },
  { label: "Vocabulary", value: 6.7 },
  { label: "Grammar", value: 6.0 },
  { label: "Pronunciation", value: 6.5 },
] as const;

export function SpeakSessionComplete() {
  return (
    <DashboardShell
      title={
        <span className="inline-flex flex-wrap items-center gap-3">
          Session Complete
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1.5 text-sm font-semibold text-[#EA580C] ring-1 ring-[#FED7AA]/90">
            <FireIcon />
            +120 XP earned
          </span>
        </span>
      }
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 pb-8">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
          <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
            Session Stats
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <StatCell label="Questions answered" value="4" />
            <StatCell label="Session average" value="6.2" />
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-center">
              <p className="text-sm font-medium text-[#64748B]">Band change</p>
              <p className="mt-2 flex items-baseline justify-center gap-1.5">
                <span className="text-2xl font-bold text-[#16A34A] sm:text-3xl">
                  ⬆ 0.5
                </span>
                <span className="text-xs font-medium text-[#94A3B8]">
                  from last session
                </span>
              </p>
            </div>
            <StatCell label="Speaking time" value="04:32" />
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
          <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
            Skill breakdown
          </h2>
          <div className="mt-5 space-y-4">
            {SKILLS.map((skill) => (
              <div key={skill.label} className="flex items-center gap-3">
                <div className="h-2.5 w-24 shrink-0 overflow-hidden rounded-full bg-[#E8EEF7] sm:w-32">
                  <div
                    className="h-full rounded-full bg-[#2b5ce6]"
                    style={{ width: `${(skill.value / 9) * 100}%` }}
                  />
                </div>
                <p className="min-w-0 flex-1 text-sm font-semibold text-[#334155]">
                  {skill.label}
                </p>
                <p className="shrink-0 text-sm font-bold tabular-nums text-[#141B2B]">
                  {skill.value.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-[#F5D78E]/80 border-t-[3px] border-t-[#F5B942] bg-[#FFFBEB] px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
              <BulbIcon />
            </span>
            <div>
              <p className="text-sm font-bold text-[#141B2B]">Keep working on</p>
              <p className="mt-1 text-sm leading-6 text-[#64748B]">
                Try to expand your answers by providing a reason or example.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
          <Link
            href="/dashboard/speak"
            className="inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-6 text-sm font-semibold text-[#141B2B] shadow-sm transition hover:bg-[#F8FAFC] sm:w-auto"
          >
            <BackArrowIcon />
            Back to Speaking
          </Link>
          <Link
            href="/dashboard/speak/setup"
            className="inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6] sm:w-auto"
          >
            <RefreshIcon />
            Practice Again
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-center">
      <p className="text-sm font-medium text-[#64748B]">{label}</p>
      <p className="mt-2 text-3xl font-bold tabular-nums text-[#141B2B]">
        {value}
      </p>
    </div>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M10.2 2.5c.3 2.2-.4 3.5-1.6 4.6C7.2 8.4 6.2 9.5 6.2 11.4c0 2.2 1.7 3.9 3.8 3.9s3.8-1.7 3.8-3.9c0-1.5-.5-2.5-1.4-3.6-.6-.7-1.1-1.4-1.3-2.5-.1-.6-.2-1.6-.9-2.8Z"
        fill="#F97316"
      />
      <path
        d="M10 11.2c0 1.1-.8 1.9-1.8 1.9-.3-1 .2-1.7.8-2.3.4-.4.8-.8 1-1.5v1.9Z"
        fill="#FDBA74"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 2.5a5 5 0 0 0-2.8 9.1V13a.8.8 0 0 0 .8.8h4a.8.8 0 0 0 .8-.8v-1.4A5 5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.2 15.2h3.6M8.6 17h2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M16 10a6 6 0 1 1-1.4-3.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 4.5V8h-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
