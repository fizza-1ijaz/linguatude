import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0 border-b border-[var(--border)]/50 bg-[color-mix(in_srgb,var(--surface)_78%,transparent)] pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[color-mix(in_srgb,var(--primary)_58%,transparent)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex h-14 max-w-5xl min-h-14 items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md outline-none ring-[var(--accent)]/40 focus-visible:ring-2 sm:flex-initial sm:shrink-0"
        >
          <Image
            src="/logo.jpg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-md object-contain ring-1 ring-[var(--primary)]/15 dark:ring-white/15"
            priority
          />
          <span className="min-w-0 truncate text-base font-bold tracking-tight text-[var(--foreground)] sm:text-lg">
            Linguatude
          </span>
        </Link>

        <nav
          className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2"
          aria-label="Main"
        >
          <Link
            href="/"
            className="touch-manipulation rounded-md px-2 py-2 text-sm font-semibold text-[var(--foreground)]/85 transition hover:bg-[var(--primary)]/[0.06] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 dark:hover:bg-white/5"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="touch-manipulation rounded-md px-2 py-2 text-sm font-semibold text-[var(--foreground)]/85 transition hover:bg-[var(--primary)]/[0.06] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 dark:hover:bg-white/5"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
