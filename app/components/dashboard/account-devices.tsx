"use client";

import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

type Device = {
  id: string;
  name: string;
  kind: "phone" | "laptop";
  lastActive: string;
  lastActiveLive?: boolean;
  isCurrent?: boolean;
  action: "current" | "sign-out" | "remove";
};

const DEVICES: Device[] = [
  {
    id: "1",
    name: "iPhone 14",
    kind: "phone",
    lastActive: "Today, 9:12 AM",
    lastActiveLive: true,
    isCurrent: true,
    action: "current",
  },
  {
    id: "2",
    name: "MacBook Pro",
    kind: "laptop",
    lastActive: "Oct 19, 2026",
    action: "sign-out",
  },
  {
    id: "3",
    name: "Samsung Galaxy S22",
    kind: "phone",
    lastActive: "Oct 15, 2026",
    action: "remove",
  },
];

export function AccountDevices() {
  const registered = DEVICES.length;
  const max = 3;

  return (
    <DashboardShell
      title="Device Management"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-6">
        <div>
          <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
            Settings
          </span>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
            Manage the devices where you&apos;re logged in. You can keep up to 3
            devices active at a time.
          </p>
          <p className="mt-3 text-sm font-medium text-[#64748B]">
            {registered} / {max} devices registered
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {DEVICES.map((device) => (
            <li
              key={device.id}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                  {device.kind === "phone" ? <PhoneIcon /> : <LaptopIcon />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-base font-bold text-[#141B2B]">
                        {device.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[#64748B]">
                        {device.lastActiveLive ? (
                          <span
                            className="size-1.5 shrink-0 rounded-full bg-[#22C55E]"
                            aria-hidden
                          />
                        ) : null}
                        Last active: {device.lastActive}
                      </p>
                    </div>
                    <span className="text-[#CBD5E1]" aria-hidden>
                      ›
                    </span>
                  </div>
                  <div className="mt-3">
                    {device.action === "current" ? (
                      <span className="inline-flex rounded-full bg-[#DBEAFE] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
                        Current Device
                      </span>
                    ) : device.action === "sign-out" ? (
                      <button
                        type="button"
                        className="inline-flex rounded-full border border-[#FECACA] bg-white px-3 py-1.5 text-xs font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
                      >
                        Sign out
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex rounded-full border border-[#FECACA] bg-white px-3 py-1.5 text-xs font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
            <ShieldSecure />
          </span>
          <div className="min-w-0 text-sm">
            <p className="font-bold text-[#141B2B]">Keep your account secure</p>
            <p className="mt-0.5 leading-relaxed text-[#64748B]">
              If you notice any unfamiliar device, sign out or remove it
              immediately.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-5" fill="none" aria-hidden>
      <rect
        x="6"
        y="2.5"
        width="10"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.5 16.5h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-5" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="4.5"
        width="15"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 16.5h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldSecure() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M9 2.5 3.5 5v4c0 3.3 2.3 6.3 5.5 7.2 3.2-.9 5.5-3.9 5.5-7.2V5L9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m6.8 9 1.6 1.6 2.8-2.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
