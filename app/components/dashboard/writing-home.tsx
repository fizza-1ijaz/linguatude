import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const TASKS = [
  {
    href: "/dashboard/writing/task1",
    title: "Task 1 — Academic",
    description: "Describe charts, graphs, maps or processes",
    words: "150+ words",
    time: "20 minutes",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2b5ce6]",
    badgeBg: "bg-[#EFF6FF]",
    badgeText: "text-[#1D4ED8]",
    arrowBg: "bg-[#DBEAFE]",
    arrowText: "text-[#2b5ce6]",
    Icon: ChartTaskIcon,
  },
  {
    href: "/dashboard/writing/task1",
    title: "Task 2 — Essay",
    description: "Argue, discuss or evaluate a topic in depth",
    words: "250+ words",
    time: "30 minutes",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
    badgeBg: "bg-[#F5F3FF]",
    badgeText: "text-[#6D28D9]",
    arrowBg: "bg-[#F3E8FF]",
    arrowText: "text-[#7C3AED]",
    Icon: DocTaskIcon,
  },
  {
    href: "/dashboard/writing/task1",
    title: "Task 1 — Letter",
    description: "Write a formal, semi-formal or informal letter",
    words: "150+ words",
    time: "20 minutes",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    badgeBg: "bg-[#F0FDF4]",
    badgeText: "text-[#15803D]",
    arrowBg: "bg-[#DCFCE7]",
    arrowText: "text-[#16A34A]",
    Icon: MailTaskIcon,
  },
] as const;

const RECENT = [
  {
    title: "Task 2 — Essay",
    preview: "Discuss both views and...",
    date: "18 May 2026 09:45 PM",
    band: "6.5",
    bandColor: "text-[#7C3AED]",
    tip: "Improve coherence by using clearer paragraph structure and linking.",
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#7C3AED]",
    Icon: DocTaskIcon,
  },
  {
    title: "Task 1 — Academic",
    preview: "The chart below shows...",
    date: "17 May 2026 02:10 PM",
    band: "6.0",
    bandColor: "text-[#2b5ce6]",
    tip: "Compare the two cities more clearly when describing trends.",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2b5ce6]",
    Icon: ChartTaskIcon,
  },
  {
    title: "Task 1 — Letter",
    preview: "Write a letter to your...",
    date: "15 May 2026 08:20 AM",
    band: "7.0",
    bandColor: "text-[#16A34A]",
    tip: "Keep the tone consistent throughout formal letters.",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    Icon: MailTaskIcon,
  },
] as const;

export function WritingHome() {
  return (
    <DashboardShell
      title="Writing"
      contentBgClassName="bg-[#F8F9FC]"
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto max-w-6xl space-y-5 pb-8 lg:space-y-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="min-w-0">
            <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
              Choose a writing task
            </h2>
            <ul className="mt-3 space-y-3">
              {TASKS.map((task) => {
                const Icon = task.Icon;
                return (
                  <li key={task.title}>
                    <Link
                      href={task.href}
                      className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_4px_14px_-10px_rgba(15,23,42,0.18)] transition hover:border-[#BFDBFE] sm:gap-4 sm:p-5"
                    >
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${task.iconBg} ${task.iconColor}`}
                      >
                        <Icon />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#141B2B] sm:text-base">
                          {task.title}
                        </p>
                        <p className="mt-0.5 text-sm text-[#64748B]">
                          {task.description}
                        </p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${task.badgeBg} ${task.badgeText}`}
                          >
                            {task.words}
                          </span>
                          <span className="text-[#CBD5E1]" aria-hidden>
                            ·
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${task.badgeBg} ${task.badgeText}`}
                          >
                            {task.time}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${task.arrowBg} ${task.arrowText}`}
                      >
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#94A3B8]">
              <InfoTiny />
              3 of 5 AI attempts remaining this month
            </p>
          </section>

          <aside>
            <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
              Your writing snapshot
            </h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                  <ChartTaskIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#64748B]">
                    Writing estimate
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <p className="text-2xl font-bold tabular-nums text-[#2b5ce6]">
                      6.5
                    </p>
                    <p className="text-[0.6875rem] text-[#94A3B8]">
                      Estimated by Linguatude
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7C3AED]">
                  <CalendarSnapIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#64748B]">
                    Last submission
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <p className="text-lg font-bold text-[#141B2B]">
                      20 May 2026
                    </p>
                    <p className="text-[0.6875rem] text-[#94A3B8]">2 days ago</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                  <DocTaskIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#64748B]">
                    Total submissions
                  </p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <p className="text-2xl font-bold tabular-nums text-[#16A34A]">
                      12
                    </p>
                    <p className="text-[0.6875rem] text-[#94A3B8]">essays</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
              Recent submissions
            </h2>
            <Link
              href="/dashboard/writing"
              className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
            <ul className="divide-y divide-[#F1F5F9]">
              {RECENT.map((row) => {
                const Icon = row.Icon;
                return (
                  <li key={row.title + row.date}>
                    <Link
                      href="/dashboard/writing/task1"
                      className="flex flex-col gap-3 px-4 py-4 transition hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                    >
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${row.iconBg} ${row.iconColor}`}
                      >
                        <Icon />
                      </span>
                      <div className="min-w-0 sm:w-44 lg:w-52">
                        <p className="text-sm font-bold text-[#141B2B]">
                          {row.title}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-[#94A3B8]">
                          {row.preview}
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] sm:w-40">
                        <CalendarTiny />
                        {row.date}
                      </p>
                      <div className="sm:w-28">
                        <p className="text-[0.6875rem] text-[#94A3B8]">
                          Overall band (estimated)
                        </p>
                        <p
                          className={`mt-0.5 text-xl font-bold tabular-nums ${row.bandColor}`}
                        >
                          {row.band}
                        </p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.6875rem] text-[#94A3B8]">
                          Top improvement
                        </p>
                        <p className="mt-0.5 text-sm leading-5 text-[#475569]">
                          {row.tip}
                        </p>
                      </div>
                      <span className="hidden text-[#CBD5E1] sm:block" aria-hidden>
                        <ChevronRightIcon />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function ChartTaskIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
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

function DocTaskIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M6 2.5h6l3.5 3.5V17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 2.5v3.5h3.5M7.5 10h5M7.5 13h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailTaskIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m3.5 6.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarSnapIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="3"
        y="4.5"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 8h14M7 3v3M13 3v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 5.5h10M5 1.5v2M9 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6.2V9.5M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
