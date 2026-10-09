"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const OPTIONS = [
  "{Option A text}",
  "{Option B text}",
  "{Option C text}",
  "{Option D text}",
] as const;

export function LessonMidCheck() {
  const [activeQ, setActiveQ] = useState(3);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });
  const [seconds, setSeconds] = useState(272);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const allDone = [1, 2, 3, 4, 5, 6].every((n) => answered[n]);

  function selectOption(i: number) {
    setSelected(i);
    setAnswered((prev) => ({ ...prev, [activeQ]: true }));
  }

  return (
    <DashboardShell
      title={
        <span className="inline-flex flex-wrap items-center gap-2">
          Mid - Check
          <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
            In progress
          </span>
        </span>
      }
      subtitle="Check your understanding so far"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex flex-1 flex-col px-4 py-4 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href="/dashboard/skills/essay-development/core"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="hidden min-w-[10rem] text-center sm:block">
            <p className="text-xs font-medium text-[#64748B]">Question 4 of 12</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div className="h-full w-[33%] rounded-full bg-[#2b5ce6]" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-[#94A3B8]">
              Time Remaining
            </p>
            <p className="text-xl font-bold tabular-nums text-[#2b5ce6]">
              {mm}:{ss}
            </p>
          </div>
        </div>
      }
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-4 pb-24 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6 ui-fade-up">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#2b5ce6]">
            <BookIcon />
            READING PASSAGE
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[#475569]">
            <p>{"{Passage content will appear here...}"}</p>
            <p>The passage may contain multiple paragraphs...</p>
            <p>Click on any underlined word to see its definition.</p>
            <p>Use the passage to answer all the questions on the right.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6 ui-fade-up-delay-1">
          <p className="text-xs font-bold tracking-wide text-[#2b5ce6]">QUESTIONS</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const done = answered[n];
              const active = activeQ === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setActiveQ(n);
                    setSelected(null);
                  }}
                  className={`relative flex size-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                    active
                      ? "bg-[#2b5ce6] text-white"
                      : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                  }`}
                >
                  {n}
                  {done && !active ? (
                    <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[#22C55E] text-white">
                      <CheckMini />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-sm font-bold text-[#141B2B]">
            {"{Question text will appear here.}"}
          </p>

          <ul className="mt-4 space-y-2.5">
            {OPTIONS.map((opt, i) => {
              const active = selected === i;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => selectOption(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                      active
                        ? "border-[#2b5ce6] bg-[#EEF2FF] font-semibold text-[#1D4ED8]"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                    }`}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        active
                          ? "border-[#2b5ce6] bg-[#2b5ce6] text-white"
                          : "border-[#CBD5E1]"
                      }`}
                    >
                      {active ? <CheckMini /> : null}
                    </span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#F1F5F9] text-xs font-bold text-[#141B2B]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-sm text-[#64748B]">
            <AlertCircle />
            Answer all questions to continue
          </p>
          {allDone ? (
            <Link
              href="/dashboard/skills/essay-development/exit-assessment"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              Continue
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-xl bg-[#E2E8F0] px-5 text-sm font-semibold text-[#94A3B8]"
            >
              Answer all questions to continue
            </button>
          )}
        </div>
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

function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M2.5 3h5A1.5 1.5 0 0 1 9 4.5v8A1.2 1.2 0 0 0 7.8 11.3H2.5V3ZM13.5 3H8.5A1.5 1.5 0 0 0 7 4.5v8A1.2 1.2 0 0 1 8.2 11.3h5.3V3Z" stroke="currentColor" strokeWidth="1.3" />
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

function AlertCircle() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#94A3B8]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
