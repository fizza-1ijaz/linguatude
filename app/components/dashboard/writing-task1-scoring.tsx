"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { WritingScoringGraphic } from "@/app/components/dashboard/writing-scoring-graphic";

const STATUS_LINES = [
  "Reading your essay carefully",
  "Checking task achievement",
  "Reviewing grammar & vocabulary",
  "Preparing your feedback",
] as const;

const EVALUATE_MS = 4500;

export function WritingTask1Scoring() {
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);
  const redirected = useRef(false);

  useEffect(() => {
    const statusId = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 1100);
    return () => window.clearInterval(statusId);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!redirected.current) {
        redirected.current = true;
        router.push("/dashboard/writing/task1/feedback");
      }
    }, EVALUATE_MS);
    return () => window.clearTimeout(id);
  }, [router]);

  return (
    <DashboardShell
      title="Scoring"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8"
      headerLeft={
        <Link
          href="/dashboard/writing/task1/write"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center pb-8 text-center">
        <WritingScoringGraphic className="size-52 sm:size-60" />

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-[1.75rem]">
          Evaluating your response...
        </h2>

        <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.28)] ring-1 ring-[#E2E8F0]">
          <span className="writing-score-spinner size-5 shrink-0 rounded-full border-2 border-[#DBEAFE] border-t-[#2b5ce6]" />
          <p className="text-sm font-medium text-[#141B2B]">
            {STATUS_LINES[statusIndex]}
          </p>
        </div>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3.5 py-1.5 text-sm font-medium text-[#2b5ce6]">
          <ClockMini />
          Usually takes 15—30 seconds
        </div>

        <div className="mt-10 flex w-full flex-col items-stretch gap-3 rounded-xl bg-[#EFF6FF] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#1E40AF]">
            <NotifyIcon />
            We&apos;ll notify you when feedback is ready.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
          >
            Go to Home — we&apos;ll notify you
            <span aria-hidden>›</span>
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

function NotifyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden>
      <path
        d="M8 2.5a4 4 0 0 0-4 4v1.8c0 .5-.2 1-.5 1.4L2.8 11c-.4.5 0 1.2.7 1.2h9c.7 0 1.1-.7.7-1.2l-.7-1.3c-.3-.4-.5-.9-.5-1.4V6.5a4 4 0 0 0-4-4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 12.5a1.5 1.5 0 0 0 3 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
