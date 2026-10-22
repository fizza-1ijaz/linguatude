"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  ProgressHeaderRight,
  ProgressPageHeader,
  ScoreTrack,
} from "@/app/components/dashboard/progress-shared";

const SKILLS = [
  {
    name: "Listening",
    score: 70,
    color: "#7C3AED",
    iconBg: "bg-[#F3E8FF]",
    href: "/dashboard/progress/skills/writing",
    Icon: HeadphonesIcon,
  },
  {
    name: "Reading",
    score: 68,
    color: "#2563EB",
    iconBg: "bg-[#DBEAFE]",
    href: "/dashboard/progress/skills/writing",
    Icon: BookIcon,
  },
  {
    name: "Writing",
    score: 71,
    color: "#EA580C",
    iconBg: "bg-[#FFEDD5]",
    href: "/dashboard/progress/skills/writing",
    Icon: PenIcon,
  },
  {
    name: "Speaking",
    score: 66,
    color: "#16A34A",
    iconBg: "bg-[#DCFCE7]",
    href: "/dashboard/progress/skills/writing",
    Icon: MicIcon,
  },
] as const;

export function ProgressDashboard() {
  return (
    <DashboardShell
      title="Progress Dashboard"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<ProgressHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <ProgressPageHeader
          title="Progress Dashboard"
          subtitle="See how you're progressing towards your target score."
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#7C3AED]"
            Icon={TrendIcon}
            value={<span className="text-[#7C3AED]">64</span>}
            label="estimate"
            detail="Overall estimated score"
          />
          <StatCard
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#2563EB]"
            Icon={ItemsIcon}
            value={<span className="text-[#2563EB]">212</span>}
            label="items"
            detail="Completed / Scored"
          />
          <StatCard
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#16A34A]"
            Icon={MedalIcon}
            value={
              <>
                <span className="text-[#16A34A]">11</span>
                <span className="text-[#94A3B8]">/20</span>
              </>
            }
            label="mastered"
            detail="Practice mastered"
          />
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#141B2B]">Skill Progress</h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Your estimated score by skill area compared to your target.
              </p>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
              <span className="text-[#EF4444]" aria-hidden>
                ✓
              </span>
              Red tick = DHA Superior bar
            </p>
          </div>

          <div className="mt-5 divide-y divide-[#E2E8F0] border-t border-[#E2E8F0]">
            {SKILLS.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="flex items-center gap-3 py-4 transition hover:bg-[#F8FAFC]/80 sm:gap-4"
              >
                <div className="w-16 shrink-0 sm:w-20">
                  <span
                    className={`mb-2 flex size-10 items-center justify-center rounded-full ${s.iconBg}`}
                    style={{ color: s.color }}
                  >
                    <s.Icon />
                  </span>
                  <p className="text-xs font-bold text-[#64748B]">{s.name}</p>
                  <p className="text-lg font-bold" style={{ color: s.color }}>
                    {s.score}
                  </p>
                </div>
                <ScoreTrack score={s.score} color={s.color} />
                <span className="shrink-0 text-[#CBD5E1]" aria-hidden>
                  ›
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/progress/history"
            className="inline-flex h-10 items-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Score History
          </Link>
          <Link
            href="/dashboard/progress/streak"
            className="inline-flex h-10 items-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Streak &amp; Calendar
          </Link>
          <Link
            href="/dashboard/progress/plan"
            className="inline-flex h-10 items-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Plan Review
          </Link>
        </div>

        <p className="inline-flex items-center justify-center gap-2 text-center text-xs text-[#94A3B8]">
          <InfoTiny />
          Scores are AI estimates based on your practice and may change as you improve.
        </p>
      </div>
    </DashboardShell>
  );
}

function StatCard({
  iconBg,
  iconColor,
  Icon,
  value,
  label,
  detail,
}: {
  iconBg: string;
  iconColor: string;
  Icon: () => ReactNode;
  value: ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)] sm:p-5">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
        <Icon />
      </span>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="mt-1 text-sm font-bold text-[#141B2B]">{label}</p>
        <p className="text-xs text-[#94A3B8]">{detail}</p>
      </div>
    </div>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.2V10M7 4.3h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M3.5 12.5 7 9l2.5 2.5 5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6h3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ItemsIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M5 3h5.5L13.5 6.5V14A1.5 1.5 0 0 1 12 15.5H5A1.5 1.5 0 0 1 3.5 14V4.5A1.5 1.5 0 0 1 5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10.5 3.2V6.5H13.5M6.5 9.5h5M6.5 12h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <circle cx="9" cy="10.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 3.5 8 7M11.5 3.5 10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function PenIcon() {
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
