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
      footerMessage="The test will submit your response automatically and move to the next section."
    >
      <h1 className="text-xl font-semibold sm:text-[1.375rem]">
        <span className="text-[#2b5ce6]">Writing</span>
        <span className="text-[#9CA3AF]"> · </span>
        <span className="font-medium text-[#6B7280]">Section 3 of 4</span>
      </h1>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#2b5ce6] px-4 py-3.5 text-white sm:px-5">
        <InfoIcon className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="text-sm font-bold sm:text-base">Writing Task</p>
          <p className="mt-0.5 text-sm text-white/90">
            Write a short response to the prompt below. There is no minimum
            length — write as much as you can in the time available.
          </p>
        </div>
      </div>

      <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="min-w-0 space-y-4">
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

        <aside className="space-y-4 lg:sticky lg:top-[5.25rem]">
          <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <ClockIcon className="size-4" />
              Section info
            </div>
            <h3 className="mt-3 text-base font-bold text-[#111827]">Writing</h3>
            <p className="mt-1 text-sm leading-6 text-[#4B5563]">
              Write a short response to the prompt. There is no minimum length.
            </p>
            <ul className="mt-4 text-sm text-[#374151]">
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3 first:pt-0">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <ClockIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Section time
                </span>
                <span className="font-semibold text-[#141B2B]">2 minutes</span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <DocIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Answer type
                </span>
                <span className="font-semibold text-[#141B2B]">
                  Essay response
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] py-3">
                <span className="inline-flex items-center gap-2 text-[#6B7280]">
                  <HashIcon className="size-3.5 shrink-0 text-[#2b5ce6]" />
                  Word count
                </span>
                <span className="font-semibold text-[#141B2B]">Live count</span>
              </li>
              <li className="flex items-start gap-2 py-3 pb-0 text-[#6B7280]">
                <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#2b5ce6]" />
                <span>
                  <span className="font-medium text-[#6B7280]">Task: </span>
                  <span className="text-[#374151]">
                    Write your ideas clearly and support with examples.
                  </span>
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <BulbIcon className="size-4" />
              Note
            </div>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              You can write as much as you can in the time available.
            </p>
            <div className="my-3 border-b border-[#E5E7EB]" />
            <p className="text-sm leading-6 text-[#4B5563]">
              The section will be submitted automatically when time runs out.
            </p>
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

function DocIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 2.5h5.5L12 5v8.5H4V2.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M9.5 2.5V5H12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function HashIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 6h9M3.5 10h9M6.5 3.5 5 12.5M11 3.5 9.5 12.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="m5.5 8 1.8 1.8 3.2-3.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
