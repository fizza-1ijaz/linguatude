"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useAuth } from "@/app/components/auth-provider";
import { postAuthPath } from "@/lib/auth";
import {
  callSendVerificationEmail,
  callVerifyEmailCode,
  mapFunctionsAuthError,
} from "@/lib/functions-auth";

const OTP_LENGTH = 6;

export function VerifyEmailContent() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();
  const email = (user?.email ?? "").trim().toLowerCase();

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const autoSent = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.emailVerified) {
      void postAuthPath().then((path) => router.replace(path));
    }
  }, [loading, user, router]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, [email]);

  useEffect(() => {
    if (!user || user.emailVerified || autoSent.current) return;
    autoSent.current = true;
    void (async () => {
      try {
        const result = await callSendVerificationEmail();
        if (result.alreadyVerified) {
          await refreshUser();
          router.replace(await postAuthPath());
        }
      } catch {
        /* user can tap Resend */
      }
    })();
  }, [user, refreshUser, router]);

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
    if (resending || !user) return;
    setResending(true);
    setMessage(null);
    setError(null);
    try {
      const result = await callSendVerificationEmail();
      if (result.alreadyVerified) {
        await refreshUser();
        router.replace(await postAuthPath());
        return;
      }
      setMessage("Verification code sent again.");
      setDigits(Array.from({ length: OTP_LENGTH }, () => ""));
      focusAt(0);
    } catch (err) {
      setError(mapFunctionsAuthError(err));
    } finally {
      setResending(false);
    }
  }, [resending, user, refreshUser, router]);

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    if (!isComplete || verifying || !user) return;
    setVerifying(true);
    setError(null);
    setMessage(null);
    try {
      await callVerifyEmailCode(code);
      await refreshUser();
      router.push(await postAuthPath());
    } catch (err) {
      setError(mapFunctionsAuthError(err));
      setVerifying(false);
    }
  }

  if (loading || !user) {
    return (
      <p className="text-center text-sm text-[#64748B]">Loading…</p>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#141b2b] sm:text-[1.75rem]">
        Verify your email
      </h1>
      <p className="mt-2.5 max-w-md text-sm leading-6 text-[#64748B] sm:text-[0.95rem]">
        Enter the 6-digit code we sent to{" "}
        <span className="font-bold text-[#141b2b]">{email || "your email"}</span>.
      </p>

      <form onSubmit={handleVerify} className="mt-6 w-full">
        <div className="mx-auto flex w-full max-w-sm justify-between gap-1.5 sm:gap-2.5">
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
              className={`h-11 min-w-0 flex-1 rounded-lg border bg-white text-center text-base font-bold text-[#141b2b] outline-none transition sm:h-12 sm:max-w-12 sm:flex-none sm:text-lg ${
                activeIndex === i
                  ? "border-[#2b5ce6] ring-2 ring-[#2b5ce6]/25"
                  : "border-[#E2E8F0]"
              }`}
            />
          ))}
        </div>

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
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6] disabled:opacity-50"
        >
          {verifying ? "Verifying…" : "Verify"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => void handleResend()}
        disabled={resending}
        className="mt-4 text-sm font-semibold text-[#2b5ce6] transition hover:underline disabled:opacity-60"
      >
        {resending ? "Sending…" : "Resend verification email"}
      </button>

      <Link
        href="/login"
        className="mt-5 text-sm font-semibold text-[#64748B] transition hover:text-[#141b2b]"
      >
        Back to sign in
      </Link>
    </div>
  );
}
