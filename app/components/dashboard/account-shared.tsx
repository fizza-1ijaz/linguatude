import Link from "next/link";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

export function AccountHeaderRight() {
  return <NotificationBellButton />;
}

export function BackToAccount() {
  return (
    <Link
      href="/dashboard/account"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#2b5ce6]"
      aria-label="Back to Account & Settings"
    >
      <svg viewBox="0 0 16 16" className="size-5" fill="none" aria-hidden>
        <path
          d="M10 3.5 5.5 8 10 12.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
        on ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
      }`}
    >
      <span
        className={`inline-block size-5 rounded-full bg-white shadow transition ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function RadioCard({
  selected,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  title: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition ${
        selected
          ? "border-[#2b5ce6] bg-[#EFF6FF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <span
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[#2b5ce6]" : "border-[#CBD5E1]"
        }`}
      >
        {selected ? <span className="size-2.5 rounded-full bg-[#2b5ce6]" /> : null}
      </span>
      <span>
        <span className="block text-sm font-bold text-[#141B2B]">{title}</span>
        <span className="mt-0.5 block text-sm text-[#64748B]">{description}</span>
      </span>
    </button>
  );
}
