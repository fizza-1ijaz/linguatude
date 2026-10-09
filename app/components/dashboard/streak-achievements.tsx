import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

/** 7 days × 12 weeks — visual pattern matching the Figma heatmap */
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

type Cell = "done" | "missed" | "today" | "future" | "empty";

/** Rows = Mon→Sun, cols = oldest→newest week */
const HEATMAP: Cell[][] = [
  // Mon
  [
    "missed",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "done",
    "today",
  ],
  // Tue
  [
    "done",
    "missed",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "future",
  ],
  // Wed
  [
    "done",
    "done",
    "missed",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "future",
  ],
  // Thu
  [
    "missed",
    "done",
    "done",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "done",
    "future",
  ],
  // Fri
  [
    "done",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "future",
  ],
  // Sat
  [
    "done",
    "missed",
    "done",
    "done",
    "done",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "missed",
    "future",
  ],
  // Sun
  [
    "missed",
    "done",
    "done",
    "done",
    "missed",
    "done",
    "done",
    "done",
    "done",
    "done",
    "done",
    "future",
  ],
];

const ACHIEVEMENTS = [
  {
    title: "7 Day Streak",
    date: "Earned on May 20, 2024",
    iconBg: "bg-[#F97316]",
    locked: false,
    Icon: FlameBadgeIcon,
  },
  {
    title: "10 Lessons",
    date: "Earned on May 20, 2024",
    iconBg: "bg-[#22C55E]",
    locked: false,
    Icon: CapBadgeIcon,
  },
  {
    title: "Night Owl",
    date: "Earned on May 20, 2024",
    iconBg: "bg-[#1E3A8A]",
    locked: false,
    Icon: MoonBadgeIcon,
  },
  {
    title: "Consistent",
    date: "Earned on May 20, 2024",
    iconBg: "bg-[#7C3AED]",
    locked: false,
    Icon: ConsistentBadgeIcon,
  },
  {
    title: "First Mock",
    date: "Earned on May 20, 2024",
    iconBg: "bg-[#EAB308]",
    locked: false,
    Icon: TrophyBadgeIcon,
  },
  {
    title: "15 Day Streak",
    date: "Keep going to unlock",
    iconBg: "bg-[#94A3B8]",
    locked: true,
    Icon: FlameBadgeIcon,
  },
] as const;

const STATS = [
  {
    label: "Lessons complete",
    value: "48",
    tile: "bg-[#EFF6FF]",
    iconBg: "bg-[#2b5ce6]",
    Icon: BookStatIcon,
  },
  {
    label: "Total study time",
    value: "24h 35m",
    tile: "bg-[#ECFDF5]",
    iconBg: "bg-[#22C55E]",
    Icon: ClockStatIcon,
  },
  {
    label: "Skills mastered",
    value: "12",
    tile: "bg-[#FEFCE8]",
    iconBg: "bg-[#EAB308]",
    Icon: StarStatIcon,
  },
  {
    label: "Mock tests done",
    value: "4",
    tile: "bg-[#FDF2F8]",
    iconBg: "bg-[#EC4899]",
    Icon: ClipboardStatIcon,
  },
] as const;

export function StreakAchievements() {
  return (
    <DashboardShell
      title="Streak & Achievements"
      headerLeft={
        <Link
          href="/dashboard"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to home"
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
      }
    >
      <div className="mx-auto max-w-6xl space-y-5 lg:space-y-6">
        {/* Top row: Streak + Progress */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Study Streak */}
          <section className="relative overflow-hidden rounded-[1.25rem] border border-[#E8EBF5] bg-[#F8FAFF] p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
            <div className="relative flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="relative flex size-[5.5rem] shrink-0 items-center justify-center sm:size-[6.25rem]">
                <div
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.55)_0%,rgba(191,219,254,0.25)_45%,transparent_70%)]"
                  aria-hidden
                />
                <FireIcon className="relative size-12 text-[#2b5ce6] sm:size-14" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-[#475569]">
                  Study
                  <br />
                  Streak
                </p>
                <p className="mt-1 text-[2.75rem] font-bold leading-none text-[#2b5ce6] sm:text-5xl">
                  7
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#2b5ce6]">
                  day streak
                </p>
              </div>

              <div className="ml-auto flex flex-col items-center text-center sm:pr-1">
                <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-[#DBEAFE]">
                  <StarIcon />
                </span>
                <p className="text-xs font-medium text-[#64748B]">
                  Personal best
                </p>
                <p className="mt-0.5 text-base text-[#141B2B]">
                  <span className="font-bold">21</span> days
                </p>
              </div>
            </div>
          </section>

          {/* Your Progress */}
          <section className="rounded-[1.25rem] border border-[#E8EBF5] bg-white p-6 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-7">
            <h2 className="text-lg font-bold text-[#141B2B]">Your Progress</h2>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex size-14 shrink-0 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full border border-dashed border-[#93C5FD]"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-1 rounded-full border border-dashed border-[#BFDBFE]"
                    aria-hidden
                  />
                  <span className="relative flex size-11 items-center justify-center rounded-full bg-[#2b5ce6] text-lg font-bold text-white">
                    12
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="text-base font-bold text-[#141B2B]">
                    Level 12 — Wordsmith
                  </p>
                  <p className="text-sm text-[#64748B]">
                    Keep practicing to rank up
                  </p>
                </div>
              </div>
              <span
                className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-lg font-bold text-[#94A3B8]"
                aria-label="Level 13 locked"
              >
                13
                <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]">
                  <LockIcon />
                </span>
              </span>
            </div>

            <div className="mt-6">
              <div className="relative h-3.5 overflow-hidden rounded-full bg-[#E8EBF5]">
                <div
                  className="absolute inset-y-0 left-0 flex items-center justify-center rounded-full bg-[#2b5ce6]"
                  style={{ width: "68%" }}
                >
                  <span className="text-[0.625rem] font-bold leading-none text-white">
                    68%
                  </span>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-3 text-sm">
                <p className="font-semibold text-[#141B2B]">1,850 / 2,500 XP</p>
                <p className="inline-flex items-center gap-1.5 font-medium text-[#64748B]">
                  <RocketIcon />
                  Next: <span className="font-bold text-[#141B2B]">Expert</span>{" "}
                  at 2,500 XP
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Activity heatmap */}
        <section className="rounded-[1.25rem] border border-[#E8EBF5] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-7">
          <h2 className="text-lg font-bold text-[#141B2B]">
            Your activity — last 12 weeks
          </h2>

          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[36rem]">
              {/* Week labels — day-label gutter + 12 week columns */}
              <div className="mb-2 flex items-end">
                <span className="w-9 shrink-0 sm:w-10" />
                <div className="flex flex-1">
                  {WEEK_LABELS.map((label, i) => (
                    <span
                      key={label}
                      className={`min-w-0 flex-1 text-center text-[0.5625rem] font-medium leading-tight sm:text-[0.625rem] ${
                        i === WEEK_LABELS.length - 1
                          ? "font-semibold text-[#2b5ce6]"
                          : "text-[#94A3B8]"
                      }`}
                    >
                      {label.includes(" ") ? (
                        <>
                          {label.split(" ").slice(0, -1).join(" ")}
                          <br />
                          {label.split(" ").slice(-1)}
                        </>
                      ) : (
                        label
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid: day labels + small fixed squares; remaining space is gap */}
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {DAY_LABELS.map((day, row) => (
                  <div key={day} className="flex items-center">
                    <span className="w-9 shrink-0 text-xs font-medium text-[#64748B] sm:w-10">
                      {day}
                    </span>
                    <div className="flex flex-1">
                      {HEATMAP[row].map((cell, col) => (
                        <span
                          key={`${day}-${col}`}
                          className="flex flex-1 items-center justify-center"
                        >
                          <HeatCell state={cell} />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#64748B]">
            <li className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] bg-[#2D5BFF]" />
              Completed
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] bg-[#E2E8F0]" />
              Missed
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] border-2 border-[#2D5BFF] bg-white" />
              Today
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="size-3 rounded-[3px] border border-[#E2E8F0] bg-[#F8FAFC]" />
              Future
            </li>
          </ul>
        </section>

        {/* Bottom row: Achievements + Learning statistics */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-[1.25rem] border border-[#E8EBF5] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#141B2B]">Achievements</h2>
              <Link
                href="/dashboard/streak"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
              >
                See full progress
                <span aria-hidden>→</span>
              </Link>
            </div>

            <ul className="mt-5 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 sm:gap-x-2">
              {ACHIEVEMENTS.map((a) => {
                const Icon = a.Icon;
                return (
                  <li
                    key={a.title}
                    className={`flex flex-col items-center text-center ${
                      a.locked ? "opacity-40 sm:col-start-1" : ""
                    }`}
                  >
                    <span className="relative">
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl text-white ${a.iconBg}`}
                      >
                        <Icon />
                      </span>
                      {a.locked ? (
                        <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0]">
                          <LockIcon />
                        </span>
                      ) : null}
                    </span>
                    <p className="mt-2.5 text-[0.8125rem] font-bold leading-tight text-[#141B2B]">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[0.625rem] leading-snug text-[#0F172A]">
                      {a.date}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-[1.25rem] border border-[#E8EBF5] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-6">
            <h2 className="text-lg font-bold text-[#141B2B]">
              Learning statistics
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {STATS.map((s) => {
                const Icon = s.Icon;
                return (
                  <div
                    key={s.label}
                    className={`flex items-center gap-3 rounded-2xl ${s.tile} p-4`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-white ${s.iconBg}`}
                    >
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xl font-bold leading-none text-[#141B2B]">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-[#64748B]">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}

function HeatCell({ state }: { state: Cell }) {
  const base = "size-3.5 shrink-0 rounded-[3px]";
  if (state === "done") {
    return <span className={`${base} bg-[#2D5BFF]`} title="Completed" />;
  }
  if (state === "missed") {
    return <span className={`${base} bg-[#E2E8F0]`} title="Missed" />;
  }
  if (state === "today") {
    return (
      <span
        className={`${base} border-2 border-[#2D5BFF] bg-white`}
        title="Today"
      />
    );
  }
  if (state === "future") {
    return (
      <span
        className={`${base} border border-[#E2E8F0] bg-[#F8FAFC]`}
        title="Future"
      />
    );
  }
  return <span className={`${base} bg-transparent`} />;
}

function FireIcon({ className = "size-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.2 2.1c.5 2.6-.3 4.3-1.6 5.8-1.1 1.2-1.8 2.3-1.8 3.8 0 1.7 1.1 3.1 2.7 3.1 1.7 0 3-1.4 3-3.2 0-.9-.2-1.6-.6-2.4 2 1.2 3.3 3.1 3.3 5.4 0 3.7-2.9 6.5-6.5 6.5S4.2 18.3 4.2 14.6c0-3.2 1.7-5.5 3.5-7.2C9.5 5.5 11 4.1 12.2 2.1Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="#2b5ce6" aria-hidden>
      <path d="m8 1.5 1.7 3.5 3.8.6-2.7 2.7.7 3.8L8 10.3 4.5 12.1l.7-3.8L2.5 5.6l3.8-.6L8 1.5Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="5.5"
        width="7"
        height="5"
        rx="1"
        stroke="#94A3B8"
        strokeWidth="1.2"
      />
      <path
        d="M4 5.5V4a2 2 0 0 1 4 0v1.5"
        stroke="#94A3B8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4 shrink-0" fill="none" aria-hidden>
      <path
        d="M10.2 2.2c2.1.5 3.8 2.2 4.3 4.3L9.4 11.6 6.4 8.6 10.2 2.2Z"
        fill="#DBEAFE"
        stroke="#2b5ce6"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="11.1" cy="6.2" r="1.1" fill="#2b5ce6" />
      <path
        d="M6.4 8.6 3.8 14.2l5.6-2.2"
        stroke="#2b5ce6"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.4 10.6 1.1 1.1"
        stroke="#2b5ce6"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M5.2 12.2c-.7.2-1.5.8-1.9 1.7-.1.2 0 .4.2.5.9-.4 1.5-1.2 1.7-1.9"
        fill="#93C5FD"
        stroke="#2b5ce6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlameBadgeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="white" aria-hidden>
      <path d="M8.2 1.8c.3 1.7-.2 2.8-1 3.8-.7.8-1.1 1.4-1.1 2.4 0 1.1.7 2 1.8 2 1.1 0 1.9-.9 1.9-2.1 0-.55-.15-1-.4-1.5 1.3.8 2.1 2 2.1 3.4 0 2.4-1.85 4.2-4.2 4.2S3.2 12.2 3.2 9.8c0-2.1 1.1-3.5 2.2-4.6C6.5 4 7.5 3.1 8.2 1.8Z" />
    </svg>
  );
}

function CapBadgeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M1.5 6.5 8 3.5l6.5 3L8 9.5 1.5 6.5Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M4 8v3.2c0 .5 1.8 1.8 4 1.8s4-1.3 4-1.8V8"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M14.5 6.5V10" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MoonBadgeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="white" aria-hidden>
      <path d="M10.5 2.2A5.8 5.8 0 1 0 13.8 10 4.6 4.6 0 0 1 10.5 2.2Z" />
    </svg>
  );
}

function ConsistentBadgeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.5" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function TrophyBadgeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 2.5h6v3.2a3 3 0 0 1-6 0V2.5Z"
        fill="white"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M4 3H2.5A1.5 1.5 0 0 0 2.5 6H4M12 3h1.5A1.5 1.5 0 0 1 13.5 6H12M6.5 11.5h3M8 8.7v2.8M5.5 13.5h5"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookStatIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 3.5h4.5A2 2 0 0 1 9.5 5.5v7A1.5 1.5 0 0 0 8 11H3V3.5ZM13 3.5H8.5A2 2 0 0 0 6.5 5.5v7A1.5 1.5 0 0 1 8 11h5V3.5Z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockStatIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.4" />
      <path
        d="M8 5v3.2l2 1.3"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarStatIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="white" aria-hidden>
      <path d="m8 1.5 1.7 3.5 3.8.6-2.7 2.7.7 3.8L8 10.3 4.5 12.1l.7-3.8L2.5 5.6l3.8-.6L8 1.5Z" />
    </svg>
  );
}

function ClipboardStatIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="9"
        height="10.5"
        rx="1.5"
        stroke="white"
        strokeWidth="1.3"
      />
      <path
        d="M6 3.5V3a1.5 1.5 0 0 1 1.5-1h1A1.5 1.5 0 0 1 10 3v.5"
        stroke="white"
        strokeWidth="1.3"
      />
      <path
        d="m6 9 1.5 1.5L10.5 7.5"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
