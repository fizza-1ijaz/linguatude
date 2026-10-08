"use client";

type DailyGoalCompleteModalProps = {
  open: boolean;
  onKeepGoing: () => void;
  onDone: () => void;
};

export function DailyGoalCompleteModal({
  open,
  onKeepGoing,
  onDone,
}: DailyGoalCompleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-goal-title"
    >
      {/* Backdrop — dimmed + blurred dashboard */}
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#0F172A]/45 backdrop-blur-[8px]"
        onClick={onDone}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-[26.5rem] overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 px-7 py-8 shadow-[0_28px_80px_-20px_rgba(15,23,42,0.5)] backdrop-blur-2xl sm:px-8 sm:py-9">
        {/* Decorative blobs — orange top-left, blue top-right */}
        <div
          className="pointer-events-none absolute -left-16 -top-14 size-56 rounded-full bg-[#FDBA74]/55 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 top-6 size-40 rounded-full bg-[#A5B4FC]/55 blur-3xl"
          aria-hidden
        />

        <div className="relative flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#FFEDD5]">
            <FlameIcon className="size-6 text-[#F97316]" />
          </span>

          <h2
            id="daily-goal-title"
            className="mt-5 text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#111827]"
          >
            Daily goal complete! 🎉
          </h2>
          <p className="mt-2 text-[1.25rem] font-bold leading-none text-[#0040DF]">
            7-day streak
          </p>

          <div className="mt-7 flex w-full flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB]/80 bg-white px-4 py-3.5 text-left shadow-[0_2px_10px_-4px_rgba(15,23,42,0.18)]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FEF9C3]">
                <StarIcon />
              </span>
              <span className="text-[0.9375rem] font-semibold text-[#1F2937]">
                +65 XP today
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB]/80 bg-white px-4 py-3.5 text-left shadow-[0_2px_10px_-4px_rgba(15,23,42,0.18)]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F3E8FF]">
                <TrophyIcon />
              </span>
              <span className="text-[0.9375rem] font-semibold text-[#1F2937]">
                7-day streak milestone! 🏆
              </span>
            </div>
          </div>

          <div className="mt-7 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={onKeepGoing}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#0040DF] transition hover:bg-[#F8FAFF]"
            >
              Keep going — practice more today
            </button>
            <button
              type="button"
              onClick={onDone}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#0040DF] px-4 text-sm font-bold text-white shadow-[0_6px_16px_-4px_rgba(0,64,223,0.45)] transition hover:bg-[#0036C4]"
            >
              Done for Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlameIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.2 2.4c.4 2.1-.2 3.5-1.3 4.7-.9 1-1.4 1.8-1.4 3 0 1.4.9 2.5 2.2 2.5 1.4 0 2.4-1.1 2.4-2.6 0-.7-.2-1.3-.5-1.9 1.6 1 2.6 2.5 2.6 4.3 0 3-2.3 5.2-5.2 5.2S4 15.4 4 12.4c0-2.6 1.4-4.4 2.8-5.8C8.2 5.1 9.4 4 10.2 2.4Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="#CA8A04" aria-hidden>
      <path d="m8 1.5 1.7 3.5 3.8.6-2.7 2.7.6 3.8L8 10.3 4.6 12.1l.6-3.8L2.5 5.6l3.8-.6L8 1.5Z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 2.5h6v3.2a3 3 0 0 1-6 0V2.5Z"
        fill="#9333EA"
        stroke="#9333EA"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M4 3H2.5A1.5 1.5 0 0 0 2.5 6H4M12 3h1.5A1.5 1.5 0 0 1 13.5 6H12M6.5 11.5h3M8 8.7v2.8M5.5 13.5h5"
        stroke="#9333EA"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
