"use client";

type Props = {
  message?: string | null;
  failed?: boolean;
  locked?: boolean;
  unlockAt?: Date | null;
  onRetry?: () => void;
  onSkip?: () => void;
};

export function DiagnosticPreparing({
  message,
  failed,
  locked,
  unlockAt,
  onRetry,
  onSkip,
}: Props) {
  const unlockLabel = unlockAt
    ? unlockAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#F8F9FB] px-6 text-center">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.18)] sm:p-8">
        {!failed && !locked ? (
          <>
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#2b5ce6]">
              <span className="size-6 animate-spin rounded-full border-2 border-[#2b5ce6] border-t-transparent" />
            </div>
            <h1 className="mt-5 text-xl font-bold text-[#141B2B]">
              Preparing your diagnostic
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              We&apos;re building personalised questions for Listening, Reading,
              Writing and Speaking. This usually takes about a minute.
            </p>
          </>
        ) : null}

        {locked ? (
          <>
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D97706]">
              <LockIcon />
            </div>
            <h1 className="mt-5 text-xl font-bold text-[#141B2B]">
              Diagnostic retake locked
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              {unlockLabel
                ? `You can retake on ${unlockLabel}.`
                : "You can retake after the 30-day waiting period."}
            </p>
          </>
        ) : null}

        {failed ? (
          <>
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#FEE2E2] text-[#DC2626]">
              <AlertIcon />
            </div>
            <h1 className="mt-5 text-xl font-bold text-[#141B2B]">
              Couldn&apos;t prepare questions
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              {message ||
                "Check your connection and try again, or skip for now."}
            </p>
          </>
        ) : null}

        <div className="mt-6 flex flex-col gap-2.5">
          {(failed || locked) && onRetry && !locked ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
            >
              Try again
            </button>
          ) : null}
          {onSkip ? (
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#141B2B] transition hover:bg-[#F8FAFC]"
            >
              {locked ? "Continue without retake" : "Skip diagnostic"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
      <rect
        x="6"
        y="11"
        width="12"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
      <path
        d="M12 4 3.5 19h17L12 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4M12 16.5h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
