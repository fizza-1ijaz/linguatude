"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
  RadioCard,
} from "@/app/components/dashboard/account-shared";

const MODES = [
  {
    id: "au",
    title: "AU-priority",
    description: "More Australian accents and content where applicable.",
  },
  {
    id: "balanced",
    title: "Balanced",
    description: "Balanced mix of Australian, British and American accents.",
  },
  {
    id: "everything",
    title: "Everything",
    description: "All available accents and content.",
  },
] as const;

const CUTOFFS = [2, 3, 4, 5] as const;

export function AccountSpeaking() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("au");
  const [cutoff, setCutoff] = useState<(typeof CUTOFFS)[number]>(3);

  return (
    <DashboardShell
      title="Speaking Preferences"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-bold text-[#141B2B]">
            Practice mode (accent &amp; content delivery)
          </h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Choose the type of content mix you want to practice with.
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            {MODES.map((m) => (
              <RadioCard
                key={m.id}
                selected={mode === m.id}
                title={m.title}
                description={m.description}
                onSelect={() => setMode(m.id)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-bold text-[#141B2B]">Silence cutoff</h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Choose how long of silence will be allowed before your response is treated
            as finished.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CUTOFFS.map((sec) => {
              const selected = cutoff === sec;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setCutoff(sec)}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 text-sm font-semibold transition ${
                    selected
                      ? "border-[#2b5ce6] bg-[#EFF6FF] text-[#1D4ED8]"
                      : "border-[#E2E8F0] bg-white text-[#141B2B] hover:border-[#CBD5E1]"
                  }`}
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded-full border-2 ${
                      selected ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                    }`}
                  >
                    {selected ? (
                      <span className="size-2 rounded-full bg-[#2b5ce6]" />
                    ) : null}
                  </span>
                  {sec} sec
                </button>
              );
            })}
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#64748B]">
            <span aria-hidden>★</span>
            3 sec is recommended and set as default.
          </p>
        </section>

        <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <MicIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#141B2B]">Test Microphone</p>
            <p className="mt-0.5 text-sm text-[#64748B]">
              Check your microphone permissions, recording and playback.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2b5ce6] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Test Microphone
          </button>
        </section>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          Save Changes
        </button>
      </div>
    </DashboardShell>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect x="7" y="3" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
