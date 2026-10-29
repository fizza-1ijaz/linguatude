"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WaitlistShell } from "@/app/components/waitlist-shell";
import type { WaitlistExam } from "@/app/components/waitlist-join";

function parseExam(value: string | null): WaitlistExam {
  return value === "toefl" ? "toefl" : "cambridge";
}

export function WaitlistSuccess() {
  const searchParams = useSearchParams();
  const exam = useMemo(
    () => parseExam(searchParams.get("exam")),
    [searchParams],
  );
  const examLabel = exam === "cambridge" ? "Cambridge" : "TOEFL";

  return (
    <WaitlistShell backHref="/waitlist" backLabel="Back">
      <div className="grid w-full flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex min-w-0 w-full flex-col justify-center">
          <div className="mb-4 flex justify-center lg:hidden">
            <Image
              src="/waitlist/on-list.svg"
              alt=""
              width={220}
              height={180}
              className="h-auto w-full max-w-[11rem]"
              priority
            />
          </div>

          <h1 className="text-center text-[1.5rem] font-extrabold tracking-tight text-[#141B2B] sm:text-[1.75rem] lg:text-left">
            You&apos;re on the list.
          </h1>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-sm text-[#64748B] lg:justify-start">
            <span>We&apos;ll let you know when</span>
            <span className="inline-flex rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-sm font-semibold text-[#1D4ED8]">
              {examLabel}
            </span>
            <span>launches.</span>
          </p>

          <div className="mt-5 w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                <ShieldCheck />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-base font-bold text-[#141B2B]">{examLabel}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[#64748B]">
                  Your interest has been recorded successfully.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full">
            <Link
              href="/onboarding"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6] sm:h-12"
            >
              Back to onboarding
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="hidden min-w-0 w-full items-center justify-center lg:flex">
          <Image
            src="/waitlist/on-list.svg"
            alt=""
            width={220}
            height={180}
            className="h-auto w-full max-w-xs"
            priority
          />
        </div>
      </div>
    </WaitlistShell>
  );
}

function ShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d="M12 3.5 5 6.5v5c0 4.5 3.1 8.6 7 9.8 3.9-1.2 7-5.3 7-9.8v-5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2.2 2.2L15.5 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
