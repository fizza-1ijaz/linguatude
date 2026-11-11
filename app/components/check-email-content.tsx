"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { mapAuthError, sendPasswordReset } from "@/lib/auth";

/**
 * Forgot-password inbox screen.
 * Deployed `sendPasswordReset` emails a reset *link* (not an OTP).
 */
export function CheckEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) router.replace("/forgot-password");
  }, [email, router]);

  const handleResend = useCallback(async () => {
    if (!email || resending) return;
    setResending(true);
    setMessage(null);
    setError(null);
    try {
      await sendPasswordReset(email);
      setMessage("Reset email sent again. Open the link in your inbox.");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setResending(false);
    }
  }, [email, resending]);

  if (!email) return null;

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#141b2b] sm:text-[1.75rem]">
        Check your inbox
      </h1>
      <p className="mt-2.5 max-w-md text-sm leading-6 text-[#64748B] sm:text-[0.95rem]">
        We&apos;ve sent a password reset link to{" "}
        <span className="font-bold text-[#141b2b]">{email}</span>. It may take a
        minute to arrive — please also check your spam folder.
      </p>

      {error ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-4 text-sm text-[#434655]" role="status">
          {message}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => void handleResend()}
        disabled={resending}
        className="mt-6 text-sm font-semibold text-[#2b5ce6] transition hover:underline disabled:opacity-60"
      >
        {resending ? "Sending…" : "Resend reset email"}
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
