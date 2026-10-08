"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type BandScore,
  type PreviousScores,
  IELTS_BAND_OPTIONS,
  ONBOARDING_ROUTES,
  calculateIeltsOverall,
  emptyPreviousScores,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SKILLS: { key: keyof PreviousScores; label: string }[] = [
  { key: "reading", label: "Reading" },
  { key: "writing", label: "Writing" },
  { key: "listening", label: "Listening" },
  { key: "speaking", label: "Speaking" },
];

function formatBand(value: number) {
  return value.toFixed(1);
}

export function OnboardingGoalStep() {
  const router = useRouter();
  const [isFirstIelts, setIsFirstIelts] = useState(true);
  const [scores, setScores] = useState<PreviousScores>(emptyPreviousScores);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = readOnboardingState();
    if (!state.exam) {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    if (state.exam === "ukvi" && !state.ukviLevel) {
      router.replace(ONBOARDING_ROUTES.level);
      return;
    }
    setIsFirstIelts(state.isFirstIelts);
    setScores(state.previousScores);
    setReady(true);
  }, [router]);

  const overall = useMemo(() => calculateIeltsOverall(scores), [scores]);

  const allScoresFilled = SKILLS.every((s) => scores[s.key] != null);
  const canContinue = isFirstIelts || allScoresFilled;

  function setBand(key: keyof PreviousScores, value: BandScore) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  function continueNext() {
    if (!canContinue) return;
    writeOnboardingState({
      isFirstIelts,
      previousScores: scores,
      experienceDone: true,
    });
    router.push(ONBOARDING_ROUTES.schedule);
  }

  if (!ready) {
    return (
      <OnboardingShell step={3}>
        <div className="flex flex-1 items-center justify-center text-sm text-[#64748b]">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={3}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#141b2b] sm:text-[2.15rem]">
            Have you taken IELTS before?
          </h1>
        </header>

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto sm:mt-5 sm:gap-5">
          {/* First-time toggle */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 sm:px-5 sm:py-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#2b5ce6]">
              <HistoryIcon />
            </span>
            <span className="min-w-0 flex-1 text-sm font-medium text-[#141b2b] sm:text-base">
              This is my first time taking IELTS
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isFirstIelts}
              aria-label="This is my first time taking IELTS"
              onClick={() => setIsFirstIelts((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                isFirstIelts ? "bg-[#2b5ce6]" : "bg-[#cbd5e1]"
              }`}
            >
              <span
                className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition ${
                  isFirstIelts ? "left-[1.35rem]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Score entry */}
          <section className="shrink-0">
            <h2 className="text-base font-bold text-[#141b2b] sm:text-lg">
              Enter your most recent scores
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Use the 0–9 IELTS band scale. Select your most recent result.
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
              {SKILLS.map((skill) => (
                <label key={skill.key} className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#141b2b]">
                    {skill.label}
                  </span>
                  <span className="relative">
                    <select
                      value={scores[skill.key] ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setBand(
                          skill.key,
                          raw === "" ? null : Number.parseFloat(raw),
                        );
                      }}
                      className="h-11 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 pr-10 text-sm text-[#141b2b] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 sm:h-12"
                    >
                      <option value="">Select band</option>
                      {IELTS_BAND_OPTIONS.map((band) => (
                        <option key={band} value={band}>
                          {formatBand(band)}
                        </option>
                      ))}
                    </select>
                    <Image
                      src="/onboarding/icon-chevron-gray.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 opacity-70"
                    />
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Overall calculated */}
          <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl bg-[#2b5ce6] px-4 py-3 text-white sm:px-5 sm:py-3.5">
            <span className="flex items-center gap-2.5 text-sm font-semibold sm:text-base">
              <CalculatorIcon />
              Overall (calculated)
            </span>
            <span className="text-lg font-bold tabular-nums">
              {overall == null ? "---" : formatBand(overall)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 justify-center sm:mt-5">
          <OnboardingContinueButton
            disabled={!canContinue}
            onClick={continueNext}
          >
            Continue
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}

function HistoryIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-[1.125rem]"
    >
      <path
        d="M12 8v4l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.05 11a9 9 0 1 1 .5 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M3 7v4h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-5 shrink-0"
    >
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect x="7" y="6" width="10" height="3.5" rx="1" fill="currentColor" />
      <circle cx="8.5" cy="13" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
      <circle cx="15.5" cy="13" r="1" fill="currentColor" />
      <circle cx="8.5" cy="16.5" r="1" fill="currentColor" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}
