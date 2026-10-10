import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const RECENT = [
  {
    title: "Practice Mode, Aug 21",
    band: "Band 6.5",
    tag: "Fluency",
    border: "border-l-[#2b5ce6]",
    cardBg: "bg-[#F5F8FF]",
    tagText: "text-[#2b5ce6]",
    iconBg: "bg-[#EEF2FF]",
    Icon: ChatSessionIcon,
  },
  {
    title: "Exam Simulation, Aug 18",
    band: "Band 6.0",
    tag: "Vocabulary",
    border: "border-l-[#7C3AED]",
    cardBg: "bg-[#F9F5FF]",
    tagText: "text-[#7C3AED]",
    iconBg: "bg-[#F3E8FF]",
    Icon: WaveSessionIcon,
  },
  {
    title: "Practice Mode, Aug 15",
    band: "Band 6.5",
    tag: "Grammar",
    border: "border-l-[#16A34A]",
    cardBg: "bg-[#F3FCF6]",
    tagText: "text-[#16A34A]",
    iconBg: "bg-[#DCFCE7]",
    Icon: SpeakSessionIcon,
  },
] as const;

export function SpeakHome() {
  return (
    <DashboardShell
      title="Speaking"
      headerRight={
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/streak"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1.5 text-sm font-semibold text-[#EA580C] ring-1 ring-[#FED7AA]/80"
          >
            <FlameIcon className="size-4 text-[#F97316]" />
            7 Day Streak
          </Link>
          <NotificationBellButton />
        </div>
      }
    >
      <div className="mx-auto max-w-6xl space-y-5 lg:space-y-6">
        {/* Practice modes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] border-l-[3px] border-l-[#F97316] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#FFEDD5] text-[#EA580C]">
              <MicModeIcon />
            </span>
            <h2 className="mt-4 text-lg font-bold text-[#141B2B]">
              Practice Mode
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
              AI coach gives feedback between every response.
            </p>
            <Link
              href="/dashboard/speak/setup"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#EA580C] transition hover:underline"
            >
              Start Practice
              <span aria-hidden>→</span>
            </Link>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] border-l-[3px] border-l-[#2b5ce6] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
              <ClipboardModeIcon />
            </span>
            <h2 className="mt-4 text-lg font-bold text-[#141B2B]">
              Exam Simulation
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-[#64748B]">
              Full IELTS-style assessment with strict band scoring.
            </p>
            <Link
              href="/dashboard/speak/exam"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              Start Simulation
              <span aria-hidden>→</span>
            </Link>
          </section>
        </div>

        {/* Speaking Snapshot */}
        <section>
          <h2 className="text-lg font-bold text-[#141B2B]">
            Speaking Snapshot
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#EFF6FF] px-5 py-4 text-center sm:py-5">
              <p className="text-sm font-medium text-[#64748B]">
                Speaking estimate
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-[#2b5ce6]">
                6.5
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                (estimated)
              </p>
            </div>
            <div className="rounded-2xl bg-[#EFF6FF] px-5 py-4 text-center sm:py-5">
              <p className="text-sm font-medium text-[#64748B]">Last session</p>
              <p className="mt-2 text-xl font-bold text-[#141B2B] sm:text-2xl">
                Aug 21, 2026
              </p>
            </div>
            <div className="rounded-2xl bg-[#EFF6FF] px-5 py-4 text-center sm:py-5">
              <p className="text-sm font-medium text-[#64748B]">
                Sessions completed
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-[#2b5ce6]">
                12
              </p>
            </div>
          </div>
        </section>

        {/* Recent sessions + tip */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#141B2B]">
                Recent sessions
              </h2>
              <Link
                href="/dashboard/speak"
                className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {RECENT.map((row) => {
                const Icon = row.Icon;
                return (
                  <li key={row.title}>
                    <div
                      className={`flex items-center gap-3 rounded-2xl border border-[#E2E8F0] border-l-[3px] p-3.5 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.18)] sm:gap-4 sm:p-4 ${row.border} ${row.cardBg}`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${row.iconBg}`}
                      >
                        <Icon />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#141B2B] sm:text-base">
                          {row.title}{" "}
                          <span className="font-semibold text-[#64748B]">
                            • {row.band}
                          </span>
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-0.5 rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-sm sm:text-sm ${row.tagText}`}
                      >
                        {row.tag}
                        <ChevronRightIcon className="size-3.5" />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className="self-start rounded-2xl border border-[#FDE68A]/70 bg-[#FEFCE8] p-5 shadow-[0_4px_14px_-8px_rgba(15,23,42,0.12)]">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#FFEDD5] text-[#F59E0B]">
                  <BulbIcon />
                </span>
                <h2 className="text-base font-bold text-[#EA580C]">
                  Speaking tip
                </h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#44403C]">
                Don&apos;t just give one-word answers. Always try to expand your
                response by adding a reason or an example.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#EA580C] transition hover:underline"
              >
                Next tip
                <span aria-hidden>→</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function MicModeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="7.5"
        y="2.5"
        width="5"
        height="9"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClipboardModeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="4"
        y="3.5"
        width="12"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 3.5V3a1.5 1.5 0 0 1 1.5-1h2A1.5 1.5 0 0 1 12.5 3v.5M7 9h6M7 12h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatSessionIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 10.5v-5Z"
        stroke="#2b5ce6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaveSessionIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M3 10h1.5M6 7v6M9 5v10M12 7.5v5M15 9v2M17.5 10H19"
        stroke="#7C3AED"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakSessionIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="8" cy="7" r="2.5" stroke="#16A34A" strokeWidth="1.5" />
      <path
        d="M3.5 15.5c.9-2 2.5-3 4.5-3s3.6 1 4.5 3"
        stroke="#16A34A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 6.5c.8.6 1.3 1.5 1.3 2.5s-.5 1.9-1.3 2.5M15.5 5c1.2.9 2 2.3 2 4s-.8 3.1-2 4"
        stroke="#16A34A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M4.5 2.5 8 6 4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
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
