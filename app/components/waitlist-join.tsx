"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { WaitlistShell } from "@/app/components/waitlist-shell";

export type WaitlistExam = "cambridge" | "toefl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

function parseExam(value: string | null): WaitlistExam {
  return value === "toefl" ? "toefl" : "cambridge";
}

export function WaitlistJoin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialExam = useMemo(
    () => parseExam(searchParams.get("exam")),
    [searchParams],
  );

  const [exam, setExam] = useState<WaitlistExam>(initialExam);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
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

    const examLabel = exam === "cambridge" ? "Cambridge" : "TOEFL";
    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `${examLabel} Waitlist Signup – Linguatude`,
          _replyto: email,
          email,
          exam: examLabel,
          Message: `New subscriber joined the ${examLabel} waitlist.\n\nEmail: ${email}\nExam: ${examLabel}\nSource: Waitlist join screen`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push(`/waitlist/success?exam=${exam}`);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const reduceMotion = useReducedMotion();

  return (
    <WaitlistShell backHref="/onboarding" backLabel="Back">
      <div className="grid w-full flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex min-w-0 w-full flex-col justify-center">
          <div className="mb-4 flex justify-center lg:hidden">
            <WaitlistArt sizeClass="max-w-[12rem]" reduceMotion={!!reduceMotion} />
          </div>

          <h1 className="text-center text-[1.5rem] font-extrabold tracking-tight text-[#141B2B] sm:text-[1.75rem] lg:text-left">
            Join the Waitlist
          </h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-[#64748B] lg:text-left">
            Be the first to know when our Cambridge or TOEFL preparation courses
            are ready.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-5 flex w-full flex-col gap-3.5"
            noValidate
          >
            <div
              className="grid grid-cols-2 gap-2.5"
              role="group"
              aria-label="Choose exam"
            >
              <ExamChip
                selected={exam === "cambridge"}
                onSelect={() => setExam("cambridge")}
                label="Cambridge"
                icon={<CambridgeIcon />}
              />
              <ExamChip
                selected={exam === "toefl"}
                onSelect={() => setExam("toefl")}
                label="TOEFL"
                icon={<ToeflIcon />}
              />
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="waitlist-email">
                Email address
              </label>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                <MailIcon />
              </span>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email address"
                disabled={status === "loading"}
                className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white py-3 pl-11 pr-4 text-sm text-[#141B2B] placeholder:text-[#94A3B8] outline-none transition focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20 disabled:opacity-60 sm:h-12"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(43,92,230,0.55)] transition hover:bg-[#244FE6] disabled:opacity-60 sm:h-12"
            >
              {status === "loading" ? "…" : "Notify me"}
              {status !== "loading" ? <ArrowRight /> : null}
            </button>

            {errorMessage ? (
              <p className="text-center text-sm text-red-600 lg:text-left" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </form>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] lg:justify-start">
            <ShieldTiny />
            We&apos;ll keep you updated.
          </p>
        </div>

        <div className="hidden min-w-0 w-full items-center justify-center lg:flex">
          <WaitlistArt sizeClass="max-w-sm" reduceMotion={!!reduceMotion} />
        </div>
      </div>
    </WaitlistShell>
  );
}

function WaitlistArt({
  sizeClass,
  reduceMotion,
}: {
  sizeClass: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className={`relative w-full ${sizeClass}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: "easeOut" }
      }
    >
      {!reduceMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#93C5FD]/25"
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <motion.div
        className="relative z-10"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.45,
              }
        }
      >
        <Image
          src="/waitlist/bell-letter.svg"
          alt=""
          width={340}
          height={260}
          className="h-auto w-full"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function ExamChip({
  selected,
  onSelect,
  label,
  icon,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition ${
        selected
          ? "border-[#2b5ce6] bg-[#EFF6FF] text-[#1D4ED8]"
          : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1]"
      }`}
    >
      <span className={selected ? "text-[#2b5ce6]" : "text-[#64748B]"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function CambridgeIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[1.125rem]" fill="none" aria-hidden>
      <path
        d="M9 2.5 3.5 5v4.2c0 3.4 2.3 6.5 5.5 7.5 3.2-1 5.5-4.1 5.5-7.5V5L9 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToeflIcon() {
  return (
    <svg viewBox="0 0 18 18" className="size-[1.125rem]" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6.5 6.5h5M9 6.5v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m3.5 6.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldTiny() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M7 1.75 2.75 3.5v3.2c0 2.55 1.75 4.9 4.25 5.55 2.5-.65 4.25-3 4.25-5.55V3.5L7 1.75Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
