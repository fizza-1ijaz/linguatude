"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function LessonVocabulary() {
  const [flipped, setFlipped] = useState(false);
  const [tipOpen, setTipOpen] = useState(true);

  return (
    <DashboardShell
      title="Vocabulary"
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
          <p className="text-sm font-medium text-[#64748B]">Card 3 of 8</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3 py-1.5 text-sm font-bold tabular-nums text-[#1D4ED8]">
            <ClockIcon />
            22:15
          </span>
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 pb-8">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className="relative w-full rounded-3xl border border-[#E2E8F0] bg-white px-6 py-12 text-center shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)] transition ui-fade-up ui-hover-lift"
        >
          <div className="absolute right-4 top-4">
            <span className="relative inline-flex">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-sm">
                <SpeakerIcon />
              </span>
              {tipOpen ? (
                <span className="absolute right-12 top-1 whitespace-nowrap rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#475569] shadow-sm">
                  Hear pronunciation
                  <button
                    type="button"
                    className="ml-1 text-[#94A3B8]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTipOpen(false);
                    }}
                    aria-label="Dismiss tip"
                  >
                    ×
                  </button>
                </span>
              ) : null}
            </span>
          </div>

          {!flipped ? (
            <>
              <p className="text-3xl font-bold text-[#141B2B] sm:text-4xl">
                beneficial
              </p>
              <span className="mt-3 inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                adjective
              </span>
              <p className="mt-3 text-base text-[#64748B]">/bəˈnefɪʃəl/</p>
            </>
          ) : (
            <div className="ui-fade-in">
              <p className="text-lg font-bold text-[#141B2B]">Definition</p>
              <p className="mt-3 text-base leading-7 text-[#475569]">
                Resulting in good; favourable or advantageous.
              </p>
              <p className="mt-4 text-sm italic text-[#64748B]">
                Example: Regular practice is beneficial for exam performance.
              </p>
            </div>
          )}

          <div className="mt-10 border-t border-[#E2E8F0] pt-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <HandIcon />
              Tap card to reveal definition
            </p>
          </div>
        </button>

        <Link
          href="/dashboard/skills/grammar"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] text-sm font-semibold text-white shadow-sm transition hover:bg-[#15803D] ui-fade-up-delay-1"
        >
          I knew this
          <CheckIcon />
        </Link>
        <Link
          href="/dashboard/skills/grammar"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#DC2626] text-sm font-semibold text-white shadow-sm transition hover:bg-[#B91C1C] ui-fade-up-delay-2"
        >
          I didn&apos;t know this
          <XIcon />
        </Link>

        <div className="flex items-center gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 ui-fade-up-delay-3">
          <span className="text-[#2b5ce6]">
            <RefreshIcon />
          </span>
          <p className="text-sm font-semibold text-[#1D4ED8]">
            Let&apos;s review the words you missed
          </p>
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

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3 6.5h2.2L8.5 4v8L5.2 9.5H3v-3Z" fill="currentColor" />
      <path d="M10.5 6.2a2.4 2.4 0 0 1 0 3.6M12.2 4.8a4.2 4.2 0 0 1 0 6.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M7 9V4.5a1 1 0 0 1 2 0V9M9 8.5V5.2a1 1 0 0 1 2 0V9M11 9V6.5a1 1 0 0 1 2 0V11a3.5 3.5 0 0 1-3.5 3.5H8A3.5 3.5 0 0 1 4.5 11V8.2a1 1 0 0 1 2 0V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 3.5 7 2l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M3 7.2 5.8 10 11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M3.5 3.5 10.5 10.5M10.5 3.5 3.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M13 8a5 5 0 1 1-1.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 3.5V6.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
