"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingWideShell } from "@/app/components/onboarding/onboarding-wide-shell";
import {
  DIAGNOSTIC_ESTIMATED_BANDS,
  ONBOARDING_ROUTES,
  readOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SKILLS = [
  {
    key: "reading" as const,
    label: "Reading",
    Icon: BookIcon,
    iconBg: "bg-[#D6EAF5]",
    iconColor: "text-[#2b5ce6]",
    bar: "bg-[#2B7A9B]",
  },
  {
    key: "writing" as const,
    label: "Writing",
    Icon: PencilIcon,
    iconBg: "bg-[#EDE4FF]",
    iconColor: "text-[#2b5ce6]",
    bar: "bg-[#7C3AED]",
  },
  {
    key: "listening" as const,
    label: "Listening",
    Icon: HeadphonesIcon,
    iconBg: "bg-[#E0E9FF]",
    iconColor: "text-[#2b5ce6]",
    bar: "bg-[#2b5ce6]",
  },
  {
    key: "speaking" as const,
    label: "Speaking",
    Icon: MicIcon,
    iconBg: "bg-[#FFE8DC]",
    iconColor: "text-[#F97316]",
    bar: "bg-[#F97316]",
  },
];

export function OnboardingResultsStep() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

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
    setReady(true);
  }, [router]);

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
          <h1 className="text-balance text-[1.75rem] font-bold leading-tight text-[#111827] sm:text-[2rem]">
            Here&apos;s where you stand
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            Based on your quick diagnostic, we&apos;ve estimated your current
            proficiency levels. These insights will help tailor your perfect
            study plan.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {SKILLS.map((skill) => {
            const band = DIAGNOSTIC_ESTIMATED_BANDS[skill.key] ?? 0;
            const fill = Math.min(100, Math.max(0, (band / 9) * 100));
            return (
              <article
                key={skill.key}
                className="rounded-2xl bg-white px-4 py-5 text-center shadow-[0_4px_20px_rgba(15,23,42,0.06)] sm:px-5 sm:py-6"
              >
                <span
                  className={`mx-auto flex size-11 items-center justify-center rounded-full ${skill.iconBg}`}
                >
                  <skill.Icon className={`size-5 ${skill.iconColor}`} />
                </span>
                <p className="mt-3 text-sm font-semibold text-[#1E293B]">
                  {skill.label}
                </p>
                <p className="mt-2 text-[1.75rem] font-bold leading-none text-[#111827]">
                  {band.toFixed(1)}
                </p>
                <p className="mt-1.5 text-xs text-[#94A3B8]">(estimated)</p>
                <div className="mx-auto mt-4 h-2 w-full max-w-[8.5rem] overflow-hidden rounded-full bg-[#E8ECF2]">
                  <div
                    className={`h-full rounded-full ${skill.bar}`}
                    style={{ width: `${fill}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <article className="flex items-start gap-3 rounded-2xl border border-[#15803D] bg-[#EEF2F6] px-4 py-4 sm:px-5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
              <CheckIcon className="size-3.5 text-white" />
            </span>
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[#15803D]">
                Your strength
              </p>
              <p className="mt-1 text-sm leading-6 text-[#334155]">
                Listening is currently your strongest skill.
              </p>
            </div>
          </article>

          <article className="flex items-start gap-3 rounded-2xl border border-[#C2410C] bg-[#EEF2F6] px-4 py-4 sm:px-5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EA580C]">
              <FocusIcon className="size-3.5 text-white" />
            </span>
            <div>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[#C2410C]">
                Focus area
              </p>
              <p className="mt-1 text-sm leading-6 text-[#334155]">
                Writing is the area where focused practice can make the biggest
                difference.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-4 rounded-2xl border border-[#EEF0F5] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
              <Image
                src="/onboarding/icon-star.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
            </span>
            <p className="pt-1.5 text-sm leading-6 text-[#334155] sm:text-[0.9375rem]">
              You&apos;re building a solid foundation. Focusing on writing and
              reading will give you the strongest next step.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(ONBOARDING_ROUTES.diagnosticPlan)}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-5 text-base font-semibold text-white transition hover:bg-[#244fe6]"
          >
            See My Study Plan
            <span aria-hidden>→</span>
          </button>

          <p className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-5 text-[#111827]">
            <InfoCircleIcon className="mt-0.5 size-3.5 shrink-0 text-[#2b5ce6]" />
            <span>
              These scores are AI estimated for self-assessment purposes only.
              They are not official IELTS results.
            </span>
          </p>
        </div>
      </div>
    </OnboardingWideShell>
  );
}

function BookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 16" fill="none" aria-hidden>
      <path
        d="M11 14.5C10.2 13.87 9.33 13.38 8.4 13.03C7.47 12.68 6.5 12.5 5.5 12.5C4.8 12.5 4.11 12.59 3.44 12.78C2.76 12.96 2.12 13.22 1.5 13.55C1.15 13.73 0.81 13.73 0.49 13.53C0.16 13.33 0 13.03 0 12.65V1.9C0 1.72 0.05 1.54 0.14 1.38C0.23 1.21 0.37 1.08 0.55 1C1.33 0.62 2.14 0.32 2.96 0.11C3.79-0.1 4.63 0 5.5 0C6.47 0 7.41 0.12 8.34 0.38C9.26 0.62 10.15 1 11 1.5C11.85 1 12.74 0.62 13.66 0.38C14.59 0.12 15.53 0 16.5 0C17.37 0 18.21 0.1 19.04 0.31C19.86 0.52 20.67 0.82 21.45 1.2C21.63 1.28 21.77 1.41 21.86 1.58C21.95 1.74 22 1.92 22 2.1V12.65C22 13.03 21.84 13.33 21.51 13.53C21.19 13.73 20.85 13.73 20.5 13.55C19.88 13.22 19.24 12.96 18.56 12.78C17.89 12.59 17.2 12.5 16.5 12.5C15.5 12.5 14.53 12.68 13.6 13.03C12.67 13.38 11.8 13.87 11 14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PencilIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M0 18V13.75L13.2 0.575C13.4 0.392 13.621 0.25 13.863 0.15C14.104 0.05 14.358 0 14.625 0C14.892 0 15.15 0.05 15.4 0.15C15.65 0.25 15.867 0.4 16.05 0.6L17.425 2C17.625 2.183 17.771 2.4 17.863 2.65C17.954 2.9 18 3.15 18 3.4C18 3.667 17.954 3.921 17.863 4.163C17.771 4.404 17.625 4.625 17.425 4.825L4.25 18H0ZM14.6 4.8L16 3.4L14.6 2L13.2 3.4L14.6 4.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeadphonesIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C9.239 3 6.74 4.12 4.929 5.929C3.12 7.74 2 10.239 2 13V15.5C2 16.328 2.672 17 3.5 17H6V11H4.5C4.776 9.043 5.76 7.288 7.343 6.121C8.926 4.955 10.91 4.5 12 4.5C13.09 4.5 15.074 4.955 16.657 6.121C18.24 7.288 19.224 9.043 19.5 11H18V17H20.5C21.328 17 22 16.328 22 15.5V13C22 10.239 20.88 7.74 19.071 5.929C17.26 4.12 14.761 3 12 3ZM4 13H5V15H4V13ZM19 13H20V15H19V13Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MicIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 20" fill="none" aria-hidden>
      <path
        d="M8 12.5C6.343 12.5 5 11.157 5 9.5V4C5 2.343 6.343 1 8 1C9.657 1 11 2.343 11 4V9.5C11 11.157 9.657 12.5 8 12.5ZM13 9.5C13 12.261 10.761 14.5 8 14.5C5.239 14.5 3 12.261 3 9.5H1C1 12.86 3.504 15.65 6.75 16.3V19H9.25V16.3C12.496 15.65 15 12.86 15 9.5H13Z"
        fill="currentColor"
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

function FocusIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle
        cx="8"
        cy="8"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="2.2 2"
      />
      <circle cx="8" cy="8" r="1.75" fill="currentColor" />
    </svg>
  );
}

function InfoCircleIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 11v5M12 8h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
