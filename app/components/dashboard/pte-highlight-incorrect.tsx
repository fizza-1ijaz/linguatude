"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const TRANSCRIPT =
  "The government announced a new initiative yesterday to support local businesses and create more job opportunities across the country. The plan includes reducing taxes for small enterprises and increasing funding for training programs. Officials believe this will help boost the economy over the next few years.";

const DEFAULT_WORDS = new Set([
  "initiative",
  "yesterday",
  "create",
  "job",
  "reducing",
  "enterprises",
  "funding",
  "boost",
]);

export function PteHighlightIncorrect() {
  const words = TRANSCRIPT.split(/(\s+)/);
  const [selected, setSelected] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    words.forEach((token, i) => {
      const clean = token.replace(/[.,]/g, "");
      if (DEFAULT_WORDS.has(clean)) initial.add(i);
    });
    return initial;
  });

  function toggle(i: number, token: string) {
    if (!/[A-Za-z]/.test(token)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <DashboardShell
      title="Highlight Incorrect Words"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-10">
        <div className="flex items-start gap-3 rounded-2xl border border-[#FED7AA] bg-[#FFF7ED] px-4 py-3.5">
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

        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 5v3.2l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="font-bold text-[#141B2B]">
                Click on the words in the transcript that are different from what you
                hear in the audio.
              </span>
              <br />
              <span className="text-[#64748B]">You may click on any number of words.</span>
            </span>
          </p>
        </div>

        <PteAudioPlayer note="Audio playing once • 1:40" />

        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-4 py-3">
            <span className="text-[#64748B]" aria-hidden>
              ≡
            </span>
            <h2 className="text-sm font-bold text-[#141B2B]">Transcript</h2>
          </div>
          <div className="px-4 py-5 text-base leading-8 text-[#334155] sm:px-5">
            {words.map((token, i) => {
              if (/^\s+$/.test(token) || !/[A-Za-z]/.test(token)) {
                return <span key={i}>{token}</span>;
              }
              const on = selected.has(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i, token)}
                  className={`rounded px-0.5 transition ${
                    on
                      ? "bg-[#FEE2E2] font-semibold text-[#DC2626]"
                      : "hover:bg-[#F1F5F9]"
                  }`}
                >
                  {token}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 border-t border-[#E2E8F0] px-4 py-3 text-sm text-[#94A3B8]">
            <span aria-hidden>👆</span>
            Click on the incorrect words only.
          </div>
        </section>

        <div className="rounded-2xl bg-[#EFF6FF] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <span>
              <span className="font-bold">Tip</span> Listen carefully. Click only the
              words that are incorrect. Correct words will not be penalized.
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
