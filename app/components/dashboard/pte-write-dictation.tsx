"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

export function PteWriteDictation() {
  const [text, setText] = useState("");

  return (
    <DashboardShell
      title="Write from Dictation"
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
              <span className="font-bold text-[#141B2B]">
                You will hear a sentence. Type the sentence exactly as you hear it.
              </span>
              <br />
              <span className="text-[#64748B]">The audio will play only once.</span>
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
          <label className="text-sm font-bold text-[#141B2B]">
            Type the sentence here
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing after the audio finishes..."
            rows={5}
            className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#141B2B] outline-none placeholder:text-[#94A3B8] focus:border-[#2b5ce6]"
          />
        </div>

        <div className="rounded-2xl bg-[#EFF6FF] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            Type the sentence exactly as you hear it. Spelling matters.
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
