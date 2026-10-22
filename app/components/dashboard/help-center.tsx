"use client";

import Image from "next/image";
import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

const FEATURES = [
  {
    icon: "/help-center/icon-chat.svg",
    title: "Get Instant Help",
    description: "Answers to your questions, anytime.",
  },
  {
    icon: "/help-center/icon-book.svg",
    title: "Practice & Improve",
    description: "Build your language skills with real support.",
  },
  {
    icon: "/help-center/icon-support.svg",
    title: "Practice & Support",
    description: "Get help while you learn and practice.",
  },
  {
    icon: "/help-center/icon-shield.svg",
    title: "Safe & Friendly",
    description: "A supportive space just for you.",
  },
] as const;

export function HelpCenter() {
  return (
    <DashboardShell
      title="Help Center"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-6"
      headerRight={<NotificationBellButton />}
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 pb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-[#DBEAFE] px-3.5 py-1.5 text-xs font-semibold text-[#2b5ce6] sm:text-sm">
            Your AI Language &amp; Support Guide
          </span>

          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-[#141B2B] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Meet <span className="text-[#2b5ce6]">Ayra</span>
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B] sm:text-base">
            I&apos;m here to answer questions, practice conversations, and help you learn
            with Linguatude.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE]">
                  <Image src={f.icon} alt="" width={22} height={22} className="size-[22px]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#141B2B]">{f.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#64748B] sm:text-sm">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/help/chat"
            className="mt-8 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#2b5ce6] text-base font-bold text-white shadow-[0_12px_24px_-10px_rgba(43,92,230,0.65)] transition hover:bg-[#244FE6]"
          >
            Start Chat
            <span aria-hidden>›</span>
          </Link>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] sm:justify-start">
            <Image
              src="/help-center/icon-shield.svg"
              alt=""
              width={14}
              height={14}
              className="size-3.5 opacity-60"
            />
            Powered by Linguatude
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div className="relative aspect-square w-full max-w-[26rem]">
            <span
              className="absolute inset-[6%] rounded-full bg-[#DBEAFE]/80"
              aria-hidden
            />
            <span
              className="absolute inset-[14%] rounded-full bg-[#BFDBFE]/50"
              aria-hidden
            />
            <div className="absolute inset-[10%] overflow-hidden rounded-full">
              {/* Large SVG portrait — use img to avoid Next image optim issues */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/help-center/help-svg.svg"
                alt="Ayra"
                className="size-full object-cover object-top"
              />
            </div>
            <span className="absolute right-[8%] top-[28%] flex size-12 items-center justify-center rounded-2xl bg-[#2b5ce6] shadow-lg sm:size-14">
              <span className="flex gap-1">
                <span className="size-1.5 rounded-full bg-white" />
                <span className="size-1.5 rounded-full bg-white" />
                <span className="size-1.5 rounded-full bg-white" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
