"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthBackToLogin } from "@/app/components/auth-shell";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const RESEND_SECONDS = 45;

export function CheckEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  const handleResend = useCallback(async () => {
    if (!email || secondsLeft > 0 || resending) return;
    setResending(true);
    setMessage(null);

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      }
      setSecondsLeft(RESEND_SECONDS);
      setMessage("Reset link sent again.");
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : "Couldn’t resend right now. Try again shortly.",
      );
    } finally {
      setResending(false);
    }
  }, [email, resending, secondsLeft]);

  const mm = String(Math.floor(secondsLeft / 60));
  const ss = String(secondsLeft % 60).padStart(2, "0");

  if (!email) return null;

  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/auth/email-check.svg"
        alt=""
        width={107}
        height={94}
        className="h-[5.5rem] w-auto"
        priority
      />

      <h1 className="mt-6 text-[1.75rem] font-bold leading-10 tracking-tight text-[#141b2b] sm:text-[2rem]">
        Check your inbox
      </h1>

      <p className="mt-3 max-w-md text-base leading-6 text-[#434655]">
        We&apos;ve sent a password reset link to{" "}
        <span className="font-semibold tracking-[0.01em] text-[#141b2b]">
          {email}
        </span>
        . It may take a minute to arrive — please also check your spam folder.
      </p>

      <a
        href="mailto:"
        className="mt-7 inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg bg-[#2b5ce6] text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
      >
        <Image
          src="/auth/open-email.svg"
          alt=""
          width={17}
          height={13}
          className="h-[13px] w-[17px]"
        />
        Open Email App
      </a>

      <div className="mt-5 min-h-5 text-center text-xs font-medium tracking-[0.02em] text-[#434655]">
        {secondsLeft > 0 ? (
          <p>
            Resend in{" "}
            <span className="text-sm font-semibold tracking-[0.01em] text-[#141b2b]">
              {mm}:{ss}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-sm font-semibold text-[#2b5ce6] transition hover:underline disabled:opacity-60"
          >
            {resending ? "Sending…" : "Resend email"}
          </button>
        )}
      </div>

      {message ? (
        <p className="mt-2 text-sm text-[#434655]" role="status">
          {message}
        </p>
      ) : null}

      <div className="mt-6">
        <AuthBackToLogin />
      </div>
    </div>
  );
}
