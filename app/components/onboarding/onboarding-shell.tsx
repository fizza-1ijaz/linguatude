import Image from "next/image";
import { ONBOARDING_TOTAL_STEPS } from "@/app/components/onboarding/onboarding-state";

type OnboardingShellProps = {
  step: number;
  children: React.ReactNode;
  showAiBadge?: boolean;
};

export function OnboardingShell({
  step,
  children,
  showAiBadge = false,
}: OnboardingShellProps) {
  const clamped = Math.min(Math.max(step, 1), ONBOARDING_TOTAL_STEPS);

  return (
    <div className="onboarding-shell relative flex h-dvh max-h-dvh w-full overflow-hidden bg-[#F5F7FF]">
      {/* Decorative background — exact Figma placement */}
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

        {/* Left dashed trail + plane */}
        <div className="absolute left-[6%] top-[18%] hidden h-[18rem] w-[11.5rem] lg:block">
          <Image
            src="/onboarding/trail-1.svg"
            alt=""
            width={184}
            height={291}
            className="absolute inset-0 h-full w-full object-contain opacity-100"
          />
          <Image
            src="/onboarding/plane.svg"
            alt=""
            width={56}
            height={56}
            className="absolute bottom-[8%] left-[2%] size-12 rotate-[-28deg]"
          />
        </div>

        {/* Right dashed trail + plane */}
        <div className="absolute right-[5%] top-[16%] hidden h-[16rem] w-[10rem] lg:block">
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
            width={48}
            height={48}
            className="absolute bottom-[10%] right-[8%] size-11 rotate-[18deg]"
          />
        </div>

        <div className="absolute bottom-[-6%] left-[-2%] hidden w-[min(40vw,26rem)] lg:block">
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

      <main className="relative z-10 mx-auto flex h-full w-full max-w-[68rem] items-center justify-center gap-4 px-4 py-5 sm:gap-5 sm:px-6 lg:px-8">
        {showAiBadge ? (
          <div className="hidden w-[13.5rem] shrink-0 lg:block">
            <div className="flex items-center gap-3 rounded-[1.5rem] bg-[#2b5ce6] px-3.5 py-3 shadow-[0_8px_24px_rgba(43,92,230,0.28)]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                <Image
                  src="/onboarding/icon-ai-chart.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              </span>
              <p className="text-[0.8125rem] font-medium leading-snug text-white">
                Personalized learning
                <br />
                with AI insights
              </p>
            </div>
          </div>
        ) : null}

        {/* Vertical progress rail — left of card */}
        <nav
          className="hidden h-[min(28rem,62vh)] w-6 shrink-0 lg:block"
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
                    <span className="flex size-[1.125rem] items-center justify-center rounded-full bg-[#2b5ce6]">
                      <svg
                        width="9"
                        height="7"
                        viewBox="0 0 10 8"
                        fill="none"
                        aria-hidden
                      >
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
                    <span className="block size-[1.375rem] rounded-full bg-[#2b5ce6] shadow-[0_0_0_4px_rgba(43,92,230,0.2)]" />
                  ) : (
                    <span className="block size-[1.125rem] rounded-full border-[1.5px] border-[#C3C5D7] bg-white" />
                  )}
                </span>
              );
            })}
          </div>
        </nav>

        <div className="flex max-h-full w-full max-w-[40rem] flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08),0_24px_48px_rgba(43,92,230,0.08)]">
          <div className="flex shrink-0 flex-col items-center px-6 pt-6 sm:px-10 sm:pt-8">
            <div className="flex items-center gap-2.5">
              <Image
                src="/onboarding/logo-cap.svg"
                alt=""
                width={48}
                height={48}
                className="size-11 sm:size-12"
                priority
              />
              <span className="text-[1.75rem] font-bold leading-none tracking-tight text-[#2b5ce6] sm:text-[2rem]">
                Linguatude
              </span>
            </div>

            <div className="mt-5 flex w-full max-w-[22rem] flex-col items-center gap-2">
              <div className="flex w-full items-center justify-center gap-[0.375rem]" aria-hidden>
                {Array.from({ length: ONBOARDING_TOTAL_STEPS }, (_, i) => (
                  <span
                    key={i}
                    className={`h-[0.375rem] flex-1 rounded-full ${
                      i < clamped
                        ? "bg-[#2b5ce6] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
                        : "bg-[#E2E8F0]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[0.75rem] font-medium leading-none text-[#64748B]">
                Step {clamped} of {ONBOARDING_TOTAL_STEPS}
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6 pb-6 pt-4 sm:px-10 sm:pb-8 sm:pt-5">
            {children}
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
      className="inline-flex h-14 w-full max-w-xl items-center justify-center gap-2.5 rounded-[1.25rem] bg-[#2b5ce6] px-6 text-[1.125rem] font-semibold text-white shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:cursor-not-allowed disabled:opacity-55"
    >
      {children}
      <Image
        src="/onboarding/icon-arrow-white.svg"
        alt=""
        width={24}
        height={24}
        className="size-5"
      />
    </button>
  );
}
