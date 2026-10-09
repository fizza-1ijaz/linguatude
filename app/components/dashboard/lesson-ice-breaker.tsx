"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const READING_OPTS = [
  "A They make people more creative.",
  "B They reduce mental effort by automating actions.",
  "C They eliminate the need for practice.",
  "D They only help athletes perform better.",
] as const;

const LISTENING_OPTS = [
  "A A cooking class",
  "B A weekend football match",
  "C A school exam timetable",
  "D A travel booking",
] as const;

export function LessonIceBreaker() {
  const [reading, setReading] = useState(1);
  const [listening, setListening] = useState(1);
  const [seconds, setSeconds] = useState(112);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const answered = reading != null && listening != null;

  return (
    <DashboardShell
      title={
        <span className="inline-flex flex-wrap items-center gap-2">
          Ice-Breaker
          <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
            2 minutes
          </span>
        </span>
      }
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex flex-1 flex-col px-4 py-4 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href="/dashboard/skills/essay-development"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="hidden text-center sm:block">
            <p className="text-xs font-medium text-[#64748B]">Question 1 of 3</p>
            <div className="mt-1.5 flex gap-1">
              <span className="h-1.5 w-8 rounded-full bg-[#2b5ce6]" />
              <span className="h-1.5 w-8 rounded-full bg-[#E2E8F0]" />
              <span className="h-1.5 w-8 rounded-full bg-[#E2E8F0]" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-[#94A3B8]">
              Time Remaining
            </p>
            <p className="text-xl font-bold tabular-nums text-[#2b5ce6] ui-soft-pulse">
              {mm}:{ss}
            </p>
          </div>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 pb-36">
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 ui-fade-up">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
            i
          </span>
          <p className="text-sm text-[#1E40AF]">
            This is the Ice-Breaker (2 minutes). Answer the questions below to get
            started.
          </p>
        </div>

        <div className="grid flex-1 gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] ui-fade-up">
            <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#2b5ce6]">
              <BookIcon />
              READING WARM-UP
            </p>
            <p className="mt-1 text-sm text-[#64748B]">
              Read the short passage and answer the question.
            </p>
            <div className="mt-4 rounded-xl bg-[#F1F5F9] p-4">
              <p className="font-bold text-[#141B2B]">The Power of Habit</p>
              <p className="mt-2 text-sm leading-6 text-[#475569]">
                Habits help us manage daily life by turning repeated actions into
                automatic routines. When a behaviour becomes a habit, the brain
                spends less energy deciding what to do next, which frees attention
                for more demanding tasks.
              </p>
            </div>
            <p className="mt-4 text-sm font-bold text-[#141B2B]">
              1. What is the main benefit of having habits according to the
              passage?
            </p>
            <ul className="mt-3 space-y-2.5">
              {READING_OPTS.map((opt, i) => {
                const selected = reading === i;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => setReading(i)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                        selected
                          ? "border-[#2b5ce6] bg-[#EEF2FF] font-semibold text-[#1D4ED8]"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                      }`}
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected
                            ? "border-[#2b5ce6] bg-[#2b5ce6] text-white"
                            : "border-[#CBD5E1]"
                        }`}
                      >
                        {selected ? <CheckMini /> : null}
                      </span>
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] ui-fade-up-delay-1">
            <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#7C3AED]">
              <HeadphoneIcon />
              LISTENING WARM-UP
            </p>
            <p className="mt-1 text-sm text-[#64748B]">
              Listen to the audio clip and answer the question.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#E2E8F0] px-4 py-3">
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-white transition hover:bg-[#6D28D9]"
                aria-label="Play"
              >
                <PlayIcon />
              </button>
              <div className="flex h-8 flex-1 items-center gap-0.5">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-[#C4B5FD]"
                    style={{ height: `${30 + ((i * 17) % 70)}%` }}
                  />
                ))}
              </div>
              <span className="shrink-0 text-xs font-medium tabular-nums text-[#64748B]">
                00:00 / 00:25
              </span>
            </div>
            <p className="mt-4 text-sm font-bold text-[#141B2B]">
              2. What is the main topic of the audio clip?
            </p>
            <ul className="mt-3 space-y-2.5">
              {LISTENING_OPTS.map((opt, i) => {
                const selected = listening === i;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => setListening(i)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                        selected
                          ? "border-[#7C3AED] bg-[#F5F3FF] font-semibold text-[#6D28D9]"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#DDD6FE]"
                      }`}
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected
                            ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                            : "border-[#CBD5E1]"
                        }`}
                      >
                        {selected ? <CheckMini /> : null}
                      </span>
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="inline-flex items-start gap-2 text-sm text-[#64748B]">
            <InfoIcon />
            Answer all questions or wait for the timer to end. The lesson will
            automatically move to the core content.
          </p>
          <Link
            href="/dashboard/skills/essay-development/core"
            className={`inline-flex h-11 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition ${
              answered
                ? "bg-[#2b5ce6] hover:bg-[#244FE6]"
                : "pointer-events-none bg-[#93C5FD]"
            }`}
          >
            Continue Now
          </Link>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 border-t border-[#E2E8F0] px-4 py-2.5 sm:px-6">
          <StepPill active icon={<SnowflakeIcon />} label="Ice-Breaker" time="2 min" />
          <StepPill icon={<BookIcon />} label="Core Content" time="6 min" />
          <StepPill icon={<PencilIcon />} label="Exit Assessment" time="2 min" />
        </div>
      </div>
    </DashboardShell>
  );
}

function StepPill({
  active,
  icon,
  label,
  time,
}: {
  active?: boolean;
  icon: ReactNode;
  label: string;
  time: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
        active
          ? "border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]"
          : "bg-[#F1F5F9] text-[#94A3B8]"
      }`}
    >
      <span className="inline-flex shrink-0" aria-hidden>
        {icon}
      </span>
      <span className="truncate">{label}</span>
      <span className="shrink-0 font-medium opacity-80">{time}</span>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M10 3.5 5.5 8 10 12.5" stroke="#141b2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M2.5 3h5A1.5 1.5 0 0 1 9 4.5v8A1.2 1.2 0 0 0 7.8 11.3H2.5V3ZM13.5 3H8.5A1.5 1.5 0 0 0 7 4.5v8A1.2 1.2 0 0 1 8.2 11.3h5.3V3Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3 9v2a1.5 1.5 0 0 0 1.5 1.5H5.5V9H4.5A1.5 1.5 0 0 0 3 10.5V9a5 5 0 1 1 10 0v1.5A1.5 1.5 0 0 1 11.5 9H10.5v3.5H11.5A1.5 1.5 0 0 0 13 11V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M3.5 2v8l7-4-7-4Z" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path d="M2 5.2 4 7l4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2V11M8 5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M8 2v12M3.5 4.5l9 7M12.5 4.5l-9 7M2 8h12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M9.2 3.5 12.5 6.8 5.5 13.8H2.2v-3.3L9.2 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8 4.7 11.3 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
