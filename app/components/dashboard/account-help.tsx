"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

const TOPICS = [
  {
    title: "Microphone issues",
    description: "Troubleshoot mic problems and...",
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#7C3AED]",
    Icon: MicTopic,
  },
  {
    title: "Browser permission fixes",
    description: "Learn how to allow camera and...",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
    Icon: ShieldTopic,
  },
  {
    title: "Scores explained",
    description: "Understand how your practice...",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    Icon: QuestionTopic,
  },
  {
    title: "AI estimates to 10-90",
    description: "Learn about Linguatude AI...",
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    Icon: ChartTopic,
  },
  {
    title: "Billing & refunds",
    description: "Payments, refunds and billing...",
    iconBg: "bg-[#FFEDD5]",
    iconColor: "text-[#EA580C]",
    Icon: CardTopic,
  },
  {
    title: "Plans and cancellations",
    description: "Manage your plan or cancel your...",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
    Icon: CalTopic,
  },
] as const;

const ISSUE_OPTIONS = [
  "Score seems too high",
  "Score seems too low",
  "Feedback doesn't match my response",
  "Audio / recording issue affected scoring",
  "Other",
];

export function AccountHelp() {
  const [query, setQuery] = useState("");
  const [issue, setIssue] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOPICS;
    return TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <DashboardShell
      title="Help & Support"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-6 pb-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-5">
          <label className="relative block">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles..."
              className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-sm text-[#141B2B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2b5ce6]"
            />
          </label>

          <div>
            <h3 className="text-base font-bold text-[#141B2B]">Help topics</h3>
            {filtered.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {filtered.map((topic) => (
                  <button
                    key={topic.title}
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-left transition hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${topic.iconBg} ${topic.iconColor}`}
                    >
                      <topic.Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#141B2B]">
                        {topic.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#64748B]">
                        {topic.description}
                      </span>
                    </span>
                    <span className="text-[#CBD5E1]" aria-hidden>
                      ›
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
                  <SearchIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#141B2B]">
                    No matching help articles found.
                  </p>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    Try different keywords or contact our support team for help.
                  </p>
                </div>
                <a
                  href="mailto:support@linguatude.com"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#5D5CDE] bg-white px-4 text-sm font-semibold text-[#5D5CDE] transition hover:bg-[#F5F5FF]"
                >
                  Contact Support
                </a>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <ContactCard
              Icon={MailIcon}
              title="support@linguatude.com"
              description="Email us anytime and we'll get back to you."
              actionLabel="Contact Support"
              href="mailto:support@linguatude.com"
            />
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#DDD6FE] bg-[#F5F5FF] p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
                <ChatIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#141B2B]">
                  Report a scoring concern
                </p>
                <p className="mt-0.5 text-sm text-[#64748B]">
                  Let us know if you believe there&apos;s an issue with your AI scoring
                  or feedback.
                </p>
              </div>
              <a
                href="#report"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#5D5CDE] bg-white px-4 text-sm font-semibold text-[#5D5CDE] transition hover:bg-white/80"
              >
                Report a scoring concern
              </a>
            </div>
          </div>

          <p className="text-sm text-[#64748B]">
            Prefer chat?{" "}
            <Link
              href="/dashboard/help-center"
              className="font-semibold text-[#2b5ce6] hover:underline"
            >
              Open Ayra Help Center
            </Link>
          </p>
        </div>

        <aside
          id="report"
          className="w-full shrink-0 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm lg:sticky lg:top-5 lg:w-[380px]"
        >
          <h3 className="text-lg font-bold text-[#141B2B]">
            Report a scoring concern
          </h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Tell us more so we can investigate.
          </p>

          <ol className="mt-4 flex items-center gap-2 text-xs font-semibold">
            <li className="inline-flex items-center gap-1.5 text-[#7C3AED]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                1
              </span>
              Details
            </li>
            <li className="h-px flex-1 bg-[#E2E8F0]" aria-hidden />
            <li className="inline-flex items-center gap-1.5 text-[#94A3B8]">
              <span className="flex size-6 items-center justify-center rounded-full border border-[#CBD5E1]">
                2
              </span>
              Review
            </li>
            <li className="h-px flex-1 bg-[#E2E8F0]" aria-hidden />
            <li className="inline-flex items-center gap-1.5 text-[#94A3B8]">
              <span className="flex size-6 items-center justify-center rounded-full border border-[#CBD5E1]">
                3
              </span>
              Submit
            </li>
          </ol>

          {submitted ? (
            <div className="mt-5 rounded-xl bg-[#ECFDF5] px-4 py-4 text-sm text-[#166534]">
              <p className="font-bold">Concern submitted</p>
              <p className="mt-1">
                Thanks — our team will review this and follow up by email.
              </p>
            </div>
          ) : (
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="text-sm font-bold text-[#141B2B]">
                  Activity / attempt
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E2E8F0] px-3 py-3">
                  <span className="text-[#64748B]">
                    <DocIcon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#141B2B]">
                      IELTS Band 6.5 — Practice
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Repeat Sentence · Attempt 2
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#7C3AED] hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="issue"
                  className="text-sm font-bold text-[#141B2B]"
                >
                  What seems wrong?
                </label>
                <select
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#141B2B] outline-none focus:border-[#2b5ce6]"
                  required
                >
                  <option value="">Select an option</option>
                  {ISSUE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="text-sm font-bold text-[#141B2B]"
                >
                  Tell us more
                </label>
                <div className="relative mt-2">
                  <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value.slice(0, 1000))}
                    placeholder="Please describe the issue in detail..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[#E2E8F0] px-3 py-3 text-sm text-[#141B2B] outline-none focus:border-[#2b5ce6]"
                    required
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-[#94A3B8]">
                    {details.length} / 1000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#244FE6]"
              >
                Submit Concern
              </button>
            </form>
          )}
        </aside>
      </div>
    </DashboardShell>
  );
}

function ContactCard({
  Icon,
  title,
  description,
  actionLabel,
  href,
}: {
  Icon: () => React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#141B2B]">{title}</p>
        <p className="mt-0.5 text-sm text-[#64748B]">{description}</p>
      </div>
      <a
        href={href}
        className="inline-flex h-10 items-center justify-center rounded-xl border border-[#5D5CDE] bg-white px-4 text-sm font-semibold text-[#5D5CDE] transition hover:bg-[#F5F5FF]"
      >
        {actionLabel}
      </a>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12 12 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MicTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="6" y="2.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 8a4 4 0 0 0 8 0M8 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ShieldTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.2 13 4.2v3.2c0 2.7-1.8 4.6-5 5.3-3.2-.7-5-2.6-5-5.3V4.2L8 2.2Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function QuestionTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 6.2a1.6 1.6 0 0 1 3.1.7c0 1-1.5 1.3-1.5 2.3M8 11.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChartTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 12.5V8M7 12.5V5M10.5 12.5V7M14 12.5V3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CardTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CalTopic() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 6.5h11M5.5 2.5v2M10.5 2.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m4 6.5 6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h7A2.5 2.5 0 0 1 16 5.5v5A2.5 2.5 0 0 1 13.5 13H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 10.5v-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M5 2.5h5.5L14 6v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
