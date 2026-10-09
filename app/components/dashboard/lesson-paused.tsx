"use client";

import Link from "next/link";

export function LessonPaused() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A]/45 px-4 py-8 backdrop-blur-[2px]">
      <div className="w-full max-w-sm rounded-2xl bg-white px-6 py-8 text-center shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ui-fade-up">
        <div className="relative mx-auto flex size-28 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE]">
          <div className="absolute inset-x-0 bottom-0 h-12 rounded-t-[100%] bg-[#93C5FD]/55" />
          <span className="relative z-10 flex size-14 items-center justify-center rounded-full border-[3px] border-[#2b5ce6] bg-white">
            <PauseIcon />
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#141B2B]">Lesson Paused</h1>

        <div className="mt-5 border-y border-[#E2E8F0] py-4">
          <p className="inline-flex items-center justify-center gap-2 text-sm text-[#64748B]">
            <ClockIcon />
            Paused during:{" "}
            <span className="font-bold text-[#2b5ce6]">Core Lesson</span>
          </p>
          <p className="mt-2.5 inline-flex items-center justify-center gap-2 text-sm text-[#64748B]">
            <HourglassIcon />
            Time remaining when paused:{" "}
            <span className="font-bold tabular-nums text-[#2b5ce6]">04:32</span>
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/dashboard/skills/reading"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white transition hover:bg-[#244FE6]"
          >
            Resume Lesson
          </Link>
          <Link
            href="/dashboard/skills"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#2b5ce6] bg-white text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Exit Lesson
          </Link>
        </div>
      </div>
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-7 text-[#2b5ce6]" fill="currentColor" aria-hidden>
      <rect x="5" y="4" width="3.2" height="12" rx="1" />
      <rect x="11.8" y="4" width="3.2" height="12" rx="1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.5V7l1.8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-[#2b5ce6]" fill="none" aria-hidden>
      <path
        d="M4 2.5h6M4 11.5h6M4.5 2.5v1.8c0 .8.4 1.5 1.1 1.9L7 7l1.4-.8c.7-.4 1.1-1.1 1.1-1.9V2.5M4.5 11.5v-1.8c0-.8.4-1.5 1.1-1.9L7 7l1.4.8c.7.4 1.1 1.1 1.1 1.9v1.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
