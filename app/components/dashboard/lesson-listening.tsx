"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const QUESTIONS = [
  {
    n: 1,
    text: "Which facility is the student most interested in using?",
    reveals: "00:00",
    options: ["The library", "The gym", "The swimming pool", "The cafeteria"],
  },
  {
    n: 2,
    text: "What time does the sports centre close on weekdays?",
    reveals: "00:42",
    options: ["6:00 PM", "8:00 PM", "9:30 PM", "10:00 PM"],
  },
] as const;

export function LessonListening() {
  const [speed, setSpeed] = useState("1 x");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [countdown, setCountdown] = useState(45);
  const [progress, setProgress] = useState(18 / 272);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => Math.min(1, p + 0.002));
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  const played = Math.floor(progress * 272);
  const mm = String(Math.floor(played / 60)).padStart(2, "0");
  const ss = String(played % 60).padStart(2, "0");

  return (
    <DashboardShell
      title={
        <span className="inline-flex items-center gap-2">
          Listening
          <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide text-[#15803D]">
            PRACTICE
          </span>
        </span>
      }
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-4"
      headerLeft={
        <Link
          href="/dashboard/skills"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-4 sm:gap-6">
          <p className="hidden text-sm font-medium text-[#64748B] sm:block">
            Question 2 of 5
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3 py-1.5 text-sm font-bold tabular-nums text-[#1D4ED8]">
            <ClockIcon />
            22:15
          </span>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-4xl space-y-4 pb-28">
        <div className="flex items-start gap-3 rounded-xl border border-[#FDBA74] bg-[#FFF7ED] px-4 py-3.5 ui-fade-up">
          <span className="mt-0.5 text-[#EA580C]">
            <ShieldIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#EA580C]">
              Read questions. Audio starts in 0:{String(countdown).padStart(2, "0")}.
            </p>
            <p className="mt-0.5 text-sm text-[#64748B]">
              Questions are shown before the audio. Read them now.
            </p>
          </div>
          <span className="rounded-xl border border-[#FDBA74] bg-white px-3 py-2 text-lg font-bold tabular-nums text-[#EA580C]">
            0:{String(countdown).padStart(2, "0")}
          </span>
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-6 ui-fade-up-delay-1">
          <h2 className="text-base font-bold text-[#141B2B]">
            Section 1 — A conversation about campus facilities
          </h2>
          <div className="my-3 border-t border-[#E2E8F0]" />
          <div className="rounded-lg border border-[#BFDBFE] bg-[#F8FAFF] px-3 py-2 text-xs leading-5 text-[#1D4ED8]">
            <span className="mr-1 inline-flex size-4 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.5625rem] font-bold text-white">
              i
            </span>
            The IELTS exam uses British, Australian, American, and other English
            accents. This recording uses British English.
          </div>

          <div className="mt-5 rounded-xl bg-[#F1F5F9] p-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-sm transition hover:bg-[#244FE6]"
                aria-label="Play"
              >
                <PlayIcon />
              </button>
              <div className="min-w-0 flex-1">
                <div className="relative h-10">
                  <div className="absolute inset-x-0 top-1/2 flex h-6 -translate-y-1/2 items-end gap-[2px]">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const filled = i / 48 <= progress;
                      return (
                        <span
                          key={i}
                          className={`w-1 rounded-full ${filled ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"}`}
                          style={{ height: `${28 + ((i * 13) % 72)}%` }}
                        />
                      );
                    })}
                  </div>
                  <span
                    className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#2b5ce6] ring-2 ring-white"
                    style={{ left: `calc(${progress * 100}% - 6px)` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs tabular-nums text-[#64748B]">
                  <span>
                    {mm}:{ss}
                  </span>
                  <span>04:32</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2b5ce6]">
                <HeadphoneIcon />
                Headphones recommended for best accuracy.
              </p>
              <div className="flex items-center gap-2">
                {["0.75 x", "1 x", "1.5 x"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpeed(s)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      speed === s
                        ? "border border-[#2b5ce6] bg-white text-[#2b5ce6]"
                        : "border border-transparent bg-white/70 text-[#64748B]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  className="ml-1 inline-flex items-center gap-1 text-xs font-semibold text-[#2b5ce6]"
                >
                  <ExpandIcon />
                  Tap to expand player
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          {QUESTIONS.map((q, qi) => (
            <section
              key={q.n}
              className={`rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_6px_18px_-14px_rgba(15,23,42,0.16)] sm:p-5 ${
                qi === 0 ? "ui-fade-up-delay-2" : "ui-fade-up-delay-3"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
                    {q.n}
                  </span>
                  <p className="text-sm font-bold text-[#141B2B]">{q.text}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#94A3B8]">
                  <LockTiny />
                  Reveals at {q.reveals}
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, i) => {
                  const active = answers[q.n] === i;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [q.n]: i }))
                      }
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-sm transition ${
                        active
                          ? "border-[#2b5ce6] bg-[#F8FAFF] font-semibold text-[#1D4ED8]"
                          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE]"
                      }`}
                    >
                      <span
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                          active ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                        }`}
                      >
                        {active ? (
                          <span className="size-1.5 rounded-full bg-[#2b5ce6]" />
                        ) : null}
                      </span>
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/skills/vocabulary"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-semibold text-[#64748B] transition hover:bg-[#CBD5E1]"
          >
            Listen to the full audio first
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M10 3.5 5.5 8 10 12.5" stroke="#141b2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M9 2.5 14.5 5v4.2c0 3.2-2.2 5.5-5.5 6.3C5.7 14.7 3.5 12.4 3.5 9.2V5L9 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 6.2v3M9 11.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-4" fill="currentColor" aria-hidden>
      <path d="M4 2.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3 9v2a1.5 1.5 0 0 0 1.5 1.5H5.5V9H4.5A1.5 1.5 0 0 0 3 10.5V9a5 5 0 1 1 10 0v1.5A1.5 1.5 0 0 1 11.5 9H10.5v3.5H11.5A1.5 1.5 0 0 0 13 11V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M8.5 2.5H11.5V5.5M5.5 11.5H2.5V8.5M11.5 2.5 8 6M2.5 11.5 6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
