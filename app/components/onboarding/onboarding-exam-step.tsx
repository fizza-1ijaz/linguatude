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
  id: NonNullable<ExamChoice>;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}[] = [
  {
    id: "academic",
    title: "IELTS Academic",
    description:
      "Prepare for your IELTS test with personalized practice and guidance.",
    icon: "/onboarding/icon-academic.svg",
    iconBg: "bg-[#DBEAFE]",
  },
  {
    id: "pte",
    title: "PTE Academic",
    description:
      "Prepare for the PTE Academic test with personalized practice and guidance.",
    icon: "/onboarding/icon-globe.svg",
    iconBg: "bg-[#E8EEFF]",
  },
];

export function OnboardingExamStep() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamChoice>(null);

  useEffect(() => {
    const saved = readOnboardingState().exam;
    setExam(saved === "ukvi" ? null : saved);
  }, []);

  function continueNext() {
    if (!exam || exam === "ukvi") return;
    writeOnboardingState({
      exam,
      ukviLevel: null,
    });
    router.push(ONBOARDING_ROUTES.routine);
  }

  return (
    <OnboardingShell step={1} showAiBadge>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 text-center">
          <h1 className="text-balance text-[1.35rem] font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-[1.75rem]">
            Let&apos;s get <span className="text-[#2b5ce6]">you ready</span>
          </h1>
          <p className="mt-1.5 text-sm leading-5 text-[#64748B] sm:text-[0.9375rem]">
            Which exam are you preparing for?
          </p>
        </header>

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2.5">
          {OPTIONS.map((opt) => {
            const selected = exam === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setExam(opt.id)}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-white px-3.5 py-3 text-left transition sm:gap-4 sm:px-4 sm:py-3.5 ${
                  selected
                    ? "shadow-[0_8px_24px_rgba(43,92,230,0.14)] ring-1 ring-[#2b5ce6]/35"
                    : "border border-[#E5E7EB] hover:border-[#C7D4F5]"
                }`}
              >
                {selected ? (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-[#2b5ce6]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full sm:size-12 ${opt.iconBg}`}
                >
                  <Image
                    src={opt.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="size-6 sm:size-7"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-bold text-[#111827] sm:text-base">
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-[#6B7280] sm:text-[0.8125rem]">
                    {opt.description}
                  </span>
                </span>
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full sm:size-8 ${
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
                    width={16}
                    height={16}
                    className="size-3.5"
                  />
                </span>
              </button>
            );
          })}

          <div className="flex w-full items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FAFBFD] px-3.5 py-3 opacity-85 sm:gap-4 sm:px-4 sm:py-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EEF1F6] sm:size-12">
              <Image
                src="/onboarding/icon-lock.svg"
                alt=""
                width={28}
                height={28}
                className="size-6 sm:size-7"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-bold text-[#6B7280] sm:text-base">
                More exams coming soon
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-[#9CA3AF] sm:text-[0.8125rem]">
                We&apos;re working on more exam types to support your journey.
              </span>
            </span>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF1F6] sm:size-8">
              <Image
                src="/onboarding/icon-chevron-gray.svg"
                alt=""
                width={16}
                height={16}
                className="size-3.5 opacity-60"
              />
            </span>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 justify-center">
          <OnboardingContinueButton disabled={!exam} onClick={continueNext}>
            {exam ? "Continue" : "Select an exam to continue"}
          </OnboardingContinueButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
