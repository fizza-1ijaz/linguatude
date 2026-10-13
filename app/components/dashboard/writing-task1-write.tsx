"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { WritingTemperatureChart } from "@/app/components/dashboard/writing-temperature-chart";

const DRAFT_KEY = "linguatude_writing_task1_draft";
const MIN_WORDS = 150;

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function WritingTask1Write() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [promptOpen, setPromptOpen] = useState(true);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [showPasteBanner, setShowPasteBanner] = useState(false);
  const [pasteDetected, setPasteDetected] = useState(false);
  const [savedLabel, setSavedLabel] = useState("Saved just now");
  const [showUnderWordFooter, setShowUnderWordFooter] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const underMin = words < MIN_WORDS;

  useEffect(() => {
    try {
      const draft = window.localStorage.getItem(DRAFT_KEY);
      if (draft && draft.trim()) setShowDraftBanner(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(DRAFT_KEY, text);
        setSavedLabel("Saved just now");
      } catch {
        /* ignore */
      }
    }, 600);
    return () => window.clearTimeout(id);
  }, [text]);

  function restoreDraft() {
    try {
      const draft = window.localStorage.getItem(DRAFT_KEY);
      if (draft) setText(draft);
    } catch {
      /* ignore */
    }
    setShowDraftBanner(false);
  }

  function startFresh() {
    setText("");
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setShowDraftBanner(false);
    setPasteDetected(false);
    setShowPasteBanner(false);
  }

  function handlePaste() {
    setPasteDetected(true);
    setShowPasteBanner(true);
  }

  function attemptSubmit() {
    if (underMin) {
      setShowUnderWordFooter(true);
      return;
    }
    goToScoring();
  }

  function goToScoring() {
    try {
      window.localStorage.setItem(DRAFT_KEY, text);
    } catch {
      /* ignore */
    }
    router.push("/dashboard/writing/task1/scoring");
  }

  return (
    <DashboardShell
      title="Task 1"
      contentBgClassName="bg-white"
      mainClassName="flex-1 px-[1cm] py-4 sm:px-[1cm] lg:px-[1cm]"
      headerLeft={
        <Link
          href="/dashboard/writing/task1"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <NotificationBellButton />
      }
    >
      <div
        className={`mx-auto flex w-full max-w-5xl flex-col gap-3 ${
          showUnderWordFooter ? "pb-24" : "pb-4"
        }`}
      >
        {showDraftBanner ? (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#FDBA74] bg-[#FFFBEB] px-4 py-3">
            <span className="text-[#EA580C]">
              <WarnTriangle />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium text-[#92400E]">
              We found an unsaved draft. Restore it?
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={restoreDraft}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#FDBA74] bg-white px-3 text-sm font-semibold text-[#EA580C] transition hover:bg-[#FFF7ED]"
              >
                Restore Draft
              </button>
              <button
                type="button"
                onClick={startFresh}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
              >
                Start Fresh
              </button>
              <button
                type="button"
                onClick={() => setShowDraftBanner(false)}
                className="inline-flex size-8 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-white/70"
                aria-label="Dismiss"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        ) : null}

        {showPasteBanner ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#FDBA74] bg-[#FFFBEB] px-4 py-3">
            <span className="text-[#EA580C]">
              <WarnTriangle />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium text-[#92400E]">
              It looks like you pasted text. For best results, write in your own
              words.
            </p>
            <button
              type="button"
              onClick={() => setShowPasteBanner(false)}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-white/70"
              aria-label="Dismiss"
            >
              <CloseIcon />
            </button>
          </div>
        ) : null}

        {/* Prompt + graph card */}
        {promptOpen ? (
          <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.14)]">
            <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_7.5rem]">
              <div className="border-b border-[#E2E8F0] p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Line Graph · Academic
                </span>
                <div className="mt-4 space-y-3 text-sm leading-6 text-[#64748B]">
                  <p>
                    The graph below shows the average monthly temperatures in
                    two cities over a year.
                  </p>
                  <p className="font-bold text-[#141B2B]">
                    Summarise the information by selecting and reporting the
                    main features, and make comparisons where relevant.
                  </p>
                  <p>Write at least 150 words.</p>
                </div>
              </div>

              <div className="border-b border-[#E2E8F0] bg-[#FAFBFC] p-4 sm:p-5 lg:border-b-0 lg:border-r">
                <p className="text-center text-sm font-bold text-[#334155]">
                  Average monthly temperatures in two cities (°C)
                </p>
                <div className="mt-2 flex items-center justify-center gap-4 text-xs font-medium text-[#64748B]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#2b5ce6]" />
                    City A
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#22C55E]" />
                    City B
                  </span>
                </div>
                <WritingTemperatureChart />
              </div>

              <button
                type="button"
                onClick={() => setPromptOpen(false)}
                className="flex flex-col items-center justify-center gap-2 px-3 py-5 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#F8FAFC]"
              >
                <ChevronUpIcon />
                Tap to collapse
              </button>
            </div>
          </section>
        ) : null}

        {/* Editor */}
        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={handlePaste}
            placeholder="Start writing your response here..."
            className="min-h-[16rem] w-full resize-y bg-transparent px-5 py-4 text-sm leading-7 text-[#141B2B] outline-none placeholder:text-[#94A3B8] sm:min-h-[18rem] sm:px-6 sm:text-[0.9375rem]"
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-[#E2E8F0] px-3 py-2.5 sm:gap-3 sm:px-4">
            <button
              type="button"
              onClick={() => setPromptOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC]"
            >
              {promptOpen ? "Collapse prompt" : "Show prompt"}
              {promptOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            <span className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-semibold tabular-nums text-[#475569]">
              <span className={underMin ? "text-[#E11D48]" : "text-[#16A34A]"}>
                {words}
              </span>
              <span> / {MIN_WORDS} words</span>
            </span>

            {pasteDetected ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1.5 text-xs font-semibold text-[#92400E]">
                <WarnTriangle className="size-3.5" />
                Paste detected
              </span>
            ) : null}

            <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B]">
              {savedLabel}
              <span className="flex size-5 items-center justify-center rounded-full bg-[#22C55E] text-white">
                <CheckMini />
              </span>
            </span>
          </div>
        </section>

        {!showUnderWordFooter ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={attemptSubmit}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>

      {showUnderWordFooter ? (
        <div className="dashboard-panel-bottom border-t border-[#BFDBFE] bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-start gap-2 text-sm font-medium text-[#1E40AF]">
              <InfoRefreshIcon />
              <span>
                Your response is under 150 words ({words} written). Submitting
                now may affect your score.
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setShowUnderWordFooter(false)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#334155] bg-white px-4 text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
              >
                Keep Writing
              </button>
              <button
                type="button"
                onClick={goToScoring}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2b5ce6] px-4 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#141b2b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarnTriangle({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M10 3.5 17 16H3L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.5v3.5M10 14.2v.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M4 4l8 8M12 4 4 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 10 8 5.5 12.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path
        d="M2 5.2 4 7l4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoRefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9v4.5M10 6.5h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.2 7.2A5.2 5.2 0 0 0 8 5.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
