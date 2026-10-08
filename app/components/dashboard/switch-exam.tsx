"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

type ExamId = "academic" | "ukvi";

const EXAMS = [
  {
    id: "academic" as const,
    title: "IELTS Academic",
    description:
      "Prepare for the IELTS Academic test for university admissions and professional registration.",
    lessons: 12,
    progress: 40,
    tone: "blue" as const,
    current: true,
  },
  {
    id: "ukvi" as const,
    title: "IELTS UKVI",
    description:
      "Prepare for the IELTS UKVI test for visa and immigration purposes in the UK.",
    lessons: 3,
    progress: 12,
    tone: "green" as const,
    current: false,
  },
] as const;

export function SwitchExam() {
  const router = useRouter();
  const [selected, setSelected] = useState<ExamId>("ukvi");
  const target = EXAMS.find((e) => e.id === selected)!;
  const current = EXAMS.find((e) => e.current)!;
  const isSwitching = selected !== current.id;

  return (
    <DashboardShell
      title="Switch exam"
      subtitle="Choose a different exam type. Your progress in each exam is saved separately."
      headerLeft={
        <Link
          href="/dashboard"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to home"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path
              d="M10 3.5 5.5 8 10 12.5"
              stroke="#141b2b"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      }
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4">
          {EXAMS.map((exam) => {
            const isSelected = selected === exam.id;
            const isBlue = exam.tone === "blue";
            return (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelected(exam.id)}
                className={`relative w-full rounded-2xl border p-5 text-left shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] transition sm:p-6 ${
                  isBlue
                    ? "border-[#BFDBFE] bg-[#EFF6FF]"
                    : isSelected
                      ? "border-[#2b5ce6] bg-[#F0FDF4]"
                      : "border-[#BBF7D0] bg-[#F0FDF4]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    {isBlue ? (
                      <Image
                        src="/onboarding/icon-academic.svg"
                        alt=""
                        width={28}
                        height={28}
                        className="size-7"
                      />
                    ) : (
                      <ShieldCheckIcon />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                        {exam.title}
                      </h2>
                      {exam.current ? (
                        <span className="shrink-0 rounded-full bg-[#2b5ce6] px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                          Current
                        </span>
                      ) : (
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            isSelected
                              ? "border-[#2b5ce6] bg-[#2b5ce6]"
                              : "border-[#CBD5E1] bg-white"
                          }`}
                          aria-hidden
                        >
                          {isSelected ? (
                            <span className="size-1.5 rounded-full bg-white" />
                          ) : null}
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                      {exam.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-semibold ${
                          isBlue ? "text-[#2b5ce6]" : "text-[#16A34A]"
                        }`}
                      >
                        <BookMini color={isBlue ? "#2b5ce6" : "#16A34A"} />
                        {exam.lessons} lessons completed
                      </span>
                      <div
                        className={`h-2 min-w-0 flex-1 overflow-hidden rounded-full ${
                          isBlue ? "bg-[#DBEAFE]" : "bg-[#DCFCE7]"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            isBlue ? "bg-[#2b5ce6]" : "bg-[#22C55E]"
                          }`}
                          style={{ width: `${exam.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Coming soon */}
          <div className="relative w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <LockIcon />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                    More exams coming soon
                  </h2>
                  <span className="shrink-0 rounded-full bg-[#E2E8F0] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#64748B]">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                  We&apos;re working on more exam types to support your journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {isSwitching ? (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5 sm:px-5">
            <InfoIcon />
            <p className="text-sm leading-6 text-[#1E3A8A]">
              Switching to {target.title}. Your {current.title} progress is
              saved and waiting for you.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={!isSwitching}
            onClick={() => router.push("/dashboard")}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-base font-semibold text-white transition hover:bg-[#244FE6] disabled:cursor-not-allowed disabled:bg-[#93C5FD]"
          >
            Switch to {target.title}
          </button>
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
          >
            Cancel
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 28 28" className="size-7" fill="none" aria-hidden>
      <path
        d="M14 3.5 5.5 7v6.2c0 5.1 3.5 9.8 8.5 11.3 5-1.5 8.5-6.2 8.5-11.3V7L14 3.5Z"
        fill="#DCFCE7"
        stroke="#16A34A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m10.5 14 2.4 2.4 4.6-4.8"
        stroke="#16A34A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookMini({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M2.5 3h4A1.5 1.5 0 0 1 8 4.5v6A1.2 1.2 0 0 0 6.8 9.3H2.5V3ZM11.5 3H7.5A1.5 1.5 0 0 0 6 4.5v6A1.2 1.2 0 0 1 7.2 9.3h4.3V3Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <rect
        x="6"
        y="11"
        width="12"
        height="9"
        rx="2"
        stroke="#94A3B8"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11"
        stroke="#94A3B8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="8" stroke="#2b5ce6" strokeWidth="1.6" />
      <path
        d="M10 9v4.5M10 6.5h.01"
        stroke="#2b5ce6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
