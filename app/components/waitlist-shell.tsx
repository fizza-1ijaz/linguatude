"use client";

import Image from "next/image";
import Link from "next/link";

type WaitlistShellProps = {
  children: React.ReactNode;
  /** Where the back control goes — default onboarding exam step */
  backHref?: string;
  backLabel?: string;
};

export function WaitlistShell({
  children,
  backHref = "/onboarding",
  backLabel = "Back",
}: WaitlistShellProps) {
  return (
    <div className="onboarding-shell relative flex h-dvh max-h-dvh w-full overflow-hidden bg-[#F5F7FF]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/steps/big-blobs.svg"
          alt=""
          width={401}
          height={442}
          className="absolute -left-[4%] -top-[6%] w-[min(48vw,25.06rem)] max-w-none select-none"
          priority
        />
        <Image
          src="/steps/small-blobs.svg"
          alt=""
          width={184}
          height={311}
          className="absolute -right-[1%] -top-[2%] w-[min(26vw,11.5rem)] max-w-none select-none"
          priority
        />

        <div className="absolute left-[6%] top-[18%] hidden h-[16rem] w-[10rem] lg:block">
          <Image
            src="/onboarding/trail-1.svg"
            alt=""
            width={184}
            height={291}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <Image
            src="/onboarding/plane.svg"
            alt=""
            width={48}
            height={48}
            className="absolute bottom-[8%] left-[2%] size-10 rotate-[-28deg]"
          />
        </div>

        <div className="absolute right-[5%] top-[16%] hidden h-[14rem] w-[9rem] lg:block">
          <Image
            src="/onboarding/trail-2.svg"
            alt=""
            width={184}
            height={291}
            className="absolute inset-0 h-full w-full scale-x-[-1] object-contain"
          />
          <Image
            src="/onboarding/plane.svg"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-[10%] right-[8%] size-9 rotate-[18deg]"
          />
        </div>

        <div className="absolute bottom-[-6%] left-[-2%] hidden w-[min(36vw,22rem)] lg:block">
          <Image
            src="/onboarding/books.png"
            alt=""
            width={482}
            height={475}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <main className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <div className="relative flex min-h-0 max-h-full w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08),0_24px_48px_rgba(43,92,230,0.08)] lg:max-w-4xl">
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-4 sm:px-8 sm:pt-5">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#64748B] transition hover:text-[#2b5ce6]"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                <path
                  d="M10 3.5 5.5 8 10 12.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {backLabel}
            </Link>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/linguatude.webp"
                alt=""
                width={36}
                height={36}
                className="size-9 shrink-0 overflow-hidden rounded-xl object-cover"
                priority
              />
              <span className="text-lg font-bold tracking-tight text-[#2b5ce6] sm:text-xl">
                Linguatude
              </span>
            </Link>
            <span className="w-[4.5rem] sm:w-[5.5rem]" aria-hidden />
          </div>

          <div className="onboarding-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-3 sm:px-8 sm:pb-6 sm:pt-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
