"use client";

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
  { label: "Total sections", value: "4", Icon: CalendarAboutIcon },
  { label: "Total duration", value: "~10 minutes", Icon: DurationIcon },
  {
    label: "Skills assessed",
    value: "Listening, Reading, Writing, Speaking",
    Icon: PulseAboutIcon,
  },
  { label: "Analysis", value: "AI-powered", Icon: InfoAboutIcon },
  {
    label: "Next step",
    value: "Your results & recommendations",
    Icon: LayersAboutIcon,
  },
] as const;

const BUBBLES = [
  { className: "left-0 top-2 size-2", delay: "0s", duration: "2.2s" },
  { className: "right-1 top-0 size-2.5", delay: "0.35s", duration: "2.6s" },
  { className: "-left-2 bottom-3 size-1.5", delay: "0.7s", duration: "2.1s" },
  { className: "-right-3 bottom-1 size-2", delay: "1.1s", duration: "2.8s" },
  { className: "left-6 -top-3 size-1.5", delay: "1.5s", duration: "2.4s" },
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
        <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white shadow-[0_-4px_24px_rgba(15,23,42,0.06)]">
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
          <div className="mx-auto flex max-w-xl flex-col items-center text-center animate-[fade-in-up_0.55s_ease-out_both]">
            <div className="relative mb-6">
              <div
                className="diag-anim-glow absolute left-1/2 top-1/2 size-32 rounded-full bg-[#2b5ce6]/25 blur-2xl"
                style={{ animation: "diag-glow-pulse 2.4s ease-in-out infinite" }}
                aria-hidden
              />
              {BUBBLES.map((bubble, i) => (
                <span
                  key={i}
                  className={`diag-anim-bubble absolute rounded-full bg-[#2b5ce6] ${bubble.className}`}
                  style={{
                    animation: `diag-bubble-pop ${bubble.duration} ease-out infinite`,
                    animationDelay: bubble.delay,
                  }}
                  aria-hidden
                />
              ))}
              <div
                className="diag-anim-icon relative flex size-[4.75rem] items-center justify-center rounded-2xl bg-white shadow-[0_8px_28px_rgba(43,92,230,0.18)] ring-1 ring-[#E8EEFF]"
                style={{ animation: "diag-icon-float 2.8s ease-in-out infinite" }}
              >
                <AnimatedClockIcon className="size-9 text-[#2b5ce6]" />
                <span
                  className="diag-anim-check absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] shadow-sm ring-2 ring-white"
                  style={{
                    animation: "diag-check-pop 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) both",
                  }}
                >
                  <CheckIcon className="size-3 text-white" />
                </span>
              </div>
            </div>

            <h1 className="text-[1.625rem] font-bold leading-tight text-[#111827] sm:text-[1.875rem]">
              Diagnostic complete.
            </h1>
            <p className="mt-1.5 text-[1.375rem] font-bold leading-tight text-[#2b5ce6] sm:text-[1.625rem]">
              Analysing your results
              <AnimatedEllipsis />
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B] sm:text-[0.9375rem]">
              We&apos;re using AI to evaluate your performance across all 4
              skills. This will only take a few moments.
            </p>

            <div className="mt-7 w-full">
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    className="relative h-full overflow-hidden rounded-full bg-[#2b5ce6] transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  >
                    <span
                      className="diag-anim-shimmer pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      style={{ animation: "diag-shimmer 1.4s ease-in-out infinite" }}
                      aria-hidden
                    />
                  </div>
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
          <div className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                <DocIcon className="size-4 text-[#2b5ce6]" />
              </span>
              <h2 className="text-sm font-bold text-[#2b5ce6]">
                About your diagnostic
              </h2>
            </div>
            <ul className="space-y-4">
              {ABOUT_ROWS.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-3"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm text-[#6B7280]">
                    <row.Icon className="size-4 shrink-0 text-[#6B7280]" />
                    {row.label}
                  </span>
                  <span className="max-w-[58%] text-right text-sm font-bold leading-snug text-[#111827]">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] sm:p-6">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                <ShieldAboutIcon className="size-4 text-[#2b5ce6]" />
              </span>
              <h2 className="text-sm font-bold text-[#2b5ce6]">
                Your data is safe
              </h2>
            </div>
            <p className="text-sm leading-6 text-[#6B7280]">
              Your responses are secure and used only to generate your
              personalised diagnostic results.
            </p>
            <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#2b5ce6] px-4 py-3 text-sm font-medium text-white">
              <LockIcon className="size-3.5 shrink-0" />
              Your privacy is our priority.
            </div>
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
      <span
        className="diag-anim-step-pulse relative z-10 flex size-8 items-center justify-center rounded-full border-[2px] border-[#2b5ce6] bg-white"
        style={{ animation: "diag-step-pulse 1.8s ease-out infinite" }}
      >
        <span className="size-2.5 animate-pulse rounded-full bg-[#2b5ce6]" />
      </span>
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

function AnimatedClockIcon({ className = "size-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <g className="diag-clock-hand-hr diag-anim-hand-hr">
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="8.6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </g>
      <g className="diag-clock-hand-min diag-anim-hand-min">
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </g>
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}

function AnimatedEllipsis() {
  return (
    <span className="inline-flex w-[1.1em] justify-start" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="diag-anim-dot"
          style={{
            animation: "diag-dots 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        >
          .
        </span>
      ))}
    </span>
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

function CalendarAboutIcon({ className = "size-4" }: { className?: string }) {
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

function PulseAboutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M1.5 8h3l1.5-3.5L8.5 12l2-4.5H14.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoAboutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 7.2v3.5M8 5.2h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LayersAboutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2.5 13.5 5.5 8 8.5 2.5 5.5 8 2.5ZM2.5 8.25 8 11.25l5.5-3M2.5 10.75 8 13.75l5.5-3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldAboutIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2.25 13 4.25v3.6c0 3.1-2.05 5.35-5 6.15-2.95-.8-5-3.05-5-6.15v-3.6L8 2.25Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
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
