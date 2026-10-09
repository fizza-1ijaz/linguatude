"use client";

import Image from "next/image";
import { useState } from "react";

const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

export function BlogStayInformedForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;

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
          _subject: "New Blog Subscriber – Linguatude",
          _replyto: email,
          email,
          Message: `New subscriber from blog article sidebar.\n\nEmail: ${email}`,
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
      <p className="text-sm text-[#2D5BFF]" role="status" aria-live="polite">
        You&apos;re subscribed. Watch your inbox for new tips.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3" noValidate>
      <label className="sr-only" htmlFor="blog-stay-informed-email">
        Email address
      </label>
      <input
        id="blog-stay-informed-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Your email"
        disabled={status === "loading"}
        className="w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-3 text-sm text-[#111827] shadow-sm outline-none transition placeholder:text-[#6b7280] focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/25 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#2D5BFF] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

export function BlogSearchBox() {
  return (
    <form
      action="/blog"
      method="get"
      className="flex w-full items-center rounded-2xl border border-[#c5c7cb] bg-white p-2 shadow-sm"
      role="search"
    >
      <label className="sr-only" htmlFor="blog-article-search">
        Search articles
      </label>
      <input
        id="blog-article-search"
        name="q"
        type="search"
        placeholder="Search articles..."
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
      />
      <button
        type="submit"
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition hover:bg-[#f3f4f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
        aria-label="Search"
      >
        <Image
          src="/blog/icon-search.svg"
          alt=""
          width={15}
          height={15}
          className="size-[15px]"
        />
      </button>
    </form>
  );
}
