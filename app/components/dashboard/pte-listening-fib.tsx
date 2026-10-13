"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const SEGMENTS = [
  { before: "The conservation project aims to restore the natural balance in the fragile ecosystem by reducing human impact and ", after: "." },
  { before: "Scientists have observed a significant decline in several species due to ", after: "." },
  { before: "Local communities are now involved in ", after: " programs to protect the area." },
  { before: "The initiative has already shown positive results, including an increase in the ", after: " of native birds and marine life." },
  { before: "Further monitoring and ", after: " will be essential for long-term success." },
] as const;

export function PteListeningFib() {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  return (
    <DashboardShell
      title="Listening Fill in the Blanks"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 pb-10">
        <div className="rounded-2xl bg-[#EEF2FF] px-4 py-4">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#3730A3]">
            <span className="mt-0.5 text-[#7C3AED]">👤</span>
            <span>
              <span className="font-bold">
                Type the missing words in the blanks as you hear the audio.
              </span>
              <br />
              <span className="text-[#64748B]">You will hear the audio only once.</span>
            </span>
          </p>
        </div>

        <PteAudioPlayer note="Audio playing once • 1:40" />

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4 text-sm leading-8 text-[#334155]">
            {SEGMENTS.map((seg, i) => (
              <p key={i}>
                {seg.before}
                <input
                  value={answers[i]}
                  onChange={(e) =>
                    setAnswers((prev) => {
                      const next = [...prev];
                      next[i] = e.target.value;
                      return next;
                    })
                  }
                  className="mx-1 inline-block w-36 rounded-lg border border-[#E2E8F0] px-2 py-1 align-baseline text-sm outline-none focus:border-[#2b5ce6]"
                />
                {seg.after}
              </p>
            ))}
          </div>
        </section>

        <div className="rounded-full bg-[#2b5ce6] px-5 py-3 text-center text-sm font-semibold text-white">
          <span className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-white/20 text-xs">
            i
          </span>
          Type your answers while the audio plays. Spelling counts.
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#EEF2FF] px-4 py-3.5 shadow-sm">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                Time Remaining
              </p>
              <p className="font-bold text-[#141B2B]">05:23</p>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                Question
              </p>
              <p className="font-bold text-[#141B2B]">3 of 15</p>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                Auto-advance
              </p>
              <p className="font-bold text-[#16A34A]">On</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#7C3AED] px-4 text-sm font-bold text-white"
          >
            Check answer
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
