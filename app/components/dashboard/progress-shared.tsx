import Link from "next/link";
import type { ReactNode } from "react";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

/** PTE score scale helpers (10–90) */
export function scorePct(score: number, min = 10, max = 90) {
  return Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
}

export function PteBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1.5 text-sm font-semibold text-[#2b5ce6] ${className}`}
    >
      <DocTiny />
      PTE 64
    </span>
  );
}

export function ProgressHeaderRight() {
  return (
    <div className="flex items-center gap-2.5">
      <NotificationBellButton />
    </div>
  );
}

export function ProgressPageHeader({
  title,
  subtitle,
  badge = true,
}: {
  title: string;
  subtitle: string;
  badge?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl font-bold tracking-tight text-[#141B2B] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-[#64748B] sm:text-base">{subtitle}</p>
      </div>
      {badge ? <PteBadge /> : null}
    </div>
  );
}

export function ScoreTrack({
  score,
  color,
  ticks = [10, 45, 65, 85, 90],
  showTarget = true,
  target = 85,
}: {
  score: number;
  color: string;
  ticks?: number[];
  showTarget?: boolean;
  target?: number;
}) {
  const fill = scorePct(score);
  const targetLeft = scorePct(target);
  return (
    <div className="min-w-0 flex-1">
      <div className="relative h-3.5 rounded-full bg-[#E2E8F0]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${fill}%`, background: color }}
        />
        {showTarget ? (
          <span
            className="absolute top-1/2 h-5 w-0.5 -translate-y-1/2 bg-[#EF4444]"
            style={{ left: `${targetLeft}%` }}
            aria-hidden
          />
        ) : null}
      </div>
      <div className="relative mt-1.5 h-4 text-[0.625rem] text-[#94A3B8]">
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute -translate-x-1/2"
            style={{ left: `${scorePct(t)}%` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function InfoBanner({
  title,
  children,
  className = "bg-[#EEF2FF]",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl px-4 py-3.5 ${className}`}>
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
        i
      </span>
      <div className="min-w-0 text-sm">
        {title ? <p className="font-bold text-[#141B2B]">{title}</p> : null}
        <div className={`text-[#64748B] ${title ? "mt-0.5" : ""}`}>{children}</div>
      </div>
    </div>
  );
}

function DocTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M4 2.5h4.5L11 5v6.5A1 1 0 0 1 10 12.5H4A1 1 0 0 1 3 11.5v-8A1 1 0 0 1 4 2.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8.5 2.6V5H11" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function BackToProgress() {
  return (
    <Link
      href="/dashboard/progress"
      className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
      aria-label="Back to progress"
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
  );
}
