"use client";

import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-[0.95rem] text-base text-[#1e1b4b] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
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
      setStatus("success");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-[#c1ebd1] bg-[#eaf6ee] p-5"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-bold text-[#1e1b4b]">Check your email</p>
        <p className="mt-2 text-sm leading-6 text-[#4b5563]">
          If an account exists for that address, we&apos;ve sent a link to reset
          your password.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      {errorMessage ? (
        <p
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="forgot-email"
          className="block text-sm font-semibold text-[#1e1b4b]"
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
        className="mt-6 inline-flex h-[3.25rem] w-full items-center justify-center rounded-xl bg-[#2D5BFF] text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
