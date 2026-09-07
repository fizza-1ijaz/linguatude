"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-[0.95rem] text-base text-[#1e1b4b] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20";

type Status = "idle" | "loading" | "error";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(data.get("password") ?? "");

    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setErrorMessage(null);
    setStatus("loading");

    if (!isSupabaseConfigured) {
      setStatus("error");
      setErrorMessage(
        "Sign in isn’t available yet. Join the waitlist to get early access.",
      );
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      window.location.href = "/";
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
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      {errorMessage ? (
        <p
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
          {!isSupabaseConfigured ? (
            <>
              {" "}
              <Link href="/#start" className="font-semibold underline">
                Join waitlist
              </Link>
            </>
          ) : null}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="signin-email"
          className="block text-sm font-semibold text-[#1e1b4b]"
        >
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          required
          className={`mt-2 ${fieldClass}`}
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="signin-password"
          className="block text-sm font-semibold text-[#1e1b4b]"
        >
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="signin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={`${fieldClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-2 transition hover:bg-[#f3f4f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Image
              src={showPassword ? "/auth/eye-off.svg" : "/auth/eye.svg"}
              alt=""
              width={22}
              height={15}
              className="h-[15px] w-[22px]"
            />
          </button>
        </div>
        <div className="mt-2 flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-[#2D5BFF] transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex h-[3.25rem] w-full items-center justify-center rounded-xl bg-[#2D5BFF] text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-60"
      >
        {status === "loading" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
