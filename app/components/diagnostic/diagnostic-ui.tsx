import Image from "next/image";

/** White circle background with blue “i” — used in tip banners */
export function TipInfoIcon({ className = "size-5" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-white ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="size-[72%] text-[#2b5ce6]" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 9v4.75M10 6.35h.01"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function DiagnosticTipBanner({
  title,
  description,
  className = "",
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl bg-[#2b5ce6] px-4 py-3.5 text-white sm:px-5 ${className}`}
    >
      <TipInfoIcon className="mt-0.5 size-5" />
      <div className="min-w-0">
        <p className="text-sm font-bold sm:text-[0.9375rem]">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs leading-5 text-white/90 sm:text-sm">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function DiagnosticSectionHeading({
  skill,
  section,
}: {
  skill: string;
  section: string;
}) {
  return (
    <h1 className="text-xl font-semibold sm:text-[1.375rem]">
      <span className="text-[#2b5ce6]">{skill}</span>
      <span className="text-[#9CA3AF]"> · </span>
      <span className="text-sm font-medium text-[#111827] sm:text-[0.9375rem]">
        {section}
      </span>
    </h1>
  );
}

export function LinguatudeLogoMark({
  size = 28,
  className = "size-7",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/linguatude.webp"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 overflow-hidden rounded-lg object-cover ${className}`}
      priority
    />
  );
}

export function StickySubmitFooter({
  canSubmit,
  onSubmit,
  submitLabel = "Submit section",
  message = "If time runs out, your answers will be submitted automatically and the test will move to the next section.",
}: {
  canSubmit: boolean;
  onSubmit?: () => void;
  submitLabel?: string;
  message?: string;
}) {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex max-w-3xl items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-2.5 text-sm text-[#4B5563]">
          <AutoSubmitIcon />
          <p>{message}</p>
        </div>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244fe6] disabled:cursor-not-allowed disabled:bg-[#93C5FD] sm:h-12 sm:text-base"
        >
          {submitLabel}
          <span aria-hidden>→</span>
        </button>
      </div>
    </footer>
  );
}

function AutoSubmitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0 text-[#2b5ce6]"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 7.5v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
