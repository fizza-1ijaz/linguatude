"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  BackToProgress,
  ProgressHeaderRight,
  ProgressPageHeader,
  PteBadge,
} from "@/app/components/dashboard/progress-shared";

const GOALS = [15, 30, 45, 60] as const;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const FOCUS = [
  { key: "W", label: "Higher", color: "#EA580C", filled: 2 },
  { key: "S", label: "Higher", color: "#EA580C", filled: 2 },
  { key: "L", label: "Medium", color: "#2563EB", filled: 2 },
  { key: "R", label: "Lower", color: "#16A34A", filled: 1 },
] as const;

export function ProgressPlanEditor() {
  const [goal, setGoal] = useState(30);
  const [studyDays, setStudyDays] = useState<Set<string>>(
    () => new Set(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]),
  );
  const [mockDay, setMockDay] = useState("Sat");

  function toggleDay(day: string) {
    setStudyDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  return (
    <DashboardShell
      title="Plan Editor"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerLeft={<BackToProgress />}
      headerRight={
        <div className="flex items-center gap-2.5">
          <ProgressHeaderRight />
          <PteBadge className="hidden sm:inline-flex" />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <ProgressPageHeader
          title="Plan Editor"
          subtitle="Adjust your plan to match the time you can commit and the days you want to study."
          badge={false}
        />

        {/* Daily goal */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#141B2B]">Daily goal</h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Recommended based on your plan and progress.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {GOALS.map((g) => {
                const selected = goal === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`relative flex min-w-[4.75rem] flex-col items-center rounded-xl border-2 px-4 py-3 transition ${
                      selected
                        ? "border-[#2b5ce6] bg-white"
                        : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                    }`}
                  >
                    {g === 30 ? (
                      <span className="absolute -top-2.5 rounded bg-[#2b5ce6] px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wide text-white">
                        Recommended
                      </span>
                    ) : null}
                    <span
                      className={`text-xl font-bold ${
                        selected ? "text-[#312E81]" : "text-[#334155]"
                      }`}
                    >
                      {g}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        selected ? "text-[#2b5ce6]" : "text-[#94A3B8]"
                      }`}
                    >
                      min/day
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-5 inline-flex items-start gap-2 text-sm text-[#64748B]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            30 min/day is the recommended pathway, not a Premium usage limit.
          </p>
        </section>

        {/* Study days */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#141B2B]">Study days</h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Choose the days you want to study.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const on = studyDays.has(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex min-w-[3.25rem] flex-col items-center gap-1.5 rounded-xl px-2.5 py-2.5 text-xs font-bold transition ${
                      on
                        ? "bg-[#2b5ce6] text-white"
                        : "border border-[#E2E8F0] bg-white text-[#141B2B]"
                    }`}
                  >
                    {day}
                    {on ? (
                      <span className="flex size-4 items-center justify-center rounded-full bg-white/20 text-[0.625rem]">
                        ✓
                      </span>
                    ) : (
                      <>
                        <span className="text-[0.5625rem] font-medium text-[#94A3B8]">
                          Rest day
                        </span>
                        <span className="size-3.5 rounded-full border border-[#CBD5E1]" />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#EEF2FF] px-3.5 py-3 text-sm text-[#1E40AF]">
            <CalCheckIcon />
            <p>
              <span className="font-bold">
                You&apos;ve selected {studyDays.size} study days.
              </span>{" "}
              Unselected days are planned rest days and help protect your streak.
            </p>
          </div>
        </section>

        {/* Mock day */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#141B2B]">Mock day</h3>
              <p className="mt-1 text-sm text-[#64748B]">
                Pick the day you&apos;d like to take your weekly Quick Mock Test.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const selected = mockDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setMockDay(day)}
                    className={`min-w-[3rem] rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                      selected
                        ? "border-2 border-[#2b5ce6] bg-white text-[#2b5ce6]"
                        : "border border-[#E2E8F0] bg-white text-[#141B2B] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#FFF4E6] px-3.5 py-3 text-sm text-[#9A3412]">
            <StarIcon />
            <p>
              Saturday is recommended by default, but you can choose any study day.
            </p>
          </div>
        </section>

        {/* Focus split */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-md shrink-0">
              <h3 className="text-lg font-bold text-[#141B2B]">
                Focus split{" "}
                <span className="text-sm font-normal text-[#94A3B8]">
                  (auto from DHA gaps)
                </span>
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Linguatude adapts your focus each week based on your performance and
                target gaps.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#64748B]">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                  i
                </span>
                This is an adaptive output, not a manual setting.
              </p>
            </div>

            <div className="flex w-full max-w-md flex-1 items-stretch justify-end">
              {FOCUS.map((f, i) => (
                <div
                  key={f.key}
                  className={`flex flex-1 flex-col items-center gap-2.5 px-3 py-1 sm:px-5 ${
                    i > 0 ? "border-l border-[#E2E8F0]" : ""
                  }`}
                >
                  <p className="text-sm font-bold text-[#141B2B]">{f.key}</p>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((level) => (
                      <span
                        key={level}
                        className="size-3 rounded-[3px] sm:size-3.5"
                        style={{
                          background: level < f.filled ? f.color : "#E2E8F0",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-bold" style={{ color: f.color }}>
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          <p className="text-xs text-[#94A3B8] sm:mr-auto">
            Unsaved changes will be lost if you leave this page.
          </p>
          <Link
            href="/dashboard/progress/plan"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-5 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </Link>
          <Link
            href="/dashboard/progress/plan"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Save Plan
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function CalCheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7h11M5.5 2.5v2M10.5 2.5v2M6 10.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-[#EA580C]" fill="none" aria-hidden>
      <path d="m8 2.5 1.5 3.1 3.4.5-2.45 2.4.6 3.4L8 10.3l-3.05 1.6.6-3.4L3.1 6.1l3.4-.5L8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
