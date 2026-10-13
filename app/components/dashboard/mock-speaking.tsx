"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function MockSpeaking() {
  const [questionTime, setQuestionTime] = useState(60);
  const [elapsed, setElapsed] = useState(2 * 60 + 35);
  const [recording, setRecording] = useState(18);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setQuestionTime((s) => (s > 0 ? s - 1 : 0));
      setElapsed((e) => e + 1);
      if (isRecording) setRecording((r) => r + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRecording]);

  const qmm = String(Math.floor(questionTime / 60)).padStart(2, "0");
  const qss = String(questionTime % 60).padStart(2, "0");
  const emm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ess = String(elapsed % 60).padStart(2, "0");
  const rmm = String(Math.floor(recording / 60)).padStart(2, "0");
  const rss = String(recording % 60).padStart(2, "0");

  return (
    <DashboardShell
      title={
        <span className="inline-flex flex-wrap items-center gap-2">
          <MicIcon />
          Speaking
          <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#1D4ED8]">
            Part 1 of 3
          </span>
        </span>
      }
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-4 sm:px-[1cm] lg:px-[1cm]"
      headerRight={
        <div className="flex items-center gap-5 sm:gap-8">
          <div className="text-right">
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Question time
            </p>
            <p className="inline-flex items-center gap-1 text-lg font-bold tabular-nums text-[#2b5ce6]">
              <ClockTiny className="text-[#2b5ce6]" />
              {qmm}:{qss}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Total elapsed time
            </p>
            <p className="inline-flex items-center gap-1 text-lg font-bold tabular-nums text-[#141B2B]">
              <ClockTiny className="text-[#94A3B8]" />
              {emm}:{ess}
            </p>
          </div>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 pb-8">
        <div>
          <p className="text-sm font-bold text-[#2b5ce6]">Examiner</p>
          <div className="mt-3 flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
              <PersonIcon />
            </span>
            <div className="rounded-2xl border border-[#BFDBFE] bg-white px-5 py-4 text-sm leading-6 text-[#334155] shadow-sm">
              <p>Good morning/afternoon. My name is Examiner.</p>
              <p>Can I have your full name, please?</p>
              <p>Can I see your identification, please?</p>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-[#E2E8F0]" />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="text-sm font-bold text-[#2b5ce6]">Part 1 – Question 1 of 5</p>
            <h2 className="mt-2 text-2xl font-bold text-[#141B2B] sm:text-3xl">
              Do you work or are you a student?
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Give a full and natural response.
            </p>
          </div>
          <aside className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2b5ce6]">
              <InfoTiny />
              Instructions
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#64748B]">
              <li>Answer the examiner&apos;s question.</li>
              <li>Speak clearly and naturally.</li>
              <li>You have 1 minute to answer.</li>
            </ul>
          </aside>
        </div>

        <section className="rounded-2xl bg-[#F1F5F9] px-4 py-8 text-center sm:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
            <WaveMini />
            {isRecording ? "Recording..." : "Ready"}
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold tabular-nums text-[#EF4444]">
            <span className="size-2 rounded-full bg-[#EF4444]" />
            {rmm}:{rss}
          </p>

          <div className="mx-auto mt-6 flex h-16 max-w-lg items-center justify-center gap-[3px]">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[#2b5ce6]/70"
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.45 + recording * 0.3)) * 70}%`,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsRecording((v) => !v)}
            className="mx-auto mt-6 flex size-16 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-lg transition hover:bg-[#244FE6]"
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? <StopIcon /> : <MicIcon />}
          </button>
          <p className="mt-3 text-sm text-[#475569]">
            {isRecording ? "Tap to stop recording" : "Tap to start recording"}
          </p>
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#FEF3C7] px-4 py-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#FDE68A] text-[#92400E]">
            <LockTiny />
          </span>
          <p className="text-sm text-[#78350F]">
            You cannot pause, go back, or exit during the speaking section. Please
            complete all parts in sequence.
          </p>
        </div>

        <div className="flex justify-end">
          <Link
            href="/dashboard/mock/results-loading"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Submit Speaking
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <rect x="7" y="2.5" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 8.5a4.5 4.5 0 0 0 9 0M9 13v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockTiny({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`size-3.5 ${className}`} fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="currentColor" aria-hidden>
      <circle cx="9" cy="6" r="3" />
      <path d="M3.5 15c.8-3 2.8-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
    </svg>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.2V10M7 4.3h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function WaveMini() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <rect x="1" y="5" width="2" height="4" rx="0.5" />
      <rect x="4.5" y="3" width="2" height="8" rx="0.5" />
      <rect x="8" y="4" width="2" height="6" rx="0.5" />
      <rect x="11.5" y="2" width="2" height="10" rx="0.5" />
    </svg>
  );
}

function StopIcon() {
  return <span className="size-5 rounded-sm bg-white" />;
}

function LockTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
