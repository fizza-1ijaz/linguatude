"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteProgressStrip,
  PteSideCard,
  PteTaskHeaderRight,
  PteTaskNav,
} from "@/app/components/dashboard/pte-shared";

const PASSAGE =
  "Urban rooftop farming has expanded rapidly across Australian cities, cutting cooling costs. Green roofs can reduce indoor temperatures by up to 6°C in summer. Councils are now offering rebates to encourage more sustainable buildings.";

export function PteReadAloud() {
  const [ready, setReady] = useState(true);

  return (
    <DashboardShell
      title="Read Aloud"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <PteProgressStrip itemLabel="Item 2 of 6" progressPct={33} />

          <section className="flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                <BookIcon />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#2b5ce6]">Read Aloud</h2>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  You will read a text aloud as naturally and clearly as possible.
                  You will have 30 to 40 seconds to read the text.
                </p>
              </div>
            </div>

            <div className="relative mt-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5">
              <p className="text-base leading-7 text-[#334155]">{PASSAGE}</p>
              <p className="mt-3 text-right text-xs text-[#94A3B8]">
                Word count: 26
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#EFF6FF] px-4 py-3">
                <p className="text-xs text-[#64748B]">Preparation time</p>
                <p className="mt-1 text-xl font-bold text-[#141B2B]">30s</p>
              </div>
              <div className="rounded-xl bg-[#EFF6FF] px-4 py-3">
                <p className="text-xs text-[#64748B]">Speaking time</p>
                <p className="mt-1 text-xl font-bold text-[#141B2B]">30-40s</p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col items-center">
              <button
                type="button"
                className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#64748B] transition hover:bg-[#F8FAFC] sm:inline-flex"
              >
                <SpeakerIcon />
                Voice Check
              </button>

              <button
                type="button"
                onClick={() => setReady((v) => !v)}
                className="relative flex size-16 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-[0_0_0_10px_rgba(43,92,230,0.15),0_0_0_20px_rgba(43,92,230,0.08)] transition hover:bg-[#244FE6]"
                aria-label="Start recording"
              >
                <MicIcon />
              </button>
              <p className="mt-4 text-sm font-bold text-[#2b5ce6]">
                {ready ? "Ready to start" : "Listening…"}
              </p>
              <p className="mt-1 text-center text-xs text-[#94A3B8]">
                Click the microphone to begin after preparation.
              </p>
            </div>
          </section>

          <PteTaskNav nextHref="/dashboard/pte/repeat-sentence" nextDisabled={false} />
        </div>

        <aside className="flex flex-col gap-3">
          <PteSideCard
            title="Instructions"
            icon={<InfoDot className="bg-[#2b5ce6]" />}
          >
            <ul className="space-y-1.5">
              <li>You will see a text on the screen.</li>
              <li>You have 30–40 seconds to read it aloud.</li>
              <li>Read the text naturally and clearly.</li>
              <li>
                You will be scored on content, oral fluency and pronunciation.
              </li>
              <li>Click the microphone when you are ready to start.</li>
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
              <li>No pauses during the speaking time</li>
            </ul>
          </PteSideCard>

          <PteSideCard
            title="Skills Credited"
            icon={<TargetDot />}
            className="bg-[#EFF6FF]"
            titleClass="text-[#1E40AF]"
            bodyClass="text-[#1E40AF]"
          >
            Reading + Speaking
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

function BookIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4 4.5h5.5v12H5.5A1.5 1.5 0 0 0 4 18V4.5Zm6.5 0H16v12h-4a1.5 1.5 0 0 0-1.5 1.5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-6" fill="none" aria-hidden>
      <rect x="8" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 11a6 6 0 0 0 12 0M11 17v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M3 5v4h2.2L9 11.5V2.5L5.2 5H3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10.5 5.2a2.2 2.2 0 0 1 0 3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InfoDot({ className }: { className: string }) {
  return (
    <span className={`flex size-5 items-center justify-center rounded-full text-[0.625rem] font-bold text-white ${className}`}>
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

function TargetDot() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
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
