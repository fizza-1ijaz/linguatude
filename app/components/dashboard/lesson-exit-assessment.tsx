"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const OPTIONS = [
  "They increase the cost of housing.",
  "They improve air quality.",
  "They encourage higher building development.",
  "They reduce traffic congestion.",
] as const;

const PASSAGE = [
  {
    letter: "A",
    text: "Urban green spaces are areas of vegetation within cities, such as parks, community gardens, and green roofs. These spaces provide a natural environment that residents can access without leaving the city. They have become increasingly important as urban populations continue to grow worldwide.",
  },
  {
    letter: "B",
    text: "Research has shown that urban green spaces offer numerous benefits. They improve air quality by absorbing pollutants and producing oxygen. They also help reduce the urban heat island effect, where cities become significantly warmer than surrounding rural areas. Additionally, these spaces provide opportunities for physical activity, which contributes to better health outcomes for residents.",
  },
  {
    letter: "C",
    text: "Furthermore, urban green spaces can enhance mental well-being. Studies indicate that spending time in green environments reduces stress, improves mood, and increases overall life satisfaction. They also foster community interaction and social cohesion, as they serve as gathering places for people from diverse backgrounds.",
  },
] as const;

export function LessonExitAssessment() {
  const [selected, setSelected] = useState(1);
  const [seconds, setSeconds] = useState(112);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const canContinue = selected != null;

  return (
    <DashboardShell
      title="Exit Assessment"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-4 sm:px-[1cm] lg:px-[1cm]"
      headerLeft={
        <Link
          href="/dashboard/skills/essay-development/mid-check"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="hidden min-w-[9rem] text-center sm:block">
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
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-4 pb-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6 ui-fade-up">
          <h2 className="text-base font-bold text-[#141B2B]">Passage</h2>
          <div className="my-3 border-t border-[#E2E8F0]" />
          <h3 className="text-xl font-bold text-[#141B2B]">
            The Impact of Urban Green Spaces
          </h3>
          <div className="mt-5 space-y-5">
            {PASSAGE.map((p) => (
              <div key={p.letter} className="flex gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
                  {p.letter}
                </span>
                <p className="text-sm leading-7 text-[#334155]">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 border-t border-[#E2E8F0] pt-4 text-xs font-medium text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-[#FDE68A]" />
              Topic sentence
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-sm bg-[#A5F3FC]" />
              Supporting detail / Example
            </span>
          </div>
        </section>

        <div className="flex flex-col gap-3 ui-fade-up-delay-1">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Question</h2>
            <div className="my-3 border-t border-[#E2E8F0]" />
            <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
              Multiple Choice — Single Answer
            </span>
            <p className="mt-4 text-sm font-bold leading-6 text-[#141B2B]">
              1. What is one of the environmental benefits of urban green spaces
              mentioned in paragraph B?
            </p>
            <ul className="mt-4 space-y-2.5">
              {OPTIONS.map((opt, i) => {
                const active = selected === i;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                        active
                          ? "border-[#2b5ce6] bg-[#F8FAFF] font-semibold text-[#1D4ED8]"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                      }`}
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          active ? "border-[#2b5ce6] bg-[#2b5ce6]" : "border-[#CBD5E1]"
                        }`}
                      >
                        {active ? (
                          <span className="size-1.5 rounded-full bg-white" />
                        ) : null}
                      </span>
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="flex flex-col gap-3 rounded-2xl bg-[#FEF3C7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#B45309]">
              <WarnIcon />
              Answer all questions to continue
            </p>
            <Link
              href="/dashboard/skills/essay-development/exit-assessment/complete"
              className={`inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6] ${
                canContinue ? "" : "pointer-events-none opacity-90"
              }`}
            >
              Answer all questions to continue
            </Link>
          </div>
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

function WarnIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.5 14 13.5H2L8 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6.5v3M8 11.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
