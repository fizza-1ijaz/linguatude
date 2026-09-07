"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/pte", label: "PTE" },
  { href: "/ielts", label: "IELTS" },
  { href: "/#start", label: "Dashboard" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
] as const;

const SECONDARY_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
] as const;

function LogoMark() {
  return (
    <span className="relative h-6 w-[1.833rem] shrink-0 overflow-clip">
      <Image
        src="/home/logo-mark.svg"
        alt=""
        width={30}
        height={24}
        className="size-full"
        priority
      />
    </span>
  );
}

function StartFreeButton({ className }: { className?: string }) {
  return (
    <Link
      href="/#start"
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#2D5BFF] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(45,91,255,0.55)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      Start free
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path
          d="M3 8h9M9 4.5 12.5 8 9 11.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

const navLinkClass =
  "whitespace-nowrap text-[0.8125rem] font-medium text-[#475569] transition hover:text-[#2D5BFF] focus-visible:outline-none focus-visible:text-[#2D5BFF] dark:text-[#cbd5e1] dark:hover:text-[#93c5fd]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      if (open) {
        setHidden(false);
        return;
      }

      // Hide while the user is actively scrolling
      setHidden(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setHidden(false);
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, [open]);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full shrink-0 border-b border-[#e2e8f0]/80 bg-white/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-[6px] transition-transform duration-300 ease-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[3.75rem] max-w-[90rem] items-center gap-3 px-4 sm:px-6 lg:h-[4.75rem] lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
          <span className="text-xl font-bold tracking-tight text-[#2b5ce6] sm:text-2xl">
            Linguatude
          </span>
        </Link>

        <nav
          className="mx-auto hidden min-w-0 flex-1 items-center justify-center gap-x-3.5 xl:flex xl:gap-x-4 2xl:gap-x-5"
          aria-label="Main"
        >
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}

          {SECONDARY_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <StartFreeButton className="hidden sm:inline-flex" />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#2D5BFF] transition hover:bg-[#eff6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 dark:hover:bg-[#1e3a8a]/40 xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-[#dbeafe] bg-white px-4 py-4 shadow-lg dark:border-[#1e3a8a]/50 dark:bg-[#0f172a] xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#475569] transition hover:bg-[#eff6ff] hover:text-[#2D5BFF] dark:text-[#cbd5e1] dark:hover:bg-[#1e3a8a]/35 dark:hover:text-[#93c5fd]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
            <div className="mt-3 sm:hidden">
              <StartFreeButton className="w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
