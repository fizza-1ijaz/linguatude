"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { DailyGoalCompleteModal } from "@/app/components/dashboard/daily-goal-complete-modal";

const STORAGE_KEY = "linguatude_daily_goal_modal_dismissed";

const LESSONS = [
  {
    skill: "WRITING",
    title: "Writing Task 1",
    minutes: "10 MIN",
    level: "Intermediate",
    status: "start" as const,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "#2b5ce6",
    Icon: PencilIcon,
  },
  {
    skill: "READING",
    title: "Scan & Skim",
    minutes: "10 MIN",
    level: "Intermediate",
    status: "next" as const,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "#16A34A",
    Icon: BookLessonIcon,
  },
  {
    skill: "LISTENING",
    title: "Note-taking",
    minutes: "10 MIN",
    level: "Intermediate",
    status: "next" as const,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "#7C3AED",
    Icon: HeadphoneIcon,
  },
] as const;

export function DashboardHome() {
  const [goalModalOpen, setGoalModalOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = window.sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) setGoalModalOpen(true);
    } catch {
      setGoalModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!goalModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [goalModalOpen]);

  function dismissGoalModal() {
    setGoalModalOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <DashboardShell
        title="Home"
        headerRight={
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard/streak"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-2.5 py-1.5 text-[13px] font-semibold text-[#EA580C] ring-1 ring-[#FED7AA]/80"
            >
              <FlameIcon className="size-3.5 text-[#F97316]" />
              7 Day Streak
            </Link>
            <button
              type="button"
              className="relative inline-flex size-9 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm ring-1 ring-[#E2E8F0]"
              aria-label="Notifications"
            >
              <BellIcon />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
            </button>
          </div>
        }
      >
        <div className="mx-auto max-w-6xl space-y-4 lg:space-y-5">
          {/* Good morning card */}
          <section className="rounded-2xl border border-[#E8ECF4] bg-[#F8FAFF] p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-[1.625rem]">
                  Good morning, Alex
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-[#6B7280] sm:text-sm">
                  You&apos;re on your way to achieving your goals.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-1.5 text-[12px] font-medium text-[#2E7D32] sm:text-[13px]">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-[#2E7D32]"
                    aria-hidden
                  />
                  No test date set yet • Keep going at your own pace
                </p>
                <div className="mt-4">
                  <Link
                    href="/onboarding/diagnostic/plan"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] px-4 text-[13px] font-semibold text-white transition hover:bg-[#244FE6] sm:h-11 sm:text-sm"
                  >
                    View your study plan
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4 self-start sm:self-center">
                <div className="text-right">
                  <p className="text-[12px] font-medium text-[#6B7280]">
                    Daily Goal
                  </p>
                  <p className="text-lg font-bold text-[#0F172A] sm:text-xl">
                    30 min
                  </p>
                </div>
                <div className="relative flex size-[5.25rem] items-center justify-center sm:size-[5.75rem]">
                  <svg
                    viewBox="0 0 88 88"
                    className="absolute inset-0 size-full -rotate-90"
                    aria-hidden
                  >
                    <circle
                      cx="44"
                      cy="44"
                      r="36"
                      fill="none"
                      stroke="#DBEAFE"
                      strokeWidth="8"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="36"
                      fill="none"
                      stroke="#2b5ce6"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 36 * 0.85} ${2 * Math.PI * 36}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="relative text-[#2b5ce6]">
                    <FlameIcon className="size-7 sm:size-8" />
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-5 xl:grid-cols-[minmax(0,1fr)_21rem]">
            {/* Left: lessons + AI + Diagnostic */}
            <div className="min-w-0 space-y-4">
              <section>
                <h3 className="text-[15px] font-bold text-[#0F172A] sm:text-base">
                  Today&apos;s lessons
                </h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {LESSONS.map((lesson) => {
                    const Icon = lesson.Icon;
                    const isStart = lesson.status === "start";
                    return (
                      <li key={lesson.title}>
                        <div
                          className={`flex items-center gap-3 rounded-2xl border bg-white p-3.5 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.2)] sm:gap-4 sm:p-4 ${
                            isStart
                              ? "border-[#E2E8F0] border-l-[3px] border-l-[#2b5ce6]"
                              : "border-[#E2E8F0]"
                          }`}
                        >
                          <span
                            className={`flex size-11 shrink-0 items-center justify-center rounded-full sm:size-12 ${lesson.iconBg}`}
                          >
                            <Icon color={lesson.iconColor} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
                                {lesson.skill} • {lesson.minutes}
                              </span>
                              <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[0.6875rem] font-semibold text-[#2b5ce6]">
                                {lesson.level}
                              </span>
                            </div>
                            <p className="mt-1 text-[15px] font-bold text-[#0F172A] sm:text-base">
                              {lesson.title}
                            </p>
                          </div>
                          {isStart ? (
                            <Link
                              href="/dashboard/writing/task1"
                              className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-[#2b5ce6] px-4 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
                            >
                              Start
                            </Link>
                          ) : (
                            <span className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] px-3.5 text-sm font-semibold text-[#64748B]">
                              Up next
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="relative overflow-hidden rounded-2xl border border-[#FDE68A]/60 bg-[#FEFCE8] p-4 sm:p-5">
                <LightbulbWatermark />
                <div className="relative flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#FFEDD5] text-[#F59E0B]">
                    <BulbIcon />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#D97706]">
                    AI Insight
                  </p>
                </div>
                <p className="relative mt-2.5 max-w-xl text-[13px] leading-5 text-[#44403C] sm:text-sm sm:leading-6">
                  Your Writing improved 0.5 bands this week. Focus on coherence
                  today.
                </p>
                <Link
                  href="/dashboard/streak"
                  className="relative mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#2b5ce6] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#244FE6]"
                >
                  See full progress →
                </Link>
              </section>

              <section className="rounded-2xl border border-[#E8ECF4] bg-white p-4 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.2)] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#2b5ce6] text-white">
                      <BoltIcon />
                    </span>
                    <h3 className="text-[15px] font-bold text-[#0F172A]">
                      Diagnostic test
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#15803D]">
                    Free
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-5 text-[#6B7280]">
                  Take a 10-minute diagnostic to get your starting point and
                  personalised feedback.
                </p>
                <Link
                  href="/onboarding/diagnostic"
                  className="mt-4 inline-flex text-[13px] font-semibold text-[#2b5ce6] transition hover:underline"
                >
                  Take diagnostic →
                </Link>
              </section>
            </div>

            {/* Right: stats + Full Mock + Quick practice */}
            <aside className="space-y-4">
              <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)]">
                <StatCell
                  icon={<FlameIcon className="size-4 text-[#F97316]" />}
                  iconBg="bg-[#FFF7ED]"
                  value="7"
                  label="STREAK"
                />
                <StatCell
                  icon={<StarIcon />}
                  iconBg="bg-[#EEF2FF]"
                  value="12"
                  label="LEVEL"
                  border
                />
                <StatCell
                  icon={<TimerIcon />}
                  iconBg="bg-[#ECFDF5]"
                  value="04:22:10"
                  label="NEXT GOAL"
                  compact
                />
              </div>

              <section>
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="text-[#F59E0B]" aria-hidden>
                    <StarMini />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#EA580C]">
                    Recommended Today
                  </p>
                </div>
                <div className="rounded-2xl border border-[#F5E6D3] bg-[#FFFBF5] p-4 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.12)] sm:p-5">
                  <h3 className="text-[15px] font-bold text-[#0F172A]">
                    Full Mock Tests
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-5 text-[#57534E]">
                    Test your skills with a complete mock experience. Available
                    with Premium
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-full border border-[#F97316] bg-white text-[13px] font-semibold text-[#EA580C] transition hover:bg-[#FFF7ED]"
                  >
                    Upgrade to Premium →
                  </Link>
                </div>
              </section>

              <section className="rounded-2xl bg-[#EFF6FF] p-4 sm:p-5">
                <h3 className="text-[15px] font-bold text-[#0F172A]">
                  Quick practice
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <QuickTile
                    href="/dashboard/speak"
                    label="Practice Speaking"
                    Icon={MicQuickIcon}
                  />
                  <QuickTile
                    href="/dashboard/writing"
                    label="Write an Essay"
                    Icon={DocQuickIcon}
                  />
                  <QuickTile
                    href="/onboarding/diagnostic"
                    label="Take a Mock Test"
                    Icon={MockQuickIcon}
                    locked
                  />
                  <QuickTile
                    href="/dashboard/streak"
                    label="My Progress"
                    Icon={ChartQuickIcon}
                  />
                </div>
              </section>
            </aside>
          </div>
        </div>
      </DashboardShell>

      <DailyGoalCompleteModal
        open={goalModalOpen}
        onKeepGoing={dismissGoalModal}
        onDone={dismissGoalModal}
      />
    </>
  );
}

function StatCell({
  icon,
  iconBg,
  value,
  label,
  border,
  compact,
}: {
  icon: ReactNode;
  iconBg: string;
  value: string;
  label: string;
  border?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-2 py-4 text-center ${
        border ? "border-x border-[#E2E8F0]" : ""
      }`}
    >
      <span
        className={`mb-2 flex size-8 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </span>
      <p
        className={`font-bold tabular-nums text-[#0F172A] ${
          compact ? "text-sm" : "text-xl"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
        {label}
      </p>
    </div>
  );
}

function QuickTile({
  href,
  label,
  Icon,
  locked,
}: {
  href: string;
  label: string;
  Icon: () => ReactNode;
  locked?: boolean;
}) {
  const className = `relative flex flex-col items-center gap-2 rounded-xl px-2 py-3.5 text-center shadow-sm ring-1 transition ${
    locked
      ? "cursor-default bg-[#F1F5F9] ring-[#E2E8F0] opacity-80"
      : "bg-white ring-[#E2E8F0]/80 hover:ring-[#BFDBFE]"
  }`;

  const content = (
    <>
      <span
        className={`relative flex size-9 items-center justify-center rounded-full ${
          locked ? "bg-[#E2E8F0] text-[#94A3B8]" : "bg-[#DBEAFE] text-[#2b5ce6]"
        }`}
      >
        <Icon />
        {locked ? (
          <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-[#94A3B8] text-white">
            <LockMini />
          </span>
        ) : null}
      </span>
      <span
        className={`text-[12px] font-semibold leading-snug ${
          locked ? "text-[#94A3B8]" : "text-[#0F172A]"
        }`}
      >
        {label}
      </span>
    </>
  );

  if (locked) {
    return (
      <span className={className} aria-disabled>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.2c0 .6-.2 1.2-.6 1.7L3.8 12.5c-.5.6-.1 1.5.7 1.5h11c.8 0 1.2-.9.7-1.5l-1.1-1.6c-.4-.5-.6-1.1-.6-1.7V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 14.5a1.8 1.8 0 0 0 3.6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PencilIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="m4 16 1.2-4.2L13.5 3.5l3 3L8.2 14.8 4 16Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookLessonIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 4.5A2 2 0 0 1 6 2.5h10v13H6a2 2 0 0 0-2 2v-13Z"
        stroke={color}
        strokeWidth="1.6"
      />
      <path d="M4 15.5h12" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function HeadphoneIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M3.5 10.5v2.5A2 2 0 0 0 5.5 15H7v-4.5H5.5A2 2 0 0 0 3.5 13v-2.5a6.5 6.5 0 1 1 13 0V13a2 2 0 0 1-2 2H13V10.5h1.5a2 2 0 0 1 2 2.5"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M6 12h4M6.5 14h3M8 2a4 4 0 0 0-2.3 7.2c.4.3.7.8.7 1.3V11h3v-.5c0-.5.3-1 .7-1.3A4 4 0 0 0 8 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M9 1.5 3.5 9H7l-.5 5.5L13 7H9.5L9 1.5Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="#2b5ce6" aria-hidden>
      <path d="m8 1.5 1.7 3.5 3.8.6-2.7 2.7.6 3.8L8 10.3 4.6 12.1l.6-3.8L2.5 5.6l3.8-.6L8 1.5Z" />
    </svg>
  );
}

function StarMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <path d="m6 1 1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4L6 1Z" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="9" r="5.25" stroke="#16A34A" strokeWidth="1.5" />
      <path
        d="M8 9V6.2M6 2.5h4"
        stroke="#16A34A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LightbulbWatermark() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-2 -top-2 size-32 text-[#FDE68A] opacity-35"
      fill="none"
      aria-hidden
    >
      <path
        d="M45 85h30M50 95h20M60 20a25 25 0 0 0-14.5 45.2c2.6 2 4.5 5.1 4.5 8.5V80h20v-6.3c0-3.4 1.9-6.5 4.5-8.5A25 25 0 0 0 60 20Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M6 2.5h6l3.5 3.5V17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2.5v3.5h3.5M7.5 10h5M7.5 13h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MockQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect x="3" y="4" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="2.5" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11.5 7.5v1.2M11.5 10h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 14.5 7 10l3 3 5.5-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.5h3v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2" fill="none" aria-hidden>
      <rect x="2" y="4.5" width="6" height="4" rx="0.8" fill="currentColor" />
      <path
        d="M3.2 4.5V3.2a1.8 1.8 0 0 1 3.6 0v1.3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
