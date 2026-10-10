"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const BAND_METRICS = [
  { label: "F&C", value: "6.0", color: "text-[#F97316]" },
  { label: "Lex", value: "7.0", color: "text-[#16A34A]" },
  { label: "Gram", value: "6.0", color: "text-[#F97316]" },
  { label: "Pron", value: "6.5", color: "text-[#F97316]" },
] as const;

const PART2_BAND_METRICS = [
  { label: "F&C", value: "6.0", color: "text-[#3B82F6]" },
  { label: "Lex", value: "6.5", color: "text-[#16A34A]" },
  { label: "Gram", value: "6.0", color: "text-[#F97316]" },
  { label: "Pron", value: "7.0", color: "text-[#8B5CF6]" },
] as const;

const PART2_IMPROVEMENTS = [
  {
    level: "High" as const,
    title: "Sentence variety is limited",
    description:
      "Try using more complex and compound sentences to express ideas more naturally.",
  },
  {
    level: "Medium" as const,
    title: "Vocabulary choices are basic",
    description:
      "Use a wider range of specific vocabulary to make your answers more precise and engaging.",
  },
  {
    level: "Medium" as const,
    title: "Grammar accuracy",
    description:
      "Watch subject-verb agreement and article usage in longer sentences.",
  },
  {
    level: "Low" as const,
    title: "Pronunciation",
    description: "A few word stress and linking issues were noticed.",
  },
] as const;

const PART_TITLES: Record<string, string> = {
  "1": "Part 1 Feedback",
  "2": "Part 2 Detail",
  "3": "Part 3 Feedback",
};

export function SpeakFeedback() {
  const searchParams = useSearchParams();
  const part = searchParams.get("part");
  const fromExam = part === "1" || part === "2" || part === "3";

  if (part === "2") {
    return <Part2Detail />;
  }

  return <SpeakFeedbackDefault fromExam={fromExam} part={part} />;
}

function Part2Detail() {
  return (
    <DashboardShell
      title="Part 2 Detail"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href="/dashboard/speak/test-results"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-8 lg:gap-5">
        {/* Your response + estimated band */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Your response</h2>
            <p className="mt-4 text-sm leading-7 text-[#334155] sm:text-[0.9375rem] sm:leading-8">
              I think the neighborhood I grew up in was, <Filler>you know</Filler>,
              pretty quiet and peaceful. There were lots of parks nearby,{" "}
              <Filler>like</Filler>, where kids could play. <Filler>Um</Filler>, the
              people were very friendly and we had, <Pause /> <Filler>basically</Filler>,
              a strong sense of community. <Filler>Uh</Filler>, there are many local
              events where neighbors come together and enjoy their time.
            </p>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <h2 className="text-center text-base font-bold text-[#141B2B]">
              Part 2 estimated band
            </h2>
            <div className="mt-5 flex flex-col items-center">
              <div className="relative flex size-[8.75rem] items-center justify-center">
                <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" aria-hidden>
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#FED7AA"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(6.5 / 9) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <p className="relative text-[2.25rem] font-bold tabular-nums leading-none text-[#F97316]">
                  6.5
                </p>
              </div>
              <p className="mt-3 text-center text-xs text-[#94A3B8]">
                AI-estimated. Not an official result.
              </p>
              <div className="mt-5 grid w-full grid-cols-4 gap-2">
                {PART2_BAND_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-1 py-2.5 text-center"
                  >
                    <p className="text-[0.625rem] font-medium text-[#94A3B8] sm:text-[0.6875rem]">
                      {m.label}
                    </p>
                    <p className={`mt-1 text-sm font-bold tabular-nums sm:text-base ${m.color}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Areas to improve + Better phrasing */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Areas to improve</h2>
            <ul className="mt-4 divide-y divide-[#E2E8F0]">
              {PART2_IMPROVEMENTS.map((row) => (
                <li key={row.title} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <PriorityBadge level={row.level} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#141B2B]">{row.title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#64748B] sm:text-[0.8125rem] sm:leading-5">
                      {row.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">
              Better phrasing example
            </h2>
            <div className="mt-4 rounded-xl bg-[#F3F6FF] p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-0">
                <div className="sm:pr-5">
                  <p className="text-sm font-bold text-[#334155]">You said</p>
                  <p className="mt-2 text-sm italic leading-6 text-[#64748B]">
                    &ldquo;there are many local events where neighbors come together
                    and <span className="font-bold text-[#334155]">basically</span>{" "}
                    enjoy their time.&rdquo;
                  </p>
                </div>
                <div className="border-t border-[#E2E8F0] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <p className="text-sm font-bold text-[#2b5ce6]">Try instead</p>
                  <p className="mt-2 text-sm italic leading-6 text-[#2b5ce6]">
                    &ldquo;there are numerous community events that bring neighbors
                    together, allowing everyone to enjoy meaningful time and build
                    stronger connections.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Pace / Fillers / Duration */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:px-6 sm:py-6">
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:pr-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-[#3B82F6]">
                <TrendUpIcon />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#141B2B]">Pace</p>
                <p className="mt-0.5 text-xl font-bold tabular-nums leading-none text-[#141B2B]">
                  132{" "}
                  <span className="text-sm font-semibold text-[#64748B]">WPM</span>
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#3B82F6]">Good</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#E2E8F0] pt-5 sm:border-l sm:border-t-0 sm:px-5 sm:pt-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#F59E0B]">
                <SpeechBubbleIcon />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#141B2B]">Filler words</p>
                <p className="mt-0.5 text-xl font-bold tabular-nums leading-none text-[#141B2B]">
                  7
                </p>
                <p className="mt-1.5 text-xs font-medium text-[#F59E0B] sm:text-[0.8125rem]">
                  um (3) uh (2) like (1) you know (1)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[#E2E8F0] pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] text-[#10B981]">
                <DurationClockIcon />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#141B2B]">Duration</p>
                <p className="mt-0.5 text-xl font-bold tabular-nums leading-none text-[#141B2B]">
                  01:28
                </p>
                <p className="mt-1.5 text-xs font-medium text-[#10B981] sm:text-[0.8125rem]">
                  128-180 sec recommended
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function PriorityBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const styles = {
    High: "bg-[#FEE2E2] text-[#DC2626]",
    Medium: "bg-[#FEF3C7] text-[#B45309]",
    Low: "bg-[#DCFCE7] text-[#15803D]",
  } as const;
  const arrow = level === "Low" ? "↓" : "↑";

  return (
    <span
      className={`inline-flex w-[4.75rem] shrink-0 items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${styles[level]}`}
    >
      <span aria-hidden>{arrow}</span>
      {level}
    </span>
  );
}

function SpeakFeedbackDefault({
  fromExam,
  part,
}: {
  fromExam: boolean;
  part: string | null;
}) {
  const [showFull, setShowFull] = useState(false);

  return (
    <DashboardShell
      title={fromExam && part ? PART_TITLES[part] : "Your Feedback"}
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-5 sm:px-5 lg:px-6"
      headerLeft={
        <Link
          href={fromExam ? "/dashboard/speak/test-results" : "/dashboard/speak"}
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
      }
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-6 lg:gap-5">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-[#141B2B]">What we heard</h2>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEDD5] px-2.5 py-1 text-xs font-semibold text-[#EA580C]">
                <span className="size-1.5 rounded-full bg-[#F97316]" aria-hidden />
                Filler words highlighted
              </p>
            </div>
            <p
              className={`mt-4 text-sm leading-7 text-[#334155] sm:text-[0.9375rem] sm:leading-8 ${
                showFull ? "" : "line-clamp-6"
              }`}
            >
              I grew up in Lahore which is <Filler>basically</Filler> a large
              city in Pakistan. I think it&apos;s a very beautiful place{" "}
              <Pause /> and it has a lot of history. <Filler>Um</Filler> the
              food is amazing and people are really friendly{" "}
              <Filler>you know</Filler>. <Filler>Like</Filler> I spent most of
              my childhood playing cricket with my friends in their street{" "}
              <Pause /> and those memories are really special to me.
            </p>
            <button
              type="button"
              onClick={() => setShowFull((v) => !v)}
              className="mt-4 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              {showFull ? "Hide full transcript ⌃" : "Show full transcript ⌵"}
            </button>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Estimated Band</h2>
            <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex flex-col items-center">
                <div className="relative flex size-[8.5rem] items-center justify-center sm:size-[9.5rem]">
                  <svg viewBox="0 0 120 120" className="absolute inset-0 size-full" aria-hidden>
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#FFEDD5"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(6.5 / 9) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="relative text-center">
                    <p className="text-3xl font-bold tabular-nums text-[#141B2B] sm:text-4xl">
                      6.5
                    </p>
                    <p className="mt-0.5 text-[0.625rem] font-semibold tracking-wide text-[#94A3B8]">
                      ESTIMATED
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-[11rem] rounded-lg bg-[#F1F5F9] px-2.5 py-2 text-center text-[0.6875rem] leading-4 text-[#64748B]">
                  An estimated score, not an official IELTS result.
                </p>
              </div>

              <div className="grid w-full max-w-xs flex-1 grid-cols-2 gap-2.5 sm:gap-3">
                {BAND_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="relative rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-center"
                  >
                    <span className="absolute right-2 top-2 text-[#CBD5E1]">
                      <InfoIcon />
                    </span>
                    <p className="text-xs font-semibold text-[#64748B]">{m.label}</p>
                    <p className={`mt-1 text-xl font-bold tabular-nums ${m.color}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-xl leading-none"
                aria-hidden
              >
                🐢
              </span>
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Pace</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">
                  128 WPM
                </p>
                <p className="mt-1 text-sm font-semibold text-[#16A34A]">Good pace</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                <ChatBubbleIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#64748B]">Filler words</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">5</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["basically", "like", "you know", "+1"].map((w) => (
                    <span
                      key={w}
                      className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[0.6875rem] font-medium text-[#64748B]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.22)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
                <ClockIcon />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#64748B]">Duration</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#141B2B]">
                  00:52
                </p>
                <p className="mt-1 text-sm font-semibold text-[#2b5ce6]">
                  Recommended: 45—60 sec
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,0.75fr)] lg:gap-5">
          <section className="rounded-2xl border border-[#FED7AA]/60 bg-[#FFFBF5] p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:p-6">
            <h2 className="text-base font-bold text-[#141B2B]">Coach Feedback</h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border-l-[3px] border-l-[#16A34A] bg-white px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white">
                    <StarIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#16A34A]">What worked</p>
                    <p className="mt-1 text-sm leading-6 text-[#334155]">
                      You gave a clear answer and supported your main idea with a
                      relevant example.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-l-[3px] border-l-[#F97316] bg-white px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-white">
                    <PlayIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#EA580C]">Focus on this</p>
                    <p className="mt-1 text-sm leading-6 text-[#334155]">
                      Reduce filler words when moving between ideas. Take a short
                      pause instead of using fillers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 rounded-xl bg-white px-4 py-3.5 sm:grid-cols-2 sm:gap-6">
              <div className="text-left">
                <p className="text-[0.6875rem] font-bold tracking-wide text-[#94A3B8]">
                  YOU SAID
                </p>
                <p className="mt-1 text-sm leading-6 text-[#334155]">
                  &ldquo;Basically, it was a very nice place with a lot of
                  history.&rdquo;
                </p>
              </div>
              <div className="text-left sm:border-l sm:border-[#E2E8F0] sm:pl-6">
                <p className="text-[0.6875rem] font-bold tracking-wide text-[#2b5ce6]">
                  TRY INSTEAD
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[#2b5ce6]">
                  &ldquo;It was a really pleasant place with a lot of
                  history.&rdquo;
                </p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[18rem] flex-1 flex-col rounded-2xl border border-[#BFDBFE]/80 bg-[#EFF6FF] p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.18)] sm:min-h-[20rem] sm:p-6">
            <Link
              href="/dashboard/speak/session"
              className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
            >
              Next question →
            </Link>
            <p className="mt-6 text-center text-sm font-bold leading-6 text-[#141B2B] sm:mt-8 sm:text-base sm:leading-7">
              What do you like most about the area where you grew up?
            </p>
            <div className="mt-auto flex flex-col items-center pt-8">
              <Link
                href="/dashboard/speak/session"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
              >
                <MicSmallIcon />
                Record Response
              </Link>
              <p className="mt-2 text-center text-xs text-[#94A3B8]">
                This will continue your speaking practice.
              </p>
            </div>
          </section>
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/dashboard/speak/session-complete"
            className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-xl bg-[#2b5ce6] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            End Session
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function Filler({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded px-1 py-0.5 bg-[#FEF3C7] font-medium text-[#D97706]">
      {children}
    </mark>
  );
}

function Pause() {
  return <span className="font-medium text-[#EF4444]">[pause]</span>;
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#141b2b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M6 5.2V8.5M6 3.6h.01"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 10.5v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6.5V10l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M3.5 13.5 8 9l3 3 5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 6.5H16.5V10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeechBubbleIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="4"
        width="13"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 9h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DurationClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 7.5V10.5l2 1.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 4.5c1 .5 1.8 1.3 2.3 2.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="m7 1.4 1.5 3.1 3.4.5-2.45 2.4.6 3.4L7 9.2l-3.05 1.6.6-3.4L2.1 5l3.4-.5L7 1.4Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M4.2 2.6v8.8L11.4 7 4.2 2.6Z" />
    </svg>
  );
}

function MicSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="6" y="1.5" width="4" height="8" rx="2" fill="white" />
      <path
        d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
