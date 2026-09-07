"use client";

import Image from "next/image";
import { useState } from "react";

const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CambridgeWaitlistForm() {
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
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Cambridge Waitlist Signup – Linguatude",
          _replyto: email,
          email,
          Message: `New subscriber joined the Cambridge waitlist.\n\nEmail: ${email}\nSource: Cambridge coming soon page`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center text-base text-[#2D5BFF]" role="status" aria-live="polite">
        You are on the list. We will notify you when Cambridge prep launches.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
      <div className="relative">
        <label className="sr-only" htmlFor="cambridge-waitlist-email">
          Email address
        </label>
        <span className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 overflow-clip">
          <Image
            src="/cambridge/envelope.svg"
            alt=""
            width={20}
            height={20}
            className="size-full"
          />
        </span>
        <input
          id="cambridge-waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          disabled={status === "loading"}
          className="w-full rounded-xl border border-[#909192] bg-white py-4 pl-12 pr-4 text-lg text-[#1a1f36] placeholder:text-[#6b7280] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/25 disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3b59ff] to-[#6039ff] py-4 text-lg font-semibold text-white shadow-[0_4px_14px_rgba(45,92,254,0.39)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Notify me"}
        {status !== "loading" ? (
          <span className="relative size-5 shrink-0 overflow-clip">
            <Image
              src="/cambridge/notify-arrow.svg"
              alt=""
              width={20}
              height={20}
              className="size-full"
            />
          </span>
        ) : null}
      </button>
      {errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
