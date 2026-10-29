"use client";

import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/CookieConsent";

const SKYEN_SYSTEMS_URL = "https://skyensystems.com";
const INSTAGRAM_URL = "https://www.instagram.com/Linguatude";
const FACEBOOK_URL = "https://www.facebook.com/Linguatude";

const SOCIALS = [
  {
    href: "https://www.linkedin.com/company/linguatude",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://www.youtube.com/@Linguatude",
    label: "YouTube",
    Icon: YouTubeIcon,
  },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
  { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
] as const;

const SITEMAP = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/features", label: "Features", Icon: FeaturesIcon },
  { href: "/pte", label: "PTE", Icon: ExamIcon },
  { href: "/ielts", label: "IELTS", Icon: CapIcon },
  { href: "/pricing", label: "Pricing", Icon: TagIcon },
  { href: "/about", label: "About", Icon: AboutIcon },
  { href: "/blog", label: "Blog", Icon: BlogIcon },
  { href: "/contact", label: "Contact Us", Icon: MailIcon },
  { href: "/cambridge", label: "Cambridge", Icon: SoonIcon },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/privacy-policy", label: "Account & Data Deletion" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full shrink-0 bg-[#0B1437] text-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 sm:px-6 lg:px-8 lg:pt-14">
        {/* Level 1: Brand · Sitemap · Social · App */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-0">
          <div className="min-w-0 lg:w-[13.5rem] lg:shrink-0 lg:pr-4 xl:w-[14.5rem] xl:pr-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="relative size-8 overflow-hidden rounded-lg">
                <Image
                  src="/linguatude.webp"
                  alt=""
                  width={32}
                  height={32}
                  className="size-full object-cover"
                />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Linguatude
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">
              AI-powered English test prep for PTE Academic and IELTS.
              Cambridge and TOEFL coming soon.
            </p>
          </div>

          <span
            className="hidden w-px shrink-0 self-stretch bg-[#334155] lg:block"
            aria-hidden
          />

          <div className="min-w-0 flex-1 lg:px-4 xl:px-5">
            <h3 className="text-center text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#60A5FA]">
              Sitemap
            </h3>
            <ul className="mt-3 flex flex-nowrap items-stretch justify-center gap-0 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
              {SITEMAP.map((item, i) => (
                <li
                  key={item.label}
                  className="flex shrink-0 items-stretch"
                >
                  {i > 0 ? (
                    <span
                      className="mx-1 w-px shrink-0 self-stretch bg-[#334155] sm:mx-1.5"
                      aria-hidden
                    />
                  ) : null}
                  <Link
                    href={item.href}
                    className="flex w-[3.35rem] flex-col items-center gap-1 text-center text-[#93C5FD] transition hover:text-white sm:w-[3.6rem]"
                  >
                    <item.Icon />
                    <span className="text-[0.5625rem] font-medium leading-tight sm:text-[0.625rem]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <span
            className="hidden w-px shrink-0 self-stretch bg-[#334155] lg:block"
            aria-hidden
          />

          <div className="shrink-0 lg:px-4 xl:px-5">
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#60A5FA]">
              Follow us
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Linguatude on ${social.label}`}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-[#60A5FA]/70 text-[#60A5FA] transition hover:border-white hover:text-white"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          <span
            className="hidden w-px shrink-0 self-stretch bg-[#334155] lg:block"
            aria-hidden
          />

          <div className="shrink-0 lg:pl-4 xl:pl-5">
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#60A5FA]">
              Download the app
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              <ComingSoonStoreButton store="apple" />
              <ComingSoonStoreButton store="google" />
            </div>
          </div>
        </div>

        {/* Level 2: Legal links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-sm text-white/90">
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.label} className="inline-flex items-center gap-2">
              {i > 0 ? (
                <span className="text-[#60A5FA]" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={link.href}
                className="transition hover:text-[#93C5FD]"
              >
                {link.label}
              </Link>
            </span>
          ))}
          <span className="inline-flex items-center gap-2">
            <span className="text-[#60A5FA]" aria-hidden>
              ·
            </span>
            <CookiePreferencesButton className="bg-transparent p-0 text-sm font-normal text-white/90 underline-offset-2 transition hover:text-[#93C5FD] hover:underline" />
          </span>
        </div>

        <div className="mt-6 border-t border-[#1E293B]" />

        {/* Level 3: Business info */}
        <div className="mt-6 space-y-2 text-center text-xs leading-relaxed text-[#94A3B8] sm:text-[0.8125rem]">
          <p>
            Linguatude is operated by{" "}
            <a
              href={SKYEN_SYSTEMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition hover:text-[#93C5FD]"
            >
              Skyen Systems Pty Ltd
            </a>{" "}
            (ACN 701 564 730), Unit 18, 285–287 Derrimut Rd, Hoppers Crossing VIC
            3029, Australia. Subscriptions purchased on this website are sold by
            Skyen Systems Pty Ltd. Subscriptions purchased in our iOS or Android
            apps are sold through the App Store or Google Play.
          </p>
          <p>
            <a
              href="mailto:hello@linguatude.com"
              className="transition hover:text-[#93C5FD]"
            >
              hello@linguatude.com
            </a>{" "}
            (enquiries) ·{" "}
            <a
              href="mailto:support@linguatude.com"
              className="transition hover:text-[#93C5FD]"
            >
              support@linguatude.com
            </a>{" "}
            (billing &amp; account)
          </p>
        </div>

        {/* Level 4: Tagline + copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#1E293B] pt-5 text-sm text-[#94A3B8] sm:flex-row sm:items-center">
          <p className="inline-flex items-center gap-2 text-center sm:text-left">
            <HeartIcon />
            <span>
              Built for test takers. Designed for Australia goals. Made for your
              first pass.
            </span>
          </p>
          <p className="inline-flex items-center gap-3 text-center sm:text-right">
            <span className="hidden h-4 w-px bg-[#334155] sm:block" aria-hidden />
            © {year} Skyen Systems Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ComingSoonStoreButton({ store }: { store: "apple" | "google" }) {
  return (
    <div
      className="inline-flex h-9 min-w-[9.75rem] items-center justify-center gap-2 rounded-lg border border-[#334155] bg-[#020617] px-2.5 text-center"
      aria-label={`${store === "apple" ? "App Store" : "Google Play"} — Coming soon`}
    >
      {store === "apple" ? <AppleLogo /> : <PlayLogo />}
      <span className="flex min-w-0 flex-col leading-tight text-center">
        <span className="text-[0.5625rem] font-medium uppercase tracking-wide text-[#94A3B8]">
          Coming soon
        </span>
        <span className="truncate text-xs font-semibold text-white">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-[#60A5FA]"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 8.5 10 3l6.5 5.5V16a1 1 0 0 1-1 1h-3.5v-4.5H8V17H4.5a1 1 0 0 1-1-1V8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeaturesIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M10 3.5 11.2 7.5 15.5 8.5 11.2 9.5 10 13.5 8.8 9.5 4.5 8.5 8.8 7.5 10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExamIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect x="4" y="3.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 8.5 10 5l7 3.5-7 3.5L3 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5v3c0 1 1.8 2 4 2s4-1 4-2v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M3.5 10.5V4.5H9.5L16 11l-5.5 5.5L3.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9v4.5M10 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 14.5 13.5 6a1.8 1.8 0 0 1 2.5 2.5L7.5 17H5v-2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <rect x="3" y="5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5 10 11l6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SoonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.5V10l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M3.5 5.8h2.1V13H3.5V5.8ZM4.55 3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM7.2 5.8h2V6.8c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.7V13h-2.1V9.8c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V13H7.2V5.8Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M14.2 5.2a1.7 1.7 0 0 0-1.2-1.2C12 3.7 8 3.7 8 3.7s-4 0-5 .3A1.7 1.7 0 0 0 1.8 5.2C1.5 6.2 1.5 8 1.5 8s0 1.8.3 2.8a1.7 1.7 0 0 0 1.2 1.2c1 .3 5 .3 5 .3s4 0 5-.3a1.7 1.7 0 0 0 1.2-1.2c.3-1 .3-2.8.3-2.8s0-1.8-.3-2.8ZM6.7 10.1V5.9L10.4 8l-3.7 2.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.2" cy="4.8" r="0.7" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <path d="M9.5 13.5V8.7h1.6l.2-1.9H9.5V5.7c0-.5.2-1 .9-1h1V3.1S10.7 3 9.9 3C8.1 3 7 4.1 7 5.5v1.3H5.3v1.9H7v4.8h2.5Z" />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 16 20" className="h-5 w-4 shrink-0 text-white" fill="currentColor" aria-hidden>
      <path d="M13.2 10.5c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-3-1.7-1.2-.1-2.5.8-3 .8s-1.6-.7-2.7-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1 0 1.5-.7 2.7-.7s1.6.7 2.7.7 1.8-1 2.5-2c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-3.6ZM11 4.2c.6-.7 1-1.7.9-2.7-1 .1-2 .7-2.6 1.4-.6.6-1.1 1.6-.9 2.6 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 18 20" className="h-5 w-[1.125rem] shrink-0" aria-hidden>
      <path d="M1 1.8v16.4c0 .7.8 1.1 1.4.7l13.2-8.2c.6-.4.6-1.2 0-1.5L2.4 1.1C1.8.7 1 1.1 1 1.8Z" fill="#34A853" />
      <path d="M1 1.8c0-.7.8-1.1 1.4-.7L9.2 5.2 1 12V1.8Z" fill="#4285F4" />
      <path d="M9.2 5.2 15.6 9c.6.3.6 1.1 0 1.5L9.2 14.3 1 12l8.2-6.8Z" fill="#FBBC04" />
      <path d="M1 12 9.2 14.3 2.4 18.9C1.8 19.3 1 18.9 1 18.2V12Z" fill="#EA4335" />
    </svg>
  );
}
