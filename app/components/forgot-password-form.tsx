"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-lg border border-[#d1d5db] bg-white px-4 py-3 text-[0.95rem] text-[#141b2b] outline-none transition placeholder:text-[#747686] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "")
      .trim()
      .toLowerCase();

    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage(null);
    setStatus("loading");

    if (!isSupabaseConfigured) {
      router.push(
        `/forgot-password/check-email?email=${encodeURIComponent(email)}`,
      );
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      router.push(
        `/forgot-password/check-email?email=${encodeURIComponent(email)}`,
      );
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {errorMessage ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="forgot-email"
          className="block text-sm font-semibold tracking-[0.01em] text-[#141b2b]"
        >
          Email address
        </label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-[#2b5ce6] text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Reset Link"}
      </button>
    </form>
  );
}
