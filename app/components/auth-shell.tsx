import Image from "next/image";
import Link from "next/link";
import { AuthBrandPanel } from "@/app/components/auth-brand-panel";

type AuthShellProps = {
  children: React.ReactNode;
  /** Optional floating control above the card (e.g. Back on forgot-password) */
  topSlot?: React.ReactNode;
  /** Wider card for multi-field forms that need two columns */
  wide?: boolean;
  contentClassName?: string;
};

export function AuthShell({
  children,
  topSlot,
  wide = false,
  contentClassName,
}: AuthShellProps) {
  const widthClass =
    contentClassName ??
    (wide ? "max-w-[560px]" : "max-w-[min(100%,28rem)] lg:max-w-[30rem]");

  return (
    <div className="auth-shell grid h-dvh max-h-dvh w-full min-w-0 flex-1 overflow-hidden bg-[#f3f4f8] md:grid-cols-2">
      <AuthBrandPanel />

      <main className="relative flex h-full min-h-0 w-full min-w-0 flex-col justify-center overflow-hidden px-4 py-3 sm:px-6 md:px-6 md:py-4 lg:px-10 lg:py-5">
        <div className="relative mb-3 shrink-0 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#2B5CE6_0%,#1A3DA8_100%)] px-5 py-4 md:hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Complex%20Geometry%20Composition.svg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 text-white"
          >
            <span className="relative size-8 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/linguatude.webp"
                alt=""
                width={32}
                height={32}
                className="size-full object-cover"
                priority
              />
            </span>
            <span className="text-base font-bold tracking-tight">Linguatude</span>
          </Link>
          <p className="relative z-10 mt-2.5 max-w-xs text-base font-extrabold leading-snug text-white sm:text-lg">
            Your AI coach for English tests
          </p>
        </div>

        {topSlot ? (
          <div className="absolute left-4 top-3 z-10 hidden md:block md:left-6 lg:left-10">
            {topSlot}
          </div>
        ) : null}

        <div className={`mx-auto w-full shrink ${widthClass}`}>{children}</div>
      </main>
    </div>
  );
}

export function AuthCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`auth-card w-full rounded-2xl border border-[rgba(195,197,215,0.3)] bg-white p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_4px_12px_rgba(17,24,39,0.05)] sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function AuthBackLink({
  href = "/login",
  label = "Back",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-base font-semibold text-[#434655] transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
    >
      <Image
        src="/auth/back-dark.svg"
        alt=""
        width={16}
        height={16}
        className="size-4"
      />
      {label}
    </Link>
  );
}

export function AuthBackToLogin() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-1 rounded-md bg-[#e2e2e2] p-1 transition hover:bg-[#d6d6d6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
    >
      <span className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-[#141b2b]">
        <Image
          src="/auth/back-dark.svg"
          alt=""
          width={14}
          height={14}
          className="size-3.5"
        />
        Back to Sign In
      </span>
    </Link>
  );
}
