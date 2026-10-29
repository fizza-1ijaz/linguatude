"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

const MODES = [
  {
    id: "recommended",
    title: "Recommended",
    description: "A balance mix of learning content",
    recommended: true,
    Icon: null,
  },
  {
    id: "balanced",
    title: "Balanced",
    description: "Mix of accents and varieties.",
    recommended: false,
    Icon: ScaleIcon,
  },
  {
    id: "everything",
    title: "Everything",
    description: "All accents and varieties.",
    recommended: false,
    Icon: GlobeIcon,
  },
] as const;

const CUTOFFS = [2, 3, 4, 5] as const;

export function AccountSpeaking() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("recommended");
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
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
              <MicIcon />
            </span>
            <h3 className="text-base font-bold text-[#141B2B]">Practice Mode</h3>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5">
            {MODES.map((m) => {
              const selected = mode === m.id;
              const Icon = m.Icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`relative flex min-h-[8.5rem] flex-col rounded-2xl border-2 p-4 text-left transition ${
                    selected
                      ? "border-[#2b5ce6] bg-white shadow-[0_8px_20px_-12px_rgba(43,92,230,0.45)]"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  {m.recommended ? (
                    <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-[#2b5ce6] px-2.5 py-1 text-[0.6875rem] font-bold text-white shadow-sm">
                      <StarMini />
                      Recommended
                    </span>
                  ) : null}

                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
                      }`}
                    >
                      {selected ? (
                        <span className="size-2.5 rounded-full bg-[#2b5ce6]" />
                      ) : null}
                    </span>
                    {Icon && !selected ? (
                      <span className="text-[#94A3B8]">
                        <Icon />
                      </span>
                    ) : null}
                  </div>

                  <p
                    className={`mt-3 text-sm font-bold ${
                      selected ? "text-[#2b5ce6]" : "text-[#141B2B]"
                    }`}
                  >
                    {m.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    {m.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-bold text-[#141B2B]">Silence cutoff</h3>
          <p className="mt-1 text-sm text-[#64748B]">
            Choose how long of silence will be allowed before your response is
            treated as finished.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CUTOFFS.map((sec) => {
              const selected = cutoff === sec;
              const isRecommended = sec === 3;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setCutoff(sec)}
                  className={`relative inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 text-sm font-semibold transition ${
                    selected
                      ? "border-[#2b5ce6] bg-[#EFF6FF] text-[#1D4ED8]"
                      : "border-[#E2E8F0] bg-white text-[#141B2B] hover:border-[#CBD5E1]"
                  }`}
                >
                  {isRecommended ? (
                    <span className="absolute -top-2.5 right-2 inline-flex items-center gap-1 rounded-full bg-[#2b5ce6] px-2 py-0.5 text-[0.625rem] font-bold text-white shadow-sm">
                      <StarMini />
                      Recommended
                    </span>
                  ) : null}
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

function StarMini() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <path d="m6 1 1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9-2.1-2 2.9-.4L6 1Z" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 3v14M4 7h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 7 6.5 13H1.5L4 7ZM16 7l2.5 6h-5L16 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 10h13M10 3c2 2.2 3 4.5 3 7s-1 4.8-3 7c-2-2.2-3-4.5-3-7s1-4.8 3-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
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
