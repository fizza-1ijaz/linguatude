"use client";

import Image from "next/image";
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
  type ExamChoice,
  type PreviousScores,
  IELTS_BAND_OPTIONS,
  ONBOARDING_ROUTES,
  PTE_SCORE_OPTIONS,
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
  const [exam, setExam] = useState<ExamChoice>(null);
  const [takenBefore, setTakenBefore] = useState(false);
  const [ieltsOverall, setIeltsOverall] = useState<BandScore>(null);
  const [pteOverall, setPteOverall] = useState<number | null>(null);
  const [scores, setScores] = useState<PreviousScores>(emptySkillBands);
  const [showSkillEntry, setShowSkillEntry] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
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
    setExam(state.exam);
    setTakenBefore(!state.isFirstIelts);
    setIeltsOverall(state.previousIeltsOverall);
    setPteOverall(state.previousPteOverall);
    setScores(state.previousScores);
    const hasSkills = SKILLS.some((s) => state.previousScores[s.key] != null);
    setShowSkillEntry(
      state.previousIeltsOverall != null || hasSkills,
    );
    setReady(true);
  }, [router]);

  const calculatedOverall = useMemo(
    () => calculateIeltsOverall(scores),
    [scores],
  );
  const allSkillsFilled = SKILLS.every((s) => scores[s.key] != null);

  useEffect(() => {
    if (calculatedOverall != null) {
      setIeltsOverall(calculatedOverall);
    }
  }, [calculatedOverall]);

  useEffect(() => {
    if (!showSkillEntry) return;
    skillsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showSkillEntry]);

  const canContinue = useMemo(() => {
    if (!takenBefore) return true;
    if (exam === "pte") return pteOverall != null;
    return allSkillsFilled;
  }, [takenBefore, exam, pteOverall, allSkillsFilled]);

  function handleIeltsBandSelect(value: BandScore) {
    setIeltsOverall(value);
    if (value == null) {
      setShowSkillEntry(false);
      setScores(emptySkillBands);
      return;
    }
    setShowSkillEntry(true);
  }

  function setBand(key: keyof PreviousScores, value: BandScore) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  function continueNext() {
    if (!canContinue) return;
    writeOnboardingState({
      isFirstIelts: !takenBefore,
      previousScores: takenBefore ? scores : emptySkillBands,
      previousIeltsOverall: takenBefore
        ? (calculatedOverall ?? ieltsOverall)
        : null,
      previousPteOverall: takenBefore ? pteOverall : null,
      experienceDone: true,
    });
    router.push(ONBOARDING_ROUTES.schedule);
  }

  if (!ready) {
    return (
      <OnboardingShell step={3} scrollable>
        <div className="flex flex-1 items-center justify-center text-sm text-[#64748b]">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={3} scrollable>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.65rem]">
            Have you taken this test before?
          </h1>
        </header>

        <div
          ref={scrollRef}
          className="onboarding-scroll mt-5 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5 pb-2"
        >
          <div className="flex flex-col gap-3">
            <OptionRow
              label="Yes"
              checked={takenBefore}
              onSelect={() => setTakenBefore(true)}
            />
            <OptionRow
              label="No"
              checked={!takenBefore}
              onSelect={() => {
                setTakenBefore(false);
                setShowSkillEntry(false);
              }}
            />
          </div>

          {!takenBefore ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#F3F4F6] px-5 py-5 text-center">
              <LineChartIcon />
              <p className="text-sm font-semibold text-[#111827]">
                No Previous score
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5">
              <ExamScoreCard
                title="IELTS Academic"
                iconSrc="/onboarding/icon-academic.svg"
                iconBg="bg-[#DBEAFE]"
                badge={ieltsOverall != null || allSkillsFilled}
                label="Band score (0–9)"
                placeholder="Select band"
                value={ieltsOverall}
                options={IELTS_BAND_OPTIONS}
                formatOption={formatBand}
                onChange={handleIeltsBandSelect}
              />

              <ExamScoreCard
                title="PTE Academic"
                iconSrc="/onboarding/icon-globe.svg"
                iconBg="bg-[#EDE9FE]"
                badge={pteOverall != null}
                label="Overall score (10–90)"
                placeholder="Select score"
                value={pteOverall}
                options={PTE_SCORE_OPTIONS}
                formatOption={(n) => String(n)}
                onChange={setPteOverall}
              />

              {showSkillEntry ? (
                <section
                  ref={skillsRef}
                  className="rounded-2xl border border-[#ECEFF1] bg-white px-5 py-6"
                >
                  <h2 className="text-[1.05rem] font-bold text-[#141b2b]">
                    Enter your most recent scores
                  </h2>
                  <p className="mt-1.5 text-sm leading-5 text-[#64748b]">
                    Use the 0–9 IELTS band scale. Select your most recent
                    result.
                  </p>

                  <div className="mt-6 flex flex-col gap-5">
                    {SKILLS.map((skill) => (
                      <label key={skill.key} className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-[#141b2b]">
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
                            className="h-12 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-10 text-sm text-[#141b2b] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20"
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

                  <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#EEF2FF] px-4 py-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#141b2b]">
                        Overall (calculated)
                        {calculatedOverall != null
                          ? `: ${formatBand(calculatedOverall)}`
                          : ""}
                      </p>
                      <p className="mt-0.5 text-xs leading-4 text-[#64748b]">
                        Average of four skills, rounded to nearest 0.5
                      </p>
                    </div>
                    <ScoreDocIcon />
                  </div>

                  {!allSkillsFilled ? (
                    <div
                      role="alert"
                      className="mt-4 flex items-start gap-2.5 rounded-2xl bg-[#FEECEC] px-4 py-3.5 text-sm text-[#C62828]"
                    >
                      <WarningIcon />
                      <p className="leading-5">
                        Please select a score for all four skills to continue.
                      </p>
                    </div>
                  ) : null}
                </section>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-5 flex shrink-0 justify-center">
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

function ExamScoreCard({
  title,
  iconSrc,
  iconBg,
  badge,
  label,
  placeholder,
  value,
  options,
  formatOption,
  onChange,
}: {
  title: string;
  iconSrc: string;
  iconBg: string;
  badge: boolean;
  label: string;
  placeholder: string;
  value: number | null;
  options: number[];
  formatOption: (n: number) => string;
  onChange: (value: number | null) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#ECEFF1] bg-white px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
        >
          <Image src={iconSrc} alt="" width={28} height={28} />
        </span>
        <h3 className="min-w-0 flex-1 text-base font-bold text-[#1A237E] sm:text-[1.05rem]">
          {title}
        </h3>
        {badge ? (
          <span className="shrink-0 rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[0.7rem] font-medium text-[#64748B]">
            Entered by you
          </span>
        ) : null}
      </div>

      <label className="mt-6 flex flex-col gap-2.5">
        <span className="text-sm text-[#78909C]">{label}</span>
        <span className="relative">
          <select
            value={value ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              onChange(raw === "" ? null : Number.parseFloat(raw));
            }}
            className="h-12 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pr-10 text-sm text-[#141b2b] outline-none transition focus:border-[#2b5ce6] focus:bg-white focus:ring-2 focus:ring-[#2b5ce6]/20"
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {formatOption(opt)}
              </option>
            ))}
          </select>
          <ChevronDown />
        </span>
      </label>
    </div>
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
      className="flex w-full items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-left transition hover:border-[#C7D4F5]"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2b5ce6]">
        <HistoryIcon />
      </span>
      <span className="min-w-0 flex-1 text-[0.9375rem] font-semibold text-[#141b2b]">
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
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-5 shrink-0 text-[#2b5ce6]"
    >
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
      className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9CA3AF]"
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

function ScoreDocIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="size-10 shrink-0"
    >
      <rect x="8" y="6" width="20" height="26" rx="3" fill="#C7D7FE" />
      <rect x="11" y="11" width="14" height="2" rx="1" fill="#2B5CE6" />
      <rect x="11" y="16" width="10" height="2" rx="1" fill="#93B0F8" />
      <rect x="11" y="21" width="12" height="2" rx="1" fill="#93B0F8" />
      <circle cx="28" cy="28" r="8" fill="#2B5CE6" />
      <path
        d="M25.2 28.1h2.1v-3.2h1.4v3.2H31v1.25h-2.3V32h-1.4v-2.65h-2.1V28.1z"
        fill="white"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 size-[1.125rem] shrink-0 text-[#C62828]"
    >
      <path
        d="M12 3.5L22 20.5H2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
    </svg>
  );
}
