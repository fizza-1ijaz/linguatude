"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const STUDY_OPTIONS = [
  {
    minutes: 15,
    label: "15 minutes",
    icon: "/onboarding/icon-stopwatch.svg",
  },
  {
    minutes: 30,
    label: "30 minutes",
    icon: "/onboarding/icon-clock.svg",
    badge: "RECOMMENDED",
  },
  {
    minutes: 45,
    label: "45 minutes",
    icon: "/onboarding/icon-hourglass.svg",
  },
  {
    minutes: 60,
    label: "60 minutes",
    icon: "/onboarding/icon-alarm.svg",
  },
] as const;

export function OnboardingLevelStep() {
  const router = useRouter();
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const state = readOnboardingState();
    if (!state.exam || state.exam === "ukvi") {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    setMinutes(state.dailyMinutes);
  }, [router]);

  function continueNext() {
    if (!minutes) return;
    writeOnboardingState({ dailyMinutes: minutes });
    router.push(ONBOARDING_ROUTES.goal);
  }

  return (
    <OnboardingShell step={2}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.75rem]">
            Build your study routine
          </h1>
          <p className="mt-1.5 text-sm leading-5 text-[#64748B] sm:text-[0.9375rem]">
            How much time can you study each day?
          </p>
        </header>

        <div
          className="mt-4 flex min-h-0 flex-1 flex-col gap-2.5"
          role="radiogroup"
          aria-label="Daily study time"
        >
          {STUDY_OPTIONS.map((opt) => {
            const selected = minutes === opt.minutes;
            return (
              <button
                key={opt.minutes}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setMinutes(opt.minutes)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition sm:gap-3.5 sm:px-4 sm:py-3.5 ${
                  selected
                    ? "border-[#2b5ce6] bg-[#F7F9FF] shadow-[inset_3px_0_0_#2b5ce6]"
                    : "border-[#E5E7EB] bg-white hover:border-[#C7D4F5]"
                }`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2b5ce6] sm:size-11">
                  <Image
                    src={opt.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="size-5"
                  />
                </span>
                <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold text-[#111827] sm:text-base">
                  {opt.label}
                  {"badge" in opt && opt.badge ? (
                    <span className="ml-2 inline-flex rounded-full bg-[#2b5ce6] px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-white">
                      {opt.badge}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-[#2b5ce6]" : "border-[#D1D5DB]"
                  }`}
                >
                  {selected ? (
                    <span className="size-2.5 rounded-full bg-[#2b5ce6]" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex shrink-0 justify-center">
          <OnboardingContinueButton disabled={!minutes} onClick={continueNext}>
            Continue
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
