"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const FOCUS = [
  { id: "all", label: "All (recommended)" },
  { id: "fluency", label: "Fluency" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "grammar", label: "Grammar" },
  { id: "pronunciation", label: "Pronunciation" },
] as const;

const QUESTION_TYPES = [
  {
    id: "part1",
    title: "Part 1 — Personal questions",
    description: "General topics about yourself, your life, and your interests.",
    Icon: ChatTypeIcon,
  },
  {
    id: "part2",
    title: "Part 2 — Cue card",
    description: "Speak continuously for 1-2 minutes on a specific given topic.",
    Icon: ClipboardTypeIcon,
  },
  {
    id: "part3",
    title: "Part 3 — Discussion",
    description: "In-depth conversational questions related to Part 2.",
    Icon: PeopleTypeIcon,
  },
  {
    id: "random",
    title: "Random mix",
    description: "A varied combination of all question types for a full challenge.",
    Icon: ShuffleTypeIcon,
  },
] as const;

export function SpeakSetup() {
  const [focus, setFocus] = useState<(typeof FOCUS)[number]["id"]>("all");
  const [questionType, setQuestionType] =
    useState<(typeof QUESTION_TYPES)[number]["id"]>("part1");

  return (
    <DashboardShell
      title="Practice Setup"
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
      <div className="w-full space-y-6 lg:space-y-7">
        <Link
          href="/dashboard/speak/microphone"
          className="flex w-full items-center gap-3 rounded-2xl border border-[#FED7AA] bg-[#FFF1E6] px-4 py-3.5 text-left transition hover:bg-[#FFE8D6]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#C2410C]">
            <MicMutedIcon />
          </span>
          <span className="min-w-0 flex-1 text-sm font-medium text-[#9A3412]">
            Microphone access is needed for speaking practice. Tap to enable.
          </span>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/50 text-[#C2410C]"
            aria-hidden
          >
            <ChevronRightIcon />
          </span>
        </Link>

        <section>
          <h2 className="text-base font-bold text-[#141B2B]">
            What do you want to work on?
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {FOCUS.map((item) => {
              const selected = focus === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFocus(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#2b5ce6] text-white shadow-sm"
                      : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#BFDBFE] hover:text-[#2b5ce6]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#141B2B]">Question type</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {QUESTION_TYPES.map((item) => {
              const selected = questionType === item.id;
              const Icon = item.Icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuestionType(item.id)}
                  className={`relative rounded-2xl border p-4 text-center transition sm:p-5 ${
                    selected
                      ? "border-[#2b5ce6] bg-[#EEF2FF]"
                      : "border-[#E2E8F0] bg-[#F1F5F9] hover:border-[#BFDBFE] hover:bg-[#E2E8F0]"
                  }`}
                >
                  {selected ? (
                    <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-[4px] bg-[#2b5ce6] text-white">
                      <CheckIcon />
                    </span>
                  ) : null}
                  <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-white text-[#2b5ce6] shadow-sm ring-1 ring-[#E2E8F0]/80">
                    <Icon />
                  </span>
                  <p className="mt-3 text-sm font-bold text-[#141B2B]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#64748B]">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#141B2B]">
              Question delivery
            </h2>
            <Link
              href="/dashboard/switch-exam"
              className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              Change in Settings →
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <VoiceDeliveryIcon />
            </span>
            <p className="text-sm leading-6 text-[#64748B]">
              <span className="font-bold text-[#141B2B]">Voice (current)</span>
              <br />
              Questions will be spoken aloud by the AI coach.
            </p>
          </div>
        </section>

        <div className="space-y-3 pt-1">
          <Link
            href="/dashboard/speak/session"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-base font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            <PlayIcon />
            Start Practice
          </Link>
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#F1F5F9] px-4 py-2 text-sm font-medium text-[#64748B]">
            <HeadphoneIcon />
            Headphones recommended for best accuracy
          </p>
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

function MicMutedIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="7.5"
        y="2.5"
        width="5"
        height="9"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 8.2 4.7M15.5 9.5a5.45 5.45 0 0 1-.8 2.8M10 15v2.5M3 3l14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path
        d="m2.5 6 2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatTypeIcon() {
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

function ClipboardTypeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="4"
        y="3.5"
        width="12"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 3.5V3a1.5 1.5 0 0 1 1.5-1h2A1.5 1.5 0 0 1 12.5 3v.5M7 9h6M7 12h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleTypeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13.5" cy="7.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.5 15c.8-2 2.4-3 4.5-3s3.7 1 4.5 3M11.5 14.5c.5-1.2 1.5-1.8 2.8-1.8 1.2 0 2.2.6 2.7 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShuffleTypeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M14 4h3v3M14 16h3v-3M3 7.5c2.5 0 4 2.5 5.5 5S11.5 16 14 16M3 12.5c2.5 0 4-2.5 5.5-5S11.5 4 14 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VoiceDeliveryIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15.5c.9-2 2.5-3 4.5-3s3.6 1 4.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 6.5c.8.6 1.3 1.5 1.3 2.5s-.5 1.9-1.3 2.5M15.5 5c1.2.9 2 2.3 2 4s-.8 3.1-2 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M5 3.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M2.5 8.5v2A1.5 1.5 0 0 0 4 12h1V8.5H4A1.5 1.5 0 0 0 2.5 10V8.5a5.5 5.5 0 1 1 11 0V10A1.5 1.5 0 0 1 12 11.5h-1V8.5h1A1.5 1.5 0 0 1 13.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
