"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  BackToProgress,
  InfoBanner,
  ProgressHeaderRight,
  ProgressPageHeader,
  PteBadge,
  ScoreTrack,
} from "@/app/components/dashboard/progress-shared";

const TRAITS = [
  {
    name: "Content",
    score: 72,
    color: "#16A34A",
    iconBg: "bg-[#DCFCE7]",
    Icon: ContentIcon,
  },
  {
    name: "Development",
    score: 50,
    color: "#EA580C",
    iconBg: "bg-[#FFEDD5]",
    Icon: BlocksIcon,
  },
  {
    name: "Grammar",
    score: 68,
    color: "#2563EB",
    iconBg: "bg-[#DBEAFE]",
    Icon: AaIcon,
  },
  {
    name: "Vocabulary",
    score: 66,
    color: "#7C3AED",
    iconBg: "bg-[#F3E8FF]",
    Icon: BookIcon,
  },
] as const;

export function ProgressSkillDetailWriting() {
  return (
    <DashboardShell
      title="Skill Detail — Writing"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerLeft={<BackToProgress />}
      headerRight={
        <div className="flex items-center gap-2.5">
          <ProgressHeaderRight />
          <PteBadge className="hidden sm:inline-flex" />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <ProgressPageHeader
          title="Skill Detail — Writing"
          subtitle="See how you're performing in Writing and where to focus next."
          badge={false}
        />

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C]">
              <PenIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold text-[#141B2B] sm:text-xl">
                Writing <span className="text-[#EA580C]">71</span>
                <span className="mx-2 text-[#94A3B8]">→</span>
                target <span className="text-[#141B2B]">85</span>
              </p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                Your current estimated score and target
              </p>
            </div>
          </div>
          <div className="mt-5">
            <ScoreTrack
              score={71}
              color="#EA580C"
              ticks={[10, 45, 65, 90]}
              target={85}
            />
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-bold text-[#141B2B]">Writing traits</h3>
            <p className="mt-1 text-sm text-[#64748B]">
              Breakdown of the key areas that contribute to your Writing score.
            </p>
            <div className="mt-5 space-y-5">
              {TRAITS.map((t) => (
                <div key={t.name} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-24 shrink-0">
                    <span
                      className={`mb-1.5 flex size-10 items-center justify-center rounded-full ${t.iconBg}`}
                      style={{ color: t.color }}
                    >
                      <t.Icon />
                    </span>
                    <p className="text-sm font-bold text-[#141B2B]">{t.name}</p>
                    <p className="text-xl font-bold" style={{ color: t.color }}>
                      {t.score}
                    </p>
                  </div>
                  <ScoreTrack
                    score={t.score}
                    color={t.color}
                    ticks={[10, 45, 65, 90]}
                    showTarget={false}
                  />
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-[#FED7AA] bg-[#FFFBF5] p-5 shadow-sm sm:p-6">
            <p className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C]">
              <EyeIcon />
              Weakest: development
            </p>
            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              This is currently your lowest scoring trait and the biggest opportunity to
              improve your Writing score.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FFEDD5]/80 px-3.5 py-3 text-sm text-[#9A3412]">
              <BulbIcon />
              <p>
                <span className="font-bold">Paragraph-unity lessons help.</span> Build
                clearer structure and stronger progression in your responses.
              </p>
            </div>
            <Link
              href="/dashboard/skills/essay-development"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              Go to Development Lessons ›
            </Link>
            <Link
              href="/dashboard/skills"
              className="mt-3 inline-flex w-full items-center justify-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              View recommended practice ›
            </Link>
          </aside>
        </div>

        <InfoBanner title="About these scores">
          Scores are AI estimates based on your practice and may change as you improve.
          They are not official PTE scores.
        </InfoBanner>
      </div>
    </DashboardShell>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="m11.5 3.5 3 3L7 14H4v-3l7.5-7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ContentIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <path d="M5 3.5h6.5L14 6.5V14a1.2 1.2 0 0 1-1.2 1.2H5A1.2 1.2 0 0 1 3.8 14V4.7A1.2 1.2 0 0 1 5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11.5 3.7V6.5H14M6.5 9.5h5M6.5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BlocksIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <rect x="3.5" y="10.5" width="4.5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7" y="6" width="4.5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10.5" y="3.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function AaIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <path d="M5 13 8.2 5h1.6L13 13M6.2 10.5h5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function EyeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="none" aria-hidden>
      <path d="M5.2 6.5a2.8 2.8 0 1 1 3.8 2.6V10a.7.7 0 0 1-.7.7H6.7A.7.7 0 0 1 6 10V9.1A2.8 2.8 0 0 1 5.2 6.5Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.8 12.5h2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
