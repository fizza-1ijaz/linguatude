import Image from "next/image";
import Link from "next/link";

const SKYEN_SYSTEMS_URL =
  process.env.NEXT_PUBLIC_SKYEN_SYSTEMS_URL ?? "https://skyensystems.com";
const INSTAGRAM_URL = "https://www.instagram.com/Linguatude";
const FACEBOOK_URL = "https://www.facebook.com/Linguatude";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4.5 w-4.5"
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4.5 w-4.5"
    >
      <path
        d="M13.5 8.2V6.6c0-.9.6-1.6 1.7-1.6H17V2.5h-1.9c-2.7 0-4.5 1.8-4.5 4.5v1.2H8.8v2.8h1.8v10h3.1v-10h2.6l.4-2.8h-3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full shrink-0 border-t border-[color-mix(in_srgb,var(--primary)_88%,#000)] bg-[var(--primary-deep)] py-10 text-sm text-[var(--on-brand)]/75"
      role="contentinfo"
    >
      <div className="mx-auto max-w-3xl space-y-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-3">
          <div className="flex min-w-0 items-center gap-2.5 lg:justify-start">
            <Image
              src="/logo.jpg"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-md object-contain ring-1 ring-white/20"
            />
            <span className="truncate font-medium text-[var(--on-brand)]">
              Linguatude
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linguatude on Instagram"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-sm font-medium text-[var(--on-brand)]/88 transition hover:border-[var(--accent)]/45 hover:bg-white/10 hover:text-[var(--on-brand)]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-white/10">
                <InstagramIcon />
              </span>
              Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linguatude on Facebook"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-sm font-medium text-[var(--on-brand)]/88 transition hover:border-[var(--secondary)]/45 hover:bg-white/10 hover:text-[var(--on-brand)]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-secondary-soft)] text-[var(--secondary)] ring-1 ring-white/10">
                <FacebookIcon />
              </span>
              Facebook
            </a>
          </div>
          <nav
            className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[var(--on-brand)] lg:w-auto lg:shrink-0 lg:justify-end"
            aria-label="Legal"
          >
            <Link
              href="/privacy-policy"
              className="font-medium text-[var(--on-brand)]/85 underline decoration-white/25 underline-offset-2 transition hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              Privacy Policy
            </Link>
            <span className="text-[var(--on-brand)]/35" aria-hidden>
              |
            </span>
            <Link
              href="/cookie-policy"
              className="font-medium text-[var(--on-brand)]/85 underline decoration-white/25 underline-offset-2 transition hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>

        <p className="text-balance leading-relaxed text-[var(--on-brand)]/80">
          Linguatude is a product of Skyen Solutions, a trade name of Qismat
          Ventures W.L.L. (CR 190698-1) — Office 501, Building 1025, Road 3621,
          Block 436, Al Seef, Bahrain.
        </p>

        <p className="text-balance leading-relaxed text-[var(--on-brand)]/80">
          Linguatude is a sister platform of{" "}
          <a
            href="https://www.studiely.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/50 underline-offset-2 transition hover:decoration-[var(--accent)]"
          >
            Studiely
          </a>{" "}
         and{" "}
         <a
            href="https://makemylesson.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/50 underline-offset-2 transition hover:decoration-[var(--accent)]"
          >
             Make My Lesson
          </a>{" "}
        </p>

        <p className="text-balance leading-relaxed text-[var(--on-brand)]/80">
          Linguatude is part of the Skyen Solutions family of EdTech products.
          For custom software development, websites, and mobile applications,
          visit{" "}
          <a
            href={SKYEN_SYSTEMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent-secondary)] underline decoration-[var(--accent-secondary)]/50 underline-offset-2 transition hover:decoration-[var(--accent-secondary)]"
          >
            Skyen Systems
          </a>
          .
        </p>

        <p className="pt-1 text-xs text-[var(--on-brand)]/50">
          © {year} Qismat Ventures W.L.L. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
