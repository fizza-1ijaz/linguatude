"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteProgressStrip,
  PteSideCard,
  PteTaskHeaderRight,
  PteTaskNav,
} from "@/app/components/dashboard/pte-shared";

const POINTS = [
  { year: "2015", pct: 22 },
  { year: "2016", pct: 24 },
  { year: "2017", pct: 26 },
  { year: "2018", pct: 27 },
  { year: "2019", pct: 29 },
  { year: "2020", pct: 31 },
  { year: "2021", pct: 33 },
  { year: "2022", pct: 35 },
  { year: "2023", pct: 38 },
  { year: "2024", pct: 41 },
] as const;

const Y_MAX = 50;
const PREP_SEGMENTS = 6;
const PREP_FILLED = 4;

export function PteDescribeImage() {
  const chartH = 160;
  const y = (pct: number) => chartH - (pct / Y_MAX) * chartH;
  const x = (i: number) =>
    POINTS.length <= 1 ? 0 : (i / (POINTS.length - 1)) * 100;

  return (
    <DashboardShell
      title="Describe Image"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <PteProgressStrip itemLabel="Item 1 of 4" progressPct={25} />

          <section className="flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                <ImageIcon />
              </span>
              <div>
                <p className="text-sm leading-6 text-[#64748B]">
                  Look at the image below.
                  <br />
                  You will have 25 seconds to prepare.
                  <br />
                  Then speak for up to 40 seconds to describe the image in as much
                  detail as you can.
                  <br />
                  You will be scored on content, oral fluency and pronunciation.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
              <p className="text-center text-sm font-bold text-[#141B2B]">
                Renewables share of global electricity generation (%)
              </p>
              <div className="mt-4 flex gap-2">
                <div
                  className="flex w-6 shrink-0 flex-col justify-between text-right text-[0.625rem] text-[#94A3B8]"
                  style={{ height: chartH }}
                >
                  {[50, 40, 30, 20, 10, 0].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="relative" style={{ height: chartH }}>
                    {[10, 20, 30, 40].map((t) => (
                      <span
                        key={t}
                        className="absolute inset-x-0 border-t border-[#F1F5F9]"
                        style={{ top: y(t) }}
                      />
                    ))}
                    <svg
                      viewBox={`0 0 100 ${chartH}`}
                      className="absolute inset-0 size-full overflow-visible"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <polyline
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="2"
                        points={POINTS.map((p, i) => `${x(i)},${y(p.pct)}`).join(" ")}
                      />
                    </svg>
                    {POINTS.map((p, i) => (
                      <div
                        key={p.year}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x(i)}%`, top: y(p.pct) }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[0.625rem] font-bold text-[#7C3AED]">
                          {p.pct}%
                        </span>
                        <span className="block size-2.5 rounded-full border-2 border-[#7C3AED] bg-white" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[0.625rem] text-[#64748B]">
                    {POINTS.map((p) => (
                      <span key={p.year}>{p.year}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] sm:flex-row">
              <div className="flex-1 px-4 py-4 sm:px-5">
                <p className="text-xs text-[#64748B]">Preparation time</p>
                <p className="mt-1 text-3xl font-bold text-[#EA580C]">0:18</p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: PREP_SEGMENTS }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        i < PREP_FILLED ? "bg-[#F59E0B]" : "bg-[#E2E8F0]"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-[#94A3B8]">
                  You will have 40 seconds to speak after the preparation time.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center border-t border-[#E2E8F0] px-6 py-4 sm:border-l sm:border-t-0 sm:px-8">
                <button
                  type="button"
                  className="flex size-16 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-[0_12px_24px_-10px_rgba(245,158,11,0.7)] transition hover:bg-[#D97706]"
                  aria-label="Speak"
                >
                  <MicIcon />
                </button>
                <p className="mt-2 text-sm font-medium text-[#64748B]">Speak 40s</p>
              </div>
            </div>
          </section>

          <PteTaskNav
            backHref="/dashboard/pte"
            nextHref="/dashboard/pte/retell-lecture"
            nextDisabled={false}
          />
        </div>

        <aside className="flex flex-col gap-3">
          <PteSideCard title="Instructions" icon={<InfoDot />}>
            <ul className="space-y-1.5">
              <li>Look at the image carefully.</li>
              <li>Use the preparation time to identify the key information.</li>
              <li>Describe the image clearly and naturally.</li>
              <li>Click the microphone when you are ready to begin.</li>
            </ul>
          </PteSideCard>
          <PteSideCard
            title="Timing (Exam)"
            icon={<ClockDot />}
            className="bg-[#FFF4E6]"
            titleClass="text-[#9A3412]"
            bodyClass="text-[#9A3412]"
          >
            <ul className="space-y-1">
              <li>Preparation time: 25s</li>
              <li>Speaking time: up to 40s</li>
            </ul>
          </PteSideCard>
          <PteSideCard
            title="Scoring (AI Evaluation)"
            icon={<ChartDot />}
            className="bg-[#ECFDF5]"
            titleClass="text-[#166534]"
            bodyClass="text-[#166534]"
          >
            STT alignment vs source text: content, oral fluency, Pronunciation
          </PteSideCard>
          <PteSideCard
            title="Note"
            icon={<ShieldDot />}
            className="bg-[#F5F3FF]"
            titleClass="text-[#5B21B6]"
            bodyClass="text-[#5B21B6]"
          >
            In the real test, your response will be recorded and AI-scored.
          </PteSideCard>
          <Link href="/dashboard/pte" className="sr-only">
            Back to hub
          </Link>
        </aside>
      </div>
    </DashboardShell>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7.5" cy="8" r="1.3" stroke="currentColor" strokeWidth="1.2" />
      <path d="m4.5 14 3.2-3.2 2.3 2.3 2.5-3L15.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-6" fill="none" aria-hidden>
      <rect x="8" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 11a6 6 0 0 0 12 0M11 17v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InfoDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
      i
    </span>
  );
}

function ClockDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#F59E0B] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3.8V6l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ChartDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <path d="M2 9 4.5 6.5 6.5 8 10 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ShieldDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#7C3AED] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <path d="M6 1.5 10 3v2.8c0 2.3-1.5 4-4 4.7-2.5-.7-4-2.4-4-4.7V3L6 1.5Z" stroke="currentColor" strokeWidth="1.1" />
        <path d="m4.2 5.8 1.3 1.3 2.3-2.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>
  );
}
