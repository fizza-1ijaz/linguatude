"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

function PremiumConfirmInner() {
  const params = useSearchParams();
  const plan = params.get("plan") === "monthly" ? "monthly" : "annual";
  const [showCloseTip, setShowCloseTip] = useState(false);

  const price = plan === "annual" ? "$24.99" : "$3.99";
  const period = plan === "annual" ? "/year" : "/month";
  const billingLabel = plan === "annual" ? "Annual" : "Monthly";
  const renewText =
    plan === "annual"
      ? "$24.99 every year until cancelled"
      : "$3.99 every month until cancelled";

  return (
    <DashboardShell
      title={<span className="sr-only">Confirm Trial</span>}
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-6"
      headerRight={
        <div className="relative">
          <Link
            href="/dashboard/premium"
            className="inline-flex size-9 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F1F5F9]"
            aria-label="Close"
            onMouseEnter={() => setShowCloseTip(true)}
            onMouseLeave={() => setShowCloseTip(false)}
          >
            <CloseIcon />
          </Link>
          {showCloseTip ? (
            <span className="absolute right-0 top-full z-10 mt-1 rounded bg-[#141B2B] px-2 py-1 text-[0.625rem] font-bold tracking-wide text-white">
              CLOSE
            </span>
          ) : null}
        </div>
      }
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center pb-10">
        <div className="flex size-[4.25rem] items-center justify-center rounded-full border-[2.5px] border-[#FB923C] bg-white text-[#F97316] shadow-[0_0_28px_rgba(249,115,22,0.28)]">
          <StarOutline />
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold text-[#141B2B] sm:text-[1.875rem]">
          Confirm Your Trial
        </h1>

        <div className="mt-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1D4ED8]">
              <CrownIcon />
            </span>
            <div className="min-w-0 text-left">
              <p className="text-sm font-bold text-[#141B2B]">
                IELTS Premium — {billingLabel}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <p className="text-sm">
                  <span className="font-bold text-[#141B2B]">{price}</span>
                  <span className="text-[#64748B]"> {period}</span>
                </p>
                <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[0.6875rem] font-bold text-[#2563EB]">
                  7-day free trial
                </span>
              </div>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <CalendarTiny />
            </span>
            <div className="text-left leading-tight">
              <p className="text-[0.6875rem] text-[#94A3B8]">Billing</p>
              <p className="text-sm font-bold text-[#141B2B]">{billingLabel}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full rounded-2xl border border-[#E2E8F0] p-4 text-left sm:p-5">
          <p className="text-sm font-bold text-[#475569]">Billing details</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
            <BillingRow
              n={1}
              icon={<CalendarTiny />}
              left={
                <>
                  <span className="font-bold text-[#141B2B]">Trial starts today</span>{" "}
                  <span className="text-[#475569]">no charge for 7 days.</span>
                </>
              }
            />
            <BillingRow
              n={2}
              icon={<BoltCardIcon />}
              left={<span className="font-semibold text-[#475569]">First charge:</span>}
              right={
                <span className="font-bold text-[#141B2B]">Thursday, 29 May {price}</span>
              }
            />
            <BillingRow
              n={3}
              icon={<RefreshIcon />}
              left={<span className="font-semibold text-[#475569]">Then:</span>}
              right={<span className="font-bold text-[#141B2B]">{renewText}</span>}
              last
            />
          </div>
        </div>

        <Link
          href="/dashboard/premium/welcome"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          <LockTiny />
          Confirm &amp; Add Payment Method
        </Link>

        <Link
          href="/dashboard/premium"
          className="mt-4 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
        >
          Cancel — go back
        </Link>

        <p className="mt-5 inline-flex max-w-sm items-center justify-center gap-1.5 text-center text-xs leading-5 text-[#64748B]">
          <LockTiny className="shrink-0 text-[#141B2B]" />
          Your payment information is secure and encrypted. You can cancel anytime.
        </p>
      </div>
    </DashboardShell>
  );
}

function BillingRow({
  n,
  icon,
  left,
  right,
  last,
}: {
  n: number;
  icon: ReactNode;
  left: ReactNode;
  right?: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-3.5 sm:gap-3 sm:px-4 ${
        last ? "" : "border-b border-[#E2E8F0]"
      }`}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-bold text-[#1D4ED8]">
        {n}
      </span>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#2b5ce6]">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
        <span className="min-w-0">{left}</span>
        {right ? <span className="text-right">{right}</span> : null}
      </div>
    </div>
  );
}

export function PremiumConfirm() {
  return (
    <Suspense fallback={null}>
      <PremiumConfirmInner />
    </Suspense>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StarOutline() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <path
        d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.4l.9-5.4-3.9-3.8 5.4-.8L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path
        d="M3 12.5 4.5 5.5 7.5 8 9 4.5 10.5 8 13.5 5.5 15 12.5H3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 14h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CalendarTiny() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7h11M5.5 2.5v2M10.5 2.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BoltCardIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8.8 6.2 7 9.2h2.2L7.4 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M13 8a5 5 0 1 1-1.4-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M13 3.5V6.5H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockTiny({ className = "text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`size-3.5 ${className}`} fill="none" aria-hidden>
      <rect x="3" y="6" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
