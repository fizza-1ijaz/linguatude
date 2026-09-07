"use client";

import { useState } from "react";

const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

const SUBJECT = "New Waitlist Signup – Linguatude";

const WAITLIST_SUCCESS_MESSAGE =
  "You are on the list. We will be in touch when Linguatude is ready.";

function formatDateTime(date: Date): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${datePart} – ${timePart}`;
}

function buildMessage(email: string): string {
  const dateTimeStr = formatDateTime(new Date());
  return `New subscriber joined the waitlist.

Email: ${email}
Date & Time: ${dateTimeStr}
Source: Landing page waitlist`;
}

async function submitToFormsubmit(email: string): Promise<void> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: SUBJECT,
      _replyto: email,
      email,
      Message: buildMessage(email),
    }),
  });
  if (!res.ok) {
    throw new Error(await res.text().catch(() => "Submission failed"));
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  variant: "hero" | "footer";
};

export function WaitlistForm({ variant }: Props) {
  const inputId = variant === "hero" ? "waitlist-email-hero" : "waitlist-email-footer";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "")
      .trim()
      .toLowerCase();
    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(null);
    setStatus("loading");
    try {
      await submitToFormsubmit(email);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        className="text-sm text-[#2D5BFF]"
        role="status"
        aria-live="polite"
      >
        {WAITLIST_SUCCESS_MESSAGE}
      </p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
        noValidate
      >
        <label className="sr-only" htmlFor={inputId}>
          Your email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="Your email address"
          disabled={status === "loading"}
          className="min-h-11 flex-1 rounded-xl border border-[#e2e8f0] bg-white px-4 text-[#1e1b4b] placeholder:text-[#6b7280] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-11 w-full shrink-0 touch-manipulation rounded-xl bg-[#2D5BFF] px-6 font-semibold text-white shadow-sm shadow-[#2D5BFF]/25 transition hover:bg-[#244FE6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5BFF] disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "…" : "Notify Me"}
        </button>
      </form>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
