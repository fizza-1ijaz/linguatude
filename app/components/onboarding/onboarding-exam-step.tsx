"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  OnboardingContinueButton,
  OnboardingShell,
} from "@/app/components/onboarding/onboarding-shell";
import {
  type ExamChoice,
  ONBOARDING_ROUTES,
  readOnboardingState,
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const OPTIONS: {
  id: ExamChoice;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "academic",
    title: "IELTS Academic",
    description: "For university admission and professional registration",
    icon: "/onboarding/icon-academic.svg",
  },
  {
    id: "ukvi",
    title: "IELTS UKVI / Life Skills",
    description: "For UK visa applications and immigration",
    icon: "/onboarding/icon-ukvi.svg",
  },
];

export function OnboardingExamStep() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamChoice>(null);

  useEffect(() => {
    setExam(readOnboardingState().exam);
  }, []);

  function continueNext() {
    if (!exam) return;
    writeOnboardingState({
      exam,
      ukviLevel: null,
    });
    router.push(
      exam === "ukvi" ? ONBOARDING_ROUTES.level : ONBOARDING_ROUTES.goal,
    );
  }

  return (
    <OnboardingShell step={1} showAiBadge>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[2.25rem]">
            Let&apos;s get{" "}
            <span className="text-[#2b5ce6]">you ready</span>
          </h1>
          <p className="mt-2.5 text-base leading-6 text-[#64748B] sm:text-lg">
            Which exam are you preparing for?
          </p>
        </header>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto">
          {OPTIONS.map((opt) => {
            const selected = exam === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setExam(opt.id)}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.15rem] bg-white px-4 py-4 text-left transition sm:gap-5 sm:px-5 sm:py-[1.125rem] ${
                  selected
                    ? "shadow-[0_10px_24px_rgba(43,92,230,0.12)] ring-1 ring-[#2b5ce6]/30"
                    : "border border-[#E2E2E2]"
                }`}
              >
                {selected ? (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#2b5ce6]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-full sm:size-[3.75rem] ${
                    selected ? "bg-[#DBEAFE]" : "bg-[#F0F4FF]"
                  }`}
                >
                  <Image
                    src={opt.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="size-7 sm:size-8"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold text-[#111827] sm:text-xl">
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-[#6B7280]">
                    {opt.description}
                  </span>
                </span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    selected ? "bg-[#2b5ce6]" : "bg-[#F3F4F6]"
                  }`}
                >
                  <Image
                    src={
                      selected
                        ? "/onboarding/icon-arrow-white.svg"
                        : "/onboarding/icon-chevron-gray.svg"
                    }
                    alt=""
                    width={18}
                    height={18}
                    className="size-4"
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex shrink-0 justify-center">
          <OnboardingContinueButton disabled={!exam} onClick={continueNext}>
            <Image
              src="/onboarding/icon-star.svg"
              alt=""
              width={22}
              height={22}
              className="size-5"
            />
            {exam ? "Continue" : "Select an exam to continue"}
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
