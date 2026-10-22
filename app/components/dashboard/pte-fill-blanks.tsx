"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { PteTaskHeaderRight } from "@/app/components/dashboard/pte-shared";

const OPTIONS = [
  ["pressure", "vary", "waste", "demand"],
  ["differ", "remain", "increase", "decline"],
  ["pattern", "variation", "policy", "market"],
  ["higher", "lower", "equal", "random"],
  ["costs", "delays", "routes", "fees"],
  ["habits", "culture", "education", "tourism"],
] as const;

const PARAS: {
  before: string;
  after: string;
  blank: number;
}[][] = [
  [
    {
      before: "Container-deposit schemes have been introduced to encourage recycling and reduce ",
      after: " on landfill.",
      blank: 0,
    },
  ],
  [
    {
      before: "Since their expansion across Australia, participation levels ",
      after: " considerably between states and territories. Several factors explain this ",
      blank: 1,
    },
    {
      before: "",
      after: " including awareness campaigns, access to return points, and local regulations.",
      blank: 2,
    },
  ],
  [
    {
      before: "Studies show that regions with higher population density and more convenient refund locations tend to achieve ",
      after: " return rates. In contrast, remote areas face challenges such as transportation ",
      blank: 3,
    },
    {
      before: "",
      after: " and fewer collection centres.",
      blank: 4,
    },
  ],
  [
    {
      before: "To improve outcomes, governments and community groups are working together to promote recycling ",
      after: " and ensure the scheme remains effective and equitable for all residents.",
      blank: 5,
    },
  ],
];

export function PteFillBlanks() {
  const [answers, setAnswers] = useState<(string | null)[]>(
    () => Array(6).fill(null),
  );
  const [open, setOpen] = useState<number | null>(null);
  const completed = answers.filter(Boolean).length;

  function select(blank: number, value: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[blank] = value;
      return next;
    });
    setOpen(null);
  }

  return (
    <DashboardShell
      title="R&W Fill in the Blanks"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 pb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3 rounded-2xl bg-[#EFF6FF] px-4 py-4">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <DocIcon />
            </span>
            <p className="text-sm leading-6 text-[#334155]">
              Container-deposit schemes now operate Australia-wide. Return rates{" "}
              <span className="inline-flex rounded-md bg-[#BFDBFE] px-2 py-0.5 font-semibold text-[#1D4ED8]">
                vary
              </span>{" "}
              between regions.
            </p>
          </div>
          <div className="w-28 shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-[#EA580C]">08:45</p>
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Min:Sec
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div className="h-full w-3/4 rounded-full bg-[#F59E0B]" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-[#141B2B]">
            <span className="font-bold">{completed} / 6</span> Blanks to complete
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className={`size-2.5 rounded-full ${
                  answers[i] ? "bg-[#2b5ce6]" : i === 0 && !answers[0] ? "bg-[#2b5ce6]" : "bg-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="space-y-5 p-5 sm:p-6">
            {PARAS.map((parts, pi) => (
              <div key={pi} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
                  {pi + 1}
                </span>
                <p className="text-sm leading-7 text-[#334155]">
                  {parts.map((part) => (
                    <span key={`${part.blank}-${part.before.slice(0, 12)}`}>
                      {part.before}
                      <BlankSelect
                        blank={part.blank}
                        value={answers[part.blank]}
                        options={OPTIONS[part.blank]}
                        open={open === part.blank}
                        onToggle={() =>
                          setOpen((o) => (o === part.blank ? null : part.blank))
                        }
                        onSelect={(v) => select(part.blank, v)}
                      />
                      {part.after}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#EEF2FF] px-4 py-3 sm:px-5">
            <p className="inline-flex items-center gap-2 text-sm text-[#64748B]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              Select one option for each blank.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2b5ce6]"
            >
              Review
              <BookmarkTiny />
            </button>
          </div>
        </section>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(43,92,230,0.7)] transition hover:bg-[#244FE6]"
        >
          <SearchIcon />
          Check answer
        </button>

        <div className="rounded-full bg-[#EEF2FF] px-4 py-3 text-center text-sm text-[#475569]">
          <span className="mr-2 inline-block align-middle text-[#2b5ce6]">🛡</span>
          You can review your answers before checking. Partial credit is available
          per blank.
        </div>
      </div>
    </DashboardShell>
  );
}

function BlankSelect({
  blank,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  blank: number;
  value: string | null;
  options: readonly string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
}) {
  return (
    <span className="relative mx-1 inline-block align-middle">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex min-w-[5.5rem] items-center justify-between gap-1 rounded-lg border border-[#2b5ce6] bg-white px-2.5 py-1 text-sm font-semibold text-[#2b5ce6]"
      >
        {value ?? "Select"}
        <span aria-hidden>⌄</span>
      </button>
      {open ? (
        <span className="absolute left-0 top-full z-20 mt-1 min-w-[8rem] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className="block w-full px-3 py-2 text-left text-sm text-[#141B2B] hover:bg-[#EEF2FF]"
            >
              {opt}
            </button>
          ))}
        </span>
      ) : null}
      <span className="sr-only">Blank {blank + 1}</span>
    </span>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M5 2.5h5.5L14 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function BookmarkTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M4 2.5h6v9L7 9.5 4 11.5v-9Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
