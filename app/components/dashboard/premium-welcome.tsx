"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const BENEFITS = [
  {
    title: "25 AI Speaking + Writing attempts",
    description: "Practice as much as you want with personalized AI feedback.",
  },
  {
    title: "1 full mock test",
    description:
      "Unlimited access to quick and full mocks for Reading, Listening, Speaking and Writing.",
  },
  {
    title: "Complete adaptive learning plan",
    description:
      "A personalized plan that adapts to you and helps you improve faster.",
  },
] as const;

export function PremiumWelcome() {
  return (
    <DashboardShell
      title={<span className="sr-only">Welcome to Premium</span>}
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-4 py-8 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center pb-10 text-center">
        <div className="relative flex size-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#E8F5E9]" aria-hidden />
          <span className="relative flex size-14 items-center justify-center rounded-full bg-[#34C759] text-white shadow-md">
            <CheckBig />
          </span>
        </div>

        <h1 className="mt-6 text-balance text-2xl font-bold text-[#141B2B] sm:text-3xl">
          Welcome to Premium, John!
        </h1>

        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#A7F3D0] bg-[#F0FFF4] px-3 py-1.5 text-sm font-semibold text-[#34C759]">
          <CrownTiny />
          Premium · 7-day free trial active
        </span>

        <p className="mt-3 text-sm text-[#64748B] sm:text-base">
          Your Premium trial is active. Start learning with your trial benefits.
        </p>

        <div className="mt-8 w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white text-left shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)]">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`flex items-start gap-3 px-5 py-4 ${
                i > 0 ? "border-t border-[#E2E8F0]" : ""
              }`}
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#34C759] text-white">
                <CheckMini />
              </span>
              <div>
                <p className="text-sm font-bold text-[#141B2B] sm:text-base">{b.title}</p>
                <p className="mt-0.5 text-sm leading-5 text-[#64748B]">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-base font-bold text-white transition hover:bg-[#244FE6]"
        >
          <SparkleIcon />
          Start Learning
        </Link>
      </div>
    </DashboardShell>
  );
}

function CheckBig() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <path d="M6 12.5 10.5 17 18 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path d="M2 5.2 4 7l4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrownTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 10 3.5 4.5 5.8 6.5 7 3.5 8.2 6.5 10.5 4.5 11.5 10H2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#FBBF24]" fill="currentColor" aria-hidden>
      <path d="M8 1.5 9.2 5.5 13.5 6.5 9.2 7.5 8 11.5 6.8 7.5 2.5 6.5l4.3-1L8 1.5Z" />
    </svg>
  );
}
