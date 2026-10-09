"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type StudyDayId,
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const DAYS: {
  id: StudyDayId;
  initial: string;
  short: string;
  full: string;
}[] = [
  { id: "mon", initial: "M", short: "Mon", full: "Monday" },
  { id: "tue", initial: "T", short: "Tue", full: "Tuesday" },
  { id: "wed", initial: "W", short: "Wed", full: "Wednesday" },
  { id: "thu", initial: "T", short: "Thu", full: "Thursday" },
  { id: "fri", initial: "F", short: "Fri", full: "Friday" },
  { id: "sat", initial: "S", short: "Sat", full: "Saturday" },
  { id: "sun", initial: "S", short: "Sun", full: "Sunday" },
];

export function OnboardingDaysStep() {
  const router = useRouter();
  const [days, setDays] = useState<StudyDayId[]>(["mon", "tue", "wed", "thu"]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      state.exam === "ukvi" ||
      !state.dailyMinutes ||
      !state.experienceDone ||
      !state.goalsDone
    ) {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    setDays(state.studyDays.length ? state.studyDays : ["mon", "tue", "wed", "thu"]);
    setReady(true);
  }, [router]);

  function toggleDay(id: StudyDayId) {
    setDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  }

  function continueNext() {
    if (!days.length) return;
    writeOnboardingState({ studyDays: days, studyDaysDone: true });
    router.push(ONBOARDING_ROUTES.focus);
  }

  if (!ready) {
    return (
      <OnboardingShell step={5}>
        <div className="flex flex-1 items-center justify-center text-sm text-[#64748b]">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={5}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.65rem]">
            Choose your study days
          </h1>
          <p className="mt-1.5 text-sm leading-5 text-[#64748B]">
            Which days would you like to study?
          </p>
        </header>

        <div className="mt-4 flex min-h-0 flex-1 flex-col justify-center">
          <div className="rounded-2xl border border-[#E8ECF4] bg-white p-3 shadow-[0_4px_16px_rgba(43,92,230,0.06)] sm:p-4">
            <div className="mb-3 h-0.5 w-full rounded-full bg-[#2b5ce6]/80" aria-hidden />
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {DAYS.map((day) => {
                const selected = days.includes(day.id);
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    aria-pressed={selected}
                    className={`flex flex-col items-center rounded-xl px-1 py-2.5 transition sm:py-3 ${
                      selected
                        ? "bg-[#E8EEFF]"
                        : "bg-[#F3F4F6] hover:bg-[#EEF1F6]"
                    }`}
                  >
                    <span
                      className={`text-base font-bold sm:text-lg ${
                        selected ? "text-[#2b5ce6]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {day.initial}
                    </span>
                    <span
                      className={`mt-0.5 text-[0.625rem] font-semibold sm:text-[0.6875rem] ${
                        selected ? "text-[#475569]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {day.short}
                    </span>
                    <span
                      className={`mt-0.5 hidden text-[0.5rem] leading-tight sm:block ${
                        selected ? "text-[#64748B]" : "text-[#C0C4CC]"
                      }`}
                    >
                      {day.full}
                    </span>
                    <span
                      className={`mt-2 flex size-5 items-center justify-center rounded-full ${
                        selected
                          ? "bg-[#2b5ce6] text-white"
                          : "border border-[#D1D5DB] bg-transparent"
                      }`}
                    >
                      {selected ? (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 justify-center">
          <OnboardingContinueButton
            disabled={!days.length}
            onClick={continueNext}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
