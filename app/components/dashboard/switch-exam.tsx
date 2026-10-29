"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DashboardShell,
  EXAM_STORAGE_KEY,
} from "@/app/components/dashboard/dashboard-shell";

type ExamId = "ielts" | "pte";

export function SwitchExam() {
  const router = useRouter();
  const [currentExam, setCurrentExam] = useState<ExamId>("ielts");
  const [selected, setSelected] = useState<ExamId>("pte");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(EXAM_STORAGE_KEY);
      if (stored === "ielts" || stored === "pte") {
        setCurrentExam(stored);
        setSelected(stored === "ielts" ? "pte" : "ielts");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const isSwitching = selected !== currentExam;
  const targetLabel =
    selected === "ielts" ? "IELTS" : "PTE Academic";
  const currentLabel =
    currentExam === "ielts" ? "IELTS" : "PTE Academic";

  function confirmSwitch() {
    // First visit to the other exam → exam-specific setup (previous/target/date/diagnostic)
    router.push("/dashboard/switch-exam/setup");
  }

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
          {/* IELTS */}
          <button
            type="button"
            onClick={() => setSelected("ielts")}
            className={`relative w-full overflow-hidden rounded-2xl border text-left shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] transition ${
              selected === "ielts"
                ? "border-[#2b5ce6] bg-[#EFF6FF]"
                : "border-[#BFDBFE] bg-[#EFF6FF]"
            }`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Image
                    src="/onboarding/icon-academic.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="size-7"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                      IELTS
                    </h2>
                    {currentExam === "ielts" ? (
                      <span className="shrink-0 rounded-full bg-[#2b5ce6] px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                        Current
                      </span>
                    ) : (
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected === "ielts"
                            ? "border-[#2b5ce6] bg-[#2b5ce6]"
                            : "border-[#CBD5E1] bg-white"
                        }`}
                        aria-hidden
                      >
                        {selected === "ielts" ? (
                          <span className="size-1.5 rounded-full bg-white" />
                        ) : null}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                    Prepare for the IELTS Academic test for university admissions
                    and professional registration.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#BFDBFE]/80 bg-[#E8F0FE] px-5 py-3 sm:px-6">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2b5ce6]">
                <BookMini color="#2b5ce6" />
                12 lessons completed
              </span>
              <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#DBEAFE]">
                <div
                  className="h-full rounded-full bg-[#2b5ce6]"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
          </button>

          {/* PTE Academic */}
          <button
            type="button"
            onClick={() => setSelected("pte")}
            className={`relative w-full overflow-hidden rounded-2xl border text-left shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] transition ${
              selected === "pte"
                ? "border-[#2b5ce6] bg-[#F0FDF4]"
                : "border-[#BBF7D0] bg-[#F0FDF4]"
            }`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <ShieldCheckIcon />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                      PTE Academic
                    </h2>
                    {currentExam === "pte" ? (
                      <span className="shrink-0 rounded-full bg-[#2b5ce6] px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                        Current
                      </span>
                    ) : (
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected === "pte"
                            ? "border-[#2b5ce6] bg-[#2b5ce6]"
                            : "border-[#CBD5E1] bg-white"
                        }`}
                        aria-hidden
                      >
                        {selected === "pte" ? (
                          <span className="size-1.5 rounded-full bg-white" />
                        ) : null}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                    Prepare for the Pearson Test of English Academic for study
                    abroad and immigration.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#BBF7D0]/80 bg-[#E8F8EE] px-5 py-3 sm:px-6">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                <BookMini color="#16A34A" />
                3 lessons completed
              </span>
              <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#DCFCE7]">
                <div
                  className="h-full rounded-full bg-[#22C55E]"
                  style={{ width: "12%" }}
                />
              </div>
            </div>
          </button>

          {/* Cambridge and TOEFL — coming soon */}
          <div className="relative w-full rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9]">
                <LockIcon />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                    Cambridge and TOEFL are coming soon
                  </h2>
                  <span className="shrink-0 rounded-full bg-[#E2E8F0] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#64748B]">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
                  Join the waitlist and we&apos;ll let you know when these exams
                  are ready.
                </p>
                <Link
                  href="/waitlist"
                  className="mt-3 inline-flex text-sm font-semibold text-[#2b5ce6] transition hover:underline"
                >
                  Join the waitlist →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isSwitching ? (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5 sm:px-5">
            <InfoIcon />
            <p className="text-sm leading-6 text-[#1E3A8A]">
              Switching to {targetLabel}. Your {currentLabel} progress is saved
              and waiting for you.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={!isSwitching}
            onClick={confirmSwitch}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-base font-semibold text-white transition hover:bg-[#244FE6] disabled:cursor-not-allowed disabled:bg-[#93C5FD]"
          >
            Switch to {targetLabel}
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
