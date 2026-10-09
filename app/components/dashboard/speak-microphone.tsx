"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function SpeakMicrophone() {
  const router = useRouter();

  return (
    <DashboardShell
      title="Microphone Access"
      contentBgClassName="bg-[#F8F9FC]"
      mainClassName="flex-1 px-4 py-6 sm:px-6 lg:px-8"
      headerLeft={
        <Link
          href="/dashboard/speak"
          className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[#E2E8F0] transition hover:bg-[#F8FAFC]"
          aria-label="Back to Speaking"
        >
          <BackIcon />
        </Link>
      }
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center pb-10 text-center">
        <div className="relative flex size-[5.5rem] items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-[#EF4444]" />
          <span className="relative text-[#94A3B8]">
            <MicBlockedIcon />
            <span
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="h-0.5 w-14 rotate-[-35deg] rounded-full bg-[#EF4444]" />
            </span>
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-[#EF4444] text-white ring-2 ring-[#F8F9FC]">
            <XMini />
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-[1.75rem]">
          We need microphone access
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[#64748B] sm:text-[0.9375rem]">
          Speaking practice requires your microphone to record your responses.
          <br />
          It looks like access has been blocked.
        </p>

        <div className="mt-8 grid w-full gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
            <div className="flex items-center gap-2 border-b border-[#DBEAFE] pb-3">
              <AppleIcon />
              <p className="text-sm font-bold text-[#2b5ce6]">
                To enable on iPhone / iPad:
              </p>
            </div>
            <ol className="mt-4 space-y-3">
              {[
                "Open the Settings app",
                "Scroll down and tap 'Linguatude'",
                "Tap 'Microphone' and turn it on",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-5 text-[#334155]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
            <div className="flex items-center gap-2 border-b border-[#BBF7D0] pb-3">
              <AndroidIcon />
              <p className="text-sm font-bold text-[#15803D]">
                To enable on Android:
              </p>
            </div>
            <ol className="mt-4 space-y-3">
              {[
                "Open your phone's Settings",
                "Tap 'Apps' then find 'Linguatude'",
                "Tap 'Permissions' then 'Microphone' then 'Allow'",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-5 text-[#334155]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-start gap-4 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-left sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <GlobeIcon />
            </span>
            <div>
              <p className="text-sm font-bold text-[#2b5ce6]">
                Allow microphone in your browser
              </p>
              <p className="mt-1 text-sm leading-5 text-[#475569]">
                Click the microphone icon in your browser&apos;s address bar and
                select &apos;Allow&apos;.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[16rem] shrink-0 sm:mx-0">
            <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 shadow-sm">
              <LockMini />
              <span className="min-w-0 flex-1 truncate text-left text-xs text-[#64748B]">
                https://linguatude.com
              </span>
              <span className="text-[#2b5ce6]">
                <MicBarIcon />
              </span>
              <DotsIcon />
            </div>
            <span
              className="absolute -bottom-1 right-8 text-[#0F172A]"
              aria-hidden
            >
              <CursorIcon />
            </span>
          </div>
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              try {
                window.open("app-settings:", "_blank");
              } catch {
                /* ignore */
              }
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            <GearIcon />
            Open Settings
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#2b5ce6] bg-white px-6 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            <RefreshIcon />
            Try Again
          </button>
        </div>

        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#94A3B8]">
          <InfoTiny />
          If you&apos;ve already changed the setting, tap Try Again.
        </p>
      </div>
    </DashboardShell>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#141b2b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicBlockedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-12" fill="none" aria-hidden>
      <rect x="18" y="8" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M12 24a12 12 0 0 0 24 0M24 36v4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XMini() {
  return (
    <svg viewBox="0 0 10 10" className="size-3" fill="none" aria-hidden>
      <path
        d="M2.5 2.5 7.5 7.5M7.5 2.5 2.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#2b5ce6]" fill="currentColor" aria-hidden>
      <path d="M11.3 8.4c0-1.8 1.5-2.7 1.5-2.7s-1.2-1.8-3.1-1.8c-1.5 0-2.2.7-3.3.7-1.1 0-2.1-.8-3.4-.8C1.2 3.8 0 5.3 0 8c0 2.4 1.5 5.8 3.1 5.8.9 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6 1.7 0 2.9-3.3 2.9-3.3s-2-.8-1.7-2.1ZM9.7 2.6C10.4 1.8 10.9.7 10.7 0c-1 .1-2.1.7-2.7 1.5C7.3 2.3 6.7 3.4 6.9 4.1c1.1.1 2.1-.6 2.8-1.5Z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#16A34A]" fill="currentColor" aria-hidden>
      <path d="M1.2 5.8 2.3 3.8A6.5 6.5 0 0 1 8 1.5c1.9 0 3.6.8 4.7 2.1l1.1 2.2M3.5 7v5.2a1 1 0 0 0 1 1h.8V9.5h5.4V13.2h.8a1 1 0 0 0 1-1V7c0-2.5-2-4.5-4.5-4.5S3.5 4.5 3.5 7ZM1.5 7.5v3.5a1 1 0 0 0 1 1H3V7.5H1.5Zm11.5 0V12h.5a1 1 0 0 0 1-1V7.5H13ZM5.2 3.2 4.5 2M10.8 3.2 11.5 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 10h13M10 3.5c1.8 2 2.8 4.2 2.8 6.5S11.8 14.5 10 16.5C8.2 14.5 7.2 12.3 7.2 10S8.2 5.5 10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LockMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 text-[#94A3B8]" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MicBarIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <rect x="5" y="1.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7a4.5 4.5 0 0 0 9 0M7 11.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 text-[#94A3B8]" fill="currentColor" aria-hidden>
      <circle cx="6" cy="2.5" r="1" />
      <circle cx="6" cy="6" r="1" />
      <circle cx="6" cy="9.5" r="1" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M3 2.5 12.5 8.2 8.2 9.5 11 14.5 9 15.5 6.2 10.5 3 13V2.5Z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 2.5v1.5M8 12v1.5M2.5 8H4M12 8h1.5M4.2 4.2l1.1 1.1M10.7 10.7l1.1 1.1M11.8 4.2l-1.1 1.1M5.3 10.7l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M13 8a5 5 0 1 1-1.2-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 3.5V6.5H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 6.2V9.5M7 4.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
