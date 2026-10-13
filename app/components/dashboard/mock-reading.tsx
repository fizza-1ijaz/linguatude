"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const PASSAGES = ["Passage 1", "Passage 2", "Passage 3"] as const;

const QUESTIONS = [
  {
    n: 1,
    text: "What is the main purpose of the passage?",
    options: [
      "To criticise city planning policies.",
      "To explain the importance of urban green spaces.",
      "To compare rural and urban lifestyles.",
      "To describe a historical park system.",
    ],
  },
  {
    n: 2,
    text: "According to the passage, what is one benefit of urban green spaces?",
    options: [
      "Increased traffic congestion",
      "Improved air quality",
      "Higher housing costs",
      "Reduced community interaction",
    ],
  },
  {
    n: 3,
    text: "What do green corridors support according to paragraph B?",
    options: [
      "Public transport networks",
      "Biodiversity by connecting habitats",
      "Commercial development",
      "Underground utilities",
    ],
  },
  {
    n: 4,
    text: "Which paragraph discusses mental well-being?",
    options: ["Paragraph A", "Paragraph B", "Paragraph C", "None of the above"],
  },
  {
    n: 5,
    text: "Urban green spaces are described as becoming more important because:",
    options: [
      "Rural areas are shrinking",
      "Urban populations continue to grow",
      "Governments ban parks",
      "Tourism has declined",
    ],
  },
] as const;

const ANSWERED = new Set([1, 2, 6, 10]);
const FLAGGED_DEFAULT = new Set([4, 9, 37]);

export function MockReading() {
  const [passage, setPassage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({ 1: 1, 2: 1 });
  const [flagged, setFlagged] = useState<Set<number>>(new Set([3, ...FLAGGED_DEFAULT]));
  const [current, setCurrent] = useState(3);
  const [sectionLeft, setSectionLeft] = useState(9 * 60 + 42);
  const [elapsed, setElapsed] = useState(2 * 60 + 18);
  const [flagTip, setFlagTip] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSectionLeft((s) => (s > 0 ? s - 1 : 0));
      setElapsed((e) => e + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(sectionLeft / 60)).padStart(2, "0");
  const ss = String(sectionLeft % 60).padStart(2, "0");
  const totalH = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const totalM = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const totalS = String(elapsed % 60).padStart(2, "0");

  function toggleFlag(n: number) {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  const navNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "...", 36, 37, 38, 39, 40] as const;

  return (
    <DashboardShell
      title={
        <span className="inline-flex items-center gap-2">
          <BookIcon />
          Reading
        </span>
      }
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-4 sm:px-[1cm] lg:px-[1cm]"
      headerRight={
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="rounded-full bg-[#2b5ce6] px-5 py-1.5 text-sm font-bold tabular-nums text-white">
            {mm}:{ss}
          </span>
          <p className="hidden text-sm font-medium tabular-nums text-[#64748B] sm:block">
            Total: {totalH}:{totalM}:{totalS}
          </p>
        </div>
      }
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 pb-36 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6">
          <div className="flex gap-1 border-b border-[#E2E8F0]">
            {PASSAGES.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setPassage(i)}
                className={`px-3 py-2 text-sm font-semibold transition ${
                  passage === i
                    ? "border-b-2 border-[#2b5ce6] text-[#2b5ce6]"
                    : "text-[#94A3B8] hover:text-[#64748B]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <h2 className="mt-5 text-xl font-bold text-[#141B2B]">
            The Impact of Urban Green Spaces
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-[#334155]">
            <p>
              Urban green spaces include parks, gardens, tree-lined streets, and other
              vegetated areas within cities. They provide residents with access to nature
              and play an important role in making dense urban environments more liveable.
            </p>
            <p>
              These spaces improve air quality, help reduce the urban heat island effect,
              and create opportunities for physical activity. In many cities, green
              corridors also support biodiversity by connecting habitats that would
              otherwise be fragmented.
            </p>
            <p>
              Beyond environmental benefits, green spaces can support mental well-being by
              offering places for rest, social connection, and recovery from daily stress.
            </p>
          </div>
        </section>

        <section className="min-w-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6 lg:p-7">
          <h2 className="text-base font-bold text-[#141B2B]">Questions 1–5</h2>
          <p className="mt-1 text-sm text-[#64748B]">Choose the correct answer.</p>
          <div className="mt-3 border-t border-[#E2E8F0]" />

          <div className="mt-1">
            {QUESTIONS.map((q, qi) => {
              const isFlagged = flagged.has(q.n);
              return (
                <div
                  key={q.n}
                  className={`${qi > 0 ? "border-t border-[#E2E8F0]" : ""} py-4`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                        current === q.n
                          ? "border-2 border-[#2b5ce6] bg-[#DBEAFE] text-[#1D4ED8]"
                          : "bg-[#DBEAFE] text-[#1D4ED8]"
                      }`}
                    >
                      {q.n}
                    </span>
                    <p className="min-w-0 flex-1 text-sm font-bold text-[#141B2B]">
                      {q.text}
                    </p>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleFlag(q.n)}
                        onMouseEnter={() => setFlagTip(q.n)}
                        onMouseLeave={() => setFlagTip(null)}
                        className={`inline-flex items-center gap-1 ${
                          isFlagged ? "text-[#EA580C]" : "text-[#CBD5E1]"
                        }`}
                        aria-label={isFlagged ? "Remove flag" : "Flag for review"}
                      >
                        <FlagIcon filled={isFlagged} />
                        {isFlagged ? (
                          <span className="text-xs font-bold">Flagged</span>
                        ) : null}
                      </button>
                      {flagTip === q.n && !isFlagged ? (
                        <span className="absolute -top-8 right-0 whitespace-nowrap rounded bg-[#141B2B] px-2 py-1 text-[0.625rem] font-medium text-white">
                          Flag for review
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 pl-9">
                    {q.options.map((opt, i) => {
                      const active = answers[q.n] === i;
                      return (
                        <li key={opt}>
                          <button
                            type="button"
                            onClick={() => {
                              setAnswers((prev) => ({ ...prev, [q.n]: i }));
                              setCurrent(q.n);
                            }}
                            className={`flex w-full items-center gap-2.5 text-left text-sm transition ${
                              active
                                ? "font-semibold text-[#1D4ED8]"
                                : "text-[#475569] hover:text-[#141B2B]"
                            }`}
                          >
                            <span
                              className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                                active ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                              }`}
                            >
                              {active ? (
                                <span className="size-1.5 rounded-full bg-[#2b5ce6]" />
                              ) : null}
                            </span>
                            {String.fromCharCode(65 + i)}. {opt}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white px-[1cm] py-3 sm:px-[1cm] lg:px-[1cm]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  className="flex h-8 min-w-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-2 text-xs font-bold text-[#64748B]"
                >
                  All
                </button>
                {navNums.map((n) =>
                  n === "..." ? (
                    <span key="ellipsis" className="px-1 text-sm text-[#94A3B8]">
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCurrent(n)}
                      className={`relative flex size-8 items-center justify-center rounded-md text-xs font-bold transition ${
                        flagged.has(n)
                          ? "bg-[#F97316] text-white"
                          : ANSWERED.has(n) || answers[n] != null
                            ? "bg-[#2b5ce6] text-white"
                            : current === n
                              ? "border-2 border-[#2b5ce6] bg-white text-[#2b5ce6]"
                              : "border border-[#E2E8F0] bg-white text-[#64748B]"
                      }`}
                    >
                      {n}
                      {flagged.has(n) ? (
                        <span className="absolute right-0 top-0 size-0 border-t-[6px] border-r-[6px] border-t-transparent border-r-white/40" />
                      ) : null}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-md border border-[#E2E8F0] bg-white text-[#64748B]"
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded-sm border border-[#CBD5E1] bg-white" />
                  Unanswered
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded-sm bg-[#2b5ce6]" />
                  Answered
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative size-3 rounded-sm bg-[#F97316]">
                    <span className="absolute right-0 top-0 size-0 border-t-[4px] border-r-[4px] border-t-transparent border-r-white/50" />
                  </span>
                  Flagged
                </span>
              </div>
            </div>
            <Link
              href="/dashboard/mock/writing"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              Submit Reading
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path
        d="M3.5 4.2h5.2v9.6H4.8A1.3 1.3 0 0 0 3.5 15.1V4.2Zm6 0h5v9.6h-3.9a1.3 1.3 0 0 0-1.3 1.3V4.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlagIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M3 12V2.5h.3l1.2.9L6.5 2.5l2 1 2.2-1V9l-2.2 1-2-1-2 1L3.3 9.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
