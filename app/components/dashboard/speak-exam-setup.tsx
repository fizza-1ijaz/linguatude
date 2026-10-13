"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const PARTS = [
  { id: "full", label: "Full Test (Parts 1, 2 & 3)", duration: "~11–14 minutes" },
  { id: "part1", label: "Part 1 only", duration: "~4–5 minutes" },
  { id: "part2", label: "Part 2 only", duration: "~3–4 minutes" },
  { id: "part3", label: "Part 3 only", duration: "~4–5 minutes" },
] as const;

const EXPECT = [
  {
    id: "feedback",
    tone: "blue" as const,
    text: "Feedback is given only after all parts are complete — not between questions.",
    Icon: ChatExpectIcon,
  },
  {
    id: "strict",
    tone: "blue" as const,
    text: "This is a strict assessment. Scoring follows official IELTS band descriptors.",
    Icon: CapExpectIcon,
  },
  {
    id: "ai",
    tone: "orange" as const,
    text: "Scores are AI-estimated and not official IELTS results.",
    Icon: ClockAlertIcon,
    highlight: true,
  },
  {
    id: "timed",
    tone: "blue" as const,
    text: "Each part is timed. Responses auto-submit when time expires.",
    Icon: TimerExpectIcon,
  },
] as const;

export function SpeakExamSetup() {
  const [part, setPart] = useState<(typeof PARTS)[number]["id"]>("full");
  const [expectOpen, setExpectOpen] = useState(true);
  const duration =
    PARTS.find((p) => p.id === part)?.duration ?? "~11–14 minutes";

  return (
    <DashboardShell
      title="Exam Simulation"
      contentBgClassName="bg-white"
      mainClassName="flex-1 px-[1cm] py-5 sm:px-[1cm] lg:px-[1cm]"
      headerLeft={
        <Link
          href="/dashboard/speak"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to Speaking"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/streak"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1.5 text-sm font-semibold text-[#EA580C] ring-1 ring-[#FED7AA]/80"
          >
            <FlameIcon className="size-4 text-[#F97316]" />
            7 Day Streak
          </Link>
          <NotificationBellButton />
        </div>
      }
    >
      <div className="mx-auto w-full max-w-5xl space-y-5 pb-8">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-4 shadow-[0_4px_14px_-10px_rgba(15,23,42,0.12)] sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#F1F5F9] px-3.5 py-1.5 text-sm font-semibold text-[#334155]">
              Exam: <span className="ml-1 font-bold">IELTS Academic</span>
            </span>
            <Link
              href="/dashboard/switch-exam"
              className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              Change exam →
            </Link>
          </div>

          <h2 className="mt-4 text-base font-bold text-[#141B2B]">Which parts?</h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {PARTS.map((item) => {
              const selected = part === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPart(item.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#2b5ce6] text-white shadow-sm"
                      : "border border-[#E2E8F0] bg-white text-[#334155] hover:border-[#BFDBFE]"
                  }`}
                >
                  {selected ? (
                    <span className="flex size-4 items-center justify-center rounded-full bg-white text-[#2b5ce6]">
                      <CheckMini />
                    </span>
                  ) : null}
                  {item.label}
                </button>
              );
            })}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1.5 text-sm font-semibold text-[#2b5ce6]">
              <ClockMini />
              {duration}
            </span>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
          <button
            type="button"
            onClick={() => setExpectOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left sm:px-6"
          >
            <h2 className="text-base font-bold text-[#141B2B]">What to expect</h2>
            <span
              className={`text-[#94A3B8] transition ${expectOpen ? "" : "rotate-180"}`}
              aria-hidden
            >
              <ChevronUpIcon />
            </span>
          </button>
          {expectOpen ? (
            <ul className="border-t border-[#E2E8F0]">
              {EXPECT.map((row) => {
                const Icon = row.Icon;
                return (
                  <li
                    key={row.id}
                    className={`flex items-start gap-3 border-b border-[#F1F5F9] px-5 py-3 last:border-b-0 sm:px-6 ${
                      "highlight" in row && row.highlight ? "bg-[#FFF7ED]" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${
                        row.tone === "orange"
                          ? "bg-[#FFEDD5] text-[#EA580C]"
                          : "bg-[#DBEAFE] text-[#2b5ce6]"
                      }`}
                    >
                      <Icon />
                    </span>
                    <p
                      className={`text-sm leading-6 ${
                        "highlight" in row && row.highlight
                          ? "font-semibold text-[#141B2B]"
                          : "text-[#475569]"
                      }`}
                    >
                      {row.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>

        <Link
          href="/dashboard/speak/microphone"
          className="flex w-full items-center gap-3 rounded-2xl border border-[#FED7AA] bg-[#FFF1E6] px-5 py-3 text-left transition hover:bg-[#FFE8D6] sm:px-6"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white">
            <MicWhiteIcon />
          </span>
          <span className="min-w-0 flex-1 text-sm font-semibold text-[#141B2B]">
            Microphone access is needed for speaking practice. Tap to enable.
          </span>
          <span className="shrink-0 text-[#94A3B8]" aria-hidden>
            <ChevronRightIcon />
          </span>
        </Link>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-5 py-3.5 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]">
            <SpeakerIcon />
          </span>
          <p className="min-w-0 flex-1 text-sm font-bold text-[#141B2B]">
            Text (current)
          </p>
          <Link
            href="/dashboard/switch-exam"
            className="shrink-0 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
          >
            Change in Settings →
          </Link>
        </div>

        <div className="space-y-3 pt-1">
          <Link
            href="/dashboard/speak/exam/run"
            className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#2b5ce6] text-base font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white text-[#2b5ce6]">
              <PlayIcon />
            </span>
            Begin the test
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#141b2b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path
        d="M2 5.2 4 7l4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockMini() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5v3.2l2 1.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 10 8 5.5 12.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicWhiteIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M3.5 8.2v3.6h2.4L10 15.5V4.5L5.9 8.2H3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 7.5a3 3 0 0 1 0 5M14.5 5.5a5.5 5.5 0 0 1 0 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <path d="M4 2.5v7l6-3.5-6-3.5Z" />
    </svg>
  );
}

function ChatExpectIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 4.5A2 2 0 0 1 5 2.5h6A2 2 0 0 1 13 4.5v4A2 2 0 0 1 11 10.5H7.5L5 13v-2.5H5A2 2 0 0 1 3 8.5v-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CapExpectIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M1.5 6.5 8 3.5l6.5 3-6.5 3-6.5-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M4 8v2.5c0 1 1.8 2 4 2s4-1 4-2V8M14.5 6.5V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockAlertIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5v3.2l2 1.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimerExpectIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="9" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 6.5V9l1.8 1.2M6 2.5h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
