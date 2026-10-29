"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardShell, EXAM_STORAGE_KEY } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import { Toggle } from "@/app/components/dashboard/account-shared";

type ExamId = "ielts" | "pte";

const DETAIL_ROWS = [
  {
    id: "previous",
    title: "Previous Score",
    description: "Your last known score (optional)",
    href: "#previous",
    Icon: DocIcon,
  },
  {
    id: "target",
    title: "Target Score",
    description: "Your desired score",
    href: "#target",
    Icon: TargetIcon,
  },
  {
    id: "date",
    title: "Test Date",
    description: "When do you plan to take the exam?",
    href: "#date",
    Icon: CalendarIcon,
  },
] as const;

export function SecondExamSetup() {
  const router = useRouter();
  const [currentExam, setCurrentExam] = useState<ExamId>("ielts");
  const [newExam, setNewExam] = useState<ExamId>("pte");
  const [diagnosticOn, setDiagnosticOn] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(EXAM_STORAGE_KEY);
      if (stored === "ielts" || stored === "pte") {
        setCurrentExam(stored);
        setNewExam(stored === "ielts" ? "pte" : "ielts");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const currentLabel = currentExam === "ielts" ? "IELTS Academic" : "PTE Academic";
  const newLabel = newExam === "ielts" ? "IELTS Academic" : "PTE Academic";
  const scoreLabel = newExam === "pte" ? "Score" : "Band";

  function saveAndContinue() {
    try {
      window.localStorage.setItem(EXAM_STORAGE_KEY, newExam);
    } catch {
      /* ignore */
    }
    if (diagnosticOn) {
      router.push("/onboarding/diagnostic");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <DashboardShell
      title="Second Exam Setup"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard/switch-exam"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
          aria-label="Back to switch exam"
        >
          <BackChevron />
        </Link>
      }
      headerRight={<NotificationBellButton />}
    >
      <div className="flex w-full flex-col gap-5 pb-6">
        <p className="text-sm leading-relaxed text-[#64748B] sm:text-base">
          Set up your additional exam details. This helps us personalize your
          learning plan for the new exam.
        </p>

        <section>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
            Current exam
          </p>
          <Link
            href="/dashboard"
            className="mt-2 flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:bg-[#F8FAFC] sm:p-5"
          >
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${
                currentExam === "ielts" ? "bg-[#2b5ce6]" : "bg-[#7C3AED]"
              }`}
            >
              {currentExam === "ielts" ? "IELTS" : "PTE"}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-base font-bold text-[#141B2B]">
                    {currentLabel}
                  </p>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    {currentExam === "ielts"
                      ? "Prepare for university admissions and professional registration."
                      : "Prepare for the Pearson Test of English Academic."}
                  </p>
                </div>
                <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Current
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-2.5 py-1 text-xs font-semibold text-[#6D28D9]">
                <BookMini />
                12 lessons completed
              </span>
            </div>
            <span className="text-[#CBD5E1]" aria-hidden>
              ›
            </span>
          </Link>
        </section>

        <section>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
            New exam setup
          </p>
          <div className="mt-2 flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${
                newExam === "pte" ? "bg-[#7C3AED]" : "bg-[#2b5ce6]"
              }`}
            >
              {newExam === "pte" ? "PTE" : "IELTS"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-[#141B2B]">{newLabel}</p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                Set your goals and track your progress for this exam.
              </p>
            </div>
            <span className="text-[#CBD5E1]" aria-hidden>
              ›
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold text-[#141B2B]">
            Exam-Specific Details
          </h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Please provide the details below for your second exam.
          </p>

          <div className="mt-3 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            {DETAIL_ROWS.map((row, i) => (
              <button
                key={row.id}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC] sm:px-5 ${
                  i > 0 ? "border-t border-[#F1F5F9]" : ""
                }`}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                  <row.Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#141B2B]">
                    {row.id === "previous" || row.id === "target"
                      ? row.title.replace("Score", scoreLabel)
                      : row.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#64748B] sm:text-sm">
                    {row.description}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2b5ce6]">
                  Select
                  <span aria-hidden>›</span>
                </span>
              </button>
            ))}

            <div className="flex items-center gap-3 border-t border-[#F1F5F9] px-4 py-3.5 sm:px-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                <ClockIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#141B2B]">
                  Diagnostic Test
                </p>
                <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">
                  Takes about 10 minutes. Get your starting level.
                </p>
              </div>
              <Toggle
                on={diagnosticOn}
                onChange={setDiagnosticOn}
                label="Enable diagnostic test"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center gap-3 pt-1">
          <button
            type="button"
            onClick={saveAndContinue}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6]"
          >
            Save & Continue
            <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(EXAM_STORAGE_KEY, newExam);
              } catch {
                /* ignore */
              }
              router.push("/dashboard");
            }}
            className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}

function BackChevron() {
  return (
    <svg viewBox="0 0 16 16" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path
        d="M2 2.5h3A1.2 1.2 0 0 1 6.2 3.7v5.2A1 1 0 0 0 5.2 8H2V2.5Zm8 0H7A1.2 1.2 0 0 0 5.8 3.7v5.2A1 1 0 0 1 6.8 8H10V2.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <rect
        x="4"
        y="2.5"
        width="10"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M7 6.5h4M7 9.5h4M7 12.5h2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="12"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M3 7.5h12M6 2.5v3M12 2.5v3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9 6v3.2l2 1.3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
