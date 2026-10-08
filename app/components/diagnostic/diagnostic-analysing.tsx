"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DiagnosticTestShell,
  useHideScrollbar,
} from "@/app/components/diagnostic/diagnostic-test-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const ANALYSIS_MS = 5000;
const REDIRECT_SECONDS = 3;

const STEPPER = [
  { id: "listening", label: "Listening", status: "completed" as const },
  { id: "reading", label: "Reading", status: "completed" as const },
  { id: "writing", label: "Writing", status: "completed" as const },
  { id: "speaking", label: "Speaking", status: "speaking" as const },
  { id: "ai", label: "AI Analysis", status: "analysing" as const },
];

const ABOUT_ROWS = [
  { label: "Total sections", value: "4", Icon: SectionsIcon },
  { label: "Total duration", value: "~10 minutes", Icon: DurationIcon },
  {
    label: "Skills assessed",
    value: "Listening, Reading, Writing, Speaking",
    Icon: SkillsIcon,
  },
  { label: "Analysis", value: "AI-powered", Icon: AnalysisIcon },
  {
    label: "Next step",
    value: "Your results & recommendations",
    Icon: NextStepIcon,
  },
] as const;

export function DiagnosticAnalysing() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [redirectLeft, setRedirectLeft] = useState<number | null>(null);
  const redirected = useRef(false);

  useHideScrollbar();

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      (state.exam === "ukvi" && !state.ukviLevel) ||
      !state.experienceDone ||
      !state.goalsDone
    ) {
      router.replace(ONBOARDING_ROUTES.diagnostic);
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (!ready) return;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ANALYSIS_MS);
      // Ease-out so the bar feels intentional
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setRedirectLeft(REDIRECT_SECONDS);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [ready]);

  useEffect(() => {
    if (redirectLeft == null) return;
    if (redirectLeft <= 0) {
      if (!redirected.current) {
        redirected.current = true;
        router.push(ONBOARDING_ROUTES.diagnosticResults);
      }
      return;
    }
    const id = window.setTimeout(() => {
      setRedirectLeft((s) => (s == null ? null : s - 1));
    }, 1000);
    return () => window.clearTimeout(id);
  }, [redirectLeft, router]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8F9FB] text-sm text-[#64748B]">
        Loading…
      </div>
    );
  }

  const countdown =
    redirectLeft == null ? REDIRECT_SECONDS : Math.max(0, redirectLeft);
  const ringProgress =
    redirectLeft == null
      ? 0
      : ((REDIRECT_SECONDS - redirectLeft) / REDIRECT_SECONDS) * 100;

  return (
    <DiagnosticTestShell
      activeSkill="speaking"
      sectionLeft={120}
      canSubmit={false}
      tabsInteractive={false}
      footer={
        <footer className="sticky bottom-0 z-30 border-t border-[#E5E7EB] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex max-w-3xl items-start gap-2.5 text-sm text-[#475569]">
              <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" />
              <p>
                Please don&apos;t close or refresh the page. You will be
                redirected automatically.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-xl border border-[#BFDBFE] bg-white px-3.5 py-2.5 shadow-sm">
              <p className="text-sm font-medium text-[#334155]">
                Redirecting to results in{" "}
                <span className="font-bold tabular-nums text-[#2b5ce6]">
                  {String(countdown).padStart(2, "0")}
                </span>{" "}
                seconds.
              </p>
              <CountdownRing progress={ringProgress} label={countdown} />
            </div>
          </div>
        </footer>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6">
        <section className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-8 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:px-8 sm:py-10">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="relative mb-6">
              <div
                className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b5ce6]/15 blur-2xl"
                aria-hidden
              />
              <div className="relative flex size-[4.75rem] items-center justify-center rounded-2xl bg-white shadow-[0_8px_28px_rgba(43,92,230,0.18)] ring-1 ring-[#E8EEFF]">
                <ClockHeroIcon className="size-9 text-[#2b5ce6]" />
                <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] shadow-sm ring-2 ring-white">
                  <CheckIcon className="size-3 text-white" />
                </span>
              </div>
            </div>

            <h1 className="text-[1.625rem] font-bold leading-tight text-[#111827] sm:text-[1.875rem]">
              Diagnostic complete.
            </h1>
            <p className="mt-1.5 text-[1.375rem] font-bold leading-tight text-[#2b5ce6] sm:text-[1.625rem]">
              Analysing your results...
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B] sm:text-[0.9375rem]">
              We&apos;re using AI to evaluate your performance across all 4
              skills. This will only take a few moments.
            </p>

            <div className="mt-7 w-full">
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="h-full rounded-full bg-[#2b5ce6] transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-[#2b5ce6]">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:px-5">
            <ol className="flex flex-wrap items-start justify-between gap-y-4">
              {STEPPER.map((step, index) => (
                <li
                  key={step.id}
                  className="relative flex min-w-[4.5rem] flex-1 flex-col items-center px-1 text-center"
                >
                  {index < STEPPER.length - 1 ? (
                    <span
                      className="absolute left-[calc(50%+1.1rem)] right-[calc(-50%+1.1rem)] top-[1.05rem] h-px bg-[#D1D5DB]"
                      aria-hidden
                    />
                  ) : null}
                  <StepGlyph status={step.status} />
                  <p className="mt-2.5 text-[0.8125rem] font-semibold text-[#111827]">
                    {step.label}
                  </p>
                  <p
                    className={`mt-0.5 text-[0.6875rem] font-medium ${
                      step.status === "completed"
                        ? "text-[#64748B]"
                        : "text-[#2b5ce6]"
                    }`}
                  >
                    {step.status === "completed"
                      ? "Completed"
                      : step.status === "speaking"
                        ? "In Progress"
                        : "In progress"}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 flex items-start gap-3.5 rounded-2xl bg-[#2b5ce6] px-4 py-4 text-white sm:px-5 sm:py-4.5">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <DocIcon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold sm:text-[0.9375rem]">
                What happens next?
              </p>
              <p className="mt-1 text-sm leading-6 text-white/90">
                Once the analysis is complete, you&apos;ll see your estimated
                IELTS scores, skill breakdown, strengths, and personalised study
                recommendations.
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-center gap-2">
              <DocIcon className="size-4 text-[#2b5ce6]" />
              <h2 className="text-sm font-semibold text-[#2b5ce6]">
                About your diagnostic
              </h2>
            </div>
            <ul className="divide-y divide-[#E5E7EB]">
              {ABOUT_ROWS.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
                    <row.Icon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                    {row.label}
                  </span>
                  <span className="max-w-[55%] text-right text-sm font-semibold leading-snug text-[#141B2B]">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/home/trust-shield-check.svg"
                alt=""
                width={18}
                height={18}
                className="size-[1.125rem]"
              />
              <h2 className="text-sm font-semibold text-[#2b5ce6]">
                Your data is safe
              </h2>
            </div>
            <p className="text-sm leading-6 text-[#64748B]">
              Your responses are secure and used only to generate your
              personalised diagnostic results.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-4 text-sm font-semibold text-white transition hover:bg-[#244fe6]"
            >
              <LockIcon className="size-3.5" />
              Your privacy is our priority.
            </button>
          </div>
        </aside>
      </div>
    </DiagnosticTestShell>
  );
}

function StepGlyph({
  status,
}: {
  status: "completed" | "speaking" | "analysing";
}) {
  if (status === "completed") {
    return (
      <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-[#2b5ce6]">
        <CheckIcon className="size-3.5 text-white" />
      </span>
    );
  }
  if (status === "speaking") {
    return (
      <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-[2px] border-[#2b5ce6] bg-white" />
    );
  }
  return (
    <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white">
      <SpinnerIcon className="size-7 text-[#2b5ce6]" />
    </span>
  );
}

function CountdownRing({
  progress,
  label,
}: {
  progress: number;
  label: number;
}) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, progress)) / 100) * c;
  return (
    <div className="relative size-9 shrink-0">
      <svg className="size-9 -rotate-90" viewBox="0 0 36 36" aria-hidden>
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="#2b5ce6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[0.625rem] font-bold tabular-nums text-[#2b5ce6]">
        {String(label).padStart(2, "0")}
      </span>
    </div>
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

function ClockHeroIcon({ className = "size-9" }: { className?: string }) {
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

function InfoCircleIcon({ className = "size-4" }: { className?: string }) {
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

function SpinnerIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.75h7.5L19 8.25V20.25a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 3.75V8.25H19M9 12.5h6M9 16h4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect
        x="3.25"
        y="7"
        width="9.5"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.25 7V5.25a2.75 2.75 0 0 1 5.5 0V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionsIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function DurationIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5.25V8.25L10 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkillsIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 12.5V4.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M5.5 12.5V8M8 12.5V6.5M10.5 12.5V9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnalysisIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 11.5L6.2 8.3L8.5 10.6L13 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 6H13v2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextStepIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h8.5M8.5 4.5L12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
