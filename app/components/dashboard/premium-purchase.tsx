"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const FEATURES = [
  "100 AI Speaking + Writing attempts / month",
  "3 full mock tests / month",
  "IELTS & PTE Academic preparation",
  "Adaptive learning plan",
  "Complete band score progress tracking",
  "Preparation completion certificates",
] as const;

type Plan = "monthly" | "annual";

export function PremiumPurchase() {
  const [plan, setPlan] = useState<Plan>("annual");
  const [showCloseTip, setShowCloseTip] = useState(false);

  return (
    <DashboardShell
      title={<span className="sr-only">Premium</span>}
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-6 sm:px-[1cm] lg:px-[1cm]"
      headerRight={
        <div className="relative">
          <Link
            href="/dashboard/mock"
            className="inline-flex size-9 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#64748B]"
            aria-label="Close"
            onMouseEnter={() => setShowCloseTip(true)}
            onMouseLeave={() => setShowCloseTip(false)}
          >
            <CloseIcon />
          </Link>
          {showCloseTip ? (
            <span className="absolute right-0 top-full mt-1 rounded bg-[#141B2B] px-2 py-1 text-[0.625rem] font-bold tracking-wide text-white">
              CLOSE
            </span>
          ) : null}
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center pb-10 text-center">
        <div className="relative flex size-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#DBEAFE]/60" aria-hidden />
          <span className="relative flex size-14 items-center justify-center rounded-full border-2 border-[#2b5ce6] bg-white text-[#2b5ce6]">
            <LockIcon />
          </span>
        </div>

        <h1 className="mt-5 text-balance text-2xl font-bold tracking-tight text-[#141B2B] sm:text-3xl">
          Unlock your full learning experience
        </h1>
        <p className="mt-2 text-sm text-[#64748B] sm:text-base">
          Upgrade to Premium to continue.
        </p>

        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setPlan("monthly")}
            className={`rounded-2xl border-2 px-5 py-5 text-left transition ${
              plan === "monthly"
                ? "border-[#2b5ce6] bg-white shadow-sm"
                : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Radio checked={plan === "monthly"} />
              <span className="text-base font-semibold text-[#141B2B]">Monthly</span>
            </div>
            <p className="mt-3">
              <span className="text-3xl font-bold tabular-nums text-[#141B2B]">$3.99</span>
              <span className="text-sm text-[#64748B]"> /month</span>
            </p>
            <div className="mt-4 flex justify-center">
              <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#2563EB]">
                7-day free trial
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPlan("annual")}
            className={`relative rounded-2xl border-2 px-5 py-5 text-left transition ${
              plan === "annual"
                ? "border-[#2b5ce6] bg-white shadow-sm"
                : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
            }`}
          >
            <span className="absolute -top-2.5 right-4 rounded-full bg-[#FDBA74] px-2.5 py-0.5 text-[0.6875rem] font-bold text-white">
              Best Value
            </span>
            <div className="flex items-center gap-2.5">
              <Radio checked={plan === "annual"} />
              <span className="text-base font-semibold text-[#141B2B]">Annual</span>
            </div>
            <p className="mt-3">
              <span className="text-3xl font-bold tabular-nums text-[#141B2B]">$24.99</span>
              <span className="text-sm text-[#64748B]"> /year</span>
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">(only $2.08/month)</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D]">
                Save 48%
              </span>
              <span className="rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-bold text-[#2563EB]">
                7-day free trial
              </span>
            </div>
          </button>
        </div>

        <div className="mt-6 w-full rounded-2xl bg-[#F0FDF4] px-5 py-5 text-left sm:px-6">
          <h2 className="text-base font-bold text-[#141B2B]">
            Everything Premium includes
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#334155]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white">
                  <CheckMini />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <ShieldIcon />, label: "Cancel anytime" },
            { icon: <CalendarIcon />, label: "7-day free trial" },
            { icon: <StarIcon />, label: "4.8 ★ rated" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-sm font-semibold text-[#141B2B] shadow-sm"
            >
              <span className="text-[#2b5ce6]">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <Link
          href={`/dashboard/premium/confirm?plan=${plan}`}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-base font-bold text-white shadow-[0_10px_20px_-10px_rgba(43,92,230,0.7)] transition hover:bg-[#244FE6]"
        >
          <SparkleIcon />
          Start 7-Day Free Trial
        </Link>

        <p className="mt-3 max-w-md text-center text-xs leading-5 text-[#94A3B8]">
          Then {plan === "annual" ? "$24.99/year" : "$3.99/month"}. Cancel before{" "}
          <span className="text-[#2b5ce6]">31 Aug 2026</span> to avoid charge. Trial
          requires a payment method. Your trial ends after 7 days unless cancelled.
        </p>

        <p className="mt-4 text-sm text-[#2b5ce6]">
          Already Premium?{" "}
          <Link href="/dashboard/premium/restore" className="font-semibold underline">
            Restore purchase
          </Link>
        </p>
      </div>
    </DashboardShell>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex size-5 items-center justify-center rounded-full border-2 ${
        checked ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
      }`}
    >
      {checked ? <span className="size-2.5 rounded-full bg-[#2b5ce6]" /> : null}
    </span>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-7" fill="none" aria-hidden>
      <rect x="5" y="10" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V7.5a3 3 0 0 1 6 0V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5" fill="none" aria-hidden>
      <path d="M2 5.2 4 7l4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M9 2.5 14.5 5v3.8c0 3-2 5.2-5.5 6C5.5 14 3.5 11.8 3.5 8.8V5L9 2.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m6.5 8.5 1.8 1.8 3.4-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="4.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h12M6.5 3v3M11.5 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="m9 2.5 1.8 3.7 4 .6-2.9 2.8.7 4L9 11.8l-3.6 1.8.7-4L3.2 6.8l4-.6L9 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#FBBF24]" fill="currentColor" aria-hidden>
      <path d="M8 1.5 9.2 5.5 13.5 6.5 9.2 7.5 8 11.5 6.8 7.5 2.5 6.5l4.3-1L8 1.5Z" />
    </svg>
  );
}
