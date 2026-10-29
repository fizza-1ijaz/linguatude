"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

export function ScoringConcernSubmitted() {
  return (
    <DashboardShell
      title="Concern Submitted"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={
        <Link
          href="/dashboard/account/scoring-concern"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
          aria-label="Back"
        >
          <svg viewBox="0 0 16 16" className="size-5" fill="none" aria-hidden>
            <path
              d="M10 3.5 5.5 8 10 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      }
      headerRight={<NotificationBellButton />}
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 pb-6 lg:grid-cols-2 lg:gap-10">
        <div className="flex min-w-0 w-full flex-col justify-center">
          <div className="mb-5 flex justify-center lg:hidden">
            <Image
              src="/concern submitted.svg"
              alt=""
              width={220}
              height={220}
              className="h-auto w-full max-w-[11rem]"
              priority
            />
          </div>

          <p className="text-center text-sm leading-relaxed text-[#64748B] sm:text-base lg:text-left">
            Thanks for reaching out! Your scoring concern has been submitted
            successfully. We&apos;ll review it and get back to you.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-xs font-bold text-white">
              i
            </span>
            <p className="text-sm leading-relaxed text-[#334155]">
              You&apos;ll receive an update once our team has reviewed your
              concern.
            </p>
          </div>

          <div className="mt-8 w-full">
            <Link
              href="/dashboard"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6]"
            >
              <HomeIcon />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="hidden min-w-0 w-full items-center justify-center lg:flex">
          <Image
            src="/concern submitted.svg"
            alt=""
            width={280}
            height={280}
            className="h-auto w-full max-w-xs"
            priority
          />
        </div>
      </div>
    </DashboardShell>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 8.5 9 3.5l6 5V15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 16v-4.5h4V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
