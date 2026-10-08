"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

const QUICK = [
  { label: "Practice Speaking", Icon: MicQuickIcon, href: "/dashboard/speak" },
  { label: "Write an Essay", Icon: DocQuickIcon, href: "/#writing" },
  {
    label: "Take a Mock Test",
    Icon: MockQuickIcon,
    href: "/onboarding/diagnostic",
    badge: "2",
  },
  { label: "My Progress", Icon: ChartQuickIcon, href: "/dashboard/streak" },
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
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/streak"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1.5 text-sm font-semibold text-[#EA580C] ring-1 ring-[#FED7AA]/80"
          >
            <FlameIcon className="size-4 text-[#F97316]" />
            7 Day Streak
          </Link>
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm ring-1 ring-[#E2E8F0]"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
          </button>
        </div>
      }
    >
      <div className="mx-auto max-w-6xl space-y-5 lg:space-y-6">
        {/* Full-width greeting banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E8EEFB] via-[#F1F5FF] to-[#E0EAFF] p-5 sm:p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                Tuesday, October 24
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-[1.875rem]">
                Good morning, Alex
              </h2>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2b5ce6] px-3.5 py-1.5 text-sm font-semibold text-white">
                <CalendarIcon />
                12 days to your test
              </p>
            </div>

            <div className="flex items-center gap-4 self-start sm:self-center">
              <div className="text-right">
                <p className="text-sm font-medium text-[#64748B]">Daily Goal</p>
                <p className="text-lg font-bold text-[#0F172A]">
                  <span className="text-[#2b5ce6]">2</span>/3 lessons
                </p>
              </div>
              <div className="relative flex size-[4.75rem] items-center justify-center">
                <svg viewBox="0 0 72 72" className="absolute inset-0 size-full -rotate-90">
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="none"
                    stroke="#DBEAFE"
                    strokeWidth="7"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="none"
                    stroke="#2b5ce6"
                    strokeWidth="7"
                    strokeDasharray={`${2 * Math.PI * 30 * (2 / 3)} ${2 * Math.PI * 30}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="relative text-[#2b5ce6]">
                  <FlameIcon className="size-6" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Two columns below banner */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          {/* Left: lessons + AI insight */}
          <div className="min-w-0 space-y-5 lg:space-y-6">
            <section>
              <h3 className="text-lg font-bold text-[#0F172A]">
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
                          <p className="mt-1 text-base font-bold text-[#0F172A]">
                            {lesson.title}
                          </p>
                        </div>
                        {isStart ? (
                          <Link
                            href="/onboarding/diagnostic"
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

            <section className="relative overflow-hidden rounded-2xl border border-[#FDE68A]/60 bg-[#FEFCE8] p-5 sm:p-6">
              <LightbulbWatermark />
              <div className="relative flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#FFEDD5] text-[#F59E0B]">
                  <BulbIcon />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#D97706]">
                  AI Insight
                </p>
              </div>
              <p className="relative mt-3 max-w-xl text-sm leading-6 text-[#44403C] sm:text-base">
                Your Writing improved 0.5 bands this week. Focus on coherence
                today.
              </p>
              <Link
                href="/dashboard/streak"
                className="relative mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#2b5ce6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
              >
                See full progress
                <ArrowIcon />
              </Link>
            </section>
          </div>

          {/* Right: stats, recommended, quick practice */}
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
              <div className="mb-2.5 flex items-center gap-1.5">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#F97316]">
                  <span className="size-1.5 rounded-full bg-white" />
                </span>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#EA580C]">
                  Recommended Today
                </p>
              </div>
              <div className="rounded-2xl border border-[#FDBA74] bg-[#FFFBEB] p-4 sm:p-5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  Time for a mock test
                </h3>
                <p className="mt-1.5 text-sm leading-5 text-[#78716C]">
                  You&apos;ve been practising for 7 days straight. Test your
                  skills to see your estimated band score.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-[#78716C]">
                  <span className="inline-flex items-center gap-1.5">
                    <ClockMini />
                    45 minutes
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GridMini />
                    All 4 skills
                  </span>
                </div>
                <Link
                  href="/onboarding/diagnostic"
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl border border-[#F97316] bg-white text-sm font-semibold text-[#EA580C] transition hover:bg-[#FFF7ED]"
                >
                  Start Mock Test
                </Link>
              </div>
            </section>

            <section className="rounded-2xl bg-[#EFF6FF] p-4 sm:p-5">
              <h3 className="text-base font-bold text-[#0F172A]">
                Quick practice
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {QUICK.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="relative flex flex-col items-center gap-2 rounded-xl bg-white px-2 py-4 text-center shadow-sm ring-1 ring-[#E2E8F0]/80 transition hover:ring-[#BFDBFE]"
                    >
                      <span className="relative flex size-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2b5ce6]">
                        <Icon />
                        {"badge" in item && item.badge ? (
                          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#EF4444] text-[0.5625rem] font-bold text-white">
                            {item.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-xs font-semibold leading-snug text-[#334155]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
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
  icon: React.ReactNode;
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

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <rect
        x="2"
        y="3.5"
        width="12"
        height="10.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2 6.5h12M5 2v3M11 2v3"
        stroke="currentColor"
        strokeWidth="1.4"
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function ClockMini() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 4.5V7l2 1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridMini() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="2" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="8" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function LightbulbWatermark() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-2 -top-2 size-36 text-[#FDE68A] opacity-40"
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
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
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
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M6 2.5h6l3.5 3.5V17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 2.5v3.5h3.5M7.5 10h5M7.5 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MockQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChartQuickIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 16V9.5M10 16V4.5M16 16v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
