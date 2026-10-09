"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DiagnosticSectionHeading,
  DiagnosticTipBanner,
} from "@/app/components/diagnostic/diagnostic-ui";
import {
  DiagnosticTestShell,
  useHideScrollbar,
} from "@/app/components/diagnostic/diagnostic-test-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SECTION_SECONDS = 2 * 60;

const PROMPT =
  "Some people believe that digital education tools will completely replace traditional classrooms, while others argue that face-to-face learning remains essential. Discuss both these views and give your own opinion.";

export function DiagnosticWritingTest() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sectionLeft, setSectionLeft] = useState(SECTION_SECONDS);
  const [response, setResponse] = useState("");

  useHideScrollbar();

  const wordCount = useMemo(() => {
    const t = response.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [response]);

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
    const id = window.setInterval(() => {
      setSectionLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8F9FB] text-sm text-[#64748B]">
        Loading…
      </div>
    );
  }

  return (
    <DiagnosticTestShell
      activeSkill="writing"
      sectionLeft={sectionLeft}
      canSubmit
      onSubmit={() => router.push(ONBOARDING_ROUTES.diagnosticSpeaking)}
    >
      <DiagnosticSectionHeading skill="Writing" section="Section 3 of 4" />

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-4">
          <DiagnosticTipBanner
            title="Writing Task"
            description="Write a short response to the prompt below. There is no minimum length — write as much as you can in the time available."
          />

          <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#2b5ce6]">
              Prompt
            </p>
            <p className="mt-3 text-sm leading-6 text-[#374151] sm:text-[0.9375rem]">
              {PROMPT}
            </p>
          </section>

          <div>
            <textarea
              id="writing-response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={14}
              placeholder="Begin typing your response here..."
              className="w-full resize-y rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm leading-6 text-[#141B2B] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 sm:min-h-[18rem]"
            />
            <p className="mt-2 text-sm font-bold text-[#141B2B]">
              Word count: {wordCount}
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-[5.25rem]">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <ClockIcon className="size-4" />
              Section info
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#111827]">Writing</h3>
            <p className="mt-1 text-sm leading-6 text-[#4B5563]">
              Write your response to the prompt. There is no minimum length.
            </p>
            <ul className="mt-4 space-y-3.5 border-t border-[#E5E7EB] pt-4 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <ClockIcon className="size-3.5 shrink-0 text-[#9CA3AF]" />
                  Section time
                </span>
                <span className="font-bold text-[#111827]">2 minutes</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <QuestionIcon className="size-3.5 shrink-0 text-[#9CA3AF]" />
                  Answer type
                </span>
                <span className="font-bold text-[#111827]">Essay response</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <AlignIcon className="size-3.5 shrink-0 text-[#9CA3AF]" />
                  Word count
                </span>
                <span className="font-bold text-[#111827]">Live count</span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <PencilIcon className="mt-0.5 size-3.5 shrink-0 text-[#9CA3AF]" />
                  Task
                </span>
                <span className="max-w-[11rem] text-right text-sm font-bold leading-5 text-[#111827]">
                  Write your ideas clearly and support with examples.
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <BulbIcon className="size-4" />
              Note
            </div>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              You can write as much as you can in the time available.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4B5563]">
              The section will be submitted automatically when time runs out.
            </p>
          </section>
        </aside>
      </div>
    </DiagnosticTestShell>
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

function QuestionIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M6.2 6.4a1.8 1.8 0 1 1 2.5 1.65c-.5.28-.8.65-.8 1.25V10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8 11.8h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlignIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 4.5h10M3 8h10M3 11.5h7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PencilIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 12.5h2.2L12 6.2a1.4 1.4 0 0 0-2-2L3.5 10.7v1.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M9 5l2 2" stroke="currentColor" strokeWidth="1.3" />
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
