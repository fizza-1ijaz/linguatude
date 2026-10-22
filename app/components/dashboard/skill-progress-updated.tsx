"use client";

import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";

const CONFETTI = [
  { t: "4%", l: "8%", c: "#86EFAC", d: "0s", r: "18deg", s: "size-3" },
  { t: "10%", l: "22%", c: "#FDE68A", d: "0.05s", r: "-20deg", s: "size-2" },
  { t: "6%", l: "48%", c: "#93C5FD", d: "0.08s", r: "12deg", s: "size-2.5" },
  { t: "12%", l: "72%", c: "#C4B5FD", d: "0.1s", r: "-12deg", s: "size-3" },
  { t: "8%", l: "90%", c: "#FDBA74", d: "0.12s", r: "28deg", s: "size-2" },
  { t: "22%", l: "4%", c: "#6EE7B7", d: "0.14s", r: "-24deg", s: "size-2.5" },
  { t: "28%", l: "18%", c: "#FCA5A5", d: "0.08s", r: "36deg", s: "size-2" },
  { t: "24%", l: "38%", c: "#A5B4FC", d: "0.18s", r: "10deg", s: "size-3" },
  { t: "30%", l: "58%", c: "#FDE047", d: "0.16s", r: "-30deg", s: "size-2.5" },
  { t: "26%", l: "82%", c: "#67E8F9", d: "0.2s", r: "14deg", s: "size-2" },
  { t: "40%", l: "10%", c: "#DDD6FE", d: "0.22s", r: "-18deg", s: "size-3" },
  { t: "44%", l: "30%", c: "#86EFAC", d: "0.24s", r: "22deg", s: "size-2" },
  { t: "48%", l: "50%", c: "#F9A8D4", d: "0.14s", r: "-8deg", s: "size-2.5" },
  { t: "42%", l: "70%", c: "#93C5FD", d: "0.26s", r: "16deg", s: "size-2" },
  { t: "46%", l: "92%", c: "#FDE68A", d: "0.28s", r: "-22deg", s: "size-3" },
  { t: "58%", l: "6%", c: "#C4B5FD", d: "0.18s", r: "8deg", s: "size-2" },
  { t: "62%", l: "24%", c: "#6EE7B7", d: "0.3s", r: "-14deg", s: "size-2.5" },
  { t: "66%", l: "44%", c: "#FDBA74", d: "0.2s", r: "24deg", s: "size-2" },
  { t: "60%", l: "66%", c: "#A5B4FC", d: "0.32s", r: "-28deg", s: "size-3" },
  { t: "64%", l: "88%", c: "#FCA5A5", d: "0.22s", r: "12deg", s: "size-2.5" },
  { t: "76%", l: "14%", c: "#67E8F9", d: "0.34s", r: "20deg", s: "size-2" },
  { t: "80%", l: "36%", c: "#FDE047", d: "0.26s", r: "-16deg", s: "size-2.5" },
  { t: "78%", l: "56%", c: "#86EFAC", d: "0.36s", r: "30deg", s: "size-3" },
  { t: "82%", l: "78%", c: "#DDD6FE", d: "0.28s", r: "-10deg", s: "size-2" },
] as const;

export function SkillProgressUpdated() {
  const [pct, setPct] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

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
    const confettiTimer = window.setTimeout(() => setShowConfetti(true), 200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(confettiTimer);
    };
  }, []);

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <DashboardShell
      title="Skill Library"
      contentBgClassName="bg-white"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-6"
      headerRight={
        <NotificationBellButton />
      }
    >
      <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 overflow-hidden pb-8">
        {showConfetti
          ? CONFETTI.map((piece, i) => (
              <span
                key={i}
                className={`skill-confetti pointer-events-none absolute rounded-[2px] ${piece.s}`}
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
            ))
          : null}

        <div className="relative z-10 w-full rounded-[1.75rem] border border-[#E2E8F0] bg-white px-8 py-10 text-center shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] sm:px-12 sm:py-12 ui-fade-up">
          <div className="relative mx-auto size-40 sm:size-44">
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
            <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold tabular-nums text-[#141B2B]">
              {pct}%
            </p>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#141B2B] sm:text-3xl">
            Skill progress updated
          </h2>
          <Link
            href="/dashboard/skills"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-semibold text-white shadow-[0_10px_20px_-10px_rgba(43,92,230,0.7)] transition hover:bg-[#244FE6]"
          >
            Start Next Skill
          </Link>
        </div>

        <div className="relative z-10 flex w-full items-start gap-3 rounded-2xl bg-[#EEF2FF] px-5 py-4 sm:px-6 sm:py-5 ui-fade-up-delay-2">
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

function TrophyIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-5 text-[#D97706]" fill="none" aria-hidden>
      <path d="M5.5 3.5h7v3.2A3.5 3.5 0 0 1 9 10.2a3.5 3.5 0 0 1-3.5-3.5V3.5Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 4.5H3.8A1.8 1.8 0 0 0 3.8 8H5.5M12.5 4.5h1.7A1.8 1.8 0 0 1 14.2 8H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 10.2V12.5M6.5 14.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
