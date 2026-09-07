import Image from "next/image";
import Link from "next/link";
import { AuthBrandPanel } from "@/app/components/auth-brand-panel";

type AuthShellProps = {
  children: React.ReactNode;
  /** Optional floating control above the card (e.g. Back on forgot-password) */
  topSlot?: React.ReactNode;
};

export function AuthShell({ children, topSlot }: AuthShellProps) {
  return (
    <div className="auth-shell grid min-h-dvh w-full min-w-0 flex-1 bg-[#f3f4f8] md:grid-cols-2">
      <AuthBrandPanel />

      <main className="relative flex min-h-dvh w-full min-w-0 flex-col justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-8 flex justify-center md:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#1e1b4b] transition hover:opacity-80"
          >
            <span className="relative h-6 w-[1.833rem] shrink-0 overflow-hidden">
              <Image
                src="/home/logo-mark.svg"
                alt=""
                width={30}
                height={24}
                className="size-full"
                priority
              />
            </span>
            <span className="text-lg font-bold tracking-tight">Linguatude</span>
          </Link>
        </div>

        {topSlot ? (
          <div className="absolute left-4 top-6 hidden md:block md:left-8 lg:left-12 xl:left-16">
            {topSlot}
          </div>
        ) : null}

        <div className="mx-auto w-full max-w-[540px]">{children}</div>
      </main>
    </div>
  );
}

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-[1.25rem] border border-[#e5e7eb] bg-white p-7 shadow-[0_25px_60px_-28px_rgba(30,27,75,0.4)] sm:p-10">
      {children}
    </div>
  );
}
