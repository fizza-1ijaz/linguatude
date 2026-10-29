"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

type LimitDevice = {
  id: string;
  name: string;
  kind: "phone" | "tablet" | "laptop";
  os: string;
  location: string;
  lastActive: string;
};

const DEVICES: LimitDevice[] = [
  {
    id: "1",
    name: "iPhone 14",
    kind: "phone",
    os: "iOS 17.6.1",
    location: "Lahore, Pakistan",
    lastActive: "10 Apr 2027, 09:24 AM",
  },
  {
    id: "2",
    name: "MacBook Pro",
    kind: "laptop",
    os: "macOS 15.1",
    location: "Lahore, Pakistan",
    lastActive: "09 Apr 2027, 06:12 PM",
  },
  {
    id: "3",
    name: "iPad Air",
    kind: "tablet",
    os: "iPadOS 17.5",
    location: "Lahore, Pakistan",
    lastActive: "02 Apr 2027, 11:03 AM",
  },
];

export function LoginDeviceLimit() {
  return (
    <DashboardShell
      title="Sign in on a 4th device"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col pb-6">
        <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
            <MonitorIcon />
          </span>
          <div className="min-w-0 text-sm">
            <p className="font-bold text-[#1E3A8A]">
              You can use Linguatude on 3 devices.
            </p>
            <p className="mt-0.5 leading-relaxed text-[#64748B]">
              Manage your currently signed-in devices below. Remove any device
              you no longer use.
            </p>
          </div>
        </div>

        <h2 className="mt-6 text-base font-bold text-[#141B2B]">
          Your Devices (3/3)
        </h2>

        <ul className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {DEVICES.map((device) => (
            <li
              key={device.id}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
                  {device.kind === "laptop" ? <LaptopIcon /> : <PhoneIcon />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-base font-bold text-[#141B2B]">
                        {device.name}
                      </p>
                      <p className="text-sm text-[#64748B]">{device.os}</p>
                    </div>
                    <span className="text-[#CBD5E1]" aria-hidden>
                      ›
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
                    <PinIcon />
                    {device.location}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#64748B]">
                    <ClockIcon />
                    Last active: {device.lastActive}
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#FEE2E2] px-3 py-2 text-xs font-semibold text-[#DC2626] transition hover:bg-[#FECACA]"
                  >
                    <TrashIcon />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
            <InfoIcon />
          </span>
          <p className="text-sm leading-relaxed text-[#1E3A8A]">
            You can sign in on a fourth device by removing one of your existing
            devices or after signing out from another device.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 22 22" className="size-5" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="16"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 18h6M11 15v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
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

function PinIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 shrink-0" fill="none" aria-hidden>
      <path
        d="M7 7.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 12s3.75-3.1 3.75-5.75A3.75 3.75 0 1 0 3.25 6.25C3.25 8.9 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 shrink-0" fill="none" aria-hidden>
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

function TrashIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M3 4.5h8M5.5 4.5V3.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 6v4M7 6v4M9 6v4M4 4.5l.5 7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1l.5-7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 7.25V11M8 5h.01"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
