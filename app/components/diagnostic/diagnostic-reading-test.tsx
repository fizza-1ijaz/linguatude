"use client";

import { useEffect, useRef, useState } from "react";
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
  writeOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SECTION_SECONDS = 3 * 60;

const PASSAGE_PARAGRAPHS = [
  "Cities around the world are rediscovering the value of parks, gardens, and tree-lined streets. As urban populations grow, planners are under pressure to create neighbourhoods that support both health and the environment. Green spaces are no longer treated as optional decoration; they are becoming essential infrastructure for everyday life.",
  "Research shows that access to parks can reduce stress, improve air quality, and encourage daily physical activity. In several European cities, former industrial sites have been transformed into public gardens that attract families, students, and remote workers. These places also help cool streets during heatwaves and absorb rainwater after heavy storms, reducing pressure on drainage systems.",
  "Community involvement is often the difference between a neglected lot and a thriving park. Local volunteers plant trees, organise weekend markets, and report maintenance needs. When residents feel ownership, green spaces stay safer and more welcoming for longer, and children gain places to play outdoors.",
  "Still, challenges remain. Land in dense cities is expensive, and developers may resist setting aside open space. Successful programmes combine clear planning rules with incentives for rooftop gardens, pocket parks, and green corridors that connect schools, homes, and workplaces across the city.",
] as const;

const WORD_COUNT = PASSAGE_PARAGRAPHS.join(" ")
  .trim()
  .split(/\s+/).length;

const QUESTIONS = [
  {
    id: "q1",
    prompt: "What is the main purpose of the passage?",
    options: [
      "To argue that green spaces are becoming essential urban infrastructure",
      "To describe how European cities banned industrial development",
      "To explain why parks are too expensive to maintain",
      "To promote a single rooftop garden project",
    ],
  },
  {
    id: "q2",
    prompt: "According to the passage, which benefit is linked to urban green spaces?",
    options: [
      "They can reduce stress and improve air quality",
      "They eliminate the need for public transport",
      "They guarantee lower house prices nearby",
      "They replace all forms of physical exercise",
    ],
  },
  {
    id: "q3",
    prompt: "What does the passage suggest about community involvement?",
    options: [
      "It helps green spaces remain safer and more welcoming",
      "It is unnecessary once a park has been built",
      "It mainly increases land prices for developers",
      "It should replace professional city planning",
    ],
  },
] as const;

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

type Answers = Record<string, number | null>;

export function DiagnosticReadingTest() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sectionLeft, setSectionLeft] = useState(SECTION_SECONDS);
  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
  });
  const endedRef = useRef(false);

  useHideScrollbar();

  const allAnswered = QUESTIONS.every((q) => answers[q.id] != null);

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

  function submitSection() {
    endedRef.current = true;
    writeOnboardingState({ completed: true });
    router.push(ONBOARDING_ROUTES.diagnosticWriting);
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8F9FB] text-sm text-[#64748B]">
        Loading…
      </div>
    );
  }

  return (
    <DiagnosticTestShell
      activeSkill="reading"
      sectionLeft={sectionLeft}
      canSubmit
      onSubmit={submitSection}
    >
      <DiagnosticSectionHeading skill="Reading" section="Section 2 of 4" />

      <DiagnosticTipBanner
        className="mt-4"
        title="Read the passage and answer the questions."
        description="You have 3 minutes to read the passage and answer all the questions."
      />

      <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-6">
        {/* Left: passage + section info */}
        <div className="flex flex-col gap-4">
          <article className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
              The Rise of Urban Green Spaces
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#374151] sm:text-[0.9375rem] sm:leading-7">
              {PASSAGE_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-xs font-medium text-[#9CA3AF]">
              Word count: {WORD_COUNT}
            </p>
          </article>

          <aside className="rounded-2xl border border-[#BFDBFE] bg-[#F8FAFF] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.6875rem] font-bold leading-none text-white">
                i
              </span>
              Section info
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#111827]">Reading</h3>
            <p className="mt-1 text-sm leading-6 text-[#4B5563]">
              Read the passage carefully and answer the questions based on it.
            </p>
            <ul className="mt-4 space-y-3 border-t border-[#E5E7EB] pt-4 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#374151]">
                  <ClockMini className="size-4 shrink-0 text-[#6B7280]" />
                  Section time
                </span>
                <span className="font-bold text-[#111827]">3 minutes</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#374151]">
                  <QuestionMini className="size-4 shrink-0 text-[#6B7280]" />
                  Questions
                </span>
                <span className="font-bold text-[#111827]">3 questions</span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[#374151]">
                  <CheckMini className="size-4 shrink-0 text-[#6B7280]" />
                  Answer type
                </span>
                <span className="text-right">
                  <span className="block font-bold text-[#111827]">
                    Multiple choice
                  </span>
                  <span className="mt-0.5 block text-xs font-normal text-[#6B7280]">
                    (one answer per question)
                  </span>
                </span>
              </li>
            </ul>
          </aside>
        </div>

        {/* Right: questions — sticky while page scrolls */}
        <section className="lg:sticky lg:top-[5.25rem]">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#111827]">Questions</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              Choose the correct answer for each question.
            </p>

            <div className="mt-5 flex flex-col gap-6">
              {QUESTIONS.map((q, qi) => (
                <div key={q.id}>
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-sm font-bold text-[#1E40AF]">
                      {qi + 1}
                    </span>
                    <p className="pt-0.5 text-sm font-bold leading-6 text-[#111827] sm:text-base">
                      {q.prompt}
                    </p>
                  </div>

                  <div className="mt-3 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
                    {q.options.map((opt, oi) => {
                      const selected = answers[q.id] === oi;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                          }
                          className={`flex w-full items-center gap-3 px-3.5 py-3.5 text-left transition first:pt-3.5 last:pb-3.5 hover:bg-[#F9FAFB] ${
                            oi > 0 ? "border-t border-[#E5E7EB]" : ""
                          } ${selected ? "bg-[#F8FAFF]" : "bg-white"}`}
                        >
                          <span
                            className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected
                                ? "border-[#2b5ce6] bg-[#2b5ce6] shadow-[inset_0_0_0_2px_white]"
                                : "border-[#D1D5DB] bg-white"
                            }`}
                            aria-hidden
                          />
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#2b5ce6] text-xs font-bold text-white">
                            {OPTION_LETTERS[oi]}
                          </span>
                          <span className="text-sm leading-5 text-[#374151]">
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DiagnosticTestShell>
  );
}

function ClockMini({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4.5l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuestionMini({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.25c-.7.4-1.1.9-1.1 1.75V14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 17h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckMini({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="m8 12.2 2.4 2.4L16 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
