"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteCheckAnswer,
  PteReadingSidebar,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const OPTIONS = [
  { id: "A", text: "Reduces energy use" },
  { id: "B", text: "Increases traffic congestion" },
  { id: "C", text: "Improves air quality" },
  { id: "D", text: "Raises housing costs only" },
  { id: "E", text: "Supports biodiversity" },
  { id: "F", text: "Eliminates all pollution" },
] as const;

export function PteMcqMultiple() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(["A", "C"]));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <DashboardShell
      title="MCQ Multiple · Reading"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-start gap-3 rounded-2xl bg-[#FFF4E6] px-4 py-3.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EA580C] text-sm font-bold text-white">
              !
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#EA580C]">Negative marking applies</p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                You will lose marks for each incorrect selection. Select all that are
                correct.
              </p>
            </div>
            <span className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-[#FFEDD5] text-[#EA580C] sm:flex">
              ⚖
            </span>
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                📖
              </span>
              <h2 className="text-lg font-bold text-[#141B2B] sm:text-xl">
                Which of the following benefits are associated with urban green spaces?
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#EEF2FF] px-3.5 py-2.5">
              <p className="inline-flex items-center gap-2 text-sm text-[#334155]">
                <span>💡</span> Select all correct options.
              </p>
              <span className="rounded-full border border-[#2b5ce6] bg-white px-2.5 py-0.5 text-xs font-semibold text-[#2b5ce6]">
                Select all that apply
              </span>
            </div>

            <ul className="mt-4 space-y-2.5">
              {OPTIONS.map((opt) => {
                const on = selected.has(opt.id);
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => toggle(opt.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left transition ${
                        on
                          ? "border-[#2b5ce6] bg-[#EEF2FF]"
                          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                      }`}
                    >
                      <span
                        className={`flex size-5 items-center justify-center rounded border-2 ${
                          on ? "border-[#2b5ce6] bg-[#2b5ce6] text-white" : "border-[#CBD5E1]"
                        }`}
                      >
                        {on ? "✓" : null}
                      </span>
                      <span
                        className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                          on ? "bg-[#2b5ce6] text-white" : "bg-[#E2E8F0] text-[#2b5ce6]"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-sm font-medium text-[#141B2B]">{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5">
              <PteCheckAnswer note="Review your choices carefully. Incorrect answers will reduce your score (floored at 0)." />
            </div>
          </section>
        </div>

        <PteReadingSidebar tip="Multiple choice (multiple answer) questions have negative marking." />
      </div>
    </DashboardShell>
  );
}
