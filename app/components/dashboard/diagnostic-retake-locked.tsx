"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

const SECTION_SCORES = [
  { name: "Listening", score: "62 / 90", Icon: HeadphonesIcon, iconBg: "bg-[#DBEAFE] text-[#2b5ce6]" },
  { name: "Reading", score: "56 / 90", Icon: BookIcon, iconBg: "bg-[#EDE9FE] text-[#7C3AED]" },
  { name: "Writing", score: "54 / 90", Icon: PencilIcon, iconBg: "bg-[#CCFBF1] text-[#0D9488]" },
  { name: "Speaking", score: "58 / 90", Icon: MicIcon, iconBg: "bg-[#FCE7F3] text-[#DB2777]" },
] as const;

export function DiagnosticRetakeLocked() {
  return (
    <DashboardShell
      title="Diagnostic Test"
      subtitle="Takes about 10 minutes. Assess your current level and get personalized recommendations."
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
          aria-label="Back to home"
        >
          <svg viewBox="0 0 16 16" className="size-5" fill="none" aria-hidden>
            <path
              d="M10 3.5 5.5 8 10 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      }
      headerRight={<NotificationBellButton />}
    >
      <div className="flex w-full flex-col gap-5 pb-6">
        {/* Locked retake card */}
        <section className="overflow-hidden rounded-2xl border border-[#BFDBFE] bg-[linear-gradient(160deg,#EFF6FF_0%,#F8FBFF_100%)] shadow-sm">
          <div className="flex items-start gap-3 p-4 sm:p-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <LockIcon />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-[#141B2B]">
                Diagnostic Retake Locked
              </h3>
              <p className="mt-1 text-sm text-[#64748B]">
                You can retake the diagnostic on
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                <CalMini />
                14 Apr 2027
              </span>
              <p className="mt-2 text-xs text-[#64748B]">
                (once every 30 days per exam).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 border-t border-[#BFDBFE]/70 px-4 py-3 sm:px-5">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <p className="text-sm text-[#334155]">
              Your earlier results stay visible below.
            </p>
          </div>
        </section>

        {/* Previous results */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-extrabold text-white">
              PTE
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-base font-bold text-[#141B2B]">
                    PTE Academic
                  </p>
                  <p className="text-sm text-[#64748B]">Diagnostic Test</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                  <CheckMini />
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat
              Icon={CalIcon}
              label="Date taken"
              value="10 Mar 2027"
              tone="text-[#2b5ce6]"
            />
            <Stat
              Icon={ScoreIcon}
              label="Overall score"
              value="58 / 90"
              tone="text-[#7C3AED]"
            />
            <Stat
              Icon={LevelIcon}
              label="Level"
              value="B1 (Intermediate)"
              tone="text-[#0D9488]"
            />
          </div>

          <h4 className="mt-5 text-sm font-bold text-[#141B2B]">
            Section scores
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {SECTION_SCORES.map((section) => (
              <div
                key={section.name}
                className="flex flex-col items-center rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] px-3 py-3 text-center"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full ${section.iconBg}`}
                >
                  <section.Icon />
                </span>
                <p className="mt-2 text-xs text-[#64748B]">{section.name}</p>
                <p className="mt-0.5 text-sm font-bold text-[#141B2B]">
                  {section.score}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
            Estimated by Linguatude from your practice performance. Not an
            official test result.
          </p>

          <Link
            href="/dashboard/pte/score-report"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#DBEAFE]"
          >
            <EyeIcon />
            View detailed results
            <span aria-hidden>›</span>
          </Link>
        </section>
      </div>
    </DashboardShell>
  );
}

function Stat({
  Icon,
  label,
  value,
  tone,
}: {
  Icon: () => React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] px-3 py-3">
      <div className={`flex items-center gap-1.5 ${tone}`}>
        <Icon />
        <p className="text-xs text-[#64748B]">{label}</p>
      </div>
      <p className="mt-1 text-sm font-bold text-[#141B2B]">{value}</p>
    </div>
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
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 5h9M4 1.5v2M8 1.5v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path d="m2.5 6.5 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 6h10M5 1.75v2M9 1.75v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ScoreIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="2.5" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 5.5h5M4.5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M3 10V7.5M6 10V5M9 10V6.5M12 10V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 10v2a1.5 1.5 0 0 0 1.5 1.5h1V10H5A1.5 1.5 0 0 0 3.5 10Zm11 0v2a1.5 1.5 0 0 1-1.5 1.5h-1V10H13a1.5 1.5 0 0 1 1.5 1.5V10A5.5 5.5 0 1 0 3.5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 4h4A1.5 1.5 0 0 1 9 5.5v8A1.2 1.2 0 0 0 7.8 12.3H3.5V4Zm11 0H10.5A1.5 1.5 0 0 0 9 5.5v8A1.2 1.2 0 0 1 10.2 12.3h4.3V4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M11.5 3.5 14.5 6.5 7 14H4v-3L11.5 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <rect x="6.5" y="2.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 8.5a4.5 4.5 0 0 0 9 0M9 13v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
