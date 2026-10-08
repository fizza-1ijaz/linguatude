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
  "Personalized score report and study plan",
] as const;

const STATS = [
  {
    label: "TIME",
    value: "10–12 minutes",
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
      (state.exam === "ukvi" && !state.ukviLevel) ||
      !state.experienceDone ||
      !state.goalsDone
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
    <OnboardingShell step={5}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.5rem] font-bold leading-tight text-[#111827] sm:text-[2.125rem]">
            Let&apos;s find your starting point
          </h1>
          <p className="mt-2.5 text-sm leading-6 text-[#64748B] sm:text-base">
            A quick 10–12 minute test tells us exactly where to focus your
            preparation.
          </p>
        </header>

        <div className="mt-5 grid shrink-0 grid-cols-3 gap-2 rounded-2xl border border-[rgba(209,213,219,0.45)] bg-white p-3 shadow-[0_4px_4px_rgba(0,0,0,0.08)] sm:gap-0 sm:p-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? "border-l border-[rgba(195,197,215,0.45)]" : ""
              }`}
            >
              <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-[#E8EEFB] sm:size-12">
                <Image
                  src={stat.icon}
                  alt=""
                  width={22}
                  height={22}
                  className="size-5"
                />
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.06em] text-[#434655] sm:text-xs">
                {stat.label}
              </span>
              <span className="mt-0.5 text-sm font-bold text-[#0042C7] sm:text-base">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
          <h2 className="text-lg font-bold text-[#111C2D] sm:text-xl">
            What to expect
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {EXPECTATIONS.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Image
                  src="/onboarding/icon-expect-check.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="mt-0.5 size-5 shrink-0 sm:size-6"
                />
                <span className="text-sm leading-6 text-[#42474F] sm:text-base sm:leading-7">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex shrink-0 flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={startTest}
            className="inline-flex h-14 w-full max-w-md items-center justify-center gap-2 rounded-[1.25rem] bg-[#2b5ce6] px-6 text-lg font-medium text-white shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50"
          >
            Start Diagnostic Test
            <Image
              src="/onboarding/icon-arrow-sm.svg"
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
          </button>
          <button
            type="button"
            onClick={skip}
            className="px-4 py-2 text-sm text-[#6B7280] transition hover:text-[#141B2B] sm:text-base"
          >
            Skip — I&apos;ll set up my plan manually
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}
