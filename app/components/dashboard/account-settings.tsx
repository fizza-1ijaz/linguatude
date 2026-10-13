"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { AccountHeaderRight } from "@/app/components/dashboard/account-shared";

const LINKS = [
  { href: "/dashboard/account/profile", label: "Profile", Icon: UserIcon },
  { href: "/dashboard/account/notifications", label: "Notifications", Icon: BellIcon },
  { href: "/dashboard/account/speaking", label: "Speaking prefs", Icon: MicIcon },
  { href: "/dashboard/account/subscription", label: "Subscription", Icon: CardIcon },
  { href: "/dashboard/account/privacy", label: "Privacy & data", Icon: ShieldIcon },
  { href: "/dashboard/account/help", label: "Help & support", Icon: HeadsetIcon },
] as const;

export function AccountSettings() {
  return (
    <DashboardShell
      title="Account & Settings"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <section className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.14)]">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
            <UserBig />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-bold text-[#141B2B]">Sarah Ahmed</p>
            <p className="text-sm text-[#64748B]">sarah@example.com</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b5ce6]">
              <CrownTiny />
              IELTS Premium · Annual
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          {LINKS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-4 transition hover:bg-[#F8FAFC] sm:px-5 ${
                i > 0 ? "border-t border-[#E2E8F0]" : ""
              }`}
            >
              <span className="text-[#2b5ce6]">
                <item.Icon />
              </span>
              <span className="flex-1 text-sm font-semibold text-[#141B2B]">
                {item.label}
              </span>
              <span className="text-[#CBD5E1]" aria-hidden>
                ›
              </span>
            </Link>
          ))}
        </section>

        <Link
          href="/dashboard/switch-exam"
          className="text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
        >
          Switch exam (IELTS / PTE)
        </Link>
      </div>
    </DashboardShell>
  );
}

function UserBig() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 19.5c1.4-3 3.8-4.5 6.5-4.5s5.1 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CrownTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M2.5 10 3.5 4.5 5.8 6.5 7 3.5 8.2 6.5 10.5 4.5 11.5 10H2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <circle cx="9" cy="6.5" r="2.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 14.5c1-2.2 2.8-3.3 5-3.3s4 1.1 5 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M9 2.5a4 4 0 0 0-4 4v1.8c0 .5-.2 1-.5 1.4L3.5 11.5h11l-1-1.8c-.3-.4-.5-.9-.5-1.4V6.5a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 13.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <rect x="6.5" y="2.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 8.5a4.5 4.5 0 0 0 9 0M9 13v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7.5h13M5 11h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <path d="M3.5 10v2a1.5 1.5 0 0 0 1.5 1.5h1V10H5a1.5 1.5 0 0 0-1.5 1.5V10a5.5 5.5 0 1 1 11 0v1.5A1.5 1.5 0 0 1 13 10h-1v3.5h1A1.5 1.5 0 0 0 14.5 12v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
