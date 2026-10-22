"use client";

import { useMemo } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteProgressStrip,
  PteSideCard,
  PteTaskHeaderRight,
  PteTaskNav,
} from "@/app/components/dashboard/pte-shared";

export function PteShortQuestion() {
  const bars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const envelope = Math.sin((i / 48) * Math.PI);
        return Math.max(0.12, envelope * (0.35 + 0.65 * Math.abs(Math.sin(i * 0.55))));
      }),
    [],
  );

  return (
    <DashboardShell
      title="Answer Short Question"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <PteProgressStrip itemLabel="Item 5 of 74" progressPct={7} />

          <section className="flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="rounded-2xl bg-[#2b5ce6] px-4 py-3.5 text-center text-base font-bold text-white">
              Question Audio played
            </div>

            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#F1F5F9] px-4 py-5 shadow-sm">
              <div className="flex h-12 min-w-0 flex-1 items-end gap-[2px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full ${
                      i / bars.length < 0.7 ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
                    }`}
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-[#2b5ce6]">
                  Question audio played
                </p>
                <p className="text-xs text-[#64748B]">01:29 / 01:29</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                className="flex size-16 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-[0_0_0_10px_rgba(245,158,11,0.18),0_0_0_20px_rgba(245,158,11,0.08)]"
                aria-label="Stop recording"
              >
                <span className="size-5 rounded-sm bg-white" />
              </button>
              <p className="mt-3 text-sm text-[#64748B]">one word or short phrase</p>
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-[#ECFDF5] px-4 py-3 text-sm font-semibold text-[#166534]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#16A34A] text-xs text-white">
                ✓
              </span>
              Correct — &apos;a dentist&apos;
            </div>

            <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] px-4 py-3 text-sm text-[#1E40AF]">
              <span className="mt-0.5 text-[#2b5ce6]">💡</span>
              <p>
                <span className="font-bold">Tip</span> Listen carefully and answer
                using only one word or a short phrase.
              </p>
            </div>
          </section>

          <PteTaskNav
            backHref="/dashboard/pte/retell-lecture"
            nextDisabled={false}
            nextLabel="Next Item"
            nextHref="/dashboard/pte/summarize-text"
          />
        </div>

        <aside className="flex flex-col gap-3">
          <PteSideCard title="Instructions" icon={<InfoDot />}>
            <ul className="space-y-1.5">
              <li>Listen carefully to the question.</li>
              <li>Answer with a short word or phrase.</li>
              <li>Keep your response clear and concise.</li>
              <li>Click the microphone when you are ready to answer.</li>
            </ul>
          </PteSideCard>
          <PteSideCard
            title="Timing (Exam)"
            icon={<ClockDot />}
            className="bg-[#FFF4E6]"
            titleClass="text-[#9A3412]"
            bodyClass="text-[#9A3412]"
          >
            <ul className="space-y-1">
              <li>Prep time: 30–40 seconds</li>
              <li>Speaking time: 30–40 seconds</li>
            </ul>
          </PteSideCard>
          <PteSideCard
            title="Scoring (AI Evaluation)"
            icon={<ChartDot />}
            className="bg-[#ECFDF5]"
            titleClass="text-[#166534]"
            bodyClass="text-[#166534]"
          >
            STT alignment vs source text: content, oral fluency, Pronunciation
          </PteSideCard>
          <PteSideCard
            title="Note"
            icon={<ShieldDot />}
            className="bg-[#F5F3FF]"
            titleClass="text-[#5B21B6]"
            bodyClass="text-[#5B21B6]"
          >
            In the real test, your response will be recorded and AI-scored.
          </PteSideCard>
        </aside>
      </div>
    </DashboardShell>
  );
}

function InfoDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
      i
    </span>
  );
}
function ClockDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#F59E0B] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3.8V6l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}
function ChartDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <path d="M2 9 4.5 6.5 6.5 8 10 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function ShieldDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#7C3AED] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <path d="M6 1.5 10 3v2.8c0 2.3-1.5 4-4 4.7-2.5-.7-4-2.4-4-4.7V3L6 1.5Z" stroke="currentColor" strokeWidth="1.1" />
        <path d="m4.2 5.8 1.3 1.3 2.3-2.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>
  );
}
