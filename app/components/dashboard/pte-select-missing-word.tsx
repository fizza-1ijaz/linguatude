"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const OPTIONS = [
  { id: "A", text: "established" },
  { id: "B", text: "continue" },
  { id: "C", text: "approach" },
  { id: "D", text: "suggested" },
] as const;

export function PteSelectMissingWord() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <DashboardShell
      title="Select Missing Word"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 pb-10">
        <div className="rounded-2xl bg-[#EFF6FF] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <span>
              <span className="font-bold text-[#1D4ED8]">Instructions</span> You will
              hear a recording with the final word or group of words missing. Select
              the option that best completes it.
            </span>
          </p>
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-[#141B2B]">Listen carefully</p>
          <p className="mt-0.5 text-xs text-[#64748B]">The audio will play once.</p>
          <div className="mt-4">
            <PteAudioPlayer note="Audio playing once • 1:40" />
          </div>
        </section>

        <div>
          <p className="text-sm font-bold text-[#141B2B]">Select the missing word.</p>
          <ul className="mt-3 space-y-2.5">
            {OPTIONS.map((opt) => {
              const on = selected === opt.id;
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(opt.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
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
                    <span className="flex size-7 items-center justify-center rounded-md bg-[#EDE9FE] text-xs font-bold text-[#64748B]">
                      {opt.id}
                    </span>
                    <span className="text-sm font-semibold text-[#141B2B]">{opt.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#FDBA74] bg-[#FFF7ED] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#9A3412]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EA580C] text-[0.625rem] font-bold text-white">
              !
            </span>
            <span>
              <span className="font-bold text-[#EA580C]">Strategy tip</span> The missing
              word must fit the grammar, meaning and context of the sentence. Listen for
              clues before and after the beep.
            </span>
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-xs">
            ✓
          </span>
          Check answer
        </button>
      </div>
    </DashboardShell>
  );
}
