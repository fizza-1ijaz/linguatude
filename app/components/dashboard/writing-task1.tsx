"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CITY_A = [9, 10, 14, 18, 24, 28, 31, 32, 28, 22, 16, 12];
const CITY_B = [18, 17, 16, 15, 18, 22, 26, 27, 24, 20, 16, 14];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function WritingTask1() {
  const [mode, setMode] = useState<"practice" | "timed">("practice");

  return (
    <DashboardShell
      title="Task 1"
      contentBgClassName="bg-white"
      headerLeft={
        <Link
          href="/dashboard/writing"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to Writing"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto grid max-w-6xl gap-5 pb-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-4">
          <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
            Line Graph · Academic
          </span>

          {/* Visual information card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#141B2B]">
                Visual information
              </h2>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F1F5F9]"
                aria-label="Expand"
              >
                <ExpandIcon />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-4 sm:p-5">
              <p className="text-center text-sm font-bold text-[#334155]">
                Average monthly temperatures in two cities (°C)
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs font-medium text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#2b5ce6]" />
                  City A
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#22C55E]" />
                  City B
                </span>
              </div>
              <TemperatureChart />
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#F1F5F9] px-4 py-2.5 text-sm font-medium text-[#64748B]">
              <ZoomIcon />
              Pinch to zoom the image
            </div>
          </section>

          {/* Task card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Task</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[#64748B]">
              <p>
                The graph shows the average monthly temperatures in two cities
                throughout the year.
              </p>
              <p className="font-bold text-[#141B2B]">
                Summarise the information by selecting and reporting the main
                features, and make comparisons where relevant.
              </p>
              <p>Write at least 150 words.</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-[#E2E8F0] pt-4">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFFBEB] px-3 py-1.5 text-xs font-semibold text-[#92400E]">
                <AlertCircleIcon />
                150+ words required
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1E40AF]">
                <ClockIcon />
                ~30 minutes
              </span>
            </div>
          </section>
        </div>

        {/* Configure sidebar */}
        <aside className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-[#141B2B]">
            Configure your session
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Choose how you would like to practice.
          </p>

          <p className="mt-5 text-sm font-bold text-[#141B2B]">Mode</p>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setMode("practice")}
              className={`flex items-start gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                mode === "practice"
                  ? "border-[#2b5ce6] bg-[#EEF2FF] text-[#2b5ce6]"
                  : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
              }`}
            >
              <ClockIcon className="mt-0.5 size-4 shrink-0" />
              <span>
                Practice —
                <br />
                no timer
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode("timed")}
              className={`flex items-start gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                mode === "timed"
                  ? "border-[#2b5ce6] bg-[#EEF2FF] text-[#2b5ce6]"
                  : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
              }`}
            >
              <StopwatchIcon className="mt-0.5 size-4 shrink-0" />
              <span>
                Timed —
                <br />
                30 minutes
              </span>
            </button>
          </div>

          {mode === "practice" ? (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] px-3.5 py-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              <p className="text-sm leading-5 text-[#1E40AF]">
                Practice mode lets you write at your own pace without a timer.
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] px-3.5 py-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              <p className="text-sm leading-5 text-[#1E40AF]">
                Timed mode gives you 30 minutes, matching the IELTS Task 1
                recommendation.
              </p>
            </div>
          )}

          <p className="mt-6 text-[0.6875rem] font-bold tracking-wide text-[#64748B]">
            ABOUT THIS TASK
          </p>
          <ul className="mt-3 space-y-3">
            <AboutRow icon={<PulseIcon />} label="Task type" value="Task 1 — Academic" />
            <AboutRow icon={<QuestionIcon />} label="Question type" value="Line Graph" />
            <AboutRow icon={<DocIcon />} label="Word count" value="150+ words" />
            <AboutRow icon={<ClockIcon />} label="Time recommended" value="~30 minutes" />
          </ul>

          <Link
            href="/dashboard/writing/task1/write"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            Start Writing
            <span aria-hidden>→</span>
          </Link>
        </aside>
      </div>
    </DashboardShell>
  );
}

function TemperatureChart() {
  const w = 320;
  const h = 180;
  const padL = 28;
  const padR = 8;
  const padT = 12;
  const padB = 28;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const maxY = 40;

  function xAt(i: number) {
    return padL + (i / 11) * plotW;
  }
  function yAt(v: number) {
    return padT + plotH - (v / maxY) * plotH;
  }

  const pathA = CITY_A.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" ");
  const pathB = CITY_B.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 h-auto w-full"
      role="img"
      aria-label="Line graph of average monthly temperatures for City A and City B"
    >
      {[0, 10, 20, 30, 40].map((tick) => (
        <g key={tick}>
          <line
            x1={padL}
            x2={w - padR}
            y1={yAt(tick)}
            y2={yAt(tick)}
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text
            x={padL - 6}
            y={yAt(tick) + 3}
            textAnchor="end"
            className="fill-[#94A3B8]"
            fontSize="9"
          >
            {tick}
          </text>
        </g>
      ))}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={xAt(i)}
          y={h - 8}
          textAnchor="middle"
          className="fill-[#94A3B8]"
          fontSize="8"
        >
          {m}
        </text>
      ))}
      <path d={pathA} fill="none" stroke="#2b5ce6" strokeWidth="2" />
      <path d={pathB} fill="none" stroke="#22C55E" strokeWidth="2" />
      {CITY_A.map((v, i) => (
        <circle key={`a-${i}`} cx={xAt(i)} cy={yAt(v)} r="2.5" fill="#2b5ce6" />
      ))}
      {CITY_B.map((v, i) => (
        <circle key={`b-${i}`} cx={xAt(i)} cy={yAt(v)} r="2.5" fill="#22C55E" />
      ))}
    </svg>
  );
}

function AboutRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-2.5 text-sm">
      <span className="text-[#94A3B8]">{icon}</span>
      <span className="min-w-0 flex-1 text-[#64748B]">{label}</span>
      <span className="font-bold text-[#141B2B]">{value}</span>
    </li>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#141b2b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 6V3h3M10 3h3v3M13 10v3h-3M6 13H3v-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5 14 14M5.5 7h3M7 5.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 4.5v3M7 9.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StopwatchIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="9" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 6.5V9l1.8 1.2M6 2.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M1.5 8h3l1.5-3.5L9 12l1.5-4H14.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.5 6.2a1.6 1.6 0 0 1 3.1.8c0 1-1.5 1.4-1.5 2.3M8 11.2h.01"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M4.5 2h5l3 3v8.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M9.5 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
