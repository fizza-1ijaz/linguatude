"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const QUESTIONS = [
  {
    n: 1,
    text: "What is the main purpose of the conversation?",
    options: [
      "To book a hotel room",
      "To change a flight schedule",
      "To cancel a meeting",
      "To arrange transportation",
    ],
  },
  {
    n: 2,
    text: "Where does the conversation take place?",
    options: [
      "At an airport",
      "At a hotel reception",
      "In a taxi",
      "At a train station",
    ],
  },
  {
    n: 3,
    text: "What time is the meeting scheduled for?",
    options: ["9:00 a.m.", "10:00 a.m.", "11:30 a.m.", "2:00 p.m."],
  },
] as const;

export function MockListening() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [countdown, setCountdown] = useState(45);
  const [sectionLeft, setSectionLeft] = useState(9 * 60 + 42);
  const [elapsed, setElapsed] = useState(2 * 60 + 18);
  const [audioPos, setAudioPos] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
      setSectionLeft((s) => (s > 0 ? s - 1 : 0));
      setElapsed((e) => e + 1);
      setAudioPos((p) => Math.min(600, p + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const answered = Object.keys(answers).length;
  const mm = String(Math.floor(sectionLeft / 60)).padStart(2, "0");
  const ss = String(sectionLeft % 60).padStart(2, "0");
  const totalH = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const totalM = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const totalS = String(elapsed % 60).padStart(2, "0");
  const audioM = String(Math.floor(audioPos / 60)).padStart(2, "0");
  const audioS = String(audioPos % 60).padStart(2, "0");
  const audioPct = (audioPos / 600) * 100;

  return (
    <DashboardShell
      title={
        <span className="inline-flex items-center gap-2">
          <HeadphoneIcon />
          Listening
        </span>
      }
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-4"
      headerRight={
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="rounded-xl bg-[#2b5ce6] px-4 py-1.5 text-sm font-bold tabular-nums text-white">
            {mm}:{ss}
          </span>
          <p className="hidden text-sm font-medium tabular-nums text-[#64748B] sm:block">
            Total: {totalH}:{totalM}:{totalS}
          </p>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-6xl flex-1 space-y-4 pb-28">
        <div className="flex items-center gap-2 rounded-xl border border-[#FDBA74] bg-[#FFF7ED] px-4 py-3">
          <ClockIcon />
          <p className="text-sm text-[#9A3412]">
            Read questions. Audio starts in{" "}
            <span className="font-bold">0:{String(countdown).padStart(2, "0")}.</span>
          </p>
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white transition hover:bg-[#244FE6]"
              aria-label="Play"
            >
              <PlayIcon />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex h-8 items-end gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-[#CBD5E1]"
                    style={{ height: `${30 + ((i * 17) % 70)}%` }}
                  />
                ))}
              </div>
              <div className="relative mt-2 h-1.5 rounded-full bg-[#E2E8F0]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#2b5ce6]"
                  style={{ width: `${audioPct}%` }}
                />
                <span
                  className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#2b5ce6] ring-2 ring-white"
                  style={{ left: `calc(${audioPct}% - 6px)` }}
                />
              </div>
            </div>
            <span className="shrink-0 text-xs font-medium tabular-nums text-[#64748B]">
              {audioM}:{audioS} / 10:00
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
          <h2 className="text-base font-bold text-[#141B2B]">Questions 1–10</h2>
          <p className="mt-1 text-sm text-[#64748B]">Choose the correct answer.</p>

          <div className="mt-5 space-y-0">
            {QUESTIONS.map((q, qi) => (
              <div
                key={q.n}
                className={qi > 0 ? "mt-5 border-t border-[#E2E8F0] pt-5" : ""}
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
                    {q.n}
                  </span>
                  <p className="text-sm font-bold text-[#141B2B]">{q.text}</p>
                </div>
                <ul className="mt-3 space-y-2 pl-9">
                  {q.options.map((opt, i) => {
                    const active = answers[q.n] === i;
                    return (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.n]: i }))
                          }
                          className={`flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left text-sm transition ${
                            active
                              ? "font-semibold text-[#1D4ED8]"
                              : "text-[#475569] hover:text-[#141B2B]"
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
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-panel-bottom border-t border-[#E2E8F0] bg-white px-4 py-3 sm:px-6 lg:px-[1cm]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-[#94A3B8]">
              Questions answered
            </p>
            <p className="text-base font-bold text-[#141B2B]">{answered} of 10</p>
          </div>
          <Link
            href="/dashboard/mock/reading"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Submit Listening
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path
        d="M3 10v2.5A1.8 1.8 0 0 0 4.8 14.3H6V10H4.8A1.8 1.8 0 0 0 3 11.8V10a6 6 0 1 1 12 0v1.8a1.8 1.8 0 0 1-1.8-1.8H12v4.3h1.2A1.8 1.8 0 0 0 15 12.5V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#EA580C]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
