"use client";

import Image from "next/image";
import Link from "next/link";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const STAT_CARDS = [
  {
    title: "Current Exam",
    href: "/dashboard/progress",
    bg: "bg-[#EFF6FF]",
    border: "border-[#DBEAFE]",
    pill: "bg-[#DBEAFE] text-[#1D4ED8]",
    iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
    Icon: CalendarIcon,
  },
  {
    title: "Estimated Score",
    href: "/dashboard/progress",
    bg: "bg-[#F5F3FF]",
    border: "border-[#EDE9FE]",
    pill: "bg-[#EDE9FE] text-[#6D28D9]",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    Icon: TargetIcon,
  },
  {
    title: "Study Streak",
    href: "/dashboard/streak",
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    pill: "bg-[#DCFCE7] text-[#15803D]",
    iconBg: "bg-[#DCFCE7] text-[#16A34A]",
    Icon: TimerIcon,
  },
] as const;

const SKILLS = [
  {
    name: "Listening",
    href: "/dashboard/progress/skills/listening",
    iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
    Icon: HeadphonesIcon,
  },
  {
    name: "Reading",
    href: "/dashboard/progress/skills/reading",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    Icon: BookIcon,
  },
  {
    name: "Writing",
    href: "/dashboard/writing",
    iconBg: "bg-[#DCFCE7] text-[#16A34A]",
    Icon: PencilIcon,
  },
  {
    name: "Speaking",
    href: "/dashboard/speak",
    iconBg: "bg-[#FCE7F3] text-[#DB2777]",
    Icon: ChatIcon,
  },
] as const;

export function DashboardHomeKeepGoing() {
  return (
    <DashboardShell
      title="Home"
      contentBgClassName="bg-[#F8FAFC]"
      headerRight={
        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/streak"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2.5 py-1.5 text-[13px] font-semibold text-[#B45309]"
          >
            <span aria-hidden>🔥</span>
            7
          </Link>
          <NotificationBellButton />
        </div>
      }
    >
      <div className="w-full space-y-5 pb-6">
        {/* Hero */}
        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                <SunIcon />
                Good morning
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#141B2B] sm:text-[1.75rem]">
                Let&apos;s keep going!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B] sm:max-w-xl sm:text-base">
                Your progress, performance and insights will appear here once we
                have enough data.
              </p>
            </div>
            <div className="relative mx-auto w-[min(100%,11rem)] shrink-0 sm:mx-0 sm:w-[12rem] lg:w-[13rem]">
              <Image
                src="/keep-going/keep-going.svg"
                alt=""
                width={208}
                height={208}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {STAT_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`flex flex-col rounded-2xl border p-4 transition hover:brightness-[0.99] ${card.bg} ${card.border}`}
            >
              <span
                className={`inline-flex size-10 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <card.Icon />
              </span>
              <p className="mt-3 text-sm font-bold text-[#141B2B]">
                {card.title}
              </p>
              <span
                className={`mt-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${card.pill}`}
              >
                Not enough data
                <Chevron />
              </span>
            </Link>
          ))}
        </section>

        {/* Skill breakdown */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-[#141B2B]">
              <span className="text-[#2b5ce6]">
                <GradCapIcon />
              </span>
              Skill Breakdown
            </h3>
            <Link
              href="/dashboard/progress"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              View all
              <Chevron />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            {SKILLS.map((skill, i) => (
              <Link
                key={skill.name}
                href={skill.href}
                className={`flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#F8FAFC] sm:px-5 ${
                  i > 0 ? "border-t border-[#F1F5F9]" : ""
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${skill.iconBg}`}
                >
                  <skill.Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#141B2B]">
                    {skill.name}
                  </p>
                  <div className="mt-2 h-1.5 max-w-[8rem] rounded-full bg-[#E2E8F0]" />
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#64748B]">
                  Not enough data
                  <Chevron />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Performance trends */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-base font-bold text-[#141B2B]">
              <span className="text-[#2b5ce6]">
                <TrendIcon />
              </span>
              Performance Trends
            </h3>
            <Link
              href="/dashboard/progress/history"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              View all
              <Chevron />
            </Link>
          </div>

          <Link
            href="/dashboard/mock"
            className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:bg-[#F8FAFC] sm:p-5"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2b5ce6]">
              <DocSearchIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#141B2B]">No data yet</p>
              <p className="mt-0.5 text-sm leading-relaxed text-[#64748B]">
                We&apos;ll show your progress and trends here once you start
                taking practice tests.
              </p>
            </div>
            <span className="text-[#94A3B8]" aria-hidden>
              ›
            </span>
          </Link>

          <Link
            href="/dashboard/progress"
            className="mt-3 flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:bg-[#F8FAFC] sm:p-5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
              <GradCapIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#141B2B]">Your Exam</p>
              <span className="mt-1.5 inline-flex rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-[#6D28D9]">
                Not enough data
              </span>
            </div>
            <span className="text-[#94A3B8]" aria-hidden>
              ›
            </span>
          </Link>
        </section>
      </div>
    </DashboardShell>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 1.5v1.25M7 11.25V12.5M1.5 7h1.25M11.25 7H12.5M3.1 3.1l.9.9M10 10l.9.9M10.9 3.1l-.9.9M4 10l-.9.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="13"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 8.5h13M7 2.5v3M13 2.5v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="11" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 11V8M8 3.5h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M2.5 7.5 9 4l6.5 3.5L9 11 2.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M5 9v3.2c1.2.9 2.5 1.4 4 1.4s2.8-.5 4-1.4V9M15.5 7.5V12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M3 12.5 7 8.5l3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5.5h3v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 10v2a1.5 1.5 0 0 0 1.5 1.5h1V10H5A1.5 1.5 0 0 0 3.5 10Zm11 0v2a1.5 1.5 0 0 1-1.5 1.5h-1V10H13a1.5 1.5 0 0 1 1.5 1.5V10A5.5 5.5 0 1 0 3.5 10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 4h4A1.5 1.5 0 0 1 9 5.5v8A1.2 1.2 0 0 0 7.8 12.3H3.5V4Zm11 0H10.5A1.5 1.5 0 0 0 9 5.5v8A1.2 1.2 0 0 1 10.2 12.3h4.3V4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M11.5 3.5 14.5 6.5 7 14H4v-3L11.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M4 4.5h10a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 14 12.5H8l-3.5 2.5V12.5H4A1.5 1.5 0 0 1 2.5 11V6A1.5 1.5 0 0 1 4 4.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <rect
        x="5"
        y="3.5"
        width="11"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="15.5" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m18 18 2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
