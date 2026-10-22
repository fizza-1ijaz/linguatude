"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CHART_YEARS = ["1990", "2000", "2010", "2020"] as const;
const COUNTRIES = [
  { name: "Country A", color: "#94A3B8", values: [35, 42, 55, 68] },
  { name: "Country B", color: "#64748B", values: [48, 52, 60, 72] },
  { name: "Country C", color: "#475569", values: [28, 38, 50, 65] },
  { name: "Country D", color: "#334155", values: [55, 58, 62, 70] },
  { name: "Country E", color: "#1E293B", values: [40, 48, 58, 75] },
] as const;

export function MockWriting() {
  const [task, setTask] = useState<1 | 2>(1);
  const [showPrompt, setShowPrompt] = useState(true);
  const [text, setText] = useState("");
  const [taskLeft, setTaskLeft] = useState(7 * 60);
  const [elapsed, setElapsed] = useState(25 * 60 + 42);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTaskLeft((s) => (s > 0 ? s - 1 : 0));
      setElapsed((e) => e + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(taskLeft / 60)).padStart(2, "0");
  const ss = String(taskLeft % 60).padStart(2, "0");
  const totalH = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const totalM = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const totalS = String(elapsed % 60).padStart(2, "0");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <DashboardShell
      title={
        <span className="inline-flex items-center gap-2">
          <QuillIcon />
          Writing
        </span>
      }
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-4"
      headerRight={
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="rounded-xl bg-[#2b5ce6] px-4 py-1.5 text-sm font-bold tabular-nums text-white">
            {mm}:{ss}
          </span>
          <p className="hidden text-sm font-medium tabular-nums text-[#64748B] sm:block">
            Total: {totalH}:{totalM}:{totalS}
          </p>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-4xl flex-1 space-y-4 pb-28">
        <div className="flex flex-wrap items-stretch gap-3">
          <button
            type="button"
            onClick={() => setTask(1)}
            className={`min-w-[9rem] rounded-xl px-5 py-3 text-left text-sm font-bold transition ${
              task === 1
                ? "bg-[#2b5ce6] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B]"
            }`}
          >
            Task 1
          </button>
          <button
            type="button"
            disabled
            className="min-w-[11rem] rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-left text-sm font-bold text-[#94A3B8]"
          >
            <span className="inline-flex items-center gap-1.5">
              <LockTiny />
              Task 2
            </span>
            <span className="mt-0.5 block text-[0.6875rem] font-medium">
              Unlocks after Task 1
            </span>
          </button>
        </div>

        <div className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-[#EFF6FF] px-4 py-3 text-sm">
          <InfoIcon />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-[#334155]">Task 1: 150+ words</span>
            <span className="text-[#94A3B8]">Task 2: 250+ words</span>
            <span className="font-medium text-[#64748B]">({words} written)</span>
          </p>
        </div>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#141B2B]">Task 1</h2>
            <button
              type="button"
              onClick={() => setShowPrompt((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
            >
              {showPrompt ? "Hide prompt" : "Show prompt"}
              <span className="text-xs" aria-hidden>
                {showPrompt ? "⌃" : "⌄"}
              </span>
            </button>
          </div>

          {showPrompt ? (
            <div className="mt-4">
              <p className="text-sm leading-6 text-[#475569]">
                The chart below shows the percentage of the population living in urban
                areas in five countries from 1990 to 2020. Summarise the information by
                selecting and reporting the main features, and make comparisons where
                relevant.
              </p>
              <div className="mt-4 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
                <div className="flex gap-4">
                  <div className="flex shrink-0 flex-col justify-between py-1 text-[0.625rem] font-medium text-[#94A3B8]">
                    {["100%", "75%", "50%", "25%", "0%"].map((y) => (
                      <span key={y}>{y}</span>
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="relative h-40 border-b border-l border-[#E2E8F0]">
                      {[25, 50, 75].map((g) => (
                        <span
                          key={g}
                          className="absolute inset-x-0 border-t border-[#F1F5F9]"
                          style={{ bottom: `${g}%` }}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-end gap-4 px-2 sm:gap-8 sm:px-4">
                        {CHART_YEARS.map((year, yi) => (
                          <div
                            key={year}
                            className="flex flex-1 items-end justify-center gap-0.5"
                          >
                            {COUNTRIES.map((c) => (
                              <span
                                key={c.name}
                                className="w-1.5 rounded-t-sm sm:w-2"
                                style={{
                                  height: `${c.values[yi]}%`,
                                  background: c.color,
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex px-2 sm:px-4">
                      {CHART_YEARS.map((year) => (
                        <span
                          key={year}
                          className="flex-1 text-center text-[0.625rem] font-medium text-[#64748B]"
                        >
                          {year}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden shrink-0 flex-col justify-center gap-2 sm:flex">
                    {COUNTRIES.map((c) => (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-1.5 text-[0.6875rem] text-[#64748B]"
                      >
                        <span
                          className="size-2.5 rounded-sm"
                          style={{ background: c.color }}
                        />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-3 sm:hidden">
                  {COUNTRIES.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-1.5 text-[0.625rem] text-[#64748B]"
                    >
                      <span
                        className="size-2 rounded-sm"
                        style={{ background: c.color }}
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-1 border-b border-[#E5E7EB] bg-[#EFF2F5] px-2 py-2">
            <ToolbarBtn label="Undo">
              <UndoIcon />
            </ToolbarBtn>
            <ToolbarBtn label="Redo" faded>
              <RedoIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn label="Bold">
              <span className="font-bold">B</span>
            </ToolbarBtn>
            <ToolbarBtn label="Italic">
              <span className="italic">I</span>
            </ToolbarBtn>
            <ToolbarBtn label="Underline">
              <span className="underline">U</span>
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn label="Bulleted list">
              <BulletListIcon />
            </ToolbarBtn>
            <ToolbarBtn label="Numbered list">
              <NumberListIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn label="Align left">
              <AlignLeftIcon />
            </ToolbarBtn>
            <ToolbarBtn label="Align center">
              <AlignCenterIcon />
            </ToolbarBtn>
            <ToolbarBtn label="Align right">
              <AlignRightIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn label="Clear formatting">
              <ClearFormatIcon />
            </ToolbarBtn>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your answer here..."
            className="min-h-[16rem] w-full resize-y bg-white px-4 py-4 text-sm leading-6 text-[#141B2B] outline-none placeholder:text-[#94A3B8] sm:px-5"
          />
        </section>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white px-4 py-3 sm:px-6 lg:px-[1cm]">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-3 py-2">
            <ClockTiny />
            <div>
              <p className="text-[0.6875rem] text-[#64748B]">Task 1 time remaining</p>
              <p className="text-base font-bold tabular-nums text-[#EA580C]">
                {mm}:{ss}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/mock/speaking"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Submit Task 1
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function ToolbarBtn({
  children,
  label,
  faded,
}: {
  children: ReactNode;
  label: string;
  faded?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex size-8 items-center justify-center rounded-md text-[#475569] transition hover:bg-white ${
        faded ? "opacity-40" : ""
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <span className="mx-0.5 h-5 w-px bg-[#D1D5DB]" aria-hidden />;
}

function QuillIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path
        d="M3.5 14.5c2.5-1 4-2.8 5.2-5.2L14 3.5 12.5 2 6.7 7.3C4.5 8.6 3.2 11 3.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7v4M8 5.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockTiny() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#EA580C]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M4.5 5.5H3V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.2 5.5A5 5 0 1 1 4 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M9.5 5.5H11V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.8 5.5A5 5 0 1 0 10 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="2.5" cy="3.5" r="0.9" fill="currentColor" />
      <circle cx="2.5" cy="7" r="0.9" fill="currentColor" />
      <circle cx="2.5" cy="10.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function NumberListIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M2 2.8h1.2V5M2 5h2.2M2.2 8.2c.6-.5 1.8-.3 1.8.6 0 .9-1.1 1-1.8 1.4h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlignLeftIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2 3.5h10M2 7h7M2 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AlignCenterIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2 3.5h10M3.5 7h7M2.5 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AlignRightIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2 3.5h10M5 7h7M3 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClearFormatIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M4 4h5.5M6.5 4v6.5M3 11.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="m3 3 8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
