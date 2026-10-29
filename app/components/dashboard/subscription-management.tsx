"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

const SUBSCRIPTIONS = [
  {
    id: "pte",
    badge: "PTE",
    title: "PTE Academic",
    planLabel: "Premium Plan",
    description:
      "Access AI practice, full mock tests, performance tracking and more.",
    renewsOn: "14 Mar 2027",
    plan: "Monthly",
    manageHref: "/dashboard/account/subscription/active",
    art: "/subscription/PTE Academic.svg",
    theme: {
      card: "border-[#BFDBFE] bg-[linear-gradient(160deg,#EFF6FF_0%,#F8FBFF_55%,#FFFFFF_100%)]",
      badge: "bg-[#2b5ce6] text-white",
      accent: "text-[#2b5ce6]",
      iconBg: "bg-[#DBEAFE] text-[#2b5ce6]",
      button:
        "border-[#BFDBFE] text-[#2b5ce6] hover:bg-[#EFF6FF]",
    },
  },
  {
    id: "ielts",
    badge: "IELTS",
    title: "IELTS Academic",
    planLabel: "Premium Plan",
    description:
      "Access AI practice, full mock tests, performance tracking and detailed feedback.",
    renewsOn: "14 Mar 2027",
    plan: "Monthly",
    manageHref: "/dashboard/account/subscription/active",
    art: "/subscription/IELTS Academic.svg",
    theme: {
      card: "border-[#E9D5FF] bg-[linear-gradient(160deg,#F5F3FF_0%,#FAF8FF_55%,#FFFFFF_100%)]",
      badge: "bg-[#7C3AED] text-white",
      accent: "text-[#7C3AED]",
      iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
      button:
        "border-[#E9D5FF] text-[#7C3AED] hover:bg-[#F5F3FF]",
    },
  },
] as const;

export function SubscriptionManagement() {
  return (
    <DashboardShell
      title="Subscription Management"
      subtitle="View and manage your active subscriptions for PTE and IELTS."
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-4 pb-6">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {SUBSCRIPTIONS.map((sub) => (
            <article
              key={sub.id}
              className={`overflow-hidden rounded-2xl border p-4 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.2)] sm:p-5 ${sub.theme.card}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-extrabold tracking-wide ${sub.theme.badge}`}
                >
                  {sub.badge}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-[#141B2B] sm:text-lg">
                        {sub.title}
                      </h2>
                      <p className="text-sm text-[#64748B]">{sub.planLabel}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                      <span
                        className="size-1.5 rounded-full bg-[#22C55E]"
                        aria-hidden
                      />
                      Active
                    </span>
                  </div>
                </div>
                <div className="hidden w-[5.5rem] shrink-0 sm:block">
                  <Image
                    src={sub.art}
                    alt=""
                    width={120}
                    height={120}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-center sm:hidden">
                <Image
                  src={sub.art}
                  alt=""
                  width={120}
                  height={120}
                  className="h-auto w-[6.5rem]"
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                {sub.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-white/80 bg-white px-3 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className={sub.theme.accent}>
                      <CalendarIcon />
                    </span>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Renews on
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#141B2B]">
                    {sub.renewsOn}
                  </p>
                </div>
                <div className="rounded-xl border border-white/80 bg-white px-3 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className={sub.theme.accent}>
                      <CardIcon />
                    </span>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Plan
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#141B2B]">
                    {sub.plan}
                  </p>
                </div>
              </div>

              <Link
                href={sub.manageHref}
                className={`mt-4 inline-flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 text-sm font-semibold transition ${sub.theme.button}`}
              >
                <span className="inline-flex items-center gap-2">
                  <GearIcon />
                  Manage Subscription
                </span>
                <span aria-hidden>›</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
            i
          </span>
          <p className="text-sm leading-relaxed text-[#334155]">
            You can manage each subscription separately. If you need to switch
            plans or have any issues, please{" "}
            <Link
              href="/dashboard/account/help"
              className="font-semibold text-[#2b5ce6] hover:underline"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect
        x="2"
        y="3"
        width="10"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2 6h10M5 1.75v2M9 1.75v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect
        x="1.75"
        y="3.5"
        width="10.5"
        height="7"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M1.75 6h10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 2.5v1.2M8 12.3v1.2M2.5 8h1.2M12.3 8h1.2M4.1 4.1l.85.85M11.05 11.05l.85.85M11.9 4.1l-.85.85M4.95 11.05l-.85.85"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
