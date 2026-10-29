"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWideShell } from "@/app/components/onboarding/onboarding-wide-shell";
import {
  type ExamChoice,
  DEFAULT_TARGET_BAND,
  DEFAULT_TARGET_PTE_SCORE,
  ONBOARDING_ROUTES,
  calculateIeltsOverall,
  calculatePteOverall,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const STUDY_OPTIONS = [15, 30, 45, 60] as const;

const QUEUE = [
  {
    title: "Writing Task 1",
    desc: "Graph analysis fundamentals",
    minutes: 15,
    tag: "Writing",
    border: "border-l-[#2b5ce6]",
    iconBg: "bg-[#2b5ce6]",
    tagBg: "bg-[#EEF2FF] text-[#2b5ce6]",
    icon: "/ielts-general/icon-pencil.svg",
    gradient:
      "linear-gradient(135deg, rgba(43,92,230,0.16) 0%, rgba(43,92,230,0.04) 45%, #ffffff 100%)",
  },
  {
    title: "Reading: Scan & Skim",
    desc: "Academic passage techniques",
    minutes: 12,
    tag: "Reading",
    border: "border-l-[#7C3AED]",
    iconBg: "bg-[#7C3AED]",
    tagBg: "bg-[#F3E8FF] text-[#7C3AED]",
    icon: "/ielts-general/icon-book.svg",
    gradient:
      "linear-gradient(135deg, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.04) 45%, #ffffff 100%)",
  },
  {
    title: "Listening: Note-taking",
    desc: "Section 3 lecture practice",
    minutes: 20,
    tag: "Listening",
    border: "border-l-[#16A34A]",
    iconBg: "bg-[#16A34A]",
    tagBg: "bg-[#ECFDF5] text-[#16A34A]",
    icon: "/contact/icon-headphones.svg",
    gradient:
      "linear-gradient(135deg, rgba(22,163,74,0.16) 0%, rgba(22,163,74,0.04) 45%, #ffffff 100%)",
  },
] as const;

function weeksForDailyMinutes(minutes: number) {
  if (minutes <= 15) return 16;
  if (minutes <= 30) return 11;
  if (minutes <= 45) return 9;
  return 8;
}

function formatBand(value: number) {
  return value.toFixed(1);
}

function formatPteScore(value: number) {
  return `${Math.round(value)}+`;
}

function formatTargetDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function OnboardingPlanStep() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [exam, setExam] = useState<ExamChoice>(null);
  const [targetScore, setTargetScore] = useState(DEFAULT_TARGET_BAND);
  const [testDate, setTestDate] = useState<string | null>(null);
  const [startingFocus, setStartingFocus] = useState("Writing");
  const [dailyMinutes, setDailyMinutes] =
    useState<(typeof STUDY_OPTIONS)[number]>(30);

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      !state.dailyMinutes ||
      !state.experienceDone ||
      !state.goalsDone ||
      !state.studyDaysDone ||
      !state.focusDone
    ) {
      router.replace(ONBOARDING_ROUTES.diagnostic);
      return;
    }
    const isPte = state.exam === "pte";
    const overall = isPte
      ? (calculatePteOverall(state.targetScores) ?? DEFAULT_TARGET_PTE_SCORE)
      : (calculateIeltsOverall(state.targetScores) ?? DEFAULT_TARGET_BAND);
    setExam(state.exam);
    setTargetScore(overall);
    setTestDate(state.noTestDate ? null : state.testDate);
    if (
      state.focus &&
      state.focus !== "auto" &&
      ["speaking", "writing", "reading", "listening"].includes(state.focus)
    ) {
      setStartingFocus(
        state.focus.charAt(0).toUpperCase() + state.focus.slice(1),
      );
    }
    const mapped =
      ([15, 30, 45, 60] as const).find((n) => n === state.dailyMinutes) ??
      (state.dailyMinutes <= 20
        ? 15
        : state.dailyMinutes <= 35
          ? 30
          : state.dailyMinutes <= 50
            ? 45
            : 60);
    setDailyMinutes(mapped);
    setReady(true);
  }, [router]);

  const weeks = useMemo(
    () => weeksForDailyMinutes(dailyMinutes),
    [dailyMinutes],
  );

  const isPte = exam === "pte";
  const hasTargetDate = Boolean(testDate);
  const targetLabel = isPte
    ? `Score ${formatPteScore(targetScore)}`
    : `Band ${formatBand(targetScore)}`;

  function finish() {
    writeOnboardingState({ completed: true });
    router.push("/dashboard");
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8F9FB] text-sm text-[#64748B]">
        Loading…
      </div>
    );
  }

  return (
    <OnboardingWideShell step={8} contentClassName="bg-[#E8EEF8]">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#EEF2FF]">
            <Image
              src="/ielts/sparkle.svg"
              alt=""
              width={28}
              height={28}
              className="size-7"
            />
          </div>
          <h1 className="text-balance text-[1.75rem] font-bold leading-tight text-[#111827] sm:text-[2rem]">
            Your personalised plan is ready
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
            We&apos;ve analysed your goals and crafted the optimal path to
            success.
          </p>
        </header>

        {isPte && hasTargetDate && testDate ? (
          <PteGoalCard
            score={formatPteScore(targetScore)}
            dateLabel={formatTargetDate(testDate)}
          />
        ) : null}

        <div
          className={`grid grid-cols-1 divide-y divide-[#D6DEFF] rounded-2xl bg-white shadow-[0_8px_28px_rgba(43,92,230,0.08)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 ${
            isPte && hasTargetDate ? "mt-4" : "mt-8"
          }`}
        >
          <SummaryCol
            icon={<TargetIcon className="size-4 text-[#2b5ce6]" />}
            iconBg="bg-[#EEF2FF]"
            label="Target"
            value={targetLabel}
            valueClass="text-[#2b5ce6]"
            hint="Your goal score"
          />
          <SummaryCol
            icon={<CalendarIcon className="size-4 text-[#64748B]" />}
            iconBg="bg-[#F1F5F9]"
            label="Timeline"
            value={`${weeks} weeks`}
            hint="Estimated duration"
          />
          <SummaryCol
            icon={<GreyPencilIcon className="size-4 text-[#94A3B8]" />}
            iconBg="bg-[#F1F5F9]"
            label="Starting focus"
            value={startingFocus}
            hint="Primary focus area"
          />
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#111827]">
              Today&apos;s Queue Preview
            </h2>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#2b5ce6] shadow-sm ring-1 ring-[#E5E7EB] transition hover:bg-[#F8FAFC] hover:text-[#244fe6]"
            >
              View full plan →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {QUEUE.map((task) => (
              <article
                key={task.title}
                className={`rounded-2xl border border-[#EEF0F5] border-l-[3px] p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] ${task.border}`}
                style={{ backgroundImage: task.gradient }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`flex size-9 items-center justify-center rounded-full ${task.iconBg}`}
                  >
                    <Image
                      src={task.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 brightness-0 invert"
                    />
                  </span>
                  <span className="text-xs font-semibold text-[#94A3B8]">
                    {task.minutes} min
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#111827]">
                  {task.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  {task.desc}
                </p>
                <span
                  className={`mt-3 inline-flex rounded-md px-2 py-0.5 text-[0.6875rem] font-semibold ${task.tagBg}`}
                >
                  {task.tag}
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
              <ClockIcon className="size-5 text-[#2b5ce6]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#111827] sm:text-base">
                How much time can you study each day?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {STUDY_OPTIONS.map((mins) => {
                  const selected = dailyMinutes === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        setDailyMinutes(mins);
                        writeOnboardingState({ dailyMinutes: mins });
                      }}
                      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition ${
                        selected
                          ? "bg-[#2b5ce6] text-white shadow-sm"
                          : "border border-[#E5E7EB] bg-white text-[#475569] hover:border-[#BFDBFE] hover:text-[#2b5ce6]"
                      }`}
                    >
                      {mins} min
                      {selected ? <CheckIcon className="size-3.5" /> : null}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm font-semibold leading-6 text-[#16A34A]">
                <GreenStarIcon className="mt-0.5 size-4 shrink-0" />
                <span>
                  Consistent practice will build your skills across all areas.
                </span>
              </p>
              <p className="mt-2 text-xs leading-5 text-[#64748B]">
                This is an estimate based on average learner progress. Individual
                results vary.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={finish}
            className="inline-flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-6 text-base font-semibold text-white transition hover:bg-[#244fe6]"
          >
            Start Learning
            <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            onClick={finish}
            className="mt-3 text-sm font-medium text-[#64748B] transition hover:text-[#334155]"
          >
            I&apos;ll explore on my own
          </button>
        </div>
      </div>
    </OnboardingWideShell>
  );
}

function PteGoalCard({
  score,
  dateLabel,
}: {
  score: string;
  dateLabel: string;
}) {
  return (
    <section className="mt-8 rounded-2xl border border-[#D6DEFF] bg-[#EEF4FF] p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#2b5ce6] text-white">
          <TargetIcon className="size-3.5" />
        </span>
        <h2 className="text-sm font-bold text-[#1A237E]">Your Goal</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-0">
        <div className="flex items-start gap-3 sm:pr-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <TargetIcon className="size-4 text-[#2b5ce6]" />
          </span>
          <div>
            <p className="text-xs text-[#64748B]">Target score</p>
            <p className="mt-0.5 text-lg font-bold text-[#111827]">{score}</p>
            <p className="text-xs text-[#94A3B8]">(PTE)</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-[#D6DEFF] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <CalendarIcon className="size-4 text-[#2b5ce6]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#64748B]">Target date</p>
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <p className="text-lg font-bold text-[#111827]">{dateLabel}</p>
              <Link
                href={ONBOARDING_ROUTES.schedule}
                className="text-[#2b5ce6]"
                aria-label="Edit target date"
              >
                <ChevronRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-[#D6DEFF] pt-3">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.65rem] font-bold text-white">
          i
        </span>
        <p className="text-xs leading-5 text-[#475569]">
          Your plan is designed to help you reach your{" "}
          <span className="font-semibold text-[#2b5ce6]">target score</span> by
          your selected date.
        </p>
      </div>
    </section>
  );
}

function SummaryCol({
  icon,
  iconBg,
  label,
  value,
  hint,
  valueClass = "text-[#111827]",
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  hint: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-5 sm:px-6 sm:py-6">
      <span
        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </span>
      <div className="min-w-0 text-left">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#64748B]">
          {label}
        </p>
        <p className={`mt-1 text-lg font-bold leading-tight ${valueClass}`}>
          {value}
        </p>
        <p className="mt-0.5 text-xs text-[#94A3B8]">{hint}</p>
      </div>
    </div>
  );
}

function GreenStarIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5 9.2 6.8 14.5 8 9.2 9.2 8 14.5 6.8 9.2 1.5 8l5.3-1.2L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 6.2L4.6 8.8L10 3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4.5l3 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="2.25"
        y="3.25"
        width="11.5"
        height="10.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2.25 6.5h11.5M5.25 2.25v2M10.75 2.25v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GreyPencilIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 12.5h2.2L12 6.2a1.4 1.4 0 0 0-2-2L3.5 10.7v1.8Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M9 5l2 2" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}
