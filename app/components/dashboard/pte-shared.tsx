import Link from "next/link";
import type { ReactNode } from "react";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

export function PteHeaderRight({ score = 64 }: { score?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1.5 text-sm font-semibold text-[#5B5BD6]">
        Est. PTE Score: {score}
      </span>
      <NotificationBellButton />
    </div>
  );
}

export function PteTaskHeaderRight({ score = 64 }: { score?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex items-center rounded-full bg-[#EEF2FF] px-3 py-1.5 text-sm font-semibold text-[#5B5BD6]">
        PTE {score}
      </span>
      <NotificationBellButton />
    </div>
  );
}

export function masteryTone(pct: number) {
  if (pct >= 70) return { bar: "bg-[#22C55E]", text: "text-[#16A34A]" };
  if (pct >= 40) return { bar: "bg-[#F59E0B]", text: "text-[#D97706]" };
  return { bar: "bg-[#EF4444]", text: "text-[#DC2626]" };
}

export function PteProgressStrip({
  itemLabel,
  progressPct,
}: {
  itemLabel: string;
  progressPct: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-sm sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#64748B]">{itemLabel}</p>
        <div className="text-right">
          <p className="text-sm font-bold text-[#141B2B]">Part 1 Progress</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <ClockTiny />
            ~ 62 min remaining
          </p>
        </div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full bg-[#2b5ce6]"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

export function PteSideCard({
  title,
  icon,
  children,
  className = "bg-white",
  titleClass = "text-[#141B2B]",
  bodyClass = "text-[#64748B]",
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  titleClass?: string;
  bodyClass?: string;
}) {
  return (
    <section className={`rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="mb-2.5 flex items-center gap-2">
        {icon}
        <h3 className={`text-sm font-bold ${titleClass}`}>{title}</h3>
      </div>
      <div className={`text-sm leading-6 ${bodyClass}`}>{children}</div>
    </section>
  );
}

export function PteTaskNav({
  backHref = "/dashboard/pte",
  nextDisabled = true,
  nextLabel = "Next",
  nextHref,
  onNext,
}: {
  backHref?: string;
  nextDisabled?: boolean;
  nextLabel?: string;
  nextHref?: string;
  onNext?: () => void;
}) {
  const nextClass = `inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border px-4 text-sm font-semibold transition ${
    nextDisabled
      ? "cursor-not-allowed border-[#E2E8F0] bg-[#F8FAFC] text-[#CBD5E1]"
      : "border-[#E2E8F0] bg-white text-[#141B2B] hover:bg-[#F8FAFC]"
  }`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-3 py-3 shadow-sm sm:px-4">
        <Link
          href={backHref}
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
        >
          ← Back
        </Link>
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
        >
          <BookmarkIcon />
          Mark for Review
        </button>
        {nextHref && !nextDisabled ? (
          <Link href={nextHref} className={nextClass}>
            {nextLabel} →
          </Link>
        ) : (
          <button
            type="button"
            disabled={nextDisabled}
            onClick={onNext}
            className={nextClass}
          >
            {nextLabel} →
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8]">
          <ClockTiny />
          ~ 62 min remaining
        </p>
        <Link
          href="/dashboard/pte"
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3.5 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
        >
          <ExitIcon />
          End Practice
        </Link>
      </div>
    </div>
  );
}

function ClockTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.2V7l2 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4.5 2.5h7v11l-3.5-2.2L4.5 13.5v-11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M6 3.5H3.5v9H6M8.5 8H14M11.5 5.5 14 8l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PteReadingSidebar({
  timer = "01:24",
  question = "3 / 12",
  questionPct = 25,
  section = "8 / 20",
  sectionPct = 40,
  sectionLabel = "Part 2: Reading",
  tip = "Multiple choice (multiple answer) questions have negative marking.",
}: {
  timer?: string;
  question?: string;
  questionPct?: number;
  section?: string;
  sectionPct?: number;
  sectionLabel?: string;
  tip?: string;
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-3 lg:w-[17.5rem]">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full border-[3px] border-[#F59E0B] text-[#EA580C]">
            <ClockTiny />
          </span>
          <div>
            <p className="text-2xl font-bold text-[#141B2B]">{timer}</p>
            <p className="text-xs text-[#94A3B8]">min:sec</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full w-[35%] rounded-full bg-[#F59E0B]" />
        </div>
      </div>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <p className="text-xs text-[#64748B]">Question progress</p>
        <p className="mt-1 text-2xl font-bold text-[#2b5ce6]">{question}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full rounded-full bg-[#2b5ce6]" style={{ width: `${questionPct}%` }} />
        </div>
      </div>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <p className="text-xs text-[#64748B]">Section progress</p>
        <p className="mt-0.5 text-xs text-[#94A3B8]">{sectionLabel}</p>
        <p className="mt-1 text-2xl font-bold text-[#2b5ce6]">{section}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full rounded-full bg-[#2b5ce6]" style={{ width: `${sectionPct}%` }} />
        </div>
      </div>
      <div className="rounded-2xl bg-[#F5F3FF] p-4 shadow-sm">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
          💡
        </span>
        <p className="mt-2 text-sm font-bold text-[#141B2B]">Need strategy help?</p>
        <p className="mt-1 text-sm leading-5 text-[#64748B]">{tip}</p>
      </div>
    </aside>
  );
}

export function PteAudioPlayer({
  duration = "00:00 / 01:15",
  note = "Audio playing once • 1:40",
}: {
  duration?: string;
  note?: string;
}) {
  const bars = Array.from({ length: 40 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.45)));
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4 shadow-sm">
      <button
        type="button"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white"
        aria-label="Play"
      >
        <svg viewBox="0 0 16 16" className="ml-0.5 size-4" fill="currentColor" aria-hidden>
          <path d="M5 3.5v9l8-4.5-8-4.5Z" />
        </svg>
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex h-8 items-end gap-[2px]">
          {bars.map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-[#CBD5E1]" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
        <div className="relative mt-2 h-1.5 rounded-full bg-[#E2E8F0]">
          <span className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#2b5ce6]" />
        </div>
      </div>
      <p className="shrink-0 text-xs text-[#64748B]">{note || duration}</p>
    </div>
  );
}

export function PteCheckAnswer({
  note,
  label = "Check answer",
}: {
  note?: string;
  label?: string;
}) {
  return (
    <div className="space-y-2.5">
      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {label}
      </button>
      {note ? (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-[#F1F5F9] px-4 py-2.5 text-center text-xs text-[#64748B]">
          <span className="text-[#2b5ce6]">🛡</span>
          {note}
        </div>
      ) : null}
    </div>
  );
}
