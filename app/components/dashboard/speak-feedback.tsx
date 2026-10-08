"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const BAND_METRICS = [
  { label: "F&C", value: "6.0", color: "text-[#F97316]" },
  { label: "Lex", value: "7.0", color: "text-[#16A34A]" },
  { label: "Gram", value: "6.0", color: "text-[#F97316]" },
  { label: "Pron", value: "6.5", color: "text-[#F97316]" },
] as const;

export function SpeakFeedback() {
  const [showFull, setShowFull] = useState(false);

  return (
    <DashboardShell
      title="Your Feedback"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-5 lg:px-6"
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
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm ring-1 ring-[#E2E8F0]"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
          </button>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-6 lg:gap-5">
        {/* Top row */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-[#141B2B]">What we heard</h2>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEDD5] px-2.5 py-1 text-xs font-semibold text-[#EA580C]">
                <span className="size-1.5 rounded-full bg-[#F97316]" aria-hidden />
                Filler words highlighted
              </p>
            </div>
            <p
              className={`mt-4 text-sm leading-7 text-[#334155] sm:text-[0.9375rem] sm:leading-8 ${
                showFull ? "" : "line-clamp-6"
              }`}
            >
              I grew up in Lahore which is <Filler>basically</Filler> a large
              city in Pakistan. I think it&apos;s a very beautiful place{" "}
              <Pause /> and it has a lot of history. <Filler>Um</Filler> the
              food is amazing and people are really friendly{" "}
              <Filler>you know</Filler>. <Filler>Like</Filler> I spent most of
              my childhood playing cricket with my friends in their street{" "}
              <Pause /> and those memories are really special to me.
            </p>
            <button
              type="button"
              onClick={() => setShowFull((v) => !v)}
              className="mt-4 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              {showFull ? "Hide full transcript ⌃" : "Show full transcript ⌵"}
            </button>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Estimated Band</h2>
            <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex flex-col items-center">
                <div className="relative flex size-[8.5rem] items-center justify-center sm:size-[9.5rem]">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" aria-hidden>
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#FFEDD5"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(6.5 / 9) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="relative text-center">
                    <p className="text-3xl font-bold tabular-nums text-[#141B2B] sm:text-4xl">
                      6.5
                    </p>
                    <p className="mt-0.5 text-[0.625rem] font-semibold tracking-wide text-[#94A3B8]">
                      ESTIMATED
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-[11rem] rounded-lg bg-[#F1F5F9] px-2.5 py-2 text-center text-[0.6875rem] leading-4 text-[#64748B]">
                  An estimated score, not an official IELTS result.
                </p>
              </div>

              <div className="grid w-full max-w-xs flex-1 grid-cols-2 gap-2.5 sm:gap-3">
                {BAND_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-3"
                  >
                    <span className="absolute right-2 top-2 text-[#CBD5E1]">
                      <InfoIcon />
                    </span>
                    <p className="text-xs font-semibold text-[#64748B]">{m.label}</p>
                    <p className={`mt-1 text-xl font-bold tabular-nums ${m.color}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Middle row */}
        <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A]">
                <TurtleIcon />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Pace</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">
                  128 WPM
                </p>
                <p className="mt-1 text-sm font-semibold text-[#16A34A]">Good pace</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                <ChatBubbleIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#64748B]">Filler words</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">5</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["basically", "like", "you know", "+1"].map((w) => (
                    <span
                      key={w}
                      className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[0.6875rem] font-medium text-[#64748B]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                <ClockIcon />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Duration</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">
                  00:52
                </p>
                <p className="mt-1 text-sm font-semibold text-[#2b5ce6]">
                  Recommended: 45—60 sec
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom split — coach wider, next question tighter */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,0.75fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#FED7AA]/60 bg-[#FFFBF5] p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Coach Feedback</h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border-l-[3px] border-l-[#16A34A] bg-white px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white">
                    <StarIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#16A34A]">What worked</p>
                    <p className="mt-1 text-sm leading-6 text-[#334155]">
                      You gave a clear answer and supported your main idea with a
                      relevant example.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-l-[3px] border-l-[#F97316] bg-white px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white">
                    <PlayIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#EA580C]">Focus on this</p>
                    <p className="mt-1 text-sm leading-6 text-[#334155]">
                      Reduce filler words when moving between ideas. Take a short
                      pause instead of using fillers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 rounded-xl bg-white px-4 py-3.5 sm:grid-cols-2 sm:gap-6">
              <div className="text-left">
                <p className="text-[0.6875rem] font-bold tracking-wide text-[#94A3B8]">
                  YOU SAID
                </p>
                <p className="mt-1 text-sm leading-6 text-[#334155]">
                  Basically, it was a very nice place with a lot of history.
                </p>
              </div>
              <div className="text-left sm:border-l sm:border-[#E2E8F0] sm:pl-6">
                <p className="text-[0.6875rem] font-bold tracking-wide text-[#2b5ce6]">
                  TRY INSTEAD
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[#2b5ce6]">
                  It was a really pleasant place with a lot of history.
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col rounded-2xl border border-[#BFDBFE]/80 bg-[#EFF6FF] p-4 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-4">
            <Link
              href="/dashboard/speak/session"
              className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              Next question →
            </Link>
            <p className="mt-4 text-center text-sm font-bold leading-6 text-[#141B2B] sm:text-base sm:leading-7">
              What do you like most about the area where you grew up?
            </p>
            <div className="mt-4 flex flex-col items-center">
              <Link
                href="/dashboard/speak/session"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
              >
                <MicSmallIcon />
                Record Response
              </Link>
              <p className="mt-2 text-center text-xs text-[#94A3B8]">
                This will continue your speaking practice.
              </p>
            </div>
          </section>
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/dashboard/speak/exam"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-xl bg-[#2b5ce6] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            End Session
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function Filler({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded px-1 py-0.5 bg-[#FED7AA] font-medium text-[#9A3412]">
      {children}
    </mark>
  );
}

function Pause() {
  return <span className="font-medium text-[#EF4444]">[pause]</span>;
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

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.2c0 .6-.2 1.2-.6 1.7L3.8 12.5c-.5.6-.1 1.5.7 1.5h11c.8 0 1.2-.9.7-1.5l-1.1-1.6c-.4-.5-.6-1.1-.6-1.7V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 14.5a1.8 1.8 0 0 0 3.6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6 5.2V8.5M6 3.6h.01"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TurtleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <ellipse
        cx="12"
        cy="13"
        rx="7"
        ry="4.5"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M5.5 13c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5c0 1.4-.6 2.6-1.6 3.5H7.1C6.1 15.6 5.5 14.4 5.5 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="11.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M18.2 10.2h1.2M7 16.2 5.5 18M10 16.8V19M14 16.8V19M17 16.2 18.5 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 11.5h5M10.5 13.5h3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 10.5v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6.5V10l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="m7 1.4 1.5 3.1 3.4.5-2.45 2.4.6 3.4L7 9.2l-3.05 1.6.6-3.4L2.1 5l3.4-.5L7 1.4Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M4.2 2.6v8.8L11.4 7 4.2 2.6Z" />
    </svg>
  );
}

function MicSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="6" y="1.5" width="4" height="8" rx="2" fill="white" />
      <path
        d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
