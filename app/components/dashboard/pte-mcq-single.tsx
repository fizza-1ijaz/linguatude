"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteReadingSidebar,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const OPTIONS = [
  { id: "A", text: "Busier but less profitable" },
  { id: "B", text: "Fully recovered" },
] as const;

export function PteMcqSingle() {
  const [selected, setSelected] = useState("A");

  return (
    <DashboardShell
      title="MCQ Single · Reading"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#EFF6FF] px-4 py-3.5">
            <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#2b5ce6] text-xs text-white">
                ≡
              </span>
              <span>
                <span className="font-bold">Read the question and select the best answer.</span>{" "}
                Choose the correct option.
              </span>
            </p>
            <button type="button" className="text-sm font-semibold text-[#2b5ce6]">
              See strategy tips →
            </button>
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#141B2B]">
              Regional airports report a paradox: passengers are up, yet profitability
              lags.
            </h2>
            <ul className="mt-5 space-y-3">
              {OPTIONS.map((opt) => {
                const on = selected === opt.id;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(opt.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
                        on
                          ? "border-[#2b5ce6] bg-[#EEF2FF]"
                          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                      }`}
                    >
                      <span
                        className={`flex size-5 items-center justify-center rounded-full border-2 ${
                          on ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                        }`}
                      >
                        {on ? <span className="size-2.5 rounded-full bg-[#2b5ce6]" /> : null}
                      </span>
                      <span className="text-sm font-semibold text-[#141B2B]">{opt.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-xs">
                ✓
              </span>
              Check answer
            </button>
          </section>
        </div>

        <PteReadingSidebar
          question="6 / 12"
          questionPct={50}
          section="11 / 20"
          sectionPct={55}
          tip="Look for the key words in the question and use the passage to identify the best answer."
        />
      </div>
    </DashboardShell>
  );
}
