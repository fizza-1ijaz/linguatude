"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

export function AdaptiveSkip() {
  return (
    <DashboardShell
      title="Lesson Queue"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5 sm:px-[1cm] lg:px-[1cm]"
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="mx-auto w-full max-w-lg space-y-5 pb-8">
        <p className="text-sm leading-6 text-[#64748B] ui-fade-up">
          Your upcoming adaptive practice is ready.
          <br />
          Continue where you left off or start the next item in your queue.
        </p>

        <section className="rounded-2xl bg-[#EEF2FF] p-5 sm:p-6 ui-fade-up-delay-1">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <SkipIcon />
            </span>
            <h2 className="text-lg font-bold text-[#2b5ce6]">
              Adaptive skip: Basic tenses
            </h2>
          </div>
          <Link
            href="/dashboard/skills/essay-development"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
          >
            Sounds Right
          </Link>
        </section>

        <section className="rounded-2xl border border-[#BFDBFE] bg-white p-5 ui-fade-up-delay-2">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#2b5ce6]">What happens next?</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#475569]">
                Tap &apos;Sounds Right&apos; to confirm and move to your next adaptive
                item.
                <br />
                You can review this item again later from your Progress.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function SkipIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="currentColor" aria-hidden>
      <path d="M4 5.2v9.6l6.5-4.8L4 5.2Z" />
      <path d="M11 5.2v9.6l6.5-4.8L11 5.2Z" />
    </svg>
  );
}
