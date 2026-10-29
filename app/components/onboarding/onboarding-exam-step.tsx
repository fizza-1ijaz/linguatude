"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type ExamChoice,
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const OPTIONS: {
  id: NonNullable<ExamChoice>;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}[] = [
  {
    id: "academic",
    title: "IELTS Academic",
    description:
      "Prepare for your IELTS test with personalized practice and guidance.",
    icon: "/onboarding/icon-academic.svg",
    iconBg: "bg-[#DBEAFE]",
  },
  {
    id: "pte",
    title: "PTE Academic",
    description:
      "Prepare for the PTE Academic test with personalized practice and guidance.",
    icon: "/onboarding/icon-globe.svg",
    iconBg: "bg-[#E8EEFF]",
  },
];

export function OnboardingExamStep() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamChoice>(null);

  useEffect(() => {
    const saved = readOnboardingState().exam;
    setExam(saved === "ukvi" ? null : saved);
  }, []);

  function continueNext() {
    if (!exam || exam === "ukvi") return;
    writeOnboardingState({
      exam,
      ukviLevel: null,
    });
    router.push(ONBOARDING_ROUTES.routine);
  }

  return (
    <OnboardingShell step={1} showAiBadge scrollable>
      <div className="flex w-full flex-col gap-3 pb-1 sm:gap-3.5">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.25rem] font-bold leading-tight tracking-tight text-[#0F172A] sm:text-[1.5rem]">
            Let&apos;s get <span className="text-[#2b5ce6]">you ready</span>
          </h1>
          <p className="mt-1 text-sm leading-5 text-[#64748B]">
            Which exam are you preparing for?
          </p>
        </header>

        <div className="flex flex-col gap-2">
          {OPTIONS.map((opt) => {
            const selected = exam === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setExam(opt.id)}
                className={`relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl bg-white px-3 py-2.5 text-left transition sm:gap-3 sm:px-3.5 sm:py-3 ${
                  selected
                    ? "shadow-[0_6px_18px_rgba(43,92,230,0.12)] ring-1 ring-[#2b5ce6]/35"
                    : "border border-[#E5E7EB] hover:border-[#C7D4F5]"
                }`}
              >
                {selected ? (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#2b5ce6]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full sm:size-10 ${opt.iconBg}`}
                >
                  <Image
                    src={opt.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-5 sm:size-6"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#111827] sm:text-[0.9375rem]">
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-[#6B7280]">
                    {opt.description}
                  </span>
                </span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full sm:size-7 ${
                    selected ? "bg-[#2b5ce6]" : "bg-[#F3F4F6]"
                  }`}
                >
                  <Image
                    src={
                      selected
                        ? "/onboarding/icon-arrow-white.svg"
                        : "/onboarding/icon-chevron-gray.svg"
                    }
                    alt=""
                    width={14}
                    height={14}
                    className="size-3"
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 sm:p-3">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#DBEAFE] text-[#2b5ce6]">
              <LockSmall />
            </span>
            <p className="text-xs font-semibold text-[#64748B]">Coming Soon</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex min-w-0 flex-col rounded-lg border border-[#E2E8F0] bg-white p-2.5">
              <div className="flex items-start gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                  <CambridgeShield />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-snug text-[#141B2B] sm:text-sm">
                    Cambridge English
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[0.6875rem] leading-snug text-[#64748B]">
                    Get ready for your Cambridge English
                  </p>
                </div>
              </div>
              <Link
                  href="/waitlist?exam=cambridge"
                className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#DBEAFE] px-2 py-1.5 text-[0.6875rem] font-semibold text-[#1D4ED8] transition hover:bg-[#BFDBFE]"
              >
                <PersonPlus />
                Join waitlist
              </Link>
            </div>

            <div className="flex min-w-0 flex-col rounded-lg border border-[#E2E8F0] bg-white p-2.5">
              <div className="flex items-start gap-2">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[0.5625rem] font-extrabold italic tracking-tight text-[#1D4ED8]">
                  TOEFL
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-snug text-[#141B2B] sm:text-sm">
                    TOEFL iBT
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[0.6875rem] leading-snug text-[#64748B]">
                    Prepare for TOEFL with structured lessons
                  </p>
                </div>
              </div>
              <Link
                  href="/waitlist?exam=toefl"
                className="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#DBEAFE] px-2 py-1.5 text-[0.6875rem] font-semibold text-[#1D4ED8] transition hover:bg-[#BFDBFE]"
              >
                <PersonPlus />
                Join waitlist
              </Link>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 -mx-1 bg-gradient-to-t from-white via-white to-white/90 pt-2">
          <OnboardingContinueButton disabled={!exam} onClick={continueNext}>
            {exam ? "Continue" : "Select an exam to continue"}
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}

function LockSmall() {
  return (
    <svg viewBox="0 0 14 14" className="size-3" fill="none" aria-hidden>
      <rect
        x="3"
        y="6"
        width="8"
        height="6"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.75 6V4.5a2.25 2.25 0 0 1 4.5 0V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CambridgeShield() {
  return (
    <svg viewBox="0 0 18 18" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M9 2.5 3.5 5v4.2c0 3.4 2.3 6.5 5.5 7.5 3.2-1 5.5-4.1 5.5-7.5V5L9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m6.8 9 1.6 1.6 2.8-2.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonPlus() {
  return (
    <svg viewBox="0 0 14 14" className="size-3" fill="none" aria-hidden>
      <circle cx="6" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2.5 11c.7-1.6 2-2.4 3.5-2.4s2.8.8 3.5 2.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10.5 4.5v3M9 6h3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
