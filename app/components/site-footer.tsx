"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SKYEN_SYSTEMS_URL =
  process.env.NEXT_PUBLIC_SKYEN_SYSTEMS_URL ?? "https://skyensystems.com";
const INSTAGRAM_URL = "https://www.instagram.com/Linguatude";
const FACEBOOK_URL = "https://www.facebook.com/Linguatude";

const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

const SOCIALS = [
  { href: FACEBOOK_URL, label: "Facebook", icon: "/home/icon-facebook.svg" },
  { href: INSTAGRAM_URL, label: "Instagram", icon: "/home/icon-instagram.svg" },
  {
    href: "https://www.youtube.com/@Linguatude",
    label: "YouTube",
    icon: "/home/icon-youtube.svg",
  },
  {
    href: "https://www.linkedin.com/company/linguatude",
    label: "LinkedIn",
    icon: "/home/icon-linkedin.svg",
  },
] as const;

const TEST_LINKS = [
  { href: "/pte", label: "PTE Academic" },
  { href: "/ielts", label: "IELTS Academic" },
  { href: "/ielts-general", label: "IELTS General" },
  { href: "/cambridge", label: "Cambridge (Coming Soon)" },
  { href: "/pte-vs-ielts", label: "PTE vs IELTS Guide" },
] as const;

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
] as const;

const SUPPORT_LINKS = [
  { href: "/contact", label: "Contact Us" },
  { href: "/#start", label: "Help Center" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FooterNewsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "")
      .trim()
      .toLowerCase();
    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(null);
    setStatus("loading");
    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "New Waitlist Signup – Linguatude",
          _replyto: email,
          email,
          Message: `New subscriber joined the waitlist.\n\nEmail: ${email}\nSource: Footer newsletter`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-[#2D5BFF]" role="status" aria-live="polite">
        You are on the list. We will be in touch when Linguatude is ready.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs" noValidate>
      <label className="sr-only" htmlFor="footer-newsletter-email">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email"
        disabled={status === "loading"}
        className="w-full rounded-lg border border-[#e2e8f0] bg-white py-3 pl-4 pr-12 text-sm text-[#1e1b4b] placeholder:text-[#6b7280] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/25 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="absolute right-1 top-1 inline-flex size-8 items-center justify-center overflow-clip rounded-md bg-[#2D5BFF] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:opacity-60"
        aria-label="Subscribe"
      >
        <Image src="/home/icon-send.svg" alt="" width={16} height={16} className="size-4" />
      </button>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-base font-bold text-[#1e1b4b]">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#64748b] transition hover:text-[#2D5BFF]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full shrink-0 border-t border-[#e2e8f0] bg-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="relative h-6 w-[1.833rem] overflow-clip">
                <Image
                  src="/home/logo-mark.svg"
                  alt=""
                  width={30}
                  height={24}
                  className="size-full"
                />
              </span>
              <span className="text-2xl font-bold text-[#2b5ce6]">Linguatude</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#64748b]">
              AI-powered language test preparation for PTE, IELTS and Cambridge
              (Coming Soon).
            </p>
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Linguatude on ${social.label}`}
                  className="inline-flex size-8 items-center justify-center overflow-clip rounded-full bg-[#f8fafc] transition hover:bg-[#eef2ff]"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4"
                  />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#94a3b8]">
              A product of Skyen Solutions. Sister to{" "}
              <a
                href="https://www.studiely.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#2D5BFF]"
              >
                Studiely
              </a>{" "}
              and{" "}
              <a
                href="https://makemylesson.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#2D5BFF]"
              >
                Make My Lesson
              </a>
              . Build with{" "}
              <a
                href={SKYEN_SYSTEMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#2D5BFF]"
              >
                Skyen Systems
              </a>
              .
            </p>
          </div>

          <FooterLinkColumn title="Tests" links={TEST_LINKS} />
          <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
          <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />

          <div id="start" className="scroll-mt-24">
            <h3 className="text-base font-bold text-[#1e1b4b]">Stay in the loop</h3>
            <p className="mt-4 text-sm leading-5 text-[#64748b]">
              Get study tips, platform updates and helpful resources.
            </p>
            <div className="mt-4">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e2e8f0] pt-8 text-center">
          <p className="text-sm text-[#64748b]">
            © {year} Linguatude. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
