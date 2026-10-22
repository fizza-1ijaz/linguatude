"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const NOTES = [
  {
    id: 1,
    phrase: "City A experiences more extreme temperature variations",
    note: "This shows range and clear overview language for Task Achievement.",
  },
  {
    id: 2,
    phrase: "After that, it declines sharply,",
    note: "A precise description of the trend with clear sequencing.",
  },
  {
    id: 3,
    phrase: "Unlike City A, the temperature in City B remains relatively stable,",
    note: "Effective comparison language linking both data series.",
  },
  {
    id: 4,
    phrase: "the most notable feature is the greater fluctuation in City A,",
    note: "Strong summary sentence that highlights the key takeaway.",
  },
] as const;

const BAND7_PARAS = [
  "The line graph compares average monthly temperatures in City A and City B over a one-year period.",
  "Overall, City A experiences more extreme temperature variations than City B. Temperatures in City A rise steadily from January, peak in August, and After that, it declines sharply, finishing the year cooler than midsummer but warmer than January.",
  "Unlike City A, the temperature in City B remains relatively stable, with a gentler summer increase and a smaller winter drop. Both cities warm through spring and cool after late summer, yet the most notable feature is the greater fluctuation in City A, which suggests a more continental climate pattern.",
  "In summary, while both cities follow a broadly seasonal pattern, City A shows a wider annual range and a more pronounced summer peak than City B.",
] as const;

const BAND8_PARAS = [
  "The graph illustrates average monthly temperatures (°C) for City A and City B across twelve months.",
  "Overall, City A experiences more extreme temperature variations, climbing from a cool January to a pronounced August peak before falling again. After that, it declines sharply, returning toward cooler readings by December.",
  "Unlike City A, the temperature in City B remains relatively stable throughout the year, with a more modest mid-year rise. Comparatively, the most notable feature is the greater fluctuation in City A, particularly between late spring and early autumn.",
  "Taken together, the data indicate that City A has a more marked seasonal swing, whereas City B maintains a narrower temperature band across the year.",
] as const;

export function WritingModelAnswers() {
  const [band, setBand] = useState<7 | 8>(7);
  const [activeNote, setActiveNote] = useState<number | null>(1);
  const [compareOpen, setCompareOpen] = useState(true);
  const [showFull, setShowFull] = useState(true);

  const paragraphs = band === 7 ? BAND7_PARAS : BAND8_PARAS;

  const essayNodes = useMemo(() => {
    return paragraphs.map((para, pi) => {
      let remaining: string = para;
      const parts: ReactNode[] = [];
      NOTES.forEach((n) => {
        const idx = remaining.indexOf(n.phrase);
        if (idx === -1) return;
        if (idx > 0) parts.push(remaining.slice(0, idx));
        parts.push(
          <button
            key={`${pi}-${n.id}`}
            type="button"
            onClick={() => setActiveNote(n.id)}
            className={`rounded-sm px-0.5 font-semibold transition ${
              activeNote === n.id
                ? "bg-[#FFEDD5] text-[#C2410C] ring-1 ring-[#FDBA74]"
                : "bg-[#FFF7ED] text-[#EA580C] hover:bg-[#FFEDD5]"
            }`}
          >
            {n.phrase}
          </button>,
        );
        remaining = remaining.slice(idx + n.phrase.length);
      });
      if (remaining) parts.push(remaining);
      return (
        <p key={pi} className="text-sm leading-7 text-[#334155]">
          {parts.length ? parts : para}
        </p>
      );
    });
  }, [paragraphs, activeNote]);

  return (
    <DashboardShell
      title="Model Answers"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] min-h-0 flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard/writing/task1/feedback"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#64748B] transition hover:text-[#2b5ce6]"
        >
          <BackIcon />
          Back to Feedback
        </Link>
      }
    >
      <div className="mx-auto grid max-w-6xl flex-1 gap-5 pb-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="min-w-0 space-y-4 ui-fade-up">
          <div className="inline-flex rounded-xl bg-[#F1F5F9] p-1">
            <button
              type="button"
              onClick={() => setBand(7)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                band === 7
                  ? "bg-[#2b5ce6] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#141B2B]"
              }`}
            >
              Band 7
            </button>
            <button
              type="button"
              onClick={() => setBand(8)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                band === 8
                  ? "bg-[#2b5ce6] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#141B2B]"
              }`}
            >
              Band 8
            </button>
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] ui-fade-up-delay-1">
            <div className="p-5 sm:p-6">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
                <CalendarTiny />
                287 words
              </span>
              <div
                className={`mt-4 space-y-4 ${showFull ? "" : "max-h-48 overflow-hidden"}`}
              >
                {essayNodes}
              </div>
            </div>
            <div className="border-t border-[#E2E8F0] px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                className="mx-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-[#141B2B] transition hover:text-[#2b5ce6]"
              >
                {showFull ? (
                  <>
                    Show less
                    <ChevronUpBlack />
                  </>
                ) : (
                  <>
                    Show more
                    <ChevronDownBlack />
                  </>
                )}
              </button>
            </div>
          </section>

          <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm font-medium text-[#1E40AF] ui-fade-up-delay-2">
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FEF08A] text-[#CA8A04]">
              <BulbIcon />
            </span>
            Highlighted phrases show examples of effective language or structure.
          </div>
        </div>

        <aside className="hide-scrollbar max-h-[calc(100dvh-10.5rem)] space-y-4 overflow-y-auto overscroll-contain pb-2 lg:sticky lg:top-4 ui-fade-up-delay-1">
          <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm font-medium text-[#1E40AF]">
            <span className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            Tap highlighted phrases for teacher notes.
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#141B2B]">Teacher notes</h2>
              <span className="text-[#94A3B8]" aria-hidden>
                ⌄
              </span>
            </div>
            <ul className="mt-4 space-y-4">
              {NOTES.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setActiveNote(n.id)}
                    className={`w-full rounded-xl p-2 text-left transition ${
                      activeNote === n.id ? "bg-[#FFF7ED]" : "hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#FDBA74] text-xs font-bold text-[#EA580C]">
                        {n.id}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#141B2B]">{n.phrase}</p>
                        <p className="mt-1 text-sm leading-5 text-[#64748B]">
                          {n.note}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#94A3B8]">
              Tap a note to jump to it in the essay.
            </p>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
            <button
              type="button"
              onClick={() => setCompareOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <h2 className="text-base font-bold text-[#141B2B]">
                How does it compare to yours?
              </h2>
              <span className="text-[#94A3B8]" aria-hidden>
                {compareOpen ? "˄" : "˅"}
              </span>
            </button>

            {compareOpen ? (
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#EAECF0]">
                <table className="w-full min-w-[20rem] text-sm">
                  <thead>
                    <tr className="border-b border-[#EAECF0] bg-[#F8FAFC]">
                      <th className="px-3 py-2.5 text-left font-semibold text-[#64748B]" />
                      <th className="px-3 py-2.5 text-center font-semibold text-[#141B2B]">
                        Your response
                      </th>
                      <th className="px-3 py-2.5 text-center font-semibold text-[#141B2B]">
                        This model
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#EAECF0]">
                      <td className="px-3 py-3 font-medium text-[#141B2B]">
                        Word count
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-[#D97706]">
                        182 words
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-[#059669]">
                        287 words
                      </td>
                    </tr>
                    <tr className="border-b border-[#EAECF0]">
                      <td className="px-3 py-3 font-medium text-[#141B2B]">
                        Overall band
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-[#D97706]">
                        6.0
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-[#059669]">
                        7.0
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 font-medium text-[#141B2B]">
                        Your weakest criterion
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex rounded-full bg-[#F9F5FF] px-2.5 py-1 text-xs font-semibold text-[#7F56D9]">
                          Coherence &amp; Cohesion
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-[#059669]">
                        <p className="font-semibold">Strong in this area</p>
                        <p className="mt-0.5 text-xs leading-4">
                          Clear organisation and effective paragraphing.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="border-t border-[#EAECF0] px-3 py-2.5 text-xs text-[#667085]">
                  Comparisons are based on AI evaluation.
                </p>
              </div>
            ) : null}
          </section>
        </aside>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard/writing/task1/write"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            <RefreshIcon />
            Try This Task Again
          </Link>
          <Link
            href="/dashboard/writing/task1/feedback"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#F8FAFC]"
          >
            <BackIcon />
            Back to Feedback
          </Link>
        </div>
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

function CalendarTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 5.5h10M5 1.5v2M9 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M13 8a5 5 0 1 1-1.2-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 3.5V6.5H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path
        d="M6 1.5A3.2 3.2 0 0 0 4 7.2V8.5h4V7.2A3.2 3.2 0 0 0 6 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M4.5 9.5h3M5 10.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronUpBlack() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#141B2B]" fill="none" aria-hidden>
      <path
        d="M3.5 10 8 5.5 12.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownBlack() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#141B2B]" fill="none" aria-hidden>
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
