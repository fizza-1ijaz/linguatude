"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

const ATTEMPTS = [
  "PTE Mock Test 1",
  "IELTS Practice Test 2",
  "PTE Write from Dictation — Attempt 3",
  "IELTS Speaking Practice — Attempt 1",
] as const;

const CONCERN_TYPES = [
  {
    id: "overall",
    title: "Overall score",
    description: "The total score seems incorrect",
  },
  {
    id: "speaking",
    title: "Speaking feedback",
    description: "Feedback for speaking section seems inaccurate",
  },
  {
    id: "writing",
    title: "Writing feedback",
    description: "Feedback for writing section seems inaccurate",
  },
  {
    id: "other",
    title: "Other",
    description: "Something else",
  },
] as const;

type ConcernId = (typeof CONCERN_TYPES)[number]["id"];

export function ScoringConcernForm() {
  const router = useRouter();
  const [attempt, setAttempt] = useState("");
  const [concernType, setConcernType] = useState<ConcernId>("overall");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!attempt || !details.trim()) return;
    router.push("/dashboard/account/scoring-concern/submitted");
  }

  return (
    <DashboardShell
      title="Scoring Concern Form"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard/account/help"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
          aria-label="Back to Help"
        >
          <BackChevron />
        </Link>
      }
      headerRight={<NotificationBellButton />}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 pb-6"
        noValidate
      >
        <p className="text-sm leading-relaxed text-[#64748B] sm:text-base">
          Share your concern about a recent score or feedback. We&apos;ll review
          it carefully.
        </p>

        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
            <DocBoltIcon />
          </span>
          <p className="pt-1.5 text-sm font-medium leading-relaxed text-[#1E3A8A]">
            Please provide the details below so we can look into your concern.
          </p>
        </div>

        <div>
          <label
            htmlFor="attempt-name"
            className="text-sm font-bold text-[#141B2B]"
          >
            Attempt name <span className="text-[#EF4444]">*</span>
          </label>
          <p className="mt-1 text-xs text-[#94A3B8]">
            e.g. PTE Mock Test 1, IELTS Practice Test 2
          </p>
          <div className="relative mt-2">
            <select
              id="attempt-name"
              value={attempt}
              onChange={(e) => setAttempt(e.target.value)}
              required
              className="h-12 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-10 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20"
            >
              <option value="">Select attempt</option>
              {ATTEMPTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              ▾
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-[#141B2B]">
            Concern type <span className="text-[#EF4444]">*</span>
          </p>
          <p className="mt-1 text-xs text-[#94A3B8]">
            What would you like to report?
          </p>
          <fieldset className="mt-2 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
            <legend className="sr-only">Concern type</legend>
            {CONCERN_TYPES.map((type, i) => {
              const selected = concernType === type.id;
              return (
                <label
                  key={type.id}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-3.5 transition hover:bg-[#F8FAFC] ${
                    i > 0 ? "border-t border-[#F1F5F9]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="concern-type"
                    value={type.id}
                    checked={selected}
                    onChange={() => setConcernType(type.id)}
                    className="sr-only"
                  />
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      selected
                        ? "border-[#2b5ce6]"
                        : "border-[#CBD5E1]"
                    }`}
                    aria-hidden
                  >
                    {selected ? (
                      <span className="size-2.5 rounded-full bg-[#2b5ce6]" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[#141B2B]">
                      {type.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#64748B] sm:text-sm">
                      {type.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>
        </div>

        <div>
          <label
            htmlFor="tell-us-more"
            className="text-sm font-bold text-[#141B2B]"
          >
            Tell us more <span className="text-[#EF4444]">*</span>
          </label>
          <p className="mt-1 text-xs text-[#94A3B8]">
            Please describe your concern in detail.
          </p>
          <div className="relative mt-2">
            <textarea
              id="tell-us-more"
              value={details}
              onChange={(e) => setDetails(e.target.value.slice(0, 500))}
              placeholder="Type here..."
              rows={6}
              required
              className="w-full resize-none rounded-xl border border-[#E2E8F0] px-4 py-3 pb-8 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-[#94A3B8]">
              {details.length}/500
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6]"
        >
          <SendIcon />
          Submit
        </button>
      </form>
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

function DocBoltIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="4"
        y="2.5"
        width="10"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7 7h4M7 10h4M7 13h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m14.5 11 1.5 2.5h-2l1.5 2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 9.5 15 3.5 10.5 15 9 10 3 9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
