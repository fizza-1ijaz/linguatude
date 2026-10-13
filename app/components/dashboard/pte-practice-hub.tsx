"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  masteryTone,
  PteHeaderRight,
} from "@/app/components/dashboard/pte-shared";

type Tab = "sw" | "reading" | "listening";

const SW_TASKS = [
  {
    code: "RA",
    title: "Read Aloud",
    desc: "Speak a written text (~60 words), 30–40 s",
    mastery: 72,
    href: "/dashboard/pte/read-aloud",
  },
  {
    code: "RS",
    title: "Repeat Sentence",
    desc: "Hear 3–9 s sentence, repeat verbatim",
    mastery: 55,
    href: "/dashboard/pte/repeat-sentence",
  },
  {
    code: "DI",
    title: "Describe Image",
    desc: "Describe chart/graph/map, 25 s prep, 40 s speak",
    mastery: 61,
    href: "/dashboard/pte/describe-image",
  },
  {
    code: "RL",
    title: "Re-tell Lecture",
    desc: "Hear ~90 s lecture, 10 s prep, 40 s retell",
    mastery: 63,
    href: "/dashboard/pte/retell-lecture",
  },
  {
    code: "AS",
    title: "Answer Short Question",
    desc: "One-word/short answer to spoken question",
    mastery: 48,
    href: "/dashboard/pte/short-question",
  },
  {
    code: "SWT",
    title: "Summarize Written Text",
    desc: "One sentence, 5–75 words, 10 min",
    mastery: 42,
    href: "/dashboard/pte/summarize-text",
  },
  {
    code: "ESS",
    title: "Essay",
    desc: "200–300 words, 20 min",
    mastery: 35,
    href: "/dashboard/pte/essay",
  },
] as const;

const READING_TASKS = [
  {
    code: "FIB",
    title: "R&W Fill in the Blanks",
    desc: "Select the best word for each blank in the passage",
    mastery: 58,
    href: "/dashboard/pte/fill-blanks",
  },
  {
    code: "MCQ-M",
    title: "MCQ Multiple · Reading",
    desc: "Select all correct options (negative marking)",
    mastery: 52,
    href: "/dashboard/pte/mcq-multiple",
  },
  {
    code: "ROP",
    title: "Re-order Paragraphs",
    desc: "Drag paragraphs into the correct sequence",
    mastery: 60,
    href: "/dashboard/pte/reorder-paragraphs",
  },
  {
    code: "R-FIB",
    title: "Reading Fill in the Blanks",
    desc: "Drag words from the bank into the blanks",
    mastery: 55,
    href: "/dashboard/pte/reading-fib",
  },
  {
    code: "MCQ-S",
    title: "MCQ Single · Reading",
    desc: "Choose the single best answer",
    mastery: 64,
    href: "/dashboard/pte/mcq-single",
  },
] as const;

const LISTENING_TASKS = [
  {
    code: "SST",
    title: "Summarize Spoken Text",
    desc: "Write a 50–70 word summary of a lecture",
    mastery: 48,
    href: "/dashboard/pte/summarize-spoken",
  },
  {
    code: "L-FIB",
    title: "Listening Fill in the Blanks",
    desc: "Type missing words as the audio plays",
    mastery: 51,
    href: "/dashboard/pte/listening-fib",
  },
  {
    code: "HCS",
    title: "Highlight Correct Summary",
    desc: "Select the paragraph that best summarises the recording",
    mastery: 57,
    href: "/dashboard/pte/highlight-summary",
  },
  {
    code: "SMW",
    title: "Select Missing Word",
    desc: "Choose the word that completes the recording",
    mastery: 53,
    href: "/dashboard/pte/select-missing-word",
  },
  {
    code: "HIW",
    title: "Highlight Incorrect Words",
    desc: "Click transcript words that differ from the audio",
    mastery: 49,
    href: "/dashboard/pte/highlight-incorrect",
  },
  {
    code: "WFD",
    title: "Write from Dictation",
    desc: "Type the sentence exactly as you hear it",
    mastery: 54,
    href: "/dashboard/pte/write-dictation",
  },
] as const;

const TABS: { id: Tab; label: string; Icon: () => React.ReactNode }[] = [
  { id: "sw", label: "S&W Speaking & Writing", Icon: SwIcon },
  { id: "reading", label: "Reading", Icon: BookIcon },
  { id: "listening", label: "Listening", Icon: HeadphoneIcon },
];

export function PtePracticeHub() {
  const [tab, setTab] = useState<Tab>("sw");

  return (
    <DashboardShell
      title="PTE Practice"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-[#141B2B] sm:text-3xl">
              PTE Practice Hub
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
              Master all 20 PTE Academic task types across Speaking, Writing,
              Reading and Listening. Practice by type, build skills, and track
              your progress.
            </p>
          </div>
          <Link
            href="/dashboard/help"
            className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-sm transition hover:border-[#CBD5E1]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-sm font-bold text-[#2b5ce6]">
              i
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-[#141B2B]">
                About PTE Academic
              </span>
              <span className="block text-xs text-[#64748B]">
                Exam format, scoring, and Australia targets
              </span>
            </span>
            <span className="text-[#CBD5E1]" aria-hidden>
              ›
            </span>
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition ${
                  active
                    ? "bg-[#2b5ce6] text-white shadow-[0_10px_24px_-12px_rgba(43,92,230,0.7)]"
                    : "border border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]"
                }`}
              >
                <span className={active ? "text-white" : "text-[#94A3B8]"}>
                  <t.Icon />
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        <TaskList
          title={
            tab === "sw"
              ? "Speaking & Writing Tasks (7)"
              : tab === "reading"
                ? `Reading Tasks (${READING_TASKS.length})`
                : `Listening Tasks (${LISTENING_TASKS.length})`
          }
          tasks={
            tab === "sw"
              ? SW_TASKS
              : tab === "reading"
                ? READING_TASKS
                : LISTENING_TASKS
          }
        />

        <div className="grid gap-3 md:grid-cols-3">
          <CtaCard
            href="/dashboard/pte/repeat-sentence"
            tone="purple"
            eyebrow="Daily Focus"
            title="Repeat Sentence x8"
            subtitle="Recommended for today's practice"
            Icon={TargetIcon}
          />
          <CtaCard
            href="/dashboard/mock"
            tone="orange"
            eyebrow="Quick Mock"
            title="Start a Quick Mock"
            subtitle="~45 min · All 20 task types"
            Icon={BoltIcon}
          />
          <CtaCard
            href="/dashboard/mock/full"
            tone="green"
            eyebrow="Full Mock Test"
            title="Take a Full Mock Test"
            subtitle="Simulate the real ~2-hour PTE test"
            Icon={TrophyIcon}
          />
        </div>
      </div>
    </DashboardShell>
  );
}

function TaskList({
  title,
  tasks,
}: {
  title: string;
  tasks: readonly {
    code: string;
    title: string;
    desc: string;
    mastery: number;
    href: string;
  }[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2E8F0] px-4 py-4 sm:px-5">
        <div>
          <h3 className="text-lg font-bold text-[#141B2B]">{title}</h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Complete tasks to build mastery. Accuracy shows your average performance.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.625rem] font-bold uppercase tracking-wide text-[#94A3B8]">
            Mastery Guide
          </p>
          <div className="mt-1.5 flex flex-wrap justify-end gap-3 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#EF4444]" />
              Low (0–39%)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#F59E0B]" />
              Medium (40–69%)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#22C55E]" />
              High (70–100%)
            </span>
          </div>
        </div>
      </div>
      <ul>
        {tasks.map((task) => {
          const tone = masteryTone(task.mastery);
          return (
            <li
              key={task.code}
              className="flex flex-wrap items-center gap-3 border-b border-[#E2E8F0] px-4 py-4 last:border-b-0 sm:flex-nowrap sm:gap-4 sm:px-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-[#2b5ce6] text-xs font-bold text-[#2b5ce6]">
                {task.code}
              </span>
              <div className="min-w-0 flex-1 basis-[12rem]">
                <p className="text-sm font-bold text-[#141B2B]">{task.title}</p>
                <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">{task.desc}</p>
              </div>
              <div className="w-full min-w-[8rem] sm:w-40 sm:shrink-0">
                <p className="text-[0.625rem] font-medium uppercase tracking-wide text-[#94A3B8]">
                  Mastery
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className={`h-full rounded-full ${tone.bar}`}
                      style={{ width: `${task.mastery}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold ${tone.text}`}>
                    {task.mastery}%
                  </span>
                </div>
              </div>
              <Link
                href={task.href}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-[#2b5ce6] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
              >
                Practice ›
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CtaCard({
  href,
  tone,
  eyebrow,
  title,
  subtitle,
  Icon,
}: {
  href: string;
  tone: "purple" | "orange" | "green";
  eyebrow: string;
  title: string;
  subtitle: string;
  Icon: () => React.ReactNode;
}) {
  const styles = {
    purple: {
      bg: "bg-[#EEF2FF]",
      eye: "text-[#5B5BD6]",
      icon: "text-[#5B5BD6]",
    },
    orange: {
      bg: "bg-[#FFF4E6]",
      eye: "text-[#EA580C]",
      icon: "text-[#EA580C]",
    },
    green: {
      bg: "bg-[#ECFDF5]",
      eye: "text-[#16A34A]",
      icon: "text-[#16A34A]",
    },
  }[tone];

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-2xl ${styles.bg} px-4 py-4 shadow-sm transition hover:brightness-[0.98]`}
    >
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-white ${styles.icon}`}>
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-[0.6875rem] font-bold uppercase tracking-wide ${styles.eye}`}>
          {eyebrow}
        </span>
        <span className="mt-0.5 block text-sm font-bold text-[#141B2B]">
          {title}
        </span>
        <span className="block text-xs text-[#64748B]">{subtitle}</span>
      </span>
      <span className="text-[#94A3B8]" aria-hidden>
        ›
      </span>
    </Link>
  );
}

function SwIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h5A2 2 0 0 1 13 5.5v3A2 2 0 0 1 11 10.5H8l-2.5 2v-2H6A2 2 0 0 1 4 8.5v-3Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 12.5h2.5l1.5 1.5v-1.5H15a1.5 1.5 0 0 0 1.5-1.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M4 4h5v10.5H5A1.5 1.5 0 0 0 3.5 16V5.5A1.5 1.5 0 0 1 5 4Zm5 0h5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0-1.5-1.5H9V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 10v2a1.5 1.5 0 0 0 1.5 1.5h1V10H5a1.5 1.5 0 0 0-1.5 1.5V10a5.5 5.5 0 1 1 11 0v1.5A1.5 1.5 0 0 1 13 10h-1v3.5h1A1.5 1.5 0 0 0 14.5 12v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M10 2.5 5.5 10h3.2L7.5 15.5 13 8H9.5L11.5 2.5H10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M5.5 3.5h7v4a3.5 3.5 0 1 1-7 0v-4ZM3.5 4.5H5.5v2.2A2.2 2.2 0 0 1 3.5 4.5ZM12.5 4.5h2A2.2 2.2 0 0 1 12.5 6.7V4.5ZM7 13.5h4M9 11v2.5M6.5 15.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
