"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DiagnosticTestShell,
  useHideScrollbar,
} from "@/app/components/diagnostic/diagnostic-test-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SECTION_SECONDS = 2 * 60;
const PREP_SECONDS = 10;
const RECORD_SECONDS = 60;

type Phase = "prep" | "recording" | "done";

export function DiagnosticSpeakingTest() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sectionLeft, setSectionLeft] = useState(SECTION_SECONDS);
  const [phase, setPhase] = useState<Phase>("prep");
  const [prepLeft, setPrepLeft] = useState(PREP_SECONDS);
  const [recordLeft, setRecordLeft] = useState(RECORD_SECONDS);

  useHideScrollbar();

  const prepProgress = useMemo(
    () => ((PREP_SECONDS - prepLeft) / PREP_SECONDS) * 100,
    [prepLeft],
  );

  const waveform = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const t = RECORD_SECONDS - recordLeft;
        return (
          0.25 +
          0.55 * Math.abs(Math.sin(i * 0.55 + t * 0.35)) +
          0.2 * Math.abs(Math.cos(i * 0.3 + t * 0.2))
        );
      }),
    [recordLeft],
  );

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
    const id = window.setInterval(() => {
      setSectionLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (!ready || phase !== "prep") return;
    const id = window.setInterval(() => {
      setPrepLeft((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          setPhase("recording");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready, phase]);

  useEffect(() => {
    if (!ready || phase !== "recording") return;
    const id = window.setInterval(() => {
      setRecordLeft((t) => {
        if (t <= 1) {
          window.clearInterval(id);
          setPhase("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready, phase]);

  function finishDiagnostic() {
    router.push(ONBOARDING_ROUTES.diagnosticAnalysing);
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8F9FB] text-sm text-[#64748B]">
        Loading…
      </div>
    );
  }

  const recording = phase === "recording";

  return (
    <DiagnosticTestShell
      activeSkill="speaking"
      sectionLeft={sectionLeft}
      canSubmit
      onSubmit={finishDiagnostic}
      submitLabel="Submit section"
      footerMessage="The test will submit your response automatically and move to the next section."
    >
      <h1 className="text-xl font-semibold sm:text-[1.375rem]">
        <span className="text-[#2b5ce6]">Speaking</span>
        <span className="text-[#9CA3AF]"> · </span>
        <span className="font-medium text-[#6B7280]">Section 4 of 4</span>
      </h1>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#2b5ce6] px-4 py-3.5 text-white sm:px-5">
        <InfoIcon className="mt-0.5 size-5 shrink-0" />
        <p className="text-sm font-medium sm:text-base">
          Read the question. You have 10 seconds to prepare, then 60 seconds to
          speak your answer.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <section className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="border-b border-[#E5E7EB] px-5 py-5 sm:px-6">
            <p className="text-sm font-semibold text-[#2b5ce6]">
              Speaking Question
            </p>
            <h2 className="mt-2 text-lg font-bold leading-snug text-[#111827] sm:text-xl">
              Describe a book that has had a significant impact on your life.
            </h2>
          </div>

          <div className="relative grid gap-0 sm:grid-cols-2">
            {/* Preparation */}
            <div className="border-b border-[#E5E7EB] px-5 py-6 text-center sm:border-b-0 sm:border-r sm:px-6">
              <div className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#2b5ce6]">
                <ClockIcon className="size-4 text-[#2b5ce6]" />
                Preparation time
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-[#141B2B]">
                Think about your answer.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                You will start recording soon.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="relative flex size-36 items-center justify-center sm:size-40">
                  <svg viewBox="0 0 160 160" className="absolute inset-0 size-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      fill="none"
                      stroke="#DBEAFE"
                      strokeWidth="10"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      fill="none"
                      stroke="#2b5ce6"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 68}`}
                      strokeDashoffset={`${2 * Math.PI * 68 * (1 - prepProgress / 100)}`}
                    />
                  </svg>
                  <div className="relative text-center">
                    <p className="text-3xl font-bold tabular-nums text-[#141B2B]">
                      0:{String(prepLeft).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-[#6B7280]">
                      {phase === "prep" ? "Preparing..." : "Ready"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center arrow */}
            <span
              className="absolute left-1/2 top-[52%] z-10 hidden size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#94A3B8] shadow-sm sm:flex"
              aria-hidden
            >
              <ArrowRightIcon />
            </span>

            {/* Recording */}
            <div className="bg-[#F3F4F6] px-5 py-6 text-center sm:px-6">
              <div className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#EF4444]">
                <span className="size-2 rounded-full bg-[#EF4444]" />
                Recording
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-[#141B2B]">
                Speak clearly into your microphone.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6B7280]">
                Recording will stop automatically.
              </p>

              <div className="mt-5">
                <p className="text-4xl font-bold tabular-nums text-[#141B2B]">
                  0:{String(recordLeft).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-medium text-[#6B7280]">
                  {recording
                    ? `Recording — 0:${String(recordLeft).padStart(2, "0")} remaining`
                    : phase === "done"
                      ? "Recording complete"
                      : "Waiting to start…"}
                </p>

                <div className="mt-5 flex h-12 items-end justify-center gap-[3px]">
                  {waveform.map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full ${
                        recording ? "bg-[#2b5ce6]" : "bg-[#BFDBFE]"
                      }`}
                      style={{ height: `${Math.max(12, h * 100)}%` }}
                    />
                  ))}
                </div>

                <p
                  className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    recording
                      ? "bg-[#ECFDF5] text-[#059669]"
                      : phase === "done"
                        ? "bg-[#EEF2FF] text-[#2b5ce6]"
                        : "bg-white text-[#64748B]"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      recording
                        ? "animate-pulse bg-[#059669]"
                        : "bg-current"
                    }`}
                  />
                  {recording
                    ? "Recording in progress"
                    : phase === "done"
                      ? "Ready to submit"
                      : "Standby"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] bg-white p-4 sm:p-5">
            <div className="flex items-start gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm text-[#6B7280] shadow-sm">
              <InfoCircleMini className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" />
              <p>
                Your response will be submitted automatically when the recording
                ends (60 seconds) or if 3 seconds of silence is detected.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-[5.25rem]">
          <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <ClockIcon className="size-4" />
              Section info
            </div>
            <h3 className="mt-3 text-base font-bold text-[#111827]">Speaking</h3>
            <p className="mt-1 text-sm leading-6 text-[#4B5563]">
              Prepare briefly, then speak your answer aloud into the microphone.
            </p>
            <ul className="mt-4 text-sm">
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3 first:pt-0">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <ClockIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Section time
                </span>
                <span className="font-semibold text-[#141B2B]">2 minutes</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <PrepIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Preparation time
                </span>
                <span className="font-semibold text-[#141B2B]">10 seconds</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <MicIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Speaking time
                </span>
                <span className="font-semibold text-[#141B2B]">
                  Up to 60 seconds
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 py-3 pb-0">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <AutoIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Auto submit
                </span>
                <span className="text-right font-semibold text-[#141B2B]">
                  60 sec or 3 sec silence
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <BulbIcon className="size-4" />
              Tips
            </div>
            <ul className="mt-3 space-y-2.5 text-sm text-[#4B5563]">
              {[
                "Speak clearly and at a natural pace",
                "Stay on topic and answer the question fully",
                "Use examples from your own experience",
                "Keep going even if you make a small mistake",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <CheckBlue className="mt-0.5 size-4 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </DiagnosticTestShell>
  );
}

function InfoIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.6" />
      <path
        d="M10 9v4.5M10 6.5h.01"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoCircleMini({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 7.2v3.5M8 5.2h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 5v3.2l2 1.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrepIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3l2 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="6" y="2.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4 8a4 4 0 0 0 8 0M8 12v1.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AutoIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8a5 5 0 0 1 8.5-3.5M13 8a5 5 0 0 1-8.5 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M11 2.5v3h3M5 13.5v-3H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BulbIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2.5a3.5 3.5 0 0 0-2 6.4V10.5h4V8.9A3.5 3.5 0 0 0 8 2.5ZM6.5 12h3M6.8 13.5h2.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckBlue({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="#EEF2FF" />
      <path
        d="m5.5 8 1.8 1.8 3.2-3.4"
        stroke="#2b5ce6"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
