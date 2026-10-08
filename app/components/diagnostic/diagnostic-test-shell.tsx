"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { ONBOARDING_ROUTES } from "@/app/components/onboarding/onboarding-state";

export type DiagnosticSkill = "listening" | "reading" | "writing" | "speaking";

export const DIAGNOSTIC_SKILL_ROUTES: Record<DiagnosticSkill, string> = {
  listening: ONBOARDING_ROUTES.diagnosticTest,
  reading: ONBOARDING_ROUTES.diagnosticReading,
  writing: ONBOARDING_ROUTES.diagnosticWriting,
  speaking: ONBOARDING_ROUTES.diagnosticSpeaking,
};

const SKILL_TABS: {
  id: DiagnosticSkill;
  label: string;
  Icon: (props: { className?: string }) => ReactNode;
}[] = [
  { id: "listening", label: "Listening", Icon: HeadphonesIcon },
  { id: "reading", label: "Reading", Icon: BookIcon },
  { id: "writing", label: "Writing", Icon: PenIcon },
  { id: "speaking", label: "Speaking", Icon: MicIcon },
];

export function formatDiagnosticTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function DiagnosticTestShell({
  activeSkill,
  sectionLeft,
  canSubmit,
  onSubmit,
  submitLabel = "Submit section",
  footerMessage,
  footer,
  tabsInteractive = true,
  showTimer = true,
  children,
}: {
  activeSkill: DiagnosticSkill;
  sectionLeft: number;
  canSubmit: boolean;
  onSubmit?: () => void;
  submitLabel?: string;
  footerMessage?: string;
  /** Replaces the default submit footer entirely when provided */
  footer?: ReactNode;
  tabsInteractive?: boolean;
  showTimer?: boolean;
  children: ReactNode;
}) {
  const message =
    footerMessage ??
    "Switch freely between Listening, Reading, Writing, and Speaking while you review the diagnostic.";

  return (
    <div className="diagnostic-test min-h-dvh bg-[#F8F9FB] text-[#141B2B]">
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/onboarding/logo-cap.svg"
              alt=""
              width={28}
              height={28}
              className="size-7"
              priority
            />
            <span className="text-base font-bold text-[#2b5ce6]">Linguatude</span>
            <span className="hidden h-5 w-px bg-[#D1D5DB] sm:block" aria-hidden />
            <span className="hidden truncate text-sm font-medium text-[#6B7280] sm:inline">
              IELTS Master Diagnostics
            </span>
          </div>

          <nav className="order-3 flex w-full justify-center gap-1 sm:order-none sm:w-auto sm:gap-1.5">
            {SKILL_TABS.map((tab) => {
              const active = tab.id === activeSkill;
              const className = `inline-flex items-center gap-1.5 border-b-2 px-2.5 py-2 text-sm font-semibold transition sm:px-3 ${
                active
                  ? "border-[#2b5ce6] text-[#2b5ce6]"
                  : "border-transparent text-[#9CA3AF] hover:text-[#64748B]"
              }`;
              const content = (
                <>
                  <tab.Icon className="size-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </>
              );
              if (!tabsInteractive) {
                return (
                  <span key={tab.id} className={className} aria-current={active ? "page" : undefined}>
                    {content}
                  </span>
                );
              }
              return (
                <Link
                  key={tab.id}
                  href={DIAGNOSTIC_SKILL_ROUTES[tab.id]}
                  className={className}
                >
                  {content}
                </Link>
              );
            })}
          </nav>

          {showTimer ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-sm font-semibold text-[#2b5ce6]">
              <ClockIcon className="size-4" />
              <span className="tabular-nums">
                Time remaining: {formatDiagnosticTime(sectionLeft)}
              </span>
            </div>
          ) : (
            <div className="hidden sm:block sm:w-[11.5rem]" aria-hidden />
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
        {children}
      </div>

      {footer ?? (
        <footer className="sticky bottom-0 z-30 border-t border-[#E5E7EB] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex max-w-3xl items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-2.5 text-sm text-[#1E3A8A] sm:px-4">
              <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" />
              <p>{message}</p>
            </div>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={onSubmit}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-5 text-base font-semibold text-white transition hover:bg-[#244fe6] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              {!canSubmit && submitLabel.toLowerCase().includes("wait") ? (
                <SpinnerIcon />
              ) : null}
              {submitLabel}
              {canSubmit ? (
                <Image
                  src="/onboarding/icon-arrow-sm.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              ) : null}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

export function useHideScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hide-scrollbar");
    return () => root.classList.remove("hide-scrollbar");
  }, []);
}

function ClockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4.5l3 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4 animate-spin text-white"
      fill="none"
      aria-hidden
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
      <path
        d="M17 10a7 7 0 0 0-7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeadphonesIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13v3.5A2.5 2.5 0 0 0 6.5 19H8v-6H6.5A2.5 2.5 0 0 0 4 15.5V13a8 8 0 1 1 16 0v2.5A2.5 2.5 0 0 1 17.5 18H16v-5h1.5A2.5 2.5 0 0 1 20 15.5V13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function PenIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l4.2-1.1L19 8.1 15.9 5 5.1 15.8 4 20z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="3"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
