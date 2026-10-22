"use client";

import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { PteTaskHeaderRight } from "@/app/components/dashboard/pte-shared";

const SKILLS = [
  {
    name: "Listening",
    score: 64,
    ci: "61 - 67",
    pct: 71,
    iconBg: "bg-[#EDE9FE]",
    bar: "bg-[#7C3AED]",
    Icon: MicIcon,
  },
  {
    name: "Reading",
    score: 66,
    ci: "63 - 69",
    pct: 74,
    iconBg: "bg-[#DBEAFE]",
    bar: "bg-[#2b5ce6]",
    Icon: BookIcon,
  },
  {
    name: "Speaking",
    score: 62,
    ci: "59 - 66",
    pct: 68,
    iconBg: "bg-[#DCFCE7]",
    bar: "bg-[#16A34A]",
    Icon: SpeakIcon,
  },
  {
    name: "Writing",
    score: 63,
    ci: "60 - 66",
    pct: 70,
    iconBg: "bg-[#FFEDD5]",
    bar: "bg-[#F59E0B]",
    Icon: PenIcon,
  },
] as const;

const DHA_ROWS = [
  { level: "Competent English (floor)", points: "0", L: "47", R: "48", W: "51", S: "54", highlight: false },
  { level: "Proficient English", points: "+10", L: "58", R: "59", W: "69", S: "76", highlight: true },
  { level: "Superior English", points: "+20", L: "69", R: "70", W: "85", S: "88", highlight: false },
] as const;

const PARTS = [
  { name: "Part 1 Speaking & Writing", items: "28 / 28 items", pct: "64%", color: "bg-[#7C3AED]" },
  { name: "Part 2 Reading", items: "25 / 25 items", pct: "66%", color: "bg-[#2b5ce6]" },
  { name: "Part 3 Listening", items: "25 / 25 items", pct: "63%", color: "bg-[#16A34A]" },
] as const;

export function PteScoreReport() {
  return (
    <DashboardShell
      title="Score Report"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10">
        <div className="rounded-2xl bg-[#F5F3FF] px-4 py-3.5">
          <p className="inline-flex items-start gap-2.5 text-sm text-[#5B21B6]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
              i
            </span>
            <span>
              <span className="font-bold">AI-estimated</span> — not an official Pearson
              score. Scores are on the Global Scale of English (10-90).
            </span>
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.4fr)]">
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-bold text-[#141B2B]">Overall Score</h3>
            <div className="mt-6 flex flex-col items-center">
              <div className="relative h-28 w-52">
                <svg viewBox="0 0 200 110" className="size-full" aria-hidden>
                  <path
                    d="M20 100 A80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 100 A80 80 0 0 1 148 32"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 text-center">
                  <p className="text-4xl font-bold text-[#141B2B]">64</p>
                  <p className="text-xs text-[#94A3B8]">out of 90</p>
                </div>
              </div>
              <div className="mt-2 flex w-full justify-between px-2 text-xs text-[#94A3B8]">
                <span>10</span>
                <span>90</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-[#141B2B]">Communicative Skills</h3>
              <div className="flex gap-6 text-xs font-semibold text-[#94A3B8]">
                <span>Score (10-90)</span>
                <span>CI</span>
              </div>
            </div>
            <ul className="mt-4 space-y-4">
              {SKILLS.map((s) => (
                <li key={s.name} className="grid grid-cols-[minmax(0,1fr)_3.5rem_4.5rem] items-center gap-3">
                  <div className="min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className={`flex size-8 items-center justify-center rounded-lg ${s.iconBg}`}>
                        <s.Icon />
                      </span>
                      <span className="text-sm font-bold text-[#141B2B]">{s.name}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                      <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[0.625rem] text-[#CBD5E1]">
                      <span>10</span>
                      <span>50</span>
                      <span>90</span>
                    </div>
                  </div>
                  <span className="text-right text-lg font-bold text-[#141B2B]">{s.score}</span>
                  <span className="text-right text-sm text-[#64748B]">{s.ci}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1E40AF]">
              <span className="mr-1.5 inline-flex size-5 items-center justify-center rounded-full bg-[#2b5ce6] text-[0.625rem] font-bold text-white">
                i
              </span>
              Roughly half of PTE tasks credit two skills at once (integrated scoring).
              See per-type breakdown below.
            </div>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-5">
              <h3 className="text-base font-bold text-[#141B2B]">
                DHA (Australian PR) Target Overlay
              </h3>
              <span className="rounded-full bg-[#DBEAFE] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                Selected preset: Proficient English (+10 points)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="bg-[#1E3A8A] text-white">
                    <th className="px-3 py-2.5 font-semibold">
                      DHA Level
                      <span className="mt-0.5 block text-[0.625rem] font-normal opacity-80">
                        effective on/after 7 Aug 2025
                      </span>
                    </th>
                    <th className="px-2 py-2.5 font-semibold">PR Points</th>
                    <th className="px-2 py-2.5 font-semibold">Listening</th>
                    <th className="px-2 py-2.5 font-semibold">Reading</th>
                    <th className="px-2 py-2.5 font-semibold">Writing</th>
                    <th className="px-2 py-2.5 font-semibold">Speaking</th>
                  </tr>
                </thead>
                <tbody>
                  {DHA_ROWS.map((row) => (
                    <tr
                      key={row.level}
                      className={`border-t border-[#E2E8F0] ${
                        row.highlight ? "bg-[#EEF2FF] font-semibold text-[#2b5ce6]" : "text-[#334155]"
                      }`}
                    >
                      <td className="px-3 py-2.5">{row.level}</td>
                      <td className="px-2 py-2.5">{row.points}</td>
                      <td className="px-2 py-2.5">{row.L}</td>
                      <td className="px-2 py-2.5">{row.R}</td>
                      <td className="px-2 py-2.5">{row.W}</td>
                      <td className="px-2 py-2.5">{row.S}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <h3 className="text-base font-bold text-[#141B2B]">Performance by Part</h3>
            <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="relative size-28 shrink-0">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden>
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#7C3AED" strokeWidth="4" strokeDasharray="28 100" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#2b5ce6" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-28" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#16A34A" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-53" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-2xl font-bold text-[#141B2B]">78</p>
                  <p className="text-[0.5625rem] font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Total scored items
                  </p>
                </div>
              </div>
              <ul className="min-w-0 flex-1 space-y-3">
                {PARTS.map((p) => (
                  <li key={p.name} className="flex items-start gap-2">
                    <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${p.color}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#141B2B]">{p.name}</p>
                      <p className="text-xs text-[#94A3B8]">{p.items}</p>
                    </div>
                    <span className="text-sm font-bold text-[#141B2B]">{p.pct}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-center text-xs text-[#94A3B8]">
              All parts completed in this mock test.
            </p>
          </section>
        </div>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-base font-bold text-[#141B2B]">Re-test Recommendation</h3>
          <div className="mt-3 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2b5ce6]">
              <CalIcon />
            </span>
            <div>
              <p className="text-sm text-[#334155]">
                Continue targeted practice to close gap to your selected DHA levels.
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Diagnostic retake once every 30 days per exam
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-sm">
          <Link
            href="/dashboard/mock"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#64748B] transition hover:text-[#2b5ce6]"
          >
            ← Back to Mock Tests
          </Link>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#7C3AED] transition hover:bg-[#F5F3FF]"
            >
              ↓ Download Report
            </button>
            <Link
              href="/dashboard/pte"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#2b5ce6] px-4 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
            >
              ≡ Review Answers
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#7C3AED]" fill="none" aria-hidden>
      <rect x="6" y="2.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 8a4 4 0 0 0 8 0M8 12v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#2b5ce6]" fill="none" aria-hidden>
      <path d="M3.5 3.5h4.5v10H4.5A1 1 0 0 0 3.5 14.5v-11Zm5 0H12.5v10H9.5A1 1 0 0 0 8.5 14.5v-11Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function SpeakIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#16A34A]" fill="none" aria-hidden>
      <path d="M3.5 5.5v5h2.2L9.5 13V3L5.7 5.5H3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M11 6a2 2 0 0 1 0 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-[#F59E0B]" fill="none" aria-hidden>
      <path d="m3.5 12.5 1.2-4.2L11 2.5l2.5 2.5-6.3 6.3-4.2 1.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
      <rect x="3" y="4" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 7.5h12M6 2.5v3M12 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
