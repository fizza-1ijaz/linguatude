"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteAudioPlayer,
  PteReadingSidebar,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

export function PteSummarizeSpoken() {
  const [summary, setSummary] = useState("");
  const words = useMemo(
    () => (summary.trim() ? summary.trim().split(/\s+/).length : 0),
    [summary],
  );

  return (
    <DashboardShell
      title="Summarize Spoken Text"
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
                <span className="font-bold">You will hear a spoken passage.</span>
                <br />
                Summarize what you hear in 50-70 words. Type your summary in the box
                below.
              </span>
            </p>
            <button type="button" className="text-sm font-semibold text-[#2b5ce6]">
              💡 See strategy tips →
            </button>
          </div>

          <PteAudioPlayer duration="00:00 / 01:15" note="00:00 / 01:15" />

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-bold text-[#141B2B]">
              The lecture explained how reef zones are failing under heat stress and
              what restoration approaches are being trialled.
            </p>
            <div className="relative mt-4">
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Type your summary here..."
                rows={8}
                className="w-full resize-none rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm text-[#141B2B] outline-none placeholder:text-[#94A3B8] focus:border-[#2b5ce6]"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-[#94A3B8]">
                {words} / 70 words
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-[#64748B]">
              <span>50-70 words</span>
              <span>Time remaining: 10:00</span>
            </div>
          </section>

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

        <PteReadingSidebar
          question="1 / 8"
          questionPct={12}
          section="1 / 20"
          sectionPct={5}
          sectionLabel="Part 3: Listening"
          tip="Capture the main idea and 2–3 supporting points. Stay within 50–70 words."
        />
      </div>
    </DashboardShell>
  );
}
