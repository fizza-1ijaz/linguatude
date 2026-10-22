import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

const LESSONS = [
  {
    n: 1,
    title: "Essay Development – L4",
    description: "Structure your essay with clear ideas and support.",
    minutes: "10 min",
    skill: "Writing",
    active: true,
  },
  {
    n: 2,
    title: "Topic Sentences",
    description: "Write strong topic sentences for each paragraph.",
    minutes: "10 min",
    skill: "Reading",
    active: false,
  },
  {
    n: 3,
    title: "Supporting Details",
    description: "Add relevant supporting details and examples.",
    minutes: "10 min",
    skill: "Reading",
    active: false,
  },
  {
    n: 4,
    title: "Coherence & Cohesion",
    description: "Use linking words and transitions effectively.",
    minutes: "10 min",
    skill: "Reading",
    active: false,
  },
  {
    n: 5,
    title: "Essay Review & Edit",
    description: "Review and improve your essay for clarity.",
    minutes: "10 min",
    skill: "Reading",
    active: false,
  },
] as const;

export function LessonQueue() {
  return (
    <DashboardShell
      title="Lesson Queue"
      contentBgClassName="bg-white"
      mainClassName="flex-1 px-4 sm:px-6 lg:px-[1cm] py-4 sm:py-5 lg:py-6"
      headerLeft={
        <Link
          href="/dashboard/skills"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to Skill Library"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto w-full max-w-5xl space-y-4 pb-8">
        <p className="text-sm text-[#64748B] ui-fade-up">
          Follow the recommended order to master this skill
        </p>

        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5 ui-fade-up">
          <span className="mt-0.5 text-[#2b5ce6]">
            <ClockRefreshIcon />
          </span>
          <p className="text-sm leading-6 text-[#1E40AF]">
            Lessons are ordered for the best learning experience. Complete each
            lesson to unlock the next.
          </p>
        </div>

        <ul className="space-y-3">
          {LESSONS.map((lesson, i) => {
            const delay =
              i === 0
                ? "ui-fade-up"
                : i === 1
                  ? "ui-fade-up-delay-1"
                  : i === 2
                    ? "ui-fade-up-delay-2"
                    : "ui-fade-up-delay-3";
            return (
              <li key={lesson.n}>
                <div
                  className={`flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-[0_6px_18px_-12px_rgba(15,23,42,0.18)] sm:gap-5 sm:px-6 sm:py-4 ${delay} ${
                    lesson.active
                      ? "border-[#BFDBFE] border-l-[4px] border-l-[#2b5ce6] bg-[#F5F8FF]"
                      : "border-[#E2E8F0] bg-white"
                  }`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      lesson.active
                        ? "bg-[#2b5ce6] text-white"
                        : "bg-[#F1F5F9] text-[#94A3B8] ring-1 ring-[#E2E8F0]"
                    }`}
                  >
                    {lesson.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-base font-bold ${
                        lesson.active ? "text-[#1E3A8A]" : "text-[#64748B]"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p
                      className={`mt-0.5 text-sm ${
                        lesson.active ? "text-[#64748B]" : "text-[#94A3B8]"
                      }`}
                    >
                      {lesson.description}
                    </p>
                    <p
                      className={`mt-2 inline-flex flex-wrap items-center gap-2 text-xs font-medium ${
                        lesson.active ? "text-[#64748B]" : "text-[#94A3B8]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <ClockTiny />
                        {lesson.minutes}
                      </span>
                      <span aria-hidden>•</span>
                      <span className="inline-flex items-center gap-1">
                        <BookTiny />
                        {lesson.skill}
                      </span>
                    </p>
                  </div>
                  {lesson.active ? (
                    <Link
                      href="/dashboard/skills/essay-development/ice-breaker"
                      className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-[#2b5ce6] px-4 text-sm font-bold text-white transition hover:bg-[#244FE6]"
                    >
                      NEXT
                      <span aria-hidden>›</span>
                    </Link>
                  ) : (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#94A3B8]">
                      <LockIcon />
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          href="/dashboard/skills/essay-development/ice-breaker"
          className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6] ui-fade-up-delay-3"
        >
          Start Next Lesson
          <span aria-hidden>›</span>
        </Link>
        <p className="text-center text-sm text-[#94A3B8]">
          <span className="mr-1 inline-block align-middle">
            <LockTiny />
          </span>
          Complete the current lesson to unlock the next one.
        </p>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M10 3.5 5.5 8 10 12.5" stroke="#141b2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockRefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5V10l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.8V6l1.6 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
