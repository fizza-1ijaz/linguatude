"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const fieldClass =
  "w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-[0.95rem] text-[#1e1b4b] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20";

type Status = "idle" | "loading" | "error";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirmPassword") ?? "");
    const terms = data.get("terms") === "on";

    if (!fullName) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!PASSWORD_RE.test(password)) {
      setShowPasswordHint(true);
      setErrorMessage(
        "Password must be at least 8 characters with one uppercase letter and one number.",
      );
      return;
    }
    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!terms) {
      setErrorMessage("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setErrorMessage(null);
    setStatus("loading");

    if (!isSupabaseConfigured) {
      window.location.href = "/onboarding";
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      window.location.href = "/onboarding";
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      {errorMessage ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5">
        <div>
          <label
            htmlFor="signup-name"
            className="block text-sm font-semibold text-[#1e1b4b]"
          >
            Full Name
          </label>
          <input
            id="signup-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            required
            className={`mt-1.5 ${fieldClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-semibold text-[#1e1b4b]"
          >
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            required
            className={`mt-1.5 ${fieldClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-semibold text-[#1e1b4b]"
          >
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              onBlur={() => setShowPasswordHint(true)}
              className={`${fieldClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition hover:bg-[#f3f4f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
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
        </div>

        <div>
          <label
            htmlFor="signup-confirm"
            className="block text-sm font-semibold text-[#1e1b4b]"
          >
            Confirm Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="signup-confirm"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              onFocus={() => setShowPasswordHint(true)}
              className={`${fieldClass} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition hover:bg-[#f3f4f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
              aria-label={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            >
              <Image
                src={showConfirm ? "/auth/eye-off.svg" : "/auth/eye.svg"}
                alt=""
                width={22}
                height={15}
                className="h-[15px] w-[22px]"
              />
            </button>
          </div>
        </div>
      </div>

      {showPasswordHint ? (
        <p
          className="text-xs font-medium leading-4 text-[#6b7280]"
          id="signup-password-hint"
        >
          Minimum 8 characters, one uppercase, one number
        </p>
      ) : null}

      <label className="flex items-start gap-2.5 text-sm leading-5 text-[#4b5563]">
        <input
          type="checkbox"
          name="terms"
          className="mt-0.5 size-4 shrink-0 rounded border-[#d1d5db] text-[#2D5BFF] focus:ring-[#2D5BFF]"
        />
        <span>
          I agree to the{" "}
          <Link
            href="/terms-of-service"
            className="font-semibold text-[#2D5BFF] underline decoration-[#2D5BFF]/30 underline-offset-2 hover:decoration-[#2D5BFF]"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-[#2D5BFF] underline decoration-[#2D5BFF]/30 underline-offset-2 hover:decoration-[#2D5BFF]"
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-0.5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2D5BFF] text-[0.95rem] font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-60"
      >
        {status === "loading" ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
