"use client";

import Link from "next/link";
import { useState } from "react";

const OPTIONS = [
  "They increase the cost of housing.",
  "They improve air quality.",
  "They encourage higher building development.",
  "They reduce traffic congestion.",
] as const;

const PARAS = [
  {
    letter: "A",
    highlight: false,
    text: "Urban planners increasingly recognise that access to nature is not a luxury but a core part of healthy city design. Parks, tree-lined streets, and community gardens help soften dense built environments and give residents everyday contact with greenery.",
  },
  {
    letter: "B",
    highlight: true,
    text: "Vegetation in cities improves air quality by filtering pollutants and releasing oxygen. Green cover also cools surrounding streets, reducing the urban heat island effect and making outdoor spaces more comfortable during warmer months.",
  },
  {
    letter: "C",
    highlight: false,
    text: "Beyond the environment, these spaces support social life. Neighbourhood parks become places where people meet, exercise, and recover from daily stress, strengthening community ties across different age groups.",
  },
] as const;

export function LessonReading() {
  const [selected, setSelected] = useState(1);
  const answered = selected != null;

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FB]">
      <header className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link
            href="/dashboard/skills/lesson-paused"
            className="inline-flex size-9 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#F1F5F9]"
            aria-label="Close"
          >
            <CloseIcon />
          </Link>
          <span className="rounded-full bg-[#2b5ce6] px-3 py-1 text-[0.6875rem] font-bold tracking-wide text-white">
            CORE LESSON
          </span>
          <span className="truncate text-sm font-semibold text-[#334155]">
            Reading Comprehension
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-[#475569] sm:gap-4">
          <span className="inline-flex items-center gap-1.5 font-semibold tabular-nums text-[#141B2B]">
            <TimerIcon />
            04:30
          </span>
          <span className="hidden font-medium sm:inline">Question 2 of 5</span>
          <div className="hidden gap-1 sm:flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-5 rounded-full ${i < 2 ? "bg-[#2b5ce6]" : "bg-[#E2E8F0]"}`}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.16)] sm:p-6 ui-fade-up">
          <h1 className="text-xl font-bold text-[#141B2B] sm:text-2xl">
            The Rise of Urban Green Spaces
          </h1>
          <p className="mt-2 inline-flex items-start gap-1.5 text-sm text-[#64748B]">
            <InfoTiny />
            Read the passage and answer the questions on the right.
          </p>
          <div className="my-4 border-t border-[#E2E8F0]" />
          <div className="space-y-4">
            {PARAS.map((p) => (
              <div
                key={p.letter}
                className={`flex gap-3 rounded-xl p-3 ${
                  p.highlight ? "bg-[#EFF6FF]" : ""
                }`}
              >
                <span
                  className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    p.highlight ? "bg-[#2b5ce6]" : "bg-[#94A3B8]"
                  }`}
                >
                  {p.letter}
                </span>
                <p className="text-sm leading-7 text-[#334155]">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col ui-fade-up-delay-1">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#2b5ce6] text-xs font-bold text-white">
              2
            </span>
            <span className="text-xs font-bold tracking-wide text-[#2b5ce6]">
              MULTIPLE CHOICE
            </span>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-[#141B2B]">
            What is one of the environmental benefits of urban green spaces
            mentioned in paragraph B?
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs italic text-[#64748B]">
            <EyeIcon />
            Paragraph B is highlighted for reference.
          </p>

          <ul className="mt-4 space-y-2.5">
            {OPTIONS.map((opt, i) => {
              const active = selected === i;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3.5 text-left text-sm transition ${
                      active
                        ? "border-[#2b5ce6] bg-[#F8FAFF] font-semibold text-[#1D4ED8]"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                    }`}
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active
                          ? "bg-[#2b5ce6] text-white"
                          : "bg-[#E2E8F0] text-[#475569]"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {active ? <CheckCircle /> : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-2.5 border-t border-[#E2E8F0] pt-4">
            <p className="text-center text-sm text-[#64748B]">3 questions remaining.</p>
            <button
              type="button"
              disabled={!answered}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#BFDBFE] text-sm font-semibold text-[#475569]"
            >
              <LockTiny />
              Answer all questions to continue
            </button>
            <Link
              href="/dashboard/skills/progress-updated"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              Submit answers
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#64748B]" fill="none" aria-hidden>
      <circle cx="8" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 6v3l2 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.5 2.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="mt-0.5 size-3.5 shrink-0" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6.2V10M7 4.2h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M1.5 7s2.2-3.5 5.5-3.5S12.5 7 12.5 7s-2.2 3.5-5.5 3.5S1.5 7 1.5 7Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 10.2 9 12.5 13.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
