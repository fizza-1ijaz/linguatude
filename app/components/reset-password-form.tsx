"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const fieldClass =
  "w-full rounded-lg border border-[#c3c5d7] bg-white px-4 py-3 pr-11 text-[0.95rem] text-[#141b2b] outline-none transition placeholder:text-[#6b7280] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20";

type Status = "idle" | "loading" | "success" | "error";

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasMinLength = password.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(password) && /\d/.test(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nextPassword = String(data.get("password") ?? "");
    const confirm = String(data.get("confirmPassword") ?? "");

    if (!PASSWORD_RE.test(nextPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters with one uppercase letter and one number.",
      );
      return;
    }
    if (nextPassword !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(null);
    setStatus("loading");

    if (!isSupabaseConfigured) {
      setStatus("success");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: nextPassword,
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
        className="rounded-xl border border-[#c1ebd1] bg-[#eaf6ee] p-5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-bold text-[#141b2b]">Password updated</p>
        <p className="mt-2 text-sm leading-6 text-[#4b5563]">
          Your new password is set. You can sign in now.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#2b5ce6] px-5 text-sm font-semibold text-white transition hover:bg-[#244FE6]"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5" noValidate>
      {errorMessage ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label
            htmlFor="reset-password"
            className="block text-sm font-semibold tracking-[0.01em] text-[#141b2b]"
          >
            New password
          </label>
          <div className="relative mt-2">
            <input
              id="reset-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
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
                width={18}
                height={16}
                className="h-4 w-[18px]"
              />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="reset-confirm"
            className="block text-sm font-semibold tracking-[0.01em] text-[#141b2b]"
          >
            Repeat new password
          </label>
          <div className="relative mt-2">
            <input
              id="reset-confirm"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              required
              className={fieldClass}
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
                width={18}
                height={16}
                className="h-4 w-[18px]"
              />
            </button>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-1 sm:flex-row sm:gap-5">
        <li
          className={`inline-flex items-center gap-1 text-xs font-medium tracking-[0.02em] ${
            hasMinLength ? "text-[#141b2b]" : "text-[#434655]"
          }`}
        >
          <Image
            src="/auth/check-req.svg"
            alt=""
            width={13}
            height={13}
            className={`size-3.5 ${hasMinLength ? "opacity-100" : "opacity-50"}`}
          />
          At least 8 characters
        </li>
        <li
          className={`inline-flex items-center gap-1 text-xs font-medium tracking-[0.02em] ${
            hasUpperAndNumber ? "text-[#141b2b]" : "text-[#434655]"
          }`}
        >
          <Image
            src="/auth/check-req.svg"
            alt=""
            width={13}
            height={13}
            className={`size-3.5 ${hasUpperAndNumber ? "opacity-100" : "opacity-50"}`}
          />
          One uppercase letter &amp; one number
        </li>
      </ul>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-[#2b5ce6] text-sm font-semibold tracking-[0.01em] text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 disabled:opacity-60"
      >
        {status === "loading" ? "Saving…" : "Set New Password"}
      </button>
    </form>
  );
}
