"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteProgressStrip,
  PteSideCard,
  PteTaskHeaderRight,
  PteTaskNav,
} from "@/app/components/dashboard/pte-shared";

export function PteRepeatSentence() {
  const [recording, setRecording] = useState(false);
  const elapsed = recording ? 4 : 0;
  const total = 15;

  const bars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const envelope = Math.sin((i / 48) * Math.PI);
        const wave = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.55));
        return Math.max(0.12, envelope * wave);
      }),
    [],
  );

  const playedThrough = 0.45;

  return (
    <DashboardShell
      title="Repeat Sentence"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <PteProgressStrip itemLabel="Item 2 of 6" progressPct={33} />

          <section className="flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                <ChatIcon />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#141B2B]">
                  Repeat Sentence
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  You will hear a sentence.
                  <br />
                  Please repeat the sentence exactly as you hear it.
                </p>
              </div>
            </div>

            <div className="relative mt-6 rounded-2xl bg-[#F1F5F9] px-4 py-8">
              <span className="absolute right-3 top-3 rounded-full bg-[#EF4444] px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-white">
                Plays ONCE
              </span>
              <div className="flex h-16 items-end justify-center gap-[3px]">
                {bars.map((h, i) => {
                  const played = i / bars.length < playedThrough;
                  return (
                    <span
                      key={i}
                      className={`w-1 rounded-full ${
                        played ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
                      }`}
                      style={{ height: `${h * 100}%` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setRecording((v) => !v)}
                className={`relative flex size-16 items-center justify-center rounded-full text-white shadow-[0_0_0_10px_rgba(245,158,11,0.18),0_0_0_20px_rgba(245,158,11,0.08)] transition ${
                  recording ? "bg-[#F59E0B]" : "bg-[#F59E0B] hover:bg-[#D97706]"
                }`}
                aria-label={recording ? "Stop recording" : "Start recording"}
              >
                {recording ? <StopIcon /> : <MicIcon />}
              </button>
              <p className="mt-4 font-mono text-sm font-bold text-[#141B2B]">
                0:{String(elapsed).padStart(2, "0")} / 0:{String(total).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-bold text-[#141B2B]">
                {recording ? "Recording…" : "Recording ready"}
              </p>
              <p className="mt-1 text-center text-xs text-[#94A3B8]">
                Click the microphone to start recording after the audio finishes.
              </p>
            </div>
          </section>

          <PteTaskNav nextHref="/dashboard/pte/describe-image" nextDisabled={false} />
        </div>

        <aside className="flex flex-col gap-3">
          <PteSideCard
            title="Instructions"
            icon={<InfoDot className="bg-[#2b5ce6]" />}
          >
            <ul className="space-y-1.5">
              <li>Listen carefully — the audio plays only once.</li>
              <li>Repeat the sentence exactly as you hear it.</li>
              <li>Speak clearly and naturally.</li>
              <li>Click the microphone when you are ready to record.</li>
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

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 10.5v-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 8h5M7.5 10.5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

function StopIcon() {
  return <span className="size-5 rounded-sm bg-white" />;
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
