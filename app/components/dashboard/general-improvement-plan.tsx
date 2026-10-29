"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

const OVERVIEW = [
  {
    label: "Target",
    value: "—",
    iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
    Icon: DeviceIcon,
  },
  {
    label: "Test Date",
    value: "—",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    Icon: CalendarIcon,
  },
  {
    label: "Pace",
    value: "—",
    iconBg: "bg-[#CCFBF1] text-[#0D9488]",
    Icon: PaceIcon,
  },
  {
    label: "Focus",
    value: "All Sections",
    iconBg: "bg-[#FCE7F3] text-[#DB2777]",
    Icon: TargetIcon,
  },
] as const;

const SKILLS = [
  {
    name: "Listening",
    description: "Improve your comprehension and note-taking",
    href: "/dashboard/progress/skills/listening",
    iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
    Icon: HeadphonesIcon,
  },
  {
    name: "Reading",
    description: "Build speed and accuracy in reading tasks.",
    href: "/dashboard/progress/skills/reading",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    Icon: BookIcon,
  },
  {
    name: "Writing",
    description: "Strengthen your grammar and task response.",
    href: "/dashboard/writing",
    iconBg: "bg-[#CCFBF1] text-[#0D9488]",
    Icon: PencilIcon,
  },
  {
    name: "Speaking",
    description: "Gain confidence and fluency in real-life conversation.",
    href: "/dashboard/speak",
    iconBg: "bg-[#FCE7F3] text-[#DB2777]",
    Icon: ChatIcon,
  },
] as const;

export function GeneralImprovementPlan() {
  return (
    <DashboardShell
      title="General Improvement Plan"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard/progress/plan"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
          aria-label="Back to plan"
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
        {/* Hero: text left, GIP svg right */}
        <section className="grid w-full grid-cols-1 items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5 lg:grid-cols-[1fr_auto] lg:gap-6">
          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-[#64748B] sm:text-base">
              A personalized plan to help you build your skills and improve over
              time.
            </p>
          </div>
          <div className="mx-auto w-[min(100%,9.5rem)] shrink-0 lg:mx-0">
            <Image
              src="/GIP/GIP.svg"
              alt=""
              width={160}
              height={160}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        {/* Active plan card */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#16A34A]">
              <SproutIcon />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                  General Plan
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                  <span
                    className="size-1.5 rounded-full bg-[#22C55E]"
                    aria-hidden
                  />
                  Active
                </span>
              </div>
              <h3 className="mt-2.5 text-lg font-bold text-[#141B2B]">
                Build Your Skills
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                This plan focuses on overall improvement across all sections.
                Keep practicing and track your progress.
              </p>
            </div>
          </div>
        </section>

        {/* Plan overview */}
        <section>
          <h3 className="text-base font-bold text-[#141B2B]">Plan Overview</h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {OVERVIEW.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center px-3 py-4 text-center ${
                    i % 2 === 1 ? "border-l border-[#F1F5F9]" : ""
                  } ${i >= 2 ? "border-t border-[#F1F5F9] sm:border-t-0" : ""} ${
                    i > 0 ? "sm:border-l sm:border-[#F1F5F9]" : ""
                  }`}
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-full ${item.iconBg}`}
                  >
                    <item.Icon />
                  </span>
                  <p className="mt-2 text-xs text-[#64748B]">{item.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-[#141B2B]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills to focus on */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#141B2B]">
              Skills to Focus On
            </h3>
            <Link
              href="/dashboard/progress"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              View details
              <span aria-hidden>›</span>
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
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full ${skill.iconBg}`}
                >
                  <skill.Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#141B2B]">
                    {skill.name}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#64748B] sm:text-sm">
                    {skill.description}
                  </p>
                </div>
                <span className="text-[#CBD5E1]" aria-hidden>
                  ›
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
            i
          </span>
          <p className="text-sm leading-relaxed text-[#334155]">
            Your progress is saved automatically. You can update your plan
            anytime from the settings.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d="M12 20v-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 12c0-3.5 2.5-6 6-6-1 3.5-3 5.5-6 6Z"
        stroke="#16A34A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 14c0-2.8-2-5-5-5 1 2.8 2.5 4.5 5 5Z"
        stroke="#22C55E"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="5"
        y="2.5"
        width="10"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.5 14.5h3"
        stroke="currentColor"
        strokeWidth="1.4"
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

function PaceIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 14a7 7 0 1 1 12 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 14 13 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14" r="1.2" fill="currentColor" />
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
