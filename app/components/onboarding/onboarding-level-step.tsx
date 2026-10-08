"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type UkviLevel,
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const LEVELS: {
  id: NonNullable<UkviLevel>;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "a1",
    title: "A1 Life Skills",
    description: "Speaking only · For spouse / family visa applicants",
    icon: "/onboarding/icon-a1.svg",
  },
  {
    id: "a2",
    title: "A2 Life Skills",
    description: "Speaking and Listening · For family route extension",
    icon: "/onboarding/icon-a2.svg",
  },
  {
    id: "b1",
    title: "B1 Life Skills",
    description:
      "Speaking and Listening · For Indefinite Leave to Remain or citizenship",
    icon: "/onboarding/icon-b1.svg",
  },
];

export function OnboardingLevelStep() {
  const router = useRouter();
  const [level, setLevel] = useState<UkviLevel>(null);

  useEffect(() => {
    const state = readOnboardingState();
    if (!state.exam) {
      router.replace(ONBOARDING_ROUTES.exam);
      return;
    }
    if (state.exam !== "ukvi") {
      router.replace(ONBOARDING_ROUTES.goal);
      return;
    }
    setLevel(state.ukviLevel);
  }, [router]);

  function continueNext() {
    if (!level) return;
    writeOnboardingState({ ukviLevel: level });
    router.push(ONBOARDING_ROUTES.goal);
  }

  return (
    <OnboardingShell step={2}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#141B2B] sm:text-[2.25rem]">
            Which level do you need?
          </h1>
          <p className="mt-2.5 text-pretty text-sm leading-6 text-[#434655] sm:text-base">
            Your level is set by UK Visas and Immigration — check your visa
            requirements if unsure.
          </p>
        </header>

        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {LEVELS.map((item) => {
            const selected = level === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLevel(item.id)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition sm:px-5 sm:py-4 ${
                  selected
                    ? "border-2 border-[#2b5ce6] bg-[#F1F3FF]"
                    : "border border-[#C3C5D7] bg-white hover:bg-[#F9F9FF]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] sm:size-12">
                    <Image
                      src={item.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="size-5"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-semibold text-[#141B2B] sm:text-lg">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-[#64748B]">
                      {item.description}
                    </span>
                  </span>
                </span>
                <span
                  className={`size-6 shrink-0 rounded-full border-2 ${
                    selected
                      ? "border-[#2b5ce6] bg-[#2b5ce6] shadow-[inset_0_0_0_3px_white]"
                      : "border-[#C3C5D7] bg-transparent"
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-3 flex shrink-0 items-center justify-center gap-1.5 text-sm font-medium text-[#64748B] transition hover:text-[#2b5ce6]"
        >
          Not sure which level you need?
          <Image
            src="/onboarding/icon-help.svg"
            alt=""
            width={15}
            height={15}
            className="size-3.5"
          />
        </button>

        <div className="mt-4 flex shrink-0 justify-center">
          <OnboardingContinueButton disabled={!level} onClick={continueNext}>
            Continue
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
