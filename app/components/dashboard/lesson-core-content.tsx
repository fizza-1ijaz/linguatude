"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const Q4 = [
  "To criticise city planning policies.",
  "To explain the importance of urban green spaces.",
  "To compare rural and urban lifestyles.",
  "To describe a historical park system.",
] as const;

const Q5 = [
  "They increase traffic congestion.",
  "They improve air quality and cool urban areas.",
  "They reduce access to public transport.",
  "They limit opportunities for exercise.",
] as const;

export function LessonCoreContent() {
  const [q4, setQ4] = useState(1);
  const [q5, setQ5] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(272);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <DashboardShell
      title={
        <span className="inline-flex flex-wrap items-center gap-2">
          Core Content
          <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
            6 minutes
          </span>
        </span>
      }
      subtitle="Delivers the primary skill content."
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex flex-1 flex-col px-4 py-4 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href="/dashboard/skills/essay-development/ice-breaker"
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
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 pb-24">
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 ui-fade-up">
          <span className="mt-0.5 text-[#2b5ce6]">
            <ClockIcon />
          </span>
          <p className="text-sm text-[#1E40AF]">
            This is the Core Content (6 minutes). Study the content and answer
            the questions.
          </p>
        </div>

        <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="ui-fade-up">
            <p className="mb-3 text-sm text-[#64748B]">
              Read the passage and answer the questions that follow.
            </p>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6">
              <h2 className="text-xl font-bold text-[#141B2B]">
                The Impact of Urban Green Spaces
              </h2>
              <div className="mt-5 space-y-5">
                <PassageBlock letter="A">
                  Urban green spaces include parks, gardens, tree-lined streets,
                  and other vegetated areas within cities. They provide residents
                  with access to nature and play an important role in making
                  dense urban environments more liveable.
                </PassageBlock>
                <PassageBlock letter="B">
                  These spaces improve air quality, help reduce the urban heat
                  island effect, and create opportunities for physical activity.
                  In many cities, green corridors also support biodiversity by
                  connecting habitats that would otherwise be fragmented.
                </PassageBlock>
                <PassageBlock letter="C">
                  Beyond environmental benefits, green spaces can support mental
                  well-being by offering places for rest, social connection, and
                  recovery from daily stress.
                </PassageBlock>
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
            </div>
          </section>

          <section className="space-y-5 ui-fade-up-delay-1">
            <h2 className="text-lg font-bold text-[#141B2B]">Questions</h2>
            <QuestionBlock
              number={4}
              prompt="What is the main purpose of the passage?"
              options={Q4}
              selected={q4}
              onSelect={setQ4}
            />
            <QuestionBlock
              number={5}
              prompt="According to the passage, what is one environmental benefit of urban green spaces?"
              options={Q5}
              selected={q5}
              onSelect={setQ5}
            />
          </section>
        </div>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm font-medium text-[#475569]">
            <button type="button" className="inline-flex items-center gap-1.5 transition hover:text-[#2b5ce6]">
              <BookmarkIcon />
              Bookmark
            </button>
            <button type="button" className="transition hover:text-[#2b5ce6]">
              Show Word Count
            </button>
          </div>
          <Link
            href="/dashboard/skills/essay-development/mid-check"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Continue
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function PassageBlock({
  letter,
  children,
}: {
  letter: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
        {letter}
      </span>
      <p className="text-sm leading-7 text-[#334155]">{children}</p>
    </div>
  );
}

function QuestionBlock({
  number,
  prompt,
  options,
  selected,
  onSelect,
}: {
  number: number;
  prompt: string;
  options: readonly string[];
  selected: number | null;
  onSelect: (i: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-[#141B2B]">
        {number}. {prompt}
      </p>
      <ul className="mt-3 space-y-2.5">
        {options.map((opt, i) => {
          const active = selected === i;
          return (
            <li key={opt}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                  active
                    ? "border-[#2b5ce6] border-l-[3px] bg-[#F8FAFF] font-semibold text-[#1D4ED8]"
                    : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                }`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? "border-[#2b5ce6] bg-[#2b5ce6] text-white" : "border-[#CBD5E1]"
                  }`}
                >
                  {active ? <CheckMini /> : null}
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 2.5h8v11l-4-2.5-4 2.5v-11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
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
