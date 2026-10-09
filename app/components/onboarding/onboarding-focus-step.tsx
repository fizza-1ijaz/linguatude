"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type FocusChoice,
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SKILL_OPTIONS: {
  id: NonNullable<FocusChoice>;
  title: string;
  description: string;
  Icon: () => React.ReactNode;
}[] = [
  {
    id: "speaking",
    title: "Speaking",
    description: "Pronunciation & fluency",
    Icon: SpeakingIcon,
  },
  {
    id: "writing",
    title: "Writing",
    description: "Structure, cohesion & essays",
    Icon: WritingIcon,
  },
  {
    id: "reading",
    title: "Reading",
    description: "Academic texts & speed",
    Icon: ReadingIcon,
  },
  {
    id: "listening",
    title: "Listening",
    description: "Accents & lecture recall",
    Icon: ListeningIcon,
  },
];

export function OnboardingFocusStep() {
  const router = useRouter();
  const [focus, setFocus] = useState<FocusChoice>("auto");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      state.exam === "ukvi" ||
      !state.dailyMinutes ||
      !state.experienceDone ||
      !state.goalsDone ||
      !state.studyDaysDone
    ) {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    setFocus(state.focus ?? "auto");
    setReady(true);
  }, [router]);

  function continueNext() {
    if (!focus) return;
    writeOnboardingState({ focus, focusDone: true });
    router.push(ONBOARDING_ROUTES.diagnostic);
  }

  if (!ready) {
    return (
      <OnboardingShell step={6} scrollable>
        <div className="flex flex-1 items-center justify-center text-sm text-[#64748b]">
          Loading…
        </div>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell step={6} scrollable>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.25rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.5rem]">
            How would you like to focus your learning?
          </h1>
          <p className="mt-1.5 text-xs leading-5 text-[#64748B] sm:text-sm">
            Linguatude can automatically adjust your practice based on your
            progress.
          </p>
        </header>

        <div className="mt-3.5 flex flex-col gap-2.5 pb-2">
          <button
            type="button"
            onClick={() => setFocus("auto")}
            className={`flex w-full items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition sm:px-4 sm:py-3.5 ${
              focus === "auto"
                ? "bg-[#EFF6FF] ring-1 ring-[#93C5FD]"
                : "bg-[#F3F4F6] hover:bg-[#EEF1F6]"
            }`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2b5ce6] text-white">
              <SparklesIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[#111827]">
                  Let Linguatude decide
                </span>
                <span className="rounded-full bg-[#2b5ce6] px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wide text-white">
                  Recommended
                </span>
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-[#64748B]">
                Dynamically balances all skills based on your diagnostic results
                and ongoing progress.
              </span>
            </span>
            <SelectDot selected={focus === "auto"} />
          </button>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {SKILL_OPTIONS.map((opt) => {
              const selected = focus === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFocus(opt.id)}
                  className={`flex items-center gap-2.5 rounded-2xl bg-[#F3F4F6] px-3 py-3 text-left transition hover:bg-[#EEF1F6] ${
                    selected ? "ring-1 ring-[#2b5ce6]" : ""
                  }`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                    <opt.Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#111827]">
                      {opt.title}
                    </span>
                    <span className="block text-[0.6875rem] leading-snug text-[#64748B]">
                      {opt.description}
                    </span>
                  </span>
                  <SelectDot selected={selected} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex shrink-0 justify-center">
          <OnboardingContinueButton disabled={!focus} onClick={continueNext}>
            Continue
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}

function SelectDot({ selected }: { selected: boolean }) {
  return (
    <span
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
        selected
          ? "bg-[#2b5ce6] text-white"
          : "border border-[#CBD5E1] bg-white"
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
  );
}

function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3Z"
        fill="currentColor"
      />
      <path d="M18.5 14.5 19 16.5 21 17l-2 0.5-0.5 2-0.5-2-2-0.5 2-0.5 0.5-2Z" fill="currentColor" />
    </svg>
  );
}

function SpeakingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.5 19.5c1.2-3 3.5-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WritingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19h4l9.5-9.5a2.1 2.1 0 0 0-3-3L6 16v3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M13.5 7.5l3 3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function ReadingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5C6.5 5 9 5 12 6.5S17.5 8 20 6.5V18c-2.5 1.5-5 1.5-8 0s-5.5-1.5-8 0V6.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M12 6.5V18" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function ListeningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M4 13v3.5A1.5 1.5 0 0 0 5.5 18H7v-5H4ZM20 13v3.5a1.5 1.5 0 0 1-1.5 1.5H17v-5h3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
