"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function LessonGrammar() {
  return (
    <DashboardShell
      title="Grammar Practice"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-4 py-5 sm:px-6"
      headerRight={
        <button
          type="button"
          className="relative inline-flex size-10 items-center justify-center rounded-full text-[#64748B]"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
      }
    >
      <div className="mx-auto w-full max-w-lg space-y-4 pb-8">
        <div className="flex items-start gap-2.5 rounded-xl bg-[#EEF2FF] px-4 py-3.5 ui-fade-up">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
            i
          </span>
          <div>
            <p className="text-sm font-bold text-[#1D4ED8]">
              Items generated from user&apos;s logged errors
            </p>
            <p className="mt-0.5 text-sm text-[#3B82F6]">
              Review and practice the grammar points you missed.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F8FAFF] px-4 py-3 ui-fade-up-delay-1">
          <p className="text-sm font-bold text-[#1D4ED8]">Item 4 of 12</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-5 ui-fade-up-delay-1">
          <p className="text-base font-semibold text-[#EF4444]">
            I do not knew how to cook.
          </p>
        </div>

        <div className="rounded-xl border-2 border-[#2b5ce6] bg-white px-4 py-5 ui-fade-up-delay-2">
          <p className="text-base font-bold text-[#2b5ce6]">
            I didn&apos;t know how to cook.
          </p>
        </div>

        <Link
          href="/dashboard/skills/progress-updated"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6] ui-fade-up-delay-2"
        >
          Next Item
        </Link>

        <div className="flex items-start gap-2.5 rounded-xl bg-[#EEF2FF] px-4 py-3.5 ui-fade-up-delay-3">
          <span className="mt-0.5 text-[#2b5ce6]">
            <BulbIcon />
          </span>
          <div>
            <p className="text-sm font-bold text-[#1D4ED8]">How it works</p>
            <p className="mt-0.5 text-sm leading-6 text-[#3B82F6]">
              We&apos;ve created these items from the mistakes you&apos;ve made.
              Practice them to strengthen your grammar and improve accuracy.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
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
      <path d="M8.2 14.5a1.8 1.8 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path
        d="M9 2.5A4.5 4.5 0 0 0 6.2 10.3V12h5.6v-1.7A4.5 4.5 0 0 0 9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 13.5h4M7.8 15h2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
