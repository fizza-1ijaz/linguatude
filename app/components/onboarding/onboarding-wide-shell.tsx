import Image from "next/image";
import { ONBOARDING_TOTAL_STEPS } from "@/app/components/onboarding/onboarding-state";

type OnboardingWideShellProps = {
  step: number;
  children: React.ReactNode;
  /** Background for the content area below the step header */
  contentClassName?: string;
};

export function OnboardingWideShell({
  step,
  children,
  contentClassName = "bg-[#F8F9FB]",
}: OnboardingWideShellProps) {
  const clamped = Math.min(Math.max(step, 1), ONBOARDING_TOTAL_STEPS);

  return (
    <div className="min-h-dvh bg-[#F8F9FB] text-[#141B2B]">
      <header className="border-b border-[#E8ECF4] bg-[#F8F9FB]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 pb-3 pt-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/linguatude.webp"
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 overflow-hidden rounded-lg object-cover"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-[#2b5ce6]">
              Linguatude
            </span>
          </div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
            Step {clamped} of {ONBOARDING_TOTAL_STEPS}
          </p>
        </div>
        <div
          className="mx-auto flex w-full max-w-5xl gap-1.5 px-4 pb-5 sm:px-6 lg:px-8"
          aria-hidden
        >
          {Array.from({ length: ONBOARDING_TOTAL_STEPS }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < clamped ? "bg-[#2b5ce6]" : "bg-[#E2E8F0]"
              }`}
            />
          ))}
        </div>
      </header>

      <div className={`min-h-[calc(100dvh-7.5rem)] ${contentClassName}`}>
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
