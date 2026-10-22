"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  BackToProgress,
  InfoBanner,
  ProgressHeaderRight,
  ProgressPageHeader,
  PteBadge,
} from "@/app/components/dashboard/progress-shared";

const POINTS = [
  { date: "1 Jul", score: 52, kind: "drill" as const },
  { date: "6 Jul", score: 55, kind: "mock" as const },
  { date: "11 Jul", score: 58, kind: "drill" as const },
  { date: "16 Jul", score: 60, kind: "drill" as const },
  { date: "21 Jul", score: 62, kind: "drill" as const },
  { date: "23 Jul", score: 64, kind: "mock" as const },
];

const Y_TICKS = [90, 75, 60, 45, 30, 10] as const;

const RECENT = [
  {
    name: "Mock 2",
    badge: "Full Length",
    type: "Mock",
    typeColor: "text-[#7C3AED]",
    date: "23 Jul",
    score: 64,
    kind: "mock" as const,
  },
  {
    name: "Speaking - Repeat Sentence Drill",
    badge: null,
    type: "Drill",
    typeColor: "text-[#2563EB]",
    date: "21 Jul",
    score: 62,
    kind: "drill" as const,
  },
] as const;

export function ProgressScoreHistory() {
  const chartH = 180;
  const min = 10;
  const max = 90;
  const y = (score: number) => chartH - ((score - min) / (max - min)) * chartH;

  return (
    <DashboardShell
      title="Score History"
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
        <ProgressPageHeader
          title="Score History"
          subtitle="Track how your estimated scores have changed over time."
          badge={false}
        />

        <InfoBanner>
          These are AI-estimated practice scores, not official PTE results.
        </InfoBanner>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#141B2B]">Estimated Score Trend</h3>
              <div className="flex flex-wrap gap-3 text-xs font-medium text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#7C3AED]" />
                  Mock (Full Length)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full border-2 border-[#2563EB] bg-white" />
                  Drill / Practice
                </span>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <div className="flex min-w-[18rem] gap-2">
              <div className="flex w-8 shrink-0 flex-col justify-between py-1 text-right text-[0.625rem] text-[#94A3B8]">
                {Y_TICKS.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="relative" style={{ height: chartH }}>
                  {Y_TICKS.map((t) => (
                    <span
                      key={t}
                      className="absolute inset-x-0 border-t border-dashed border-[#E2E8F0]"
                      style={{ top: y(t) }}
                    />
                  ))}
                  <svg
                    viewBox={`0 0 ${POINTS.length * 80} ${chartH}`}
                    className="absolute inset-0 size-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <polyline
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="3"
                      points={POINTS.map((p, i) => `${i * 80 + 40},${y(p.score)}`).join(" ")}
                    />
                  </svg>
                  {POINTS.map((p, i) => {
                    const left = `${((i + 0.5) / POINTS.length) * 100}%`;
                    const top = y(p.score);
                    return (
                      <div
                        key={p.date}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left, top }}
                      >
                        {p.kind === "mock" && i === POINTS.length - 1 ? (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-[#7C3AED] px-1.5 py-0.5 text-[0.625rem] font-bold text-white">
                            {p.score}
                          </span>
                        ) : null}
                        <span
                          className={`block size-3 rounded-full ${
                            p.kind === "mock"
                              ? "bg-[#7C3AED]"
                              : "border-2 border-[#2563EB] bg-white"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 grid grid-cols-6 text-center text-[0.6875rem] text-[#64748B]">
                  {POINTS.map((p) => (
                    <span key={p.date}>{p.date}</span>
                  ))}
                </div>
                <p className="mt-2 text-center text-[0.625rem] text-[#94A3B8]">
                  PTE Score (10-90)
                </p>
              </div>
              </div>
            </div>
          </section>

          <aside>
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#141B2B]">Summary</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
                    <TrendIcon />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-[#7C3AED]">+12 pts</p>
                    <p className="text-sm font-bold text-[#141B2B]">since 1 Jul</p>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Your estimated score has improved by 12 points.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
                    <ClockIcon />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-[#2563EB]">2.4 pts/week</p>
                    <p className="text-sm font-bold text-[#141B2B]">pace</p>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Your average improvement per week.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)] lg:items-stretch">
          <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="grid grid-cols-[minmax(0,1.4fr)_5rem_5rem_4.5rem] gap-2 border-b border-[#E2E8F0] px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-wide text-[#94A3B8] sm:px-5">
              <span>Recent Scores</span>
              <span>Type</span>
              <span>Date</span>
              <span className="text-right">Score</span>
            </div>
            {RECENT.map((r) => (
              <div
                key={r.name}
                className="grid grid-cols-[minmax(0,1.4fr)_5rem_5rem_4.5rem] items-center gap-2 border-b border-[#E2E8F0] px-4 py-3.5 last:border-b-0 sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${
                      r.kind === "mock"
                        ? "bg-[#7C3AED]"
                        : "border-2 border-[#2563EB] bg-white"
                    }`}
                  />
                  <p className="truncate text-sm font-bold text-[#141B2B]">{r.name}</p>
                  {r.badge ? (
                    <span className="hidden shrink-0 rounded-full bg-[#DBEAFE] px-2 py-0.5 text-[0.625rem] font-bold text-[#2563EB] sm:inline">
                      {r.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`text-sm font-semibold ${r.typeColor}`}>{r.type}</span>
                <span className="text-sm text-[#64748B]">{r.date}</span>
                <span className="inline-flex items-center justify-end gap-1 text-sm font-bold text-[#141B2B]">
                  {r.score}
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ›
                  </span>
                </span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-[#BFDBFE] bg-[#F5F7FF] p-5">
            <h3 className="text-base font-bold text-[#2b5ce6]">
              What do these scores mean?
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Scores come from your practice activities. They help you track progress
              towards your target but are not official exam results.
            </p>
            <Link
              href="/dashboard/help"
              className="mt-3 inline-flex text-sm font-bold text-[#2b5ce6] transition hover:underline"
            >
              Learn more ›
            </Link>
          </section>
        </div>

        <p className="inline-flex items-center justify-center gap-2 text-center text-xs text-[#94A3B8]">
          <ChartTiny />
          Practice more to build a clearer picture of your progress.
        </p>
      </div>
    </DashboardShell>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3 11.5 6.5 8l2 2 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.2l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChartTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 11.5V6.5M6 11.5V3.5M9.5 11.5V7.5M13 11.5V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
