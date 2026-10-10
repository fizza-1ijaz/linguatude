export function NotificationBellButton() {
  return (
    <button
      type="button"
      className="relative inline-flex size-10 items-center justify-center rounded-full bg-white text-[#64748B] shadow-sm ring-1 ring-[#E2E8F0]"
      aria-label="Notifications"
    >
      <BellIcon />
      <span className="absolute right-2 top-2 size-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
    </button>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path
        d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5v2.2c0 .6-.2 1.2-.6 1.7L3.8 12.5c-.5.6-.1 1.5.7 1.5h11c.8 0 1.2-.9.7-1.5l-1.1-1.6c-.4-.5-.6-1.1-.6-1.7V7A4.5 4.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 14.5a1.8 1.8 0 0 0 3.6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
