"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

function useScrollIdleClass(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function onScroll() {
      el?.classList.add("is-scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => el?.classList.remove("is-scrolling"), 700);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [ref]);
}
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
  emptySkillBands,
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
  const [takenBefore, setTakenBefore] = useState(false);
  const [scores, setScores] = useState<PreviousScores>(emptySkillBands);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overallRef = useRef<HTMLDivElement>(null);
  useScrollIdleClass(scrollRef);

  useEffect(() => {
    const state = readOnboardingState();
    if (!state.exam || state.exam === "ukvi") {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    if (!state.dailyMinutes) {
      router.replace(ONBOARDING_ROUTES.routine);
      return;
    }
    setTakenBefore(!state.isFirstIelts);
    setScores(state.previousScores);
    setReady(true);
  }, [router]);

  const overall = useMemo(() => calculateIeltsOverall(scores), [scores]);
  const allScoresFilled = SKILLS.every((s) => scores[s.key] != null);
  const canContinue = !takenBefore || allScoresFilled;

  useEffect(() => {
    if (!takenBefore || !allScoresFilled) return;
    overallRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [takenBefore, allScoresFilled, overall]);

  function setBand(key: keyof PreviousScores, value: BandScore) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  function continueNext() {
    if (!canContinue) return;
    writeOnboardingState({
      isFirstIelts: !takenBefore,
      previousScores: takenBefore ? scores : emptySkillBands,
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
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.65rem]">
            Have you taken this test before?
          </h1>
        </header>

        <div
          ref={scrollRef}
          className="onboarding-scroll mt-3.5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5"
        >
          <OptionRow
            label="Yes"
            checked={takenBefore}
            onSelect={() => setTakenBefore(true)}
          />
          <OptionRow
            label="No"
            checked={!takenBefore}
            onSelect={() => setTakenBefore(false)}
          />

          {!takenBefore ? (
            <div className="mt-1 flex items-center justify-center gap-3 rounded-2xl bg-[#F3F4F6] px-4 py-4 text-center">
              <LineChartIcon />
              <p className="text-sm font-semibold text-[#111827]">
                No Previous score
              </p>
            </div>
          ) : (
            <section className="mt-1 shrink-0 pb-1">
              <h2 className="text-sm font-bold text-[#141b2b] sm:text-[0.9375rem]">
                Enter your most recent scores
              </h2>
              <p className="mt-0.5 text-xs text-[#64748b]">
                Use the 0–9 IELTS band scale. Select your most recent result.
              </p>

              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                {SKILLS.map((skill) => (
                  <label key={skill.key} className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-[#141b2b]">
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
                        className="h-9 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-3 pr-8 text-xs text-[#141b2b] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 sm:h-10 sm:text-sm"
                      >
                        <option value="">Select band</option>
                        {IELTS_BAND_OPTIONS.map((band) => (
                          <option key={band} value={band}>
                            {formatBand(band)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown />
                    </span>
                  </label>
                ))}
              </div>

              <div
                ref={overallRef}
                className="mt-2.5 flex items-center justify-between gap-3 rounded-2xl bg-[#2b5ce6] px-3.5 py-2.5 text-white"
              >
                <span className="flex items-center gap-2 text-xs font-semibold sm:text-sm">
                  <CalculatorIcon />
                  Overall (calculated)
                </span>
                <span className="text-base font-bold tabular-nums">
                  {overall == null ? "--" : formatBand(overall)}
                </span>
              </div>
            </section>
          )}
        </div>

        <div className="mt-3.5 flex shrink-0 justify-center">
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

function OptionRow({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-3.5 py-3 text-left transition hover:border-[#C7D4F5] sm:px-4"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2b5ce6]">
        <HistoryIcon />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold text-[#141b2b] sm:text-[0.9375rem]">
        {label}
      </span>
      <span
        role="switch"
        aria-checked={checked}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${
            checked ? "left-[1.25rem]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}

function LineChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="size-5 shrink-0 text-[#2b5ce6]">
      <path
        d="M4 19V5M4 19h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7 15l3.5-4.5 3 2.5L17.5 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 7H17.5V9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9CA3AF]"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="size-4 shrink-0">
      <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
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
