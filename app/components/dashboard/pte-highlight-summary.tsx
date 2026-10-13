"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const OPTIONS = [
  {
    id: "A",
    title: "Renewables too expensive",
    body: "The speaker argues that renewable energy is still too costly for most countries and that subsidies create unfair market distortions.",
  },
  {
    id: "B",
    title: "Falling costs undercut coal",
    body: "The recording explains how declining renewable costs are making coal less competitive and accelerating the energy transition.",
  },
  {
    id: "C",
    title: "Policy alone drove change",
    body: "The speaker claims that regulation, not technology, is the only reason renewables have grown in recent years.",
  },
  {
    id: "D",
    title: "Fossil fuels remain dominant",
    body: "The lecture concludes that fossil fuels will stay the primary energy source worldwide for the foreseeable future.",
  },
] as const;

export function PteHighlightSummary() {
  const [selected, setSelected] = useState("B");

  return (
    <DashboardShell
      title="Highlight Correct Summary"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 pb-10">
        <PteAudioPlayer note="Audio playing once • 1:40" />

        <p className="text-base font-bold text-[#141B2B]">
          Select the paragraph that best summarises the recording.
        </p>

        <ul className="space-y-3">
          {OPTIONS.map((opt) => {
            const on = selected === opt.id;
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition ${
                    on
                      ? "border-[#2b5ce6] bg-[#EEF2FF]"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-bold ${
                      on ? "bg-[#2b5ce6] text-white" : "bg-[#EDE9FE] text-[#64748B]"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span>
                    <span
                      className={`block text-sm font-bold ${
                        on ? "text-[#2b5ce6]" : "text-[#141B2B]"
                      }`}
                    >
                      {opt.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[#64748B]">
                      {opt.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

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
