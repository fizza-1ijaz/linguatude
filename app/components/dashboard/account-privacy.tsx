"use client";

import Link from "next/link";
import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
  Toggle,
} from "@/app/components/dashboard/account-shared";

export function AccountPrivacy() {
  const [personalised, setPersonalised] = useState(true);
  const [exportRequested, setExportRequested] = useState(false);

  return (
    <DashboardShell
      title="Data & Privacy"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
              <ShieldCheck />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#141B2B]">
                    Personalised practice
                  </p>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    Use your learning activity to personalise your practice and study
                    recommendations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#64748B]">
                    {personalised ? "On" : "Off"}
                  </span>
                  <Toggle
                    on={personalised}
                    onChange={setPersonalised}
                    label="Personalised practice"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
              <SpeakerIcon />
            </span>
            <div>
              <p className="text-sm font-bold text-[#141B2B]">Speaking audio</p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                Your speaking recordings help us improve feedback quality.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-2.5 py-1 text-xs font-medium text-[#5B5BD6]">
                <ClockTiny />
                Retained for up to 90 days
              </p>
            </div>
          </div>
        </section>

        <h3 className="text-base font-bold text-[#141B2B]">Your data</h3>

        <section className="overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
              <DownloadIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#141B2B]">Download my data</p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                Request a copy of the data we hold about your account and activity.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExportRequested(true)}
              className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-[#2b5ce6] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
            >
              Download my data ›
            </button>
          </div>
          {exportRequested ? (
            <div className="flex items-center gap-2 border-t border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm font-medium text-[#1D4ED8] sm:px-5">
              <CheckCircle />
              Your data export has been requested.
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626]">
              <TrashIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#141B2B]">Delete my account</p>
              <p className="mt-0.5 text-sm text-[#64748B]">
                Permanently delete your account and all associated data.
              </p>
              <p className="mt-1.5 text-sm font-bold text-[#DC2626]">
                This action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-[#DC2626] bg-white px-4 text-sm font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
            >
              Delete my account ›
            </button>
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl bg-[#EEF2FF] px-4 py-4 sm:px-5">
          <span className="mt-0.5 text-[#2b5ce6]">
            <LockIcon />
          </span>
          <div className="text-sm text-[#1E3A8A]">
            <p className="font-bold">We take your privacy seriously.</p>
            <p className="mt-1">
              Your data is handled in accordance with our{" "}
              <Link href="/privacy" className="font-semibold text-[#2b5ce6] hover:underline">
                Privacy Policy
              </Link>{" "}
              and applicable laws.
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function ShieldCheck() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M10 2.5 16 5v4.2c0 3.4-2.3 5.9-6 6.8-3.7-.9-6-3.4-6-6.8V5l6-2.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="m7 9.5 2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4 8v4h2.5L12 15.5V4.5L6.5 8H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14.5 7.5a3 3 0 0 1 0 5M16 5.5a5.5 5.5 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.8V6l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M10 3.5v8M6.5 8.5 10 12l3.5-3.5M4 15.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="m5.5 8 1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M4.5 6h11M8 6V4.5h4V6M6.5 6l.7 9.5h5.6L13.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4.5" fill="none" aria-hidden>
      <rect x="4" y="8" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 8V5.5a2.5 2.5 0 0 1 5 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
