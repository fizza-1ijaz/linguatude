"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CRITERIA = [
  {
    label: "Task Achievement",
    value: 7.0,
    color: "bg-[#2b5ce6]",
    track: "bg-[#DBEAFE]",
  },
  {
    label: "Coherence & Cohesion",
    value: 7.5,
    color: "bg-[#7C3AED]",
    track: "bg-[#EDE9FE]",
  },
  {
    label: "Lexical Resource",
    value: 6.5,
    color: "bg-[#16A34A]",
    track: "bg-[#DCFCE7]",
  },
  {
    label: "Grammatical Range & Accuracy",
    value: 6.5,
    color: "bg-[#EA580C]",
    track: "bg-[#FFEDD5]",
  },
] as const;

const STRENGTHS = [
  {
    title: "Clear overview of main trends",
    quote: "Overall, both cities experienced a rise in temperature...",
  },
  {
    title: "Relevant comparisons included",
    quote: "City A peaked higher than City B in August...",
  },
] as const;

const IMPROVEMENTS = [
  {
    tag: "Task Achievement",
    tagColor: "text-[#2b5ce6]",
    title: "More precise data reporting",
    description: "Use more exact figures and comparison language.",
    example: "*temperatures went up and down*",
  },
  {
    tag: "Coherence & Cohesion",
    tagColor: "text-[#7C3AED]",
    title: "Smoother paragraph links",
    description: "Add clearer transitions between overview and details.",
    example: "*Also the other city was different*",
  },
  {
    tag: "Grammar",
    tagColor: "text-[#EA580C]",
    title: "Complex sentence accuracy",
    description: "Watch article use and subject–verb agreement in longer sentences.",
    example: "*City A increase a lot*",
  },
] as const;

const SENTENCE_IMPROVEMENTS = [
  {
    wrote: "The temperature in city A increased a lot from January to May.",
    try: "The temperature in City A increased significantly from January to May.",
    why: "Uses a more precise adverb (significantly) and corrects capitalization.",
  },
  {
    wrote: "City B was more stable than city A.",
    try: "City B remained more stable than City A throughout the year.",
    why: "Adds timeframe and improves formality for Task 1.",
  },
  {
    wrote: "In August it was the highest.",
    try: "In August, City A reached its highest point at approximately 32°C.",
    why: "Names the city and includes a precise figure.",
  },
  {
    wrote: "Both cities went down after summer.",
    try: "Both cities experienced a gradual decline after the summer peak.",
    why: "Uses more academic phrasing for describing trends.",
  },
] as const;

export function WritingTask1Feedback() {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const current = SENTENCE_IMPROVEMENTS[sentenceIndex];

  return (
    <DashboardShell
      title="Your Feedback"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-6 lg:px-8"
      headerLeft={
        <Link
          href="/dashboard/writing"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#475569] transition hover:text-[#2b5ce6]"
        >
          <BackIcon />
          Back to Writing Hub
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC]"
          >
            <ShareIcon />
            Share result
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] transition hover:bg-[#F8FAFC]"
            aria-label="More"
          >
            <DotsIcon />
          </button>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-10 lg:gap-5">
        {/* Top row */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.14)] sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="relative mx-auto flex size-[7.5rem] shrink-0 items-center justify-center sm:mx-0 sm:size-[8.5rem]">
                <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" aria-hidden>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#DCFCE7" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${0.78 * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="relative text-center">
                  <p className="text-3xl font-bold tabular-nums text-[#141B2B]">7.0</p>
                  <p className="text-[0.6875rem] font-medium text-[#64748B]">
                    Estimated Band
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Task 1 — Academic
                </span>
                <h2 className="mt-2 text-xl font-bold text-[#141B2B]">
                  Line Graph Description
                </h2>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                  <CheckMini />
                  182 words — good length
                </span>
                <p className="mt-2 inline-flex items-center gap-1 text-[0.6875rem] font-medium text-[#94A3B8]">
                  <CalendarTiny />
                  Submitted: May 23, 2026 • 10:32 AM
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] px-3.5 py-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              <p className="text-sm leading-5 text-[#334155]">
                Estimated by Linguatude from your practice performance. Not an
                official IELTS result.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.14)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#141B2B]">Criterion Scores</h2>
              <button
                type="button"
                className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
              >
                How scoring works
              </button>
            </div>
            <ul className="mt-4 space-y-4">
              {CRITERIA.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[#334155]">{c.label}</p>
                      <p className="text-sm font-bold tabular-nums text-[#141B2B]">
                        {c.value.toFixed(1)}{" "}
                        <span className="font-medium text-[#94A3B8]">/ 9</span>
                      </p>
                    </div>
                    <div className={`h-2 overflow-hidden rounded-full ${c.track}`}>
                      <div
                        className={`h-full rounded-full ${c.color}`}
                        style={{ width: `${(c.value / 9) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ›
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Overall + adjustments */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#BFDBFE]/70 bg-[#F5F8FF] p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
                <ChatIcon />
              </span>
              <h2 className="text-base font-bold text-[#141B2B]">Overall</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#334155]">
              You have provided a clear overview of the trends in the graph and
              included relevant comparisons{" "}
              <strong>
                between the two cities. Your data selection is appropriate, and
                your vocabulary is varied.
              </strong>{" "}
              To reach a higher band, focus on improving complex sentence
              accuracy and ensuring smoother transitions between ideas.
            </p>
          </section>

          <section className="rounded-2xl border border-[#FDE68A]/80 bg-[#FFFBEB] p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C]">
                <WarnTriangle />
              </span>
              <h2 className="text-base font-bold text-[#141B2B]">
                No score adjustments applied
              </h2>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-3 text-sm font-medium text-[#15803D]">
              <span className="text-[#16A34A]">✓</span>
              Your score was evaluated without adjustments.
            </div>
          </section>
        </div>

        {/* Strengths + improve */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                <ThumbsUpIcon />
              </span>
              <h2 className="text-base font-bold text-[#141B2B]">What you did well</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {STRENGTHS.map((s) => (
                <li
                  key={s.title}
                  className="rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#16A34A] bg-white px-4 py-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white">
                      <CheckMini />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#141B2B]">{s.title}</p>
                      <p className="mt-1 text-sm italic text-[#64748B]">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626]">
                <WarnTriangle />
              </span>
              <h2 className="text-base font-bold text-[#141B2B]">Areas to improve</h2>
            </div>
            <ul className="mt-4 divide-y divide-[#FECACA]/70">
              {IMPROVEMENTS.map((row) => (
                <li
                  key={row.title}
                  className="grid items-start gap-x-3 gap-y-1.5 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[8.75rem_minmax(0,1fr)_minmax(9rem,11rem)_1rem] sm:items-center"
                >
                  <span className={`text-xs font-bold leading-5 ${row.tagColor}`}>
                    {row.tag}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#141B2B]">{row.title}</p>
                    <p className="mt-0.5 text-sm leading-5 text-[#64748B]">
                      {row.description}
                    </p>
                  </div>
                  <p className="text-sm italic leading-5 text-[#E11D48] sm:text-right">
                    &ldquo;{row.example}&rdquo;
                  </p>
                  <span
                    className="hidden self-center justify-self-end text-base font-semibold text-[#2b5ce6] sm:block"
                    aria-hidden
                  >
                    ›
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sentence improvements + phrasing */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#141B2B]">
                Sentence improvements
              </h2>
              <button
                type="button"
                onClick={() => setShowSuggestions((v) => !v)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
              >
                {showSuggestions ? "Hide suggestions" : "Show suggestions"}
                <span
                  className={`inline-block transition ${showSuggestions ? "" : "rotate-180"}`}
                  aria-hidden
                >
                  ⌄
                </span>
              </button>
            </div>

            {showSuggestions ? (
              <>
                <div className="mt-4 rounded-2xl bg-[#F3F5FE] p-4 sm:p-5">
                  <div className="relative grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                      <p className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-wide text-[#64748B]">
                        <PencilTiny />
                        YOU WROTE
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#334155]">
                        {current.wrote}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                      <p className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-wide text-[#16A34A]">
                        <BulbTiny className="text-[#16A34A]" />
                        TRY THIS
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#334155]">
                        {current.try}
                      </p>
                    </div>
                    <span className="absolute left-1/2 top-1/2 z-10 hidden size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#2b5ce6] shadow-sm sm:flex">
                      <ArrowRightIcon />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#1E40AF]">
                    <strong>Why this is better:</strong> {current.why}
                  </p>
                </div>
                <div className="mt-4 flex justify-center gap-1.5">
                  {SENTENCE_IMPROVEMENTS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSentenceIndex(i)}
                      className={`size-2 rounded-full transition ${
                        i === sentenceIndex ? "bg-[#1D4ED8]" : "bg-[#C7D2FE]"
                      }`}
                      aria-label={`Suggestion ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#FFF2E6] text-[#F59E0B]">
                <BulbTiny className="size-4" />
              </span>
              <h2 className="text-base font-bold text-[#141B2B]">Better phrasing</h2>
            </div>
            <div className="mt-5 flex gap-3">
              <span className="mt-1 text-4xl leading-none text-[#DBEAFE]" aria-hidden>
                “
              </span>
              <div className="min-w-0">
                <p className="text-xl font-bold leading-snug text-[#141B2B]">
                  &ldquo;experienced a gradual increase&rdquo;
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Use this structure to describe steady upward trends.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText("experienced a gradual increase");
              }}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#2b5ce6] bg-white text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
            >
              <CopyIcon />
              Copy phrase
            </button>
          </section>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/writing/task1/model-answers"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            <DocSearchIcon />
            See Model Answers →
          </Link>
          <Link
            href="/dashboard/writing/task1"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#2b5ce6] bg-white px-6 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Try Another Task
          </Link>
        </div>

        <p className="text-center text-sm text-[#94A3B8]">
          ✓ Your feedback is saved in your writing history.
        </p>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <circle cx="12" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="m5.6 7.2 4.8-2.4M5.6 8.8l4.8 2.4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <circle cx="8" cy="3.5" r="1.2" />
      <circle cx="8" cy="8" r="1.2" />
      <circle cx="8" cy="12.5" r="1.2" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path
        d="M2 5.2 4 7l4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3" fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 5.5h10M5 1.5v2M9 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 4.5A2 2 0 0 1 5 2.5h6A2 2 0 0 1 13 4.5v4A2 2 0 0 1 11 10.5H7.5L5 13v-2.5H5A2 2 0 0 1 3 8.5v-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarnTriangle() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M8 2.5 14 13H2L8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 6.5v3M8 11.2v.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M5.5 7V13.5H3.5A1 1 0 0 1 2.5 12.5v-4A1 1 0 0 1 3.5 7H5.5ZM5.5 7l2-3.5A1.5 1.5 0 0 1 9 2.5h.5v3H13a1 1 0 0 1 1 1.2l-.8 4A1.5 1.5 0 0 1 11.7 12H5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3 7h8M8 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path
        d="m2.5 9.5.8-2.8L8.5 1.5l2 2L5.3 8.7 2.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbTiny({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      <path
        d="M4.5 9h3M5 10.5h2M6 1.5a3 3 0 0 0-1.7 5.4c.3.2.5.6.5 1V8h2.4v-.1c0-.4.2-.8.5-1A3 3 0 0 0 6 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.5 5.5V3.5A1 1 0 0 0 9.5 2.5h-6A1 1 0 0 0 2.5 3.5v6a1 1 0 0 0 1 1h2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function DocSearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M4 2.5h5l3 3V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="m10 10.5 1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
