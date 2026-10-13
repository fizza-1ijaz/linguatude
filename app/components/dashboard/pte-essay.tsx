"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { PteTaskHeaderRight } from "@/app/components/dashboard/pte-shared";

const SAMPLE = `Artificial intelligence is transforming labour markets at remarkable speed. While some roles disappear as automation handles routine tasks, new occupations emerge around building, supervising and interpreting AI systems.

I largely agree that AI creates new categories of work faster than it destroys old ones. History shows that major technologies—from electricity to the internet—initially displaced workers, then generated broader demand for complementary skills. Today, companies hire prompt engineers, AI safety analysts, data stewards and human-AI experience designers that barely existed a decade ago.

However, the transition is uneven. Workers in manufacturing and entry-level clerical jobs can face sharper short-term losses, and without retraining, the gains may concentrate among high-skill professionals. Governments and firms therefore need active reskilling programmes so that displaced workers can move into emerging roles.

Overall, AI is a net creator of work categories, but society must manage the transition carefully to ensure the benefits are widely shared.`;

export function PteEssay() {
  const [text, setText] = useState(SAMPLE);
  const words = useMemo(
    () => (text.trim() ? text.trim().split(/\s+/).length : 0),
    [text],
  );
  const inRange = words >= 200 && words <= 300;

  return (
    <DashboardShell
      title="Essay"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 pb-10">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-[#64748B]">7/7</span>
          <div className="text-right">
            <p className="inline-flex items-center gap-1.5 text-2xl font-bold text-[#EA580C]">
              <ClockIcon />
              19:28
            </p>
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Min:Sec
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FDBA74] bg-[#FFF7ED] px-4 py-3.5">
          <p className="text-sm font-bold text-[#EA580C]">Task</p>
          <p className="mt-1 text-sm text-[#9A3412]">
            Write an essay response in 200–300 words.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4 shadow-sm">
          <p className="text-base font-medium leading-7 text-[#141B2B]">
            AI creates new categories of work faster than it destroys old ones. To what
            extent do you agree or disagree with this statement?
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full border border-[#FDBA74] bg-white px-3 py-1 text-xs font-bold text-[#EA580C]">
          {words}/200–300 words
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2">
            <div className="flex items-center gap-1 text-sm font-bold text-[#334155]">
              <ToolBtn label="B" />
              <ToolBtn label="I" italic />
              <ToolBtn label="U" underline />
              <span className="mx-1 h-4 w-px bg-[#E2E8F0]" />
              <ToolBtn label="•" />
              <ToolBtn label="1." />
              <span className="mx-1 h-4 w-px bg-[#E2E8F0]" />
              <ToolBtn label="↶" />
              <ToolBtn label="↷" />
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              {words} words
              <span aria-hidden>⤢</span>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            className="w-full resize-y bg-white px-4 py-4 text-sm leading-7 text-[#141B2B] outline-none"
          />
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p
            className={`inline-flex items-center gap-1.5 font-medium ${
              inRange ? "text-[#16A34A]" : "text-[#EA580C]"
            }`}
          >
            {inRange ? "✓" : "!"} Word count is{" "}
            {inRange ? "within" : "outside"} the 200–300 word limit.
          </p>
          <p className="inline-flex items-center gap-1.5 font-medium text-[#EA580C]">
            Autosaved 5s ago
            <CloudIcon />
          </p>
        </div>

        <Link
          href="/dashboard/pte/fill-blanks"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          Submit for scoring
        </Link>
      </div>
    </DashboardShell>
  );
}

function ToolBtn({
  label,
  italic,
  underline,
}: {
  label: string;
  italic?: boolean;
  underline?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex size-8 items-center justify-center rounded-md hover:bg-[#E2E8F0] ${
        italic ? "italic" : ""
      } ${underline ? "underline" : ""}`}
    >
      {label}
    </button>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 5.5V9l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M4.5 10.5h6a2.5 2.5 0 0 0 .3-5 3.2 3.2 0 0 0-6.1 1A2.2 2.2 0 0 0 4.5 10.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 8v-3.5M5.5 6 7 4.5 8.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
