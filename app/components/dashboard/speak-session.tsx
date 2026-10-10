"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const QUESTION_TEXT =
  "Do you prefer to read books, watch movies, or listen to music in your free time? Why do you prefer that?";

const RECORDING_SECONDS = 47;
const WAVEFORM_BARS = 48;

export function SpeakSession() {
  const router = useRouter();
  const [phase, setPhase] = useState<"ready" | "recording">("ready");
  const [remaining, setRemaining] = useState(RECORDING_SECONDS);
  const [tick, setTick] = useState(0);

  const goToFeedback = useCallback(() => {
    router.push("/dashboard/speak/feedback");
  }, [router]);

  const stopRecording = useCallback(() => {
    goToFeedback();
  }, [goToFeedback]);

  const endSession = useCallback(() => {
    router.push("/dashboard/speak");
  }, [router]);

  useEffect(() => {
    if (phase !== "recording") return;

    const countdown = window.setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const anim = window.setInterval(() => {
      setTick((t) => t + 1);
    }, 80);

    return () => {
      window.clearInterval(countdown);
      window.clearInterval(anim);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "recording" && remaining <= 0) {
      goToFeedback();
    }
  }, [phase, remaining, goToFeedback]);

  const waveformHeights = useMemo(() => {
    return Array.from({ length: WAVEFORM_BARS }, (_, i) => {
      const center = (WAVEFORM_BARS - 1) / 2;
      const dist = Math.abs(i - center) / center;
      const envelope = Math.cos(dist * Math.PI * 0.5);
      const wave =
        0.35 +
        0.65 *
          Math.abs(
            Math.sin(i * 0.55 + tick * 0.35) *
              Math.cos(i * 0.22 - tick * 0.18),
          );
      return Math.max(0.12, envelope * wave);
    });
  }, [tick]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const stoppingIn = Math.min(3, remaining);

  if (phase === "recording") {
    return (
      <div
        role="dialog"
        aria-label="Recording"
        className="fixed inset-0 z-50 flex flex-col bg-[#0B1220] text-white"
        onClick={stopRecording}
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6">
          <p className="max-w-3xl text-left text-base font-medium leading-7 text-white sm:text-lg sm:leading-8">
            Do you prefer to read books, watch movies, or listen to music in
            your free time?
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              endSession();
            }}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0B1220] transition hover:bg-white/90"
            aria-label="Close session"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div
            className="flex h-40 w-full max-w-3xl items-center justify-center gap-[3px] sm:h-48 sm:gap-1"
            aria-hidden
          >
            {waveformHeights.map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[#2b5ce6] transition-[height] duration-75 sm:w-1"
                style={{
                  height: `${h * 100}%`,
                  opacity: Math.max(
                    0.25,
                    1 - Math.abs(i - WAVEFORM_BARS / 2) / (WAVEFORM_BARS / 1.6),
                  ),
                }}
              />
            ))}
          </div>

          <div className="mt-8 space-y-2 text-center">
            <p className="text-base font-semibold text-white sm:text-lg">
              Recording — {mm}:{ss} remaining
            </p>
            <p className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#EF4444]">
              <MutedMicIcon />
              Stopping in {stoppingIn}...
            </p>
            <p className="text-sm text-white/80">Tap anywhere to keep recording</p>
          </div>
        </div>

        <div
          className="flex flex-col items-center gap-4 px-4 pb-10 sm:pb-12"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={stopRecording}
            className="flex size-[4.5rem] items-center justify-center rounded-full bg-[#EF4444] text-white shadow-[0_0_0_8px_rgba(239,68,68,0.25)] transition hover:bg-[#DC2626]"
            aria-label="Stop recording"
          >
            <span className="size-5 rounded-[3px] bg-white" />
          </button>
          <button
            type="button"
            onClick={stopRecording}
            className="rounded-xl border border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Stop recording
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell
      title="Question"
      contentBgClassName="bg-[#EEF2FF]"
      mainClassName="flex-1 px-4 py-5 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href="/dashboard/speak/setup"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to Practice Setup"
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
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <div className="relative flex w-full items-start">
          <div className="mx-auto w-full max-w-xl px-10 sm:px-12">
            <p className="text-center text-sm font-semibold text-[#334155]">
              Question 2 of 5
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-[#2b5ce6]"
                style={{ width: "40%" }}
              />
            </div>
          </div>
          <Link
            href="/dashboard/speak"
            className="absolute right-0 top-0 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] transition hover:bg-white"
            aria-label="Close session"
          >
            <CloseIcon />
          </Link>
        </div>

        <div className="mt-8 w-full rounded-2xl border border-white bg-white p-6 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
          <span className="inline-flex rounded-lg bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#2b5ce6]">
            Part 1
          </span>
          <p className="mt-8 text-center text-lg font-bold leading-8 text-[#1E293B] sm:text-xl sm:leading-9">
            {QUESTION_TEXT}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#EEF2FF]">
                <SpeakerIcon />
              </span>
              Playing question...
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              <ReplayIcon />
              Replay question
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-[#94A3B8]">
          Please wait 1 second to activate the microphone
        </p>

        <div className="relative mt-6 flex items-center justify-center">
          <span
            className="absolute size-[7.25rem] animate-pulse rounded-full border border-[#FDBA74]/45 sm:size-[8rem]"
            aria-hidden
          />
          <span
            className="absolute size-[8.5rem] rounded-full border border-[#FED7AA]/35 sm:size-[9.5rem]"
            aria-hidden
          />
          <span
            className="absolute size-[9.75rem] rounded-full border border-[#FFEDD5]/50 sm:size-[11rem]"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => {
              setRemaining(RECORDING_SECONDS);
              setTick(0);
              setPhase("recording");
            }}
            className="relative flex size-[4.25rem] items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.55)] transition hover:bg-[#EA580C] sm:size-[4.75rem]"
            aria-label="Record answer"
          >
            <MicButtonIcon />
          </button>
        </div>

        <p className="mt-5 text-center text-base font-bold text-[#141B2B]">
          Get ready...
        </p>
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="m4 4 8 8M12 4 4 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3 6.5h2.2L8.5 4v8L5.2 9.5H3V6.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 6.5a2.5 2.5 0 0 1 0 3M12 5a4.2 4.2 0 0 1 0 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 8a4.5 4.5 0 1 0 1.2-3M3.5 3v3h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicButtonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="white" />
      <path
        d="M6 12a6 6 0 0 0 12 0M12 18v3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MutedMicIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect
        x="6"
        y="1.5"
        width="4"
        height="7"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 7.5a4.5 4.5 0 0 0 6.7 3.9M12.5 7.5a4.4 4.4 0 0 1-.7 2.3M8 12.5V14.5M2.5 2.5l11 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
