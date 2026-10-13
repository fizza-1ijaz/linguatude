"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  BackToProgress,
  ProgressHeaderRight,
  ProgressPageHeader,
  PteBadge,
} from "@/app/components/dashboard/progress-shared";

const WEEK_LABELS = [
  "11 weeks ago",
  "10 weeks ago",
  "9 weeks ago",
  "8 weeks ago",
  "7 weeks ago",
  "6 weeks ago",
  "5 weeks ago",
  "4 weeks ago",
  "3 weeks ago",
  "2 weeks ago",
  "Last week",
  "This week",
] as const;

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type Cell = "done" | "missed" | "today" | "future";

const HEATMAP: Cell[][] = [
  ["missed", "done", "done", "missed", "done", "done", "missed", "done", "done", "done", "done", "today"],
  ["done", "missed", "done", "done", "missed", "done", "done", "done", "missed", "done", "done", "future"],
  ["done", "done", "missed", "done", "done", "missed", "done", "done", "done", "missed", "done", "future"],
  ["missed", "done", "done", "done", "done", "done", "missed", "done", "done", "done", "missed", "future"],
  ["done", "done", "done", "missed", "done", "done", "done", "missed", "done", "done", "done", "future"],
  ["done", "missed", "done", "done", "done", "done", "done", "done", "missed", "done", "done", "future"],
  ["missed", "done", "done", "done", "missed", "done", "done", "done", "done", "missed", "done", "future"],
];

const cellClass: Record<Cell, string> = {
  done: "bg-[#2b5ce6]",
  missed: "bg-[#CBD5E1]",
  today: "border-2 border-[#2b5ce6] bg-white",
  future: "bg-[#DBEAFE]/70",
};

export function ProgressStreakCalendar() {
  return (
    <DashboardShell
      title="Streak & Calendar"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerLeft={<BackToProgress />}
      headerRight={
        <div className="flex items-center gap-2.5">
          <ProgressHeaderRight />
          <PteBadge className="hidden sm:inline-flex" />
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <ProgressPageHeader
          title="Streak & Calendar"
          subtitle="Your consistency and activity over time."
          badge={false}
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#7C3AED]"
            Icon={FlameIcon}
            value="15 days"
            valueColor="text-[#141B2B]"
            label="current streak — longest yet"
            tag="Longest yet"
            tagClass="bg-[#F3E8FF] text-[#7C3AED]"
          />
          <MetricCard
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#16A34A]"
            Icon={CalIcon}
            value={
              <>
                <span className="text-[#16A34A]">19</span>
                <span className="text-[#94A3B8]">/23</span>
              </>
            }
            label="active days"
            detail="Meaningful activity on 19 of 23 scheduled study days"
          />
          <MetricCard
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#2563EB]"
            Icon={ClockIcon}
            value={<span className="text-[#2563EB]">11h 40m</span>}
            label="study time"
            detail="Total time spent on meaningful learning"
          />
          <MetricCard
            iconBg="bg-[#FFEDD5]"
            iconColor="text-[#EA580C]"
            Icon={ListIcon}
            value={<span className="text-[#EA580C]">148</span>}
            label="items"
            detail="Completed practice items"
          />
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-base font-bold text-[#141B2B] sm:text-lg">
            Your activity — last 12 weeks
          </h3>

          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[40rem]">
              <div className="mb-2 grid grid-cols-[2.5rem_repeat(12,minmax(0,1fr))] gap-1 text-[0.5625rem] text-[#94A3B8]">
                <span />
                {WEEK_LABELS.map((w, i) => (
                  <span
                    key={w}
                    className={`truncate text-center ${
                      i === WEEK_LABELS.length - 1 ? "font-bold text-[#2b5ce6]" : ""
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </div>
              {DAY_LABELS.map((day, di) => (
                <div
                  key={day}
                  className="mb-1 grid grid-cols-[2.5rem_repeat(12,minmax(0,1fr))] gap-1"
                >
                  <span className="flex items-center text-[0.6875rem] font-medium text-[#64748B]">
                    {day}
                  </span>
                  {HEATMAP[di].map((cell, wi) => (
                    <span
                      key={`${day}-${wi}`}
                      className={`aspect-square w-full max-w-[1.75rem] justify-self-center rounded-sm ${cellClass[cell]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <Legend swatch="bg-[#2b5ce6]" title="Completed" desc="Meaningful learning completed" />
            <Legend swatch="bg-[#CBD5E1]" title="Missed" desc="Planned study day with no meaningful activity" />
            <Legend
              swatch="border-2 border-[#2b5ce6] bg-white"
              title="Today"
              desc="Current date"
            />
            <Legend swatch="bg-[#DBEAFE]" title="Future" desc="Upcoming study or rest day" />
          </div>
        </section>

        <div className="grid gap-4 rounded-2xl bg-[#F1F3FF] p-4 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] sm:gap-0 sm:p-5">
          <div className="flex items-start gap-3 sm:border-r sm:border-[#E2E8F0] sm:pr-5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
              i
            </span>
            <div>
              <p className="font-bold text-[#141B2B]">About your activity</p>
              <p className="mt-1 text-sm leading-6 text-[#64748B]">
                Active day = meaningful learning on a scheduled study day. Opening the
                app, browsing or changing settings does not count.
              </p>
            </div>
          </div>
          <p className="text-sm leading-6 text-[#64748B] sm:flex sm:items-center sm:pl-5">
            Active day and completion of your daily commitment are separate — you
            don&apos;t need to complete the full 30 minutes for a day to count as active.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function MetricCard({
  iconBg,
  iconColor,
  Icon,
  value,
  valueColor = "text-[#141B2B]",
  label,
  detail,
  tag,
  tagClass,
}: {
  iconBg: string;
  iconColor: string;
  Icon: () => ReactNode;
  value: ReactNode;
  valueColor?: string;
  label: string;
  detail?: string;
  tag?: string;
  tagClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.12)]">
      <div className="flex items-start gap-3">
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
          <Icon />
        </span>
        <div className="min-w-0">
          <p className={`text-xl font-bold leading-none ${valueColor}`}>{value}</p>
          <p className="mt-1 text-sm font-semibold text-[#141B2B]">{label}</p>
          {detail ? <p className="mt-1 text-xs leading-5 text-[#94A3B8]">{detail}</p> : null}
          {tag ? (
            <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-bold ${tagClass}`}>
              {tag}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Legend({
  swatch,
  title,
  desc,
}: {
  swatch: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 size-3.5 shrink-0 rounded-[3px] ${swatch}`} />
      <div className="min-w-0">
        <p className="text-xs font-bold text-[#141B2B]">{title}</p>
        <p className="mt-0.5 text-[0.6875rem] leading-4 text-[#94A3B8]">{desc}</p>
      </div>
    </div>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.5c1.5 2 1 3.5 1 3.5S11 5 11.5 7.2A3.6 3.6 0 1 1 4.8 8.5C5.5 5.8 7 4 8 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7h11M5.5 2.5v2M10.5 2.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3.2l2 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 3.5h8.5v10H5.2A1.2 1.2 0 0 1 4 12.3V3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.5 7h4M6.5 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
