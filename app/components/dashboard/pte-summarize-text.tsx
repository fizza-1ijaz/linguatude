"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { PteTaskHeaderRight } from "@/app/components/dashboard/pte-shared";

const PASSAGE = `Remote work has reshaped Sydney office demand. Vacancy rates remain above 2019 levels.

Across Sydney's CBD, landlords have faced a prolonged adjustment as hybrid work became the default for many professional services firms. While headline vacancy has eased from pandemic peaks, it remains elevated compared with 2019, particularly for older, less flexible floorplates.

Demand has polarised toward premium towers with strong sustainability credentials, end-of-trip facilities, and short walk times to transport. Simultaneously, secondary assets have required deeper incentives and refurbishment to compete.

Analysts note that net absorption is gradually recovering, but the pace depends on corporate real-estate strategies and the city's ability to convert underused space into housing or mixed-use precincts. For occupiers, the opportunity is clearer quality at negotiated rents; for investors, patient capital and asset repositioning remain key themes.`;

export function PteSummarizeText() {
  const [summary, setSummary] = useState("");
  const words = useMemo(
    () => (summary.trim() ? summary.trim().split(/\s+/).length : 0),
    [summary],
  );

  return (
    <DashboardShell
      title="Summarize Written Text"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#141B2B]">7/8</span>
            <div className="flex gap-1.5">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className={`flex size-5 items-center justify-center rounded-full text-[0.5625rem] font-bold ${
                    i < 7
                      ? "bg-[#2b5ce6] text-white"
                      : "border border-[#CBD5E1] text-[#94A3B8]"
                  }`}
                >
                  {i < 7 ? "✓" : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#C4B5FD] bg-white px-3 py-2 text-sm font-semibold text-[#7C3AED]">
            <ClockIcon />
            Time Remaining 09:32
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-4">
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] px-4 py-3.5 text-sm text-[#1E40AF]">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              <p>
                <span className="font-bold">Instructions:</span> Read the text below
                and write ONE SENTENCE summary of it. Your summary must be between 5
                and 75 words.
              </p>
            </div>

            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold leading-7 text-[#141B2B]">
                Remote work has reshaped Sydney office demand. Vacancy rates remain
                above 2019 levels.
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[#475569]">
                {PASSAGE.split("\n\n")
                  .slice(1)
                  .map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-[#E2E8F0] pt-4 text-sm font-semibold text-[#2b5ce6]">
                <button type="button" className="inline-flex items-center gap-1.5">
                  <SpeakerTiny /> Read Text Aloud
                </button>
                <button type="button" className="inline-flex items-center gap-1.5 text-[#64748B]">
                  <BookmarkTiny /> Bookmark
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
              <label className="block text-sm font-bold text-[#7C3AED]">
                Your Summary (one sentence only)
              </label>
              <div className="relative mt-2">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Type your one sentence summary here..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-[#E2E8F0] px-3.5 py-3 text-sm text-[#141B2B] outline-none placeholder:text-[#94A3B8] focus:border-[#7C3AED]"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-[#94A3B8]">
                  {words} / 75 words
                </span>
              </div>
            </section>

            <section className="rounded-2xl bg-[#EFF6FF] p-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#2b5ce6]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                  i
                </span>
                Summary Guidelines
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#334155]">
                {[
                  "Write ONE SENTENCE only.",
                  "Your summary must be between 5 and 75 words.",
                  "Do not add your own ideas or opinions.",
                  "Do not copy long phrases from the text.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#16A34A]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl bg-[#FFFBEB] p-4">
              <p className="text-sm font-bold text-[#141B2B]">
                Example (not from the text)
              </p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Sydney office vacancy rates are still higher than before the pandemic
                as companies prefer quality, flexible spaces.
              </p>
            </section>

            <div className="flex items-center gap-2 rounded-full border border-[#86EFAC] bg-[#ECFDF5] px-4 py-2.5 text-xs font-semibold text-[#166534]">
              <ShieldTiny />
              One sentence only • 5-75 words • Do not copy long phrases
            </div>

            <div className="flex justify-end">
              <Link
                href="/dashboard/pte/essay"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#7C3AED] px-5 text-sm font-bold text-white transition hover:bg-[#6D28D9]"
              >
                Next →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 4.2V7l2 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function SpeakerTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M3 5v4h2L8.5 11V3L5 5H3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function BookmarkTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path d="M4 2.5h6v9L7 9.5 4 11.5v-9Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 shrink-0" fill="none" aria-hidden>
      <path d="M7 2 11.5 4v3c0 2.4-1.6 4.1-4.5 4.8C4.1 11.1 2.5 9.4 2.5 7V4L7 2Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
