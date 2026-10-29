"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

export type FreeAfterVariant = "trial-cancelled" | "premium-expired";

const COPY: Record<
  FreeAfterVariant,
  { badge: string; title: string; subtitle: string }
> = {
  "trial-cancelled": {
    badge: "Free Mode",
    title: "Your trial was cancelled",
    subtitle:
      "You're now on the free plan. You can still access your past progress and try a few things for free.",
  },
  "premium-expired": {
    badge: "Free Mode",
    title: "Your premium has expired",
    subtitle:
      "You're now on the free plan. You can still access your past progress and try a few things for free.",
  },
};

const CONTINUE = [
  {
    title: "Past Scores",
    description: "View your previous results",
    href: "/dashboard/progress/history",
    iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
    Icon: DocIcon,
  },
  {
    title: "Mocks",
    description: "Access your past mock tests",
    href: "/dashboard/mock",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    Icon: MonitorIcon,
  },
  {
    title: "Feedback",
    description: "See your AI and mock feedback",
    href: "/dashboard/speak/feedback",
    iconBg: "bg-[#DCFCE7] text-[#16A34A]",
    Icon: ChatIcon,
  },
] as const;

export function SubscriptionFreeAfter({
  variant,
}: {
  variant: FreeAfterVariant;
}) {
  const copy = COPY[variant];

  return (
    <DashboardShell
      title="Subscription"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-[#EDE9FE] px-2.5 py-1 text-xs font-semibold text-[#6D28D9]">
            PTE 64
          </span>
          <AccountHeaderRight />
        </div>
      }
    >
      <div className="flex w-full flex-col gap-5 pb-6">
        {/* Hero status card */}
        <section className="relative overflow-hidden rounded-2xl border border-[#DBEAFE] bg-[linear-gradient(135deg,#F0F5FF_0%,#EEF2FF_100%)] p-5 shadow-sm sm:p-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
            <ClockIcon />
            {copy.badge}
          </span>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-extrabold tracking-tight text-[#141B2B] sm:text-[1.375rem]">
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                {copy.subtitle}
              </p>
            </div>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] sm:size-16">
              <CrownIcon />
            </span>
          </div>
        </section>

        {/* Free allowance */}
        <section>
          <h3 className="text-base font-bold text-[#141B2B]">
            Your free allowance
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                  <SparkIcon />
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-[#141B2B]">
                  5
                </span>
              </div>
              <p className="mt-3 text-sm font-bold text-[#141B2B]">
                AI attempts
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                Use AI for practice questions, explanations and tips.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
                  <MockDocIcon />
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-[#141B2B]">
                  0
                </span>
              </div>
              <p className="mt-3 text-sm font-bold text-[#141B2B]">Full mocks</p>
              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                You can&apos;t take full mock tests in free mode.
              </p>
            </div>
          </div>
        </section>

        {/* Info banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
            i
          </span>
          <p className="text-sm leading-relaxed text-[#334155]">
            Your past scores, mocks and feedback are still available. You can
            view them anytime.
          </p>
        </div>

        {/* Continue learning */}
        <section>
          <h3 className="text-base font-bold text-[#141B2B]">
            Continue learning
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {CONTINUE.map((item) => (
              <li key={item.title} className="min-w-0">
                <Link
                  href={item.href}
                  className="flex h-full items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3.5 shadow-sm transition hover:bg-[#F8FAFC]"
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                  >
                    <item.Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#141B2B]">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#64748B]">{item.description}</p>
                  </div>
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col items-center gap-3 pt-1">
          <Link
            href="/dashboard/premium"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6]"
          >
            Upgrade to Premium
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/dashboard/premium"
            className="text-sm font-semibold text-[#2b5ce6] transition hover:underline"
          >
            Compare plans
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 4.5V7l1.75 1.25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 28 28" className="size-7" fill="none" aria-hidden>
      <path
        d="M5 18.5 7 8.5l4.5 4L14 7l2.5 5.5 4.5-4 2 10H5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 21.5h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M9 3.5 10.2 7.8 14.5 9 10.2 10.2 9 14.5 7.8 10.2 3.5 9l4.3-1.2L9 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MockDocIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <rect
        x="4"
        y="2.5"
        width="10"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M7 6.5h4M7 9.5h4M7 12.5h2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="4.5"
        y="2.5"
        width="11"
        height="15"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7.5 7h5M7.5 10h5M7.5 13h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="4"
        width="15"
        height="9.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7.5 16.5h5M10 13.5v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M4 4.5h12a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 16 13.5H9l-3.5 2.5V13.5H4A1.5 1.5 0 0 1 2.5 12V6A1.5 1.5 0 0 1 4 4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
