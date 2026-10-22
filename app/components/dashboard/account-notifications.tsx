"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
  Toggle,
} from "@/app/components/dashboard/account-shared";

export function AccountNotifications() {
  const [daily, setDaily] = useState(true);
  const [streak, setStreak] = useState(true);
  const [mock, setMock] = useState(true);
  const [news, setNews] = useState(false);
  const [quiet, setQuiet] = useState(true);
  const [time, setTime] = useState("08:00 AM");
  const [from, setFrom] = useState("10:00 PM");
  const [until, setUntil] = useState("08:00 AM");

  function reset() {
    setDaily(true);
    setStreak(true);
    setMock(true);
    setNews(false);
    setQuiet(true);
    setTime("08:00 AM");
    setFrom("10:00 PM");
    setUntil("08:00 AM");
  }

  return (
    <DashboardShell
      title="Notification Preferences"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <PrefRow
            iconBg="bg-[#EDE9FE]"
            iconColor="text-[#7C3AED]"
            Icon={BellPrefIcon}
            title="Daily reminder"
            description="Get a reminder to complete your daily goal."
            on={daily}
            onChange={setDaily}
          >
            {daily ? (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[#F1F5F9] px-3 py-2.5">
                <span className="text-sm text-[#64748B]">Preferred time</span>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-sm font-semibold text-[#141B2B]"
                >
                  {["07:00 AM", "08:00 AM", "09:00 AM", "06:00 PM"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </PrefRow>
          <PrefRow
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#16A34A]"
            Icon={BoltIcon}
            title="Streak at risk"
            description="Get notified when your streak is at risk."
            on={streak}
            onChange={setStreak}
          />
          <PrefRow
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#2563EB]"
            Icon={DocIcon}
            title="Mock results ready"
            description="Get notified when your mock test results are ready."
            on={mock}
            onChange={setMock}
          />
          <PrefRow
            iconBg="bg-[#FFEDD5]"
            iconColor="text-[#EA580C]"
            Icon={MegaIcon}
            title="Product news"
            description="Receive important updates and new features."
            on={news}
            onChange={setNews}
            last
          />
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7C3AED]">
              <MoonIcon />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#141B2B]">Quiet hours</p>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    Pause non-essential notifications during quiet hours.
                  </p>
                </div>
                <Toggle on={quiet} onChange={setQuiet} label="Quiet hours" />
              </div>
              {quiet ? (
                <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-[#F1F5F9] px-3 py-2.5">
                  <label className="inline-flex items-center gap-2 text-sm text-[#64748B]">
                    From
                    <select
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-sm font-semibold text-[#141B2B]"
                    >
                      {["9:00 PM", "10:00 PM", "11:00 PM"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-[#64748B]">
                    Until
                    <select
                      value={until}
                      onChange={(e) => setUntil(e.target.value)}
                      className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-sm font-semibold text-[#141B2B]"
                    >
                      {["07:00 AM", "08:00 AM", "09:00 AM"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#2b5ce6] bg-white px-5 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Reset to defaults
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2b5ce6] px-5 text-sm font-bold text-white transition hover:bg-[#244FE6]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}

function PrefRow({
  iconBg,
  iconColor,
  Icon,
  title,
  description,
  on,
  onChange,
  children,
  last,
}: {
  iconBg: string;
  iconColor: string;
  Icon: () => React.ReactNode;
  title: string;
  description: string;
  on: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`px-4 py-4 sm:px-5 ${last ? "" : "border-b border-[#E2E8F0]"}`}>
      <div className="flex items-start gap-3">
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
          <Icon />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#141B2B]">{title}</p>
              <p className="mt-0.5 text-sm text-[#64748B]">{description}</p>
            </div>
            <Toggle on={on} onChange={onChange} label={title} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function BellPrefIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.2a3.5 3.5 0 0 0-3.5 3.5v1.6c0 .5-.15.9-.45 1.3L3.5 10h9l-.55-1.4c-.3-.4-.45-.8-.45-1.3V5.7A3.5 3.5 0 0 0 8 2.2Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M9 2.5 5 9h3l-1 4.5L13 7H9.5L11 2.5H9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4.5 2.5h5L12 5.5V13a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function MegaIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 6.5v3h2l5 2.5V4L5.5 6.5h-2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 9.5v2.5l1.5-.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M12.5 9.2A5 5 0 0 1 6.8 3.5 5.2 5.2 0 1 0 12.5 9.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
