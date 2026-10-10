"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const FILTERS = ["All", "Reading", "Listening", "Writing", "Speaking"] as const;

const SKILLS = [
  {
    id: "essay-development",
    href: "/dashboard/skills/essay-development",
    skill: "Writing",
    title: "Writing: Essay Development",
    description: "Build and structure strong ideas for essays with clear support.",
    lessons: "12 Lessons",
    level: "Beginner",
    badge: "IN PLAN" as const,
    progress: 62,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2b5ce6]",
    bar: "bg-[#2b5ce6]",
    Icon: DocIcon,
    locked: false,
  },
  {
    id: "complex-sentences",
    href: "/dashboard/skills/reading",
    skill: "Reading",
    title: "Reading: Complex Sentences",
    description: "Understand complex sentence structures and how they work.",
    lessons: "15 Lessons",
    level: "Intermediate",
    badge: "IN PLAN" as const,
    progress: 48,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
    bar: "bg-[#7C3AED]",
    Icon: ChatIcon,
    locked: false,
  },
  {
    id: "paraphrase",
    href: "/dashboard/skills/grammar",
    skill: "Reading",
    title: "Reading: Paraphrase",
    description: "Learn to paraphrase accurately and avoid plagiarism.",
    lessons: "10 Lessons",
    level: "Beginner",
    badge: "IN PLAN" as const,
    progress: 70,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    bar: "bg-[#14B8A6]",
    Icon: AaIcon,
    locked: false,
  },
  {
    id: "note-completion",
    href: "/dashboard/skills/listening",
    skill: "Listening",
    title: "Listening: Note Completion",
    description: "Complete notes while listening to short conversations.",
    lessons: "Coming soon",
    level: "Locked",
    badge: "LOCKED" as const,
    progress: 0,
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    bar: "bg-[#CBD5E1]",
    Icon: HeadphoneIcon,
    locked: false,
  },
] as const;

export function SkillLibrary() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const skills = useMemo(
    () =>
      filter === "All" ? SKILLS : SKILLS.filter((s) => s.skill === filter),
    [filter],
  );

  return (
    <DashboardShell
      title="Skill Library"
      contentBgClassName="bg-[#F8F9FC]"
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto max-w-5xl space-y-4 pb-8">
        <p className="text-sm text-[#64748B] ui-fade-up">
          Browse skills and track your learning progress.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 ui-fade-up">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === f
                    ? "bg-[#2b5ce6] text-white shadow-sm"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#64748B]">
            Sort by:{" "}
            <button type="button" className="font-semibold text-[#141B2B]">
              In Plan ⌄
            </button>
          </p>
        </div>

        <ul className="space-y-2.5">
          {skills.map((skill, i) => {
            const Icon = skill.Icon;
            const delay =
              i === 0
                ? "ui-fade-up"
                : i === 1
                  ? "ui-fade-up-delay-1"
                  : i === 2
                    ? "ui-fade-up-delay-2"
                    : "ui-fade-up-delay-3";
            const card = (
              <div
                className={`flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:gap-3.5 sm:px-4 sm:py-3 ${delay} ${
                  skill.locked ? "" : "ui-hover-lift"
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${skill.iconBg} ${skill.iconColor}`}
                >
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold leading-snug text-[#141B2B] sm:text-[0.9375rem]">
                        {skill.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-snug text-[#64748B] sm:text-sm sm:leading-5">
                        {skill.description}
                      </p>
                      <p className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-[0.6875rem] font-medium leading-none text-[#94A3B8] sm:text-xs">
                        <span className="inline-flex items-center gap-1">
                          <BookTiny />
                          {skill.lessons}
                        </span>
                        <span aria-hidden>•</span>
                        <span className="inline-flex items-center gap-1">
                          {skill.locked ? <LockTiny /> : <SignalTiny />}
                          {skill.level}
                        </span>
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold tracking-wide ${
                        skill.badge === "LOCKED"
                          ? "bg-[#E2E8F0] text-[#64748B]"
                          : "border border-[#BFDBFE] bg-white text-[#2b5ce6]"
                      }`}
                    >
                      {skill.badge === "LOCKED" ? <LockTiny /> : null}
                      {skill.badge}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-end justify-end">
                    <div className="w-32 text-right sm:w-40">
                      <p className="text-[0.6875rem] font-medium leading-none text-[#94A3B8]">
                        Progress{" "}
                        <span
                          className={`font-bold tabular-nums ${
                            skill.locked ? "text-[#94A3B8]" : "text-[#141B2B]"
                          }`}
                          style={
                            !skill.locked
                              ? {
                                  color:
                                    skill.bar === "bg-[#2b5ce6]"
                                      ? "#2b5ce6"
                                      : skill.bar === "bg-[#7C3AED]"
                                        ? "#7C3AED"
                                        : skill.bar === "bg-[#14B8A6]"
                                          ? "#14B8A6"
                                          : undefined,
                                }
                              : undefined
                          }
                        >
                          {skill.progress}%
                        </span>
                      </p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                        <div
                          className={`h-full rounded-full ${skill.bar}`}
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <li key={skill.id}>
                {skill.locked ? (
                  card
                ) : (
                  <Link href={skill.href} className="block">
                    {card}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5 ui-fade-up-delay-3">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <p className="text-sm leading-6 text-[#1E40AF]">
              Skills marked &apos;In Plan&apos; are part of your personalised study
              plan.
              <br />
              Complete lessons to track progress and level up!
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5v-6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AaIcon() {
  return (
    <span className="text-sm font-bold tracking-tight" aria-hidden>
      Aa
    </span>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d="M4.5 13v3a2 2 0 0 0 2 2H8v-5H6.5A2 2 0 0 0 4.5 15v-2a7.5 7.5 0 1 1 15 0v2a2 2 0 0 1-2 2H16v-5h1.5a2 2 0 0 1 2 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <path d="M2 2.5h7.5V10H3.5A1.5 1.5 0 0 0 2 11.5v-9Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function SignalTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <rect x="1" y="8" width="1.8" height="3" rx="0.4" />
      <rect x="4" y="6" width="1.8" height="5" rx="0.4" />
      <rect x="7" y="4" width="1.8" height="7" rx="0.4" />
      <rect x="10" y="2" width="1.8" height="9" rx="0.4" opacity="0.35" />
    </svg>
  );
}

function LockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
