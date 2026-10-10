"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function PremiumRestore() {
  return (
    <DashboardShell
      title={<span className="sr-only">Restore Purchase</span>}
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-4 py-8 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center pb-10 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8] shadow-sm">
          <RestoreIcon />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#141B2B] sm:text-3xl">
          Restore Purchase
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-[#64748B]">
          If you&apos;ve previously subscribed on this or another device, tap below to
          restore your Premium access.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.16)] sm:p-6">
          <button
            type="button"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_10px_20px_-10px_rgba(43,92,230,0.7)] transition hover:bg-[#244FE6]"
          >
            <RestoreIcon className="size-4 text-white" />
            Restore Purchase
          </button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Or
            </span>
            <span className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          <div className="flex flex-col items-start gap-3 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-3 sm:flex-row sm:items-center">
            <InfoIcon />
            <p className="flex-1 text-left text-xs leading-5 text-[#64748B] sm:text-sm">
              If you&apos;re having trouble restoring your purchase, our support team is
              here to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#2b5ce6]"
            >
              <MailIcon />
              Contact Support
            </Link>
          </div>
        </div>

        <Link
          href="/dashboard/premium"
          className="mt-5 text-sm font-bold text-[#2b5ce6] transition hover:underline"
        >
          Cancel
        </Link>

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#94A3B8]">
          <LockTiny />
          Your information is secure and private.
        </p>
      </div>
    </DashboardShell>
  );
}

function RestoreIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden>
      <path
        d="M15.5 7.2A6 6 0 0 0 4.8 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.5 3.8V7h3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 12.8A6 6 0 0 0 15.2 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15.5 16.2V13h-3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7v4M8 5.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="1.5" y="3" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="m2.5 4 4.5 3.5L11.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
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
