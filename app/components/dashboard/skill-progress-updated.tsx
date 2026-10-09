"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CONFETTI = [
  { t: "8%", l: "12%", c: "#86EFAC", d: "0s", r: "18deg" },
  { t: "14%", l: "78%", c: "#93C5FD", d: "0.1s", r: "-12deg" },
  { t: "22%", l: "88%", c: "#C4B5FD", d: "0.18s", r: "28deg" },
  { t: "28%", l: "6%", c: "#FDE68A", d: "0.08s", r: "-24deg" },
  { t: "38%", l: "92%", c: "#6EE7B7", d: "0.22s", r: "10deg" },
  { t: "48%", l: "4%", c: "#A5B4FC", d: "0.14s", r: "36deg" },
  { t: "58%", l: "86%", c: "#FDBA74", d: "0.28s", r: "-18deg" },
  { t: "66%", l: "10%", c: "#DDD6FE", d: "0.2s", r: "14deg" },
  { t: "18%", l: "48%", c: "#67E8F9", d: "0.12s", r: "-8deg" },
  { t: "72%", l: "70%", c: "#FCA5A5", d: "0.26s", r: "22deg" },
  { t: "42%", l: "55%", c: "#FDE047", d: "0.16s", r: "-30deg" },
  { t: "78%", l: "30%", c: "#86EFAC", d: "0.3s", r: "8deg" },
] as const;

export function SkillProgressUpdated() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const target = 70;
    const duration = 1100;
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setPct(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <DashboardShell
      title="Skill Library"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-4 py-6 sm:px-6"
      headerRight={
        <button
          type="button"
          className="relative inline-flex size-10 items-center justify-center rounded-full text-[#64748B]"
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
      }
    >
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 pb-8">
        {CONFETTI.map((piece, i) => (
          <span
            key={i}
            className="skill-confetti pointer-events-none absolute size-2.5 rounded-[2px]"
            style={
              {
                top: piece.t,
                left: piece.l,
                background: piece.c,
                animationDelay: piece.d,
                "--skill-confetti-rot": piece.r,
              } as CSSProperties
            }
            aria-hidden
          />
        ))}

        <div className="relative z-10 w-full rounded-[1.75rem] border border-[#E2E8F0] bg-white px-6 py-10 text-center shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] ui-fade-up">
          <div className="relative mx-auto size-36">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#FFC65D"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="skill-progress-ring"
              />
            </svg>
            <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold tabular-nums text-[#141B2B]">
              {pct}%
            </p>
          </div>
          <h2 className="mt-5 text-2xl font-bold text-[#141B2B]">
            Skill progress updated
          </h2>
          <Link
            href="/dashboard/skills"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgba(43,92,230,0.7)] transition hover:bg-[#244FE6]"
          >
            Start Next Skill
          </Link>
        </div>

        <div className="relative z-10 flex w-full items-start gap-3 rounded-2xl bg-[#EEF2FF] px-4 py-4 ui-fade-up-delay-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FEF08A]">
            <TrophyIcon />
          </span>
          <div>
            <p className="text-sm font-bold text-[#2b5ce6]">Great job!</p>
            <p className="mt-0.5 text-sm leading-6 text-[#64748B]">
              Keep going to master more skills and build your confidence.
              <br />
              You&apos;re making excellent progress!
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.2c0 .6-.2 1.2-.6 1.7L3.8 12.5c-.5.6-.1 1.5.7 1.5h11c.8 0 1.2-.9.7-1.5l-1.1-1.6c-.4-.5-.6-1.1-.6-1.7V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.2 14.5a1.8 1.8 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5 text-[#D97706]" fill="none" aria-hidden>
      <path d="M5.5 3.5h7v3.2A3.5 3.5 0 0 1 9 10.2a3.5 3.5 0 0 1-3.5-3.5V3.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 4.5H3.8A1.8 1.8 0 0 0 3.8 8H5.5M12.5 4.5h1.7A1.8 1.8 0 0 1 14.2 8H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 10.2V12.5M6.5 14.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
