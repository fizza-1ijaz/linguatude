"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type BandScore,
  type SkillBands,
  DEFAULT_TARGET_BAND,
  IELTS_BAND_OPTIONS,
  ONBOARDING_ROUTES,
  calculateIeltsOverall,
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

export function OnboardingScheduleStep() {
  const router = useRouter();
  const [targets, setTargets] = useState<SkillBands>(emptySkillBands);
  const [sameTargetAll, setSameTargetAll] = useState(false);
  const [testDate, setTestDate] = useState("");
  const [noTestDate, setNoTestDate] = useState(false);
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
    if (!state.experienceDone) {
      router.replace(ONBOARDING_ROUTES.goal);
      return;
    }
    setTargets(state.targetScores);
    setSameTargetAll(state.sameTargetAll);
    setTestDate(state.testDate ?? "");
    setNoTestDate(state.noTestDate);
    setReady(true);
  }, [router]);

  const canContinue = noTestDate || Boolean(testDate);
  const overallDisplay = calculateIeltsOverall(targets);

  function setBand(key: keyof SkillBands, value: BandScore) {
    setTargets((prev) => {
      if (sameTargetAll && value != null) {
        return {
          reading: value,
          writing: value,
          listening: value,
          speaking: value,
        };
      }
      return { ...prev, [key]: value };
    });
  }

  function applyOverallTarget() {
    const band = DEFAULT_TARGET_BAND;
    setSameTargetAll(true);
    setTargets({
      reading: band,
      writing: band,
      listening: band,
      speaking: band,
    });
  }

  function toggleSameAll(next: boolean) {
    setSameTargetAll(next);
    if (!next) return;
    const first =
      targets.reading ??
      targets.writing ??
      targets.listening ??
      targets.speaking ??
      DEFAULT_TARGET_BAND;
    setTargets({
      reading: first,
      writing: first,
      listening: first,
      speaking: first,
    });
  }

  function toggleNoDate(next: boolean) {
    setNoTestDate(next);
    if (next) setTestDate("");
  }

  function continueNext() {
    if (!canContinue) return;
    writeOnboardingState({
      targetScores: withDefaultTargets(targets),
      sameTargetAll,
      testDate: noTestDate ? null : testDate || null,
      noTestDate,
      goalsDone: true,
    });
    router.push(ONBOARDING_ROUTES.diagnostic);
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
          <h1 className="text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#141b2b] sm:text-[2.15rem]">
            What are you aiming for?
          </h1>
        </header>

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto sm:mt-5 sm:gap-6">
          {/* Target bands */}
          <section className="shrink-0">
            <h2 className="text-base font-bold text-[#141b2b] sm:text-lg">
              Your target band scores
            </h2>
            <p className="mt-1.5 flex items-start gap-1.5 text-sm text-[#64748b]">
              <Image
                src="/onboarding/icon-help.svg"
                alt=""
                width={14}
                height={14}
                className="mt-0.5 size-3.5 shrink-0 opacity-70"
              />
              <span>
                Not sure? We&apos;ll aim for Band {formatBand(DEFAULT_TARGET_BAND)}{" "}
                overall.
              </span>
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
              {SKILLS.map((skill) => (
                <label key={skill.key} className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[#141b2b]">
                    {skill.label}
                  </span>
                  <span className="relative">
                    <select
                      value={targets[skill.key] ?? ""}
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

            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#D6DEFF] bg-[#EEF2FF] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <ToggleSwitch
                  checked={sameTargetAll}
                  onChange={toggleSameAll}
                  ariaLabel="Set the same target for all skills"
                />
                <span className="text-sm font-medium text-[#141B2B]">
                  Set the same target for all skills
                </span>
              </div>
              <button
                type="button"
                onClick={applyOverallTarget}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-[#C7D2FE] bg-white px-3 py-1.5 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#F8FAFF] sm:self-auto"
              >
                <Image
                  src="/onboarding/icon-star.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5"
                />
                Overall target:{" "}
                {overallDisplay == null ? "0.0" : formatBand(overallDisplay)}
              </button>
            </div>
          </section>

          {/* Test date */}
          <section className="shrink-0">
            <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
              When is your test?
            </h2>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
              <label
                className={`flex min-w-0 flex-1 flex-col gap-1.5 ${
                  noTestDate ? "pointer-events-none opacity-45" : ""
                }`}
              >
                <span className="text-sm font-medium text-[#141B2B]">
                  Test date
                </span>
                <span className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 z-10 text-[#64748B]">
                    <CalendarIcon />
                  </span>
                  <input
                    type="date"
                    value={testDate}
                    disabled={noTestDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white py-2 pl-11 pr-3 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 disabled:cursor-not-allowed"
                    aria-label="Test date"
                  />
                </span>
              </label>

              <div className="flex shrink-0 items-center gap-2.5 pb-1 sm:max-w-[14rem] sm:pb-2.5">
                <ToggleSwitch
                  checked={noTestDate}
                  onChange={toggleNoDate}
                  ariaLabel="I don't have a test date yet"
                />
                <span className="text-sm font-medium leading-snug text-[#141B2B]">
                  I don&apos;t have a test date yet
                </span>
              </div>
            </div>
          </section>
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
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        checked ? "bg-[#2b5ce6]" : "bg-[#cbd5e1]"
      }`}
    >
      <span
        className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition ${
          checked ? "left-[1.35rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-[1.125rem]"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M3.5 10h17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M8 3.5v3M16 3.5v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
