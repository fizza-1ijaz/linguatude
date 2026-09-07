"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const FORMSUBMIT_EMAIL =
  process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL ?? "hello@linguatude.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HELP_TOPICS = [
  "General Question",
  "PTE",
  "IELTS",
  "Technical Support",
  "Billing & Subscription",
  "Feedback",
  "Others",
] as const;

type HelpTopic = (typeof HELP_TOPICS)[number];

const SUPPORT_ITEMS = [
  {
    title: "Questions",
    description: "We'll help with anything you need.",
    icon: "/contact/icon-questions.svg",
    iconClass: "h-[0.94rem] w-5",
  },
  {
    title: "Support",
    description: "Get assistance with our products.",
    icon: "/contact/icon-support.svg",
    iconClass: "h-[1.1rem] w-5",
  },
  {
    title: "Partnerships",
    description: "Let's build something great together.",
    icon: "/contact/icon-partnerships.svg",
    iconClass: "h-5 w-[1.56rem]",
  },
] as const;

export function ContactPageContent() {
  const [topic, setTopic] = useState<HelpTopic>("General Question");
  const [topicOpen, setTopicOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const listboxId = useId();
  const topicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!topicOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!topicRef.current?.contains(e.target as Node)) {
        setTopicOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setTopicOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [topicOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "")
      .trim()
      .toLowerCase();
    const message = String(data.get("message") ?? "").trim();

    if (!name) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!message) {
      setErrorMessage("Please enter a message.");
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
          _subject: `Contact — ${topic} – Linguatude`,
          _replyto: email,
          name,
          email,
          topic,
          message,
          Message: `New contact form submission.\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
      setTopic("General Question");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="contact-hero-heading"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden>
          <div className="relative h-full w-full">
            <Image
              src="/contact/hero-envelope.png"
              alt=""
              fill
              priority
              className="object-contain object-right"
              sizes="48vw"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-[8rem]">
          <div className="max-w-xl animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3px] text-[#2D5BFF]">
              <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
              Get in touch
            </p>

            <h1
              id="contact-hero-heading"
              className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-[#1e1b4b] sm:text-5xl"
            >
              <span className="text-[#2D5BFF]">Contact</span> Linguatude
            </h1>

            <p className="mt-4 text-lg font-bold leading-7 text-[#6b7280] sm:text-xl">
              Have a question? We&apos;re here to help.
            </p>

            <div className="mt-6">
              <a
                href="#contact-form"
                className="inline-flex rounded-xl bg-[#2D5BFF] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        aria-labelledby="contact-form-heading"
      >
        <h2 id="contact-form-heading" className="sr-only">
          Contact form
        </h2>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.7fr)] lg:items-start lg:gap-10">
          <div className="rounded-[20px] border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
            {status === "success" ? (
              <div
                className="flex items-start gap-3 rounded-xl border-l-4 border-[#2D5BFF] bg-[#eaf0fd] p-4"
                role="status"
                aria-live="polite"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2D5BFF]">
                  <span className="relative size-3 overflow-clip">
                    <Image
                      src="/contact/icon-check.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="size-full"
                    />
                  </span>
                </span>
                <p className="text-base leading-6 text-[#1e1b4b]">
                  <span className="font-bold">Thanks for contacting us.</span>{" "}
                  We&apos;ve received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-lg font-semibold text-[#1e1b4b] sm:text-xl"
                  >
                    Name
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 overflow-clip">
                      <Image
                        src="/contact/icon-user.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="size-full"
                      />
                    </span>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-[#c0c1c3] bg-white py-3 pl-10 pr-3 text-base text-[#1e1b4b] placeholder:text-[#838486] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-lg font-semibold text-[#1e1b4b] sm:text-xl"
                  >
                    Email
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-3 top-1/2 h-3 w-4 -translate-y-1/2 overflow-clip">
                      <Image
                        src="/contact/icon-email.svg"
                        alt=""
                        width={16}
                        height={12}
                        className="size-full"
                      />
                    </span>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      disabled={status === "loading"}
                      className="w-full rounded-lg border border-[#c0c1c3] bg-white py-3 pl-10 pr-3 text-base text-[#1e1b4b] placeholder:text-[#838486] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div ref={topicRef} className="relative">
                  <p
                    id="contact-topic-label"
                    className="block text-lg font-semibold text-[#1e1b4b] sm:text-xl"
                  >
                    What can we help with?
                  </p>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={topicOpen}
                    aria-controls={listboxId}
                    aria-labelledby="contact-topic-label"
                    disabled={status === "loading"}
                    onClick={() => setTopicOpen((open) => !open)}
                    className="relative mt-2 flex w-full items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-3 py-3 text-left text-base text-[#374151] outline-none transition focus-visible:border-[#2D5BFF] focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/20 disabled:opacity-60"
                  >
                    <span>{topic}</span>
                    <span className="relative size-[1.3rem] shrink-0 overflow-clip">
                      <Image
                        src="/contact/icon-chevron.svg"
                        alt=""
                        width={21}
                        height={21}
                        className={`size-full transition ${topicOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>

                  {topicOpen ? (
                    <ul
                      id={listboxId}
                      role="listbox"
                      aria-labelledby="contact-topic-label"
                      className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f8f8f8] py-1 shadow-lg"
                    >
                      {HELP_TOPICS.map((option) => {
                        const selected = option === topic;
                        return (
                          <li key={option} role="option" aria-selected={selected}>
                            <button
                              type="button"
                              onClick={() => {
                                setTopic(option);
                                setTopicOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                                selected
                                  ? "bg-[#dbe3ff] font-semibold text-[#2D5BFF]"
                                  : "font-medium text-[#4b5563] hover:bg-white"
                              }`}
                            >
                              {option}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                  <input type="hidden" name="topic" value={topic} />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-lg font-semibold text-[#1e1b4b] sm:text-xl"
                  >
                    Message
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-3 top-3.5 h-3.5 w-4 overflow-clip">
                      <Image
                        src="/contact/icon-message.svg"
                        alt=""
                        width={16}
                        height={14}
                        className="size-full"
                      />
                    </span>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Type your message here..."
                      disabled={status === "loading"}
                      className="w-full resize-y rounded-lg border border-[#c0c1c3] bg-white py-3 pl-10 pr-3 text-base text-[#1e1b4b] placeholder:text-[#838486] outline-none transition focus:border-[#2D5BFF] focus:ring-2 focus:ring-[#2D5BFF]/20 disabled:opacity-60"
                    />
                  </div>
                </div>

                {errorMessage ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3b3bfa] px-4 py-3 text-base font-medium text-white shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 disabled:opacity-60"
                >
                  <span className="relative size-3.5 shrink-0 overflow-clip">
                    <Image
                      src="/contact/icon-send.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="size-full"
                    />
                  </span>
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-2xl border border-[#f3f4f6] bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-center text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-[#e8e8fc]">
                <span className="relative size-6 overflow-clip">
                  <Image
                    src="/contact/icon-headphones.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-full"
                  />
                </span>
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-7 text-[#1e1b4b]">
                We&apos;re here for you
              </h3>
              <p className="mt-2 text-base text-[#6b7280]">
                Our team typically replies within 24 hours.
              </p>
              <span className="mt-4 h-px w-12 bg-[#f3f4f6]" aria-hidden />
            </div>

            <ul className="mt-8 flex flex-col gap-8">
              {SUPPORT_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e8e8fc]">
                    <span className={`relative overflow-clip ${item.iconClass}`}>
                      <Image
                        src={item.icon}
                        alt=""
                        width={25}
                        height={20}
                        className="size-full"
                      />
                    </span>
                  </span>
                  <div>
                    <h4 className="text-xl font-semibold leading-5 text-[#1e1b4b]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[0.9375rem] leading-5 text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
