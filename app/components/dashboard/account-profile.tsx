"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

export function AccountProfile() {
  const [name, setName] = useState("Sarah Ahmed");
  const [email, setEmail] = useState("sarah@example.com");

  return (
    <DashboardShell
      title="Profile"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
          <label className="block">
            <span className="text-sm font-bold text-[#141B2B]">Full name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3.5 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6]"
            />
            <span className="mt-1.5 block text-xs text-[#94A3B8]">
              Enter your full name as it appears on official documents.
            </span>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-bold text-[#141B2B]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3.5 text-sm text-[#141B2B] outline-none transition focus:border-[#2b5ce6]"
            />
            <span className="mt-1.5 block text-xs text-[#94A3B8]">
              Changing your email requires verification to keep your account secure.
            </span>
          </label>
        </section>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          Save Changes
        </button>

        <div className="flex items-start gap-3 rounded-2xl border border-[#DDD6FE] bg-[#F5F3FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-bold text-white">
            i
          </span>
          <div className="text-sm">
            <p className="font-bold text-[#141B2B]">Email change verification</p>
            <p className="mt-0.5 text-[#64748B]">
              If you change your email address, we&apos;ll send a verification link to
              your new email. Your current email will remain active until it&apos;s
              verified.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
