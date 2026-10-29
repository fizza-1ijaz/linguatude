"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";

import {
  EXAM_STORAGE_KEY,
  type DashboardExam,
} from "@/app/components/dashboard/use-dashboard-exam";

const NAV_BASE = [
  { href: "/dashboard", label: "Home", icon: HomeIcon, match: "exact" as const },
  {
    href: "/dashboard/skills",
    label: "Practice",
    icon: PracticeIcon,
    match: "prefix" as const,
    pteHref: "/dashboard/pte",
  },
  {
    href: "/dashboard/speak",
    label: "Speak",
    icon: MicIcon,
    match: "prefix" as const,
  },
  {
    href: "/dashboard/writing",
    label: "Writing",
    icon: PenIcon,
    match: "prefix" as const,
  },
  {
    href: "/dashboard/mock",
    label: "Mock Test",
    icon: MockTestIcon,
    match: "prefix" as const,
  },
  {
    href: "/dashboard/progress",
    label: "Progress",
    icon: ChartIcon,
    match: "prefix" as const,
  },
  {
    href: "/dashboard/account",
    label: "Account",
    icon: UserIcon,
    match: "prefix" as const,
  },
] as const;

export function DashboardShell({
  children,
  title,
  subtitle,
  headerLeft,
  headerRight,
  mainClassName,
  contentBgClassName = "bg-white",
  hideHeader = false,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  mainClassName?: string;
  contentBgClassName?: string;
  hideHeader?: boolean;
}) {
  const pathname = usePathname();
  const [exam, setExam] = useState<DashboardExam>("ielts");
  const [examOpen, setExamOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const examRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function syncExam() {
      try {
        const stored = window.localStorage.getItem(EXAM_STORAGE_KEY);
        if (stored === "ielts" || stored === "pte") setExam(stored);
      } catch {
        /* ignore */
      }
    }
    syncExam();
    window.addEventListener("storage", syncExam);
    window.addEventListener("focus", syncExam);
    return () => {
      window.removeEventListener("storage", syncExam);
      window.removeEventListener("focus", syncExam);
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!examRef.current?.contains(e.target as Node)) setExamOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileNavOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileNavOpen]);

  function selectExam(next: DashboardExam) {
    if (next === exam) {
      setExamOpen(false);
      return;
    }
    setExamOpen(false);
    try {
      window.localStorage.setItem(EXAM_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    // Reload so the current tab re-renders IELTS/PTE copy, scores, and practice links.
    window.location.reload();
  }

  const sidebarProps = {
    exam,
    examOpen,
    examRef,
    pathname,
    onExamToggle: () => setExamOpen((o) => !o),
    onSelectExam: selectExam,
  };

  return (
    <div className="dashboard-shell flex h-dvh w-full overflow-hidden bg-white text-[#1E293B]">
      <aside className="hidden h-full w-[16.5rem] shrink-0 flex-col overflow-hidden border-r border-[#E2E8F0] bg-white px-3 py-4 lg:flex">
        <DashboardSidebarContent {...sidebarProps} />
      </aside>

      {mobileNavOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[16.5rem] max-w-[85vw] flex-col overflow-hidden border-r border-[#E2E8F0] bg-white px-3 py-4 shadow-xl lg:hidden">
            <DashboardSidebarContent
              {...sidebarProps}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </aside>
        </>
      ) : null}

      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto ${contentBgClassName}`}
      >
        {hideHeader ? (
          <div className="sticky top-0 z-20 flex items-center border-b border-[#E2E8F0]/80 bg-white/95 px-4 py-2.5 backdrop-blur lg:hidden">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl text-[#334155] transition hover:bg-[#F8FAFC]"
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        ) : (
          <header className="sticky top-0 z-20 flex min-w-0 items-center justify-between gap-3 border-b border-[#E2E8F0]/80 bg-white/95 px-4 py-3.5 backdrop-blur sm:gap-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-[#334155] transition hover:bg-[#F8FAFC] lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen(true)}
              >
                <MenuIcon />
              </button>
              {headerLeft}
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-0.5 max-w-xl truncate text-[13px] leading-5 text-[#64748B] sm:whitespace-normal">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
            {headerRight ? (
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
                {headerRight}
              </div>
            ) : null}
          </header>
        )}

        <main
          className={
            mainClassName ??
            "flex-1 px-4 py-4 sm:px-6 sm:py-5 lg:px-[1cm] lg:py-6"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}

function DashboardSidebarContent({
  exam,
  examOpen,
  examRef,
  pathname,
  onExamToggle,
  onSelectExam,
  onNavigate,
}: {
  exam: DashboardExam;
  examOpen: boolean;
  examRef: RefObject<HTMLDivElement | null>;
  pathname: string | null;
  onExamToggle: () => void;
  onSelectExam: (next: DashboardExam) => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link
        href="/dashboard"
        className="mb-4 flex shrink-0 items-center gap-2.5 px-3"
        onClick={onNavigate}
      >
        <Image
          src="/linguatude.webp"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 overflow-hidden rounded-lg object-cover"
          priority
        />
        <span className="text-lg font-bold leading-none tracking-tight text-[#2b5ce6]">
          Linguatude
        </span>
      </Link>

      <div ref={examRef} className="relative mb-3 shrink-0 px-1">
        <button
          type="button"
          onClick={onExamToggle}
          className="flex w-full items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-left transition hover:border-[#BFDBFE]"
          aria-expanded={examOpen}
        >
          <span className="size-2 shrink-0 rounded-full bg-[#2b5ce6]" aria-hidden />
          <span className="min-w-0 flex-1 text-[13px] font-bold text-[#111827]">
            {exam === "ielts" ? "IELTS" : "PTE"}
          </span>
          <ChevronDownIcon />
        </button>
        {examOpen ? (
          <div className="absolute left-1 right-1 top-full z-40 mt-1 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-lg">
            {(["ielts", "pte"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onSelectExam(opt)}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] font-semibold transition hover:bg-[#F8FAFC] ${
                  exam === opt ? "bg-[#EEF2FF] text-[#2b5ce6]" : "text-[#334155]"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    exam === opt ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
                  }`}
                  aria-hidden
                />
                {opt === "ielts" ? "IELTS" : "PTE"}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <nav className="hide-scrollbar mb-3 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain">
        {NAV_BASE.map((item) => {
          const href =
            exam === "pte" && "pteHref" in item && item.pteHref
              ? item.pteHref
              : item.href;
          const active =
            item.match === "exact"
              ? pathname === href
              : pathname === href ||
                Boolean(pathname?.startsWith(`${href}/`)) ||
                (href === "/dashboard/pte" &&
                  Boolean(pathname?.startsWith("/dashboard/pte")));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={href}
              onClick={onNavigate}
              className={`relative flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition ${
                active
                  ? "bg-[#EEF2FF] text-[#2b5ce6]"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
              }`}
            >
              {active ? (
                <span
                  className="absolute inset-y-1.5 right-0 w-[3px] rounded-full bg-[#2b5ce6]"
                  aria-hidden
                />
              ) : null}
              <Icon active={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto shrink-0 space-y-0.5 border-t border-[#E2E8F0] pt-3">
        <Link
          href="/dashboard/help"
          onClick={onNavigate}
          className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition ${
            pathname === "/dashboard/help" ||
            Boolean(pathname?.startsWith("/dashboard/help/"))
              ? "bg-[#EEF2FF] text-[#2b5ce6]"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
          }`}
        >
          {pathname === "/dashboard/help" ||
          Boolean(pathname?.startsWith("/dashboard/help/")) ? (
            <span
              className="absolute inset-y-1.5 right-0 w-[3px] rounded-full bg-[#2b5ce6]"
              aria-hidden
            />
          ) : null}
          <HelpIcon />
          Help Center
        </Link>
        <Link
          href="/signin"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#1E293B]"
        >
          <LogoutIcon />
          Logout
        </Link>

        <Link
          href="/dashboard/premium"
          onClick={onNavigate}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#244FE6]"
        >
          <CrownIcon />
          Upgrade to Pro
        </Link>

        <button
          type="button"
          className="mt-3 flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-[#F8FAFC]"
        >
          <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#93C5FD] to-[#2b5ce6] text-[13px] font-bold text-white">
            A
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-bold text-[#1E293B]">Alex</span>
            <span className="block text-[11px] font-medium text-[#94A3B8]">
              Free Plan
            </span>
          </span>
          <ChevronDownIcon />
        </button>
      </div>
    </>
  );
}

export { EXAM_STORAGE_KEY };

function HomeIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <path
          d="M3.5 8.2 10 3l6.5 5.2V17a1 1 0 0 1-1 1h-3.5v-5.5H8V18H4.5a1 1 0 0 1-1-1V8.2Z"
          fill="#2b5ce6"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 10 3l6.5 5.2V17a1 1 0 0 1-1 1h-3.5v-5.5H8V18H4.5a1 1 0 0 1-1-1V8.2Z"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PracticeIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <rect x="2.5" y="6" width="3" height="8" rx="1" fill="#2b5ce6" />
        <rect x="14.5" y="6" width="3" height="8" rx="1" fill="#2b5ce6" />
        <rect x="6" y="8.5" width="1.8" height="3" rx="0.5" fill="#2b5ce6" />
        <rect x="12.2" y="8.5" width="1.8" height="3" rx="0.5" fill="#2b5ce6" />
        <rect x="6.5" y="9.2" width="7" height="1.6" rx="0.5" fill="#2b5ce6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M4 7v6M6.5 8.5v3M13.5 8.5v3M16 7v6M6.5 10h7"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="2.5" y="6" width="2.5" height="8" rx="1" stroke="#64748B" strokeWidth="1.4" />
      <rect x="15" y="6" width="2.5" height="8" rx="1" stroke="#64748B" strokeWidth="1.4" />
    </svg>
  );
}

function MicIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" fill="#2b5ce6" />
        <path
          d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
          stroke="#2b5ce6"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M8 17.5h4" stroke="#2b5ce6" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <rect x="7.5" y="2.5" width="5" height="9" rx="2.5" stroke="#64748B" strokeWidth="1.6" />
      <path
        d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PenIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <path d="m4 16 1.2-4.2L13.5 3.5l3 3L8.2 14.8 4 16Z" fill="#2b5ce6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="m4 16 1.2-4.2L13.5 3.5l3 3L8.2 14.8 4 16Z"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MockTestIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <rect x="4" y="3" width="12" height="14" rx="2" fill="#2b5ce6" />
        <path d="M7 7h6M7 10h6M7 13h3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="m12.2 12.2 1.1 1.1 2.1-2.2"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <rect x="4" y="3" width="12" height="14" rx="2" stroke="#64748B" strokeWidth="1.6" />
      <path d="M7 7h6M7 10h6M7 13h3.5" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="m12.5 12.5 1.2 1.2 2.3-2.4"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <rect x="3" y="9.5" width="2.2" height="6.5" rx="1" fill="#2b5ce6" />
        <rect x="8.9" y="4.5" width="2.2" height="11.5" rx="1" fill="#2b5ce6" />
        <rect x="14.8" y="12" width="2.2" height="4" rx="1" fill="#2b5ce6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M4 16V9.5M10 16V4.5M16 16v-4"
        stroke="#64748B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon({ active }: { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 20 20" className="size-[1.125rem]" aria-hidden>
        <circle cx="10" cy="7" r="3.2" fill="#2b5ce6" />
        <path d="M3.5 16.8c1.5-2.8 3.6-4 6.5-4s5 1.2 6.5 4" fill="#2b5ce6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3" stroke="#64748B" strokeWidth="1.6" />
      <path
        d="M4 16.5c1.4-2.5 3.4-3.5 6-3.5s4.6 1 6 3.5"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.25" stroke="#64748B" strokeWidth="1.6" />
      <path
        d="M7.75 7.75a2.25 2.25 0 1 1 3.1 2.08c-.55.28-.85.72-.85 1.42V12"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M10 14.25h.01" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M12 13.5 15.5 10 12 6.5M15.5 10H8"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-3.5" fill="#FBBF24" aria-hidden>
      <path d="M3 14.5 4.5 7l3 3.5L10 5.5l2.5 5 3-3.5 1.5 7.5H3Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-[#94A3B8]" fill="none" aria-hidden>
      <path
        d="M4 6.5 8 10.5 12 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
