"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type BandScore,
  type ExamChoice,
  type SkillBands,
  DEFAULT_TARGET_BAND,
  DEFAULT_TARGET_PTE_SCORE,
  IELTS_BAND_OPTIONS,
  ONBOARDING_ROUTES,
  PTE_SCORE_OPTIONS,
  calculateIeltsOverall,
  calculatePteOverall,
  emptySkillBands,
  readOnboardingState,
  withDefaultTargets,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SKILLS: { key: keyof SkillBands; label: string }[] = [
  { key: "reading", label: "Reading" },
  { key: "writing", label: "Writing" },
  { key: "listening", label: "Listening" },
  { key: "speaking", label: "Speaking" },
];

function formatBand(value: number) {
  return value.toFixed(1);
}

function formatScore(value: number) {
  return String(Math.round(value));
}

function isPteScore(value: number | null): value is number {
  return value != null && Number.isInteger(value) && value >= 10 && value <= 90;
}

function isIeltsBand(value: number | null): value is number {
  return (
    value != null &&
    value >= 0 &&
    value <= 9 &&
    Math.abs(value * 2 - Math.round(value * 2)) < 1e-9
  );
}

function sanitizeTargetsForExam(
  scores: SkillBands,
  exam: ExamChoice,
): SkillBands {
  const valid = (v: BandScore) =>
    exam === "pte" ? isPteScore(v) : isIeltsBand(v);
  return {
    reading: valid(scores.reading) ? scores.reading : null,
    writing: valid(scores.writing) ? scores.writing : null,
    listening: valid(scores.listening) ? scores.listening : null,
    speaking: valid(scores.speaking) ? scores.speaking : null,
  };
}

export function OnboardingScheduleStep() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamChoice>(null);
  const [targets, setTargets] = useState<SkillBands>(emptySkillBands);
  const [overallTarget, setOverallTarget] = useState<BandScore>(null);
  const [notSure, setNotSure] = useState(false);
  const [testDate, setTestDate] = useState("");
  const [noTestDate, setNoTestDate] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPte = exam === "pte";

  useEffect(() => {
    const el = scrollRef.current;
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
  }, [ready]);

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
    if (!state.experienceDone) {
      router.replace(ONBOARDING_ROUTES.goal);
      return;
    }
    const nextExam = state.exam;
    const nextTargets = sanitizeTargetsForExam(state.targetScores, nextExam);
    setExam(nextExam);
    setTargets(nextTargets);
    setNotSure(state.notSureTarget);
    setTestDate(state.testDate ?? "");
    setNoTestDate(state.noTestDate);
    const savedOverall =
      nextExam === "pte"
        ? calculatePteOverall(nextTargets)
        : calculateIeltsOverall(nextTargets);
    const fallbackDefault =
      nextExam === "pte" ? DEFAULT_TARGET_PTE_SCORE : DEFAULT_TARGET_BAND;
    setOverallTarget(
      savedOverall ??
        (state.sameTargetAll
          ? (nextTargets.reading ?? fallbackDefault)
          : null),
    );
    setReady(true);
  }, [router]);

  const calculatedOverall = useMemo(
    () =>
      isPte ? calculatePteOverall(targets) : calculateIeltsOverall(targets),
    [isPte, targets],
  );
  const allTargetsFilled = SKILLS.every((s) => targets[s.key] != null);
  const scoreOptions = isPte ? PTE_SCORE_OPTIONS : IELTS_BAND_OPTIONS;
  const formatOption = isPte ? formatScore : formatBand;
  const selectPlaceholder = isPte ? "Select score" : "Select band";

  useEffect(() => {
    if (calculatedOverall == null) return;
    setOverallTarget(calculatedOverall);
  }, [calculatedOverall]);

  const canContinue = noTestDate || Boolean(testDate);

  function switchExam(next: NonNullable<ExamChoice>) {
    if (next === exam || next === "ukvi") return;
    setExam(next);
    setNotSure(false);
    setTargets(emptySkillBands);
    setOverallTarget(null);
  }

  function setSkill(key: keyof SkillBands, value: BandScore) {
    setNotSure(false);
    setTargets((prev) => ({ ...prev, [key]: value }));
  }

  function setOverall(value: BandScore) {
    setOverallTarget(value);
    setNotSure(false);
    if (value == null) return;
    setTargets({
      reading: value,
      writing: value,
      listening: value,
      speaking: value,
    });
  }

  function toggleNotSure() {
    const next = !notSure;
    setNotSure(next);
    if (next) {
      const fallback = isPte ? DEFAULT_TARGET_PTE_SCORE : DEFAULT_TARGET_BAND;
      setOverallTarget(fallback);
      setTargets({
        reading: fallback,
        writing: fallback,
        listening: fallback,
        speaking: fallback,
      });
    }
  }

  function continueNext() {
    if (!canContinue) return;
    const resolvedExam = exam === "pte" ? "pte" : "academic";
    const resolvedTargets =
      allTargetsFilled || overallTarget == null
        ? targets
        : {
            reading: overallTarget,
            writing: overallTarget,
            listening: overallTarget,
            speaking: overallTarget,
          };
    writeOnboardingState({
      exam: resolvedExam,
      targetScores: withDefaultTargets(resolvedTargets, resolvedExam),
      sameTargetAll:
        notSure ||
        (overallTarget != null &&
          (!allTargetsFilled ||
            SKILLS.every((s) => targets[s.key] === overallTarget))),
      notSureTarget: notSure,
      testDate: noTestDate ? null : testDate || null,
      noTestDate,
      goalsDone: true,
    });
    router.push(ONBOARDING_ROUTES.days);
  }

  if (!ready) {
    return (
      <OnboardingShell step={4}>
        <div className="flex flex-1 items-center justify-center text-sm text-[#64748b]">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={4}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.65rem]">
            What are you aiming for?
          </h1>
        </header>

        <div
          ref={scrollRef}
          className="onboarding-scroll mt-3 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-0.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-[#7C3AED] shadow-sm ring-1 ring-[#EDE9FE]">
              <SparkleIcon />
              Your AI language &amp; support guide
            </span>
            <div className="inline-flex rounded-full bg-[#E8ECF4] p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => switchExam("academic")}
                className={`rounded-full px-2.5 py-1 transition ${
                  exam === "academic"
                    ? "bg-white text-[#2b5ce6] shadow-sm"
                    : "text-[#64748B]"
                }`}
              >
                IELTS Academic
              </button>
              <button
                type="button"
                onClick={() => switchExam("pte")}
                className={`rounded-full px-2.5 py-1 transition ${
                  exam === "pte"
                    ? "bg-white text-[#2b5ce6] shadow-sm"
                    : "text-[#64748B]"
                }`}
              >
                PTE Academic
              </button>
            </div>
          </div>

          <section className="shrink-0">
            <h2 className="text-sm font-bold text-[#141b2b]">
              {isPte ? "Your target scores" : "Your target band scores"}
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {SKILLS.map((skill) => (
                <label key={skill.key} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-[#141b2b]">
                    {skill.label}
                  </span>
                  <ScoreSelect
                    value={targets[skill.key]}
                    onChange={(v) => setSkill(skill.key, v)}
                    options={scoreOptions}
                    formatOption={formatOption}
                    placeholder={selectPlaceholder}
                  />
                </label>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-[#D6DEFF] bg-[#EEF2FF] px-3 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6]">
                <Image
                  src="/onboarding/icon-star.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 brightness-0 invert"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#141B2B]">
                  {isPte ? "Overall Target Score" : "Overall Target Band"}
                </p>
                <p className="text-[0.625rem] leading-snug text-[#64748B]">
                  {allTargetsFilled
                    ? isPte
                      ? "Calculated from your four skill targets."
                      : "Calculated from your four skill targets (nearest 0.5)."
                    : isPte
                      ? "Select an overall score, or fill all four skills above."
                      : "Select an overall target, or fill all four skills above."}
                </p>
              </div>
              <div className="w-[7.5rem] shrink-0">
                <ScoreSelect
                  value={
                    allTargetsFilled ? calculatedOverall : overallTarget
                  }
                  onChange={setOverall}
                  options={scoreOptions}
                  formatOption={formatOption}
                  placeholder={selectPlaceholder}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={toggleNotSure}
              className="mt-2 flex items-center gap-2 text-xs font-medium text-[#141B2B]"
            >
              <span
                className={`flex size-4 items-center justify-center rounded-full border-2 ${
                  notSure ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                }`}
              >
                {notSure ? (
                  <span className="size-2 rounded-full bg-[#2b5ce6]" />
                ) : null}
              </span>
              I&apos;m not sure yet
            </button>
          </section>

          <section className="shrink-0 pb-1">
            <h2 className="text-sm font-bold text-[#141B2B]">
              When is your test?
            </h2>
            <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:items-end">
              <label
                className={`flex min-w-0 flex-1 flex-col gap-1 ${
                  noTestDate ? "pointer-events-none opacity-45" : ""
                }`}
              >
                <span className="text-xs font-medium text-[#141B2B]">
                  Test date
                </span>
                <span className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3 z-10 text-[#64748B]">
                    <CalendarIcon />
                  </span>
                  <input
                    type="date"
                    value={testDate}
                    disabled={noTestDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded-xl border border-[#E2E8F0] bg-white py-2 pl-9 pr-3 text-xs text-[#141B2B] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 disabled:cursor-not-allowed"
                    aria-label="Test date"
                  />
                </span>
              </label>

              <div className="flex shrink-0 items-center gap-2 pb-1 sm:max-w-[11rem]">
                <ToggleSwitch
                  checked={noTestDate}
                  onChange={(next) => {
                    setNoTestDate(next);
                    if (next) setTestDate("");
                  }}
                  ariaLabel="I haven't booked my test yet"
                />
                <span className="text-xs font-medium leading-snug text-[#141B2B]">
                  I haven&apos;t booked my test yet
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-3 flex shrink-0 justify-center">
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

function ScoreSelect({
  value,
  onChange,
  options,
  formatOption,
  placeholder,
}: {
  value: BandScore;
  onChange: (v: BandScore) => void;
  options: number[];
  formatOption: (n: number) => string;
  placeholder: string;
}) {
  return (
    <span className="relative block">
      <select
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? null : Number.parseFloat(raw));
        }}
        className="h-9 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-2.5 pr-7 text-xs text-[#141b2b] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOption(opt)}
          </option>
        ))}
      </select>
      <Image
        src="/onboarding/icon-chevron-gray.svg"
        alt=""
        width={12}
        height={12}
        className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 opacity-70"
      />
    </span>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#2b5ce6]" : "bg-[#cbd5e1]"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition ${
          checked ? "left-[1.25rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5 9.2 6.8 14.5 8 9.2 9.2 8 14.5 6.8 9.2 1.5 8l5.3-1.2L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="size-4">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
