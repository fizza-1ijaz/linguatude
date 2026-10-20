"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const OTP_LENGTH = 6;

export function CheckEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, [email]);

  const code = digits.join("");
  const isComplete = code.length === OTP_LENGTH && digits.every((d) => d !== "");

  function focusAt(index: number) {
    const next = Math.max(0, Math.min(OTP_LENGTH - 1, index));
    setActiveIndex(next);
    inputsRef.current[next]?.focus();
  }

  function updateDigit(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    setError(null);
    if (char && index < OTP_LENGTH - 1) focusAt(index + 1);
  }

  function onKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigits((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        setDigits((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
        focusAt(index - 1);
      }
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(index - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(index + 1);
    }
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? "");
    setDigits(next);
    setError(null);
    focusAt(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  const handleResend = useCallback(async () => {
    if (!email || resending) return;
    setResending(true);
    setMessage(null);
    setError(null);

    try {
      if (isSupabaseConfigured) {
        const { error: resendError } = await supabase.auth.resetPasswordForEmail(
          email,
          { redirectTo: `${window.location.origin}/reset-password` },
        );
        if (resendError) throw resendError;
      }
      setMessage("Verification email sent again.");
      setDigits(Array.from({ length: OTP_LENGTH }, () => ""));
      focusAt(0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn’t resend right now. Try again shortly.",
      );
    } finally {
      setResending(false);
    }
  }, [email, resending]);

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    if (!isComplete || verifying) return;
    setVerifying(true);
    setError(null);
    setMessage(null);

    // UI-complete flow for now — continue to reset password after a short pause.
    window.setTimeout(() => {
      router.push(
        `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
      );
    }, 400);
  }

  if (!email) return null;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex size-[5.75rem] items-center justify-center">
        {/* Radiating dashes */}
        <span className="pointer-events-none absolute inset-0" aria-hidden>
          {[
            -55, -30, -10, 10, 30, 55,
          ].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-2.5 w-[2px] rounded-full bg-[#93C5FD]"
              style={{
                transform: `rotate(${deg}deg) translateY(-2.55rem)`,
                transformOrigin: "center center",
              }}
            />
          ))}
        </span>
        <span
          className="absolute inset-[0.55rem] rounded-full bg-[#DBEAFE]"
          aria-hidden
        />
        <span className="relative z-10 flex items-center justify-center">
          <svg viewBox="0 0 48 40" className="h-10 w-12 text-[#2b5ce6]" fill="none" aria-hidden>
            <rect
              x="4"
              y="8"
              width="36"
              height="26"
              rx="3"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <path
              d="M6 11.5 22 22.5 38 11.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="38" cy="10" r="7" fill="#2b5ce6" />
            <path
              d="M35.2 10.2 37.1 12.1 41 8.2"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h1 className="mt-5 text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#141b2b] sm:text-[1.75rem]">
        Check your inbox
      </h1>

      <p className="mt-2.5 max-w-md text-sm leading-6 text-[#64748B] sm:text-[0.95rem]">
        We&apos;ve sent a password reset link to{" "}
        <span className="font-bold text-[#141b2b]">{email}</span>. It may take a
        minute to arrive — please also check your spam folder.
      </p>

      <div className="mt-5 flex w-full items-center gap-3 rounded-xl bg-[#F1F5F9] px-3.5 py-3 text-left sm:px-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE]">
          <svg viewBox="0 0 20 20" className="size-4 text-[#2b5ce6]" fill="none" aria-hidden>
            <rect
              x="2.5"
              y="5"
              width="15"
              height="10.5"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M3.5 6.5 10 11l6.5-4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="min-w-0 flex-1 text-sm leading-5 text-[#475569]">
          We&apos;ve sent a verification code to{" "}
          <span className="font-bold text-[#141b2b]">{email}</span>
        </p>
        <Link
          href="/forgot-password"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2b5ce6] transition hover:underline"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
            <path
              d="M9.5 3.5 12.5 6.5M3 13l.7-3.2L10.8 2.7a1.2 1.2 0 0 1 1.7 0l.8.8a1.2 1.2 0 0 1 0 1.7L6.2 12.3 3 13Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit
        </Link>
      </div>

      <form onSubmit={handleVerify} className="mt-6 w-full">
        <div className="flex justify-center gap-2 sm:gap-2.5">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
              value={digit}
              onChange={(e) => updateDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={onPaste}
              onFocus={() => setActiveIndex(i)}
              className={`size-11 rounded-lg border bg-white text-center text-lg font-bold text-[#141b2b] outline-none transition sm:size-12 ${
                activeIndex === i
                  ? "border-[#2b5ce6] ring-2 ring-[#2b5ce6]/25"
                  : "border-[#E2E8F0]"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-xs text-[#94A3B8] sm:text-sm">
          Enter the 6-digit code sent to {email}
        </p>

        {error ? (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-3 text-sm text-[#434655]" role="status">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isComplete || verifying}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-50"
        >
          {verifying ? "Verifying…" : "Verify"}
          {!verifying ? (
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              <path
                d="M3 8h9M9 4.5 12.5 8 9 11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        disabled={resending}
        className="mt-4 text-sm font-semibold text-[#2b5ce6] transition hover:underline disabled:opacity-60"
      >
        {resending ? "Sending…" : "Resend verification email"}
      </button>

      <Link
        href="/login"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#64748B] transition hover:text-[#141b2b]"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
          <path
            d="M10 3.5 5.5 8 10 12.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to sign in
      </Link>
    </div>
  );
}
