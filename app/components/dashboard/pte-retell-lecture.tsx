"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteProgressStrip,
  PteSideCard,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

export function PteRetellLecture() {
  const [notes, setNotes] = useState("");

  const bars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => {
        const envelope = Math.sin((i / 56) * Math.PI);
        return Math.max(0.15, envelope * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.5))));
      }),
    [],
  );

  return (
    <DashboardShell
      title="Re-tell Lecture"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <PteProgressStrip itemLabel="Item 1 of 4" progressPct={25} />

          <section className="flex flex-1 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                <SpeakerIcon />
              </span>
              <div>
                <p className="text-sm leading-6 text-[#64748B]">
                  Listen to a short lecture. You may take notes while you listen. You
                  will have 10 seconds to prepare. Then speak for up to 40 seconds and
                  re-tell the lecture in as much detail as you can. You will be scored
                  on content, oral fluency and pronunciation.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#F1F5F9] px-4 py-5">
              <div className="flex h-12 min-w-0 flex-1 items-end gap-[2px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full ${
                      i / bars.length < 0.55 ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
                    }`}
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-[#2b5ce6]">Lecture audio</p>
                <p className="text-xs text-[#64748B]">01:29 / 01:29</p>
              </div>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-medium text-[#64748B]">
                Notes (You may take notes while listening)
              </span>
              <div className="relative mt-2">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 2000))}
                  placeholder="Type your notes here..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-[#E2E8F0] bg-[#FFFBEB] px-4 py-3 text-sm text-[#141B2B] outline-none placeholder:text-[#94A3B8] focus:border-[#F59E0B]"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-[#94A3B8]">
                  {notes.length} / 2000
                </span>
              </div>
            </label>

            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                className="flex size-16 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-[0_12px_24px_-10px_rgba(245,158,11,0.7)] transition hover:bg-[#D97706]"
                aria-label="Record"
              >
                <MicIcon />
              </button>
              <p className="mt-3 text-sm text-[#64748B]">10s prep, then 40s</p>
            </div>
          </section>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-3 py-3 shadow-sm sm:px-4">
              <a
                href="/dashboard/pte/describe-image"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#141B2B]"
              >
                ← Back
              </a>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#141B2B]"
              >
                Mark for Review
              </button>
              <a
                href="/dashboard/pte/short-question"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] px-4 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
              >
                Start Preparation →
              </a>
            </div>
            <div className="flex items-center justify-between px-1 text-sm">
              <span className="text-[#94A3B8]">~ 62 min remaining</span>
              <a href="/dashboard/pte" className="font-semibold text-[#2b5ce6]">
                End Practice
              </a>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-3">
          <PteSideCard title="Instructions" icon={<InfoDot />}>
            <ul className="space-y-1.5">
              <li>Listen carefully to the lecture.</li>
              <li>You may take notes while listening.</li>
              <li>Retell the lecture clearly and naturally.</li>
              <li>Use the preparation time to organize your response.</li>
              <li>Click the microphone when you are ready to begin.</li>
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
            STT alignment vs source text:
            <br />
            content, oral fluency, Pronunciation
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

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4 7.5v5h2.5L12 16V4L6.5 7.5H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14 7a3 3 0 0 1 0 6M15.5 5a5 5 0 0 1 0 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
