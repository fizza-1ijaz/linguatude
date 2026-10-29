"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ONBOARDING_TOTAL_STEPS } from "@/app/components/onboarding/onboarding-state";

type OnboardingShellProps = {
  step: number;
  children: React.ReactNode;
  showAiBadge?: boolean;
  /** Allow inner content to scroll (blue scrollbar) */
  scrollable?: boolean;
};

export function OnboardingShell({
  step,
  children,
  showAiBadge = false,
  scrollable = false,
}: OnboardingShellProps) {
  const clamped = Math.min(Math.max(step, 1), ONBOARDING_TOTAL_STEPS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !scrollable) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function onScroll() {
      el?.classList.add("is-scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => el?.classList.remove("is-scrolling"), 700);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [scrollable]);

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
            priority
          />
        </div>
      </div>

      <main className="relative z-10 mx-auto flex h-full w-full max-w-[64rem] items-center justify-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 lg:px-6">
        <nav
          className="hidden h-[min(24rem,58vh)] w-5 shrink-0 lg:block"
          aria-label={`Step ${clamped} of ${ONBOARDING_TOTAL_STEPS}`}
        >
          <div className="relative mx-auto h-full w-px bg-[#D5DAF0]">
            {Array.from({ length: ONBOARDING_TOTAL_STEPS }, (_, i) => {
              const n = i + 1;
              const top = `${(i / (ONBOARDING_TOTAL_STEPS - 1)) * 100}%`;
              const done = n < clamped;
              const active = n === clamped;

              return (
                <span
                  key={n}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top }}
                >
                  {done ? (
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#2b5ce6]">
                      <svg width="8" height="6" viewBox="0 0 10 8" fill="none" aria-hidden>
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : active ? (
                    <span className="block size-5 rounded-full bg-[#2b5ce6] shadow-[0_0_0_4px_rgba(43,92,230,0.2)]" />
                  ) : (
                    <span className="block size-4 rounded-full border-[1.5px] border-[#C3C5D7] bg-white" />
                  )}
                </span>
              );
            })}
          </div>
        </nav>

        <div className="relative flex max-h-full w-full max-w-[36rem] flex-col">
          {showAiBadge ? (
            <div className="pointer-events-none absolute -left-1 top-3 z-20 sm:-left-3 sm:top-4 lg:-left-5 lg:top-5">
              <div className="pointer-events-auto flex max-w-[11.5rem] items-center gap-2 rounded-full bg-[#2b5ce6] px-2.5 py-2 shadow-[0_8px_24px_rgba(43,92,230,0.28)]">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <Image
                    src="/onboarding/icon-ai-chart.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-3.5"
                  />
                </span>
                <p className="text-[0.6875rem] font-semibold leading-snug text-white">
                  Personalized learning with AI insights
                </p>
              </div>
            </div>
          ) : null}

          <div className="relative flex min-h-0 max-h-full w-full flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08),0_24px_48px_rgba(43,92,230,0.08)]">
            <div className="flex shrink-0 flex-col items-center px-5 pt-4 sm:px-8 sm:pt-5">
              <div className="flex items-center gap-2">
                <Image
                  src="/linguatude.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="size-9 shrink-0 overflow-hidden rounded-xl object-cover sm:size-10"
                  priority
                />
                <span className="text-[1.5rem] font-bold leading-none tracking-tight text-[#2b5ce6] sm:text-[1.65rem]">
                  Linguatude
                </span>
              </div>

              <div className="mt-3.5 flex w-full max-w-[20rem] flex-col items-center gap-1.5">
                <div className="flex w-full items-center justify-center gap-1.5" aria-hidden>
                  {Array.from({ length: ONBOARDING_TOTAL_STEPS }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < clamped ? "bg-[#2b5ce6]" : "bg-[#E2E8F0]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[0.6875rem] font-medium leading-none text-[#64748B]">
                  Step {clamped} of {ONBOARDING_TOTAL_STEPS}
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className={`flex min-h-0 flex-1 flex-col px-5 pb-4 pt-3 sm:px-8 sm:pb-5 sm:pt-3.5 ${
                scrollable
                  ? "onboarding-scroll overflow-y-auto"
                  : "overflow-hidden"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function OnboardingContinueButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-full max-w-xl items-center justify-center gap-2 rounded-2xl bg-[#2b5ce6] px-5 text-[0.9375rem] font-semibold text-white shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:cursor-not-allowed disabled:bg-[#a8b8e8] disabled:opacity-100 sm:h-12 sm:text-base"
    >
      {children}
      <span aria-hidden className="text-lg leading-none">
        →
      </span>
    </button>
  );
}
