"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OnboardingShell } from "@/app/components/onboarding/onboarding-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const EXPECTATIONS = [
  "Short questions in Reading, Listening, and Writing",
  "Two brief speaking prompts — just 30–60 seconds each",
  "Personalised score report and study plan",
] as const;

const STATS = [
  {
    label: "TIME",
    value: "10 minutes",
    icon: "/onboarding/icon-time.svg",
  },
  {
    label: "SKILLS",
    value: "All 4 skills tested",
    icon: "/onboarding/icon-skills.svg",
  },
  {
    label: "OUTPUT",
    value: "Instant AI analysis",
    icon: "/onboarding/icon-output.svg",
  },
] as const;

export function OnboardingDiagnosticStep() {
  const router = useRouter();

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      state.exam === "ukvi" ||
      !state.dailyMinutes ||
      !state.experienceDone ||
      !state.goalsDone ||
      !state.studyDaysDone ||
      !state.focusDone
    ) {
      router.replace(ONBOARDING_ROUTES.exam);
    }
  }, [router]);

  function startTest() {
    router.push(ONBOARDING_ROUTES.diagnosticTest);
  }

  function skip() {
    writeOnboardingState({ completed: true });
    router.push("/dashboard");
  }

  return (
    <OnboardingShell step={7}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-tight text-[#111827] sm:text-[1.65rem]">
            Let&apos;s find your starting point
          </h1>
          <p className="mt-1.5 text-xs leading-5 text-[#64748B] sm:text-sm">
            Takes about 10 minutes.
          </p>
        </header>

        <div className="mt-3.5 grid shrink-0 grid-cols-3 gap-1 rounded-2xl border border-[rgba(209,213,219,0.45)] bg-white p-2.5 shadow-[0_4px_4px_rgba(0,0,0,0.06)] sm:gap-0 sm:p-3.5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-1 text-center ${
                i > 0 ? "border-l border-[rgba(195,197,215,0.45)]" : ""
              }`}
            >
              <span className="mb-1.5 flex size-9 items-center justify-center rounded-xl bg-[#E8EEFB]">
                <Image
                  src={stat.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="size-4"
                />
              </span>
              <span className="text-[0.5625rem] font-medium uppercase tracking-[0.06em] text-[#434655]">
                {stat.label}
              </span>
              <span className="mt-0.5 text-[0.6875rem] font-bold leading-snug text-[#0042C7] sm:text-xs">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3.5 min-h-0 flex-1">
          <h2 className="text-sm font-bold text-[#111C2D] sm:text-base">
            What to expect
          </h2>
          <ul className="mt-2 flex flex-col gap-2.5">
            {EXPECTATIONS.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <ExpectCheckIcon />
                <span className="text-xs leading-5 text-[#42474F] sm:text-[0.8125rem] sm:leading-5">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3.5 flex shrink-0 flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={startTest}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#2b5ce6] px-5 text-[0.9375rem] font-semibold text-white shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 sm:h-12"
          >
            Start Diagnostic Test
            <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            onClick={skip}
            className="px-3 py-1.5 text-xs text-[#6B7280] transition hover:text-[#141B2B] sm:text-sm"
          >
            Skip — I&apos;ll set up my plan manually
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}

function ExpectCheckIcon() {
  return (
    <span
      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="size-5 text-[#2b5ce6]" fill="none">
        <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M6.2 10.2 8.7 12.7 13.8 7.4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
