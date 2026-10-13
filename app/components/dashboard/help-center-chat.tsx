"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import { NotificationBellButton } from "@/app/components/dashboard/notification-bell-button";

type ChatMsg = {
  id: string;
  role: "ayra" | "user";
  text: string;
  time: string;
};

const SUGGESTIONS = [
  { label: "Practice exercises", icon: "/help-center/icon-book-sm.svg" },
  { label: "Speaking tips", icon: "/help-center/icon-lightbulb.svg" },
  { label: "Sample questions", icon: "/help-center/icon-doc.svg" },
  { label: "Score improvement", icon: "/help-center/icon-score.svg" },
] as const;

const QUICK_HELP = [
  {
    title: "PTE Speaking Tips",
    subtitle: "Improve your score",
    icon: "/help-center/icon-tips.svg",
    bg: "bg-[#7C3AED]",
    prompt: "Can you share PTE Speaking tips to improve my score?",
  },
  {
    title: "Practice Conversations",
    subtitle: "Real exam style",
    icon: "/help-center/icon-conversations.svg",
    bg: "bg-[#14B8A6]",
    prompt: "Let's practice a real exam-style conversation.",
  },
  {
    title: "Common Questions",
    subtitle: "Get instant answers",
    icon: "/help-center/icon-questions.svg",
    bg: "bg-[#2b5ce6]",
    prompt: "What are the most common questions students ask?",
  },
  {
    title: "Study Plan",
    subtitle: "Stay on track",
    icon: "/help-center/icon-plan.svg",
    bg: "bg-[#F97316]",
    prompt: "Help me build a study plan to stay on track.",
  },
] as const;

const INITIAL: ChatMsg[] = [
  {
    id: "1",
    role: "ayra",
    text: "Hi! I'm Ayra, your Linguatude AI assistant. How can I help you today?",
    time: "8:41 AM",
  },
  {
    id: "2",
    role: "user",
    text: "I need help with speaking practice.",
    time: "9:42 AM",
  },
  {
    id: "3",
    role: "ayra",
    text: "Great! I can help with fluency tips, sample questions, or a short practice conversation. What would you like to start with?",
    time: "9:42 AM",
  },
];

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

const QUICK_HELP_KEY = "linguatude-ayra-quick-help-open";

export function HelpCenterChat() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL);
  const [draft, setDraft] = useState("");
  const [quickHelpOpen, setQuickHelpOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(QUICK_HELP_KEY);
      if (saved === "0") setQuickHelpOpen(false);
      else if (saved === "1") setQuickHelpOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function setQuickHelp(open: boolean) {
    setQuickHelpOpen(open);
    try {
      window.localStorage.setItem(QUICK_HELP_KEY, open ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      time: nowLabel(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "ayra",
          text: "Thanks for sharing that! Here's a helpful tip: practise out loud for 5–10 minutes daily, focus on clear pronunciation, and don't worry about small pauses. Want a sample question next?",
          time: nowLabel(),
        },
      ]);
    }, 650);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  return (
    <DashboardShell
      title={<span className="sr-only">Help Center Chat</span>}
      hideHeader
      contentBgClassName="bg-white"
      mainClassName="flex min-h-0 flex-1 flex-col px-0 py-0"
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden lg:flex-row">
        {/* Chat pane */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] px-[1cm] py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/help-center/ayra-pfp.svg"
                alt=""
                className="size-11 shrink-0 rounded-full object-cover object-top ring-2 ring-[#DBEAFE]"
              />
              <div className="min-w-0">
                <p className="text-base font-bold text-[#2b5ce6]">Ayra</p>
                <p className="text-xs text-[#94A3B8]">Linguatude AI Assistant</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setQuickHelp(!quickHelpOpen)}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition ${
                  quickHelpOpen
                    ? "bg-[#EEF0FF] text-[#5B21B6] hover:bg-[#E0E7FF]"
                    : "bg-[#2b5ce6] text-white hover:bg-[#244FE6]"
                }`}
                aria-pressed={quickHelpOpen}
                aria-label={quickHelpOpen ? "Close Quick Help" : "Open Quick Help"}
              >
                <Image
                  src="/help-center/icon-sparkle.svg"
                  alt=""
                  width={12}
                  height={12}
                  className={`size-3 ${quickHelpOpen ? "" : "brightness-0 invert"}`}
                />
                {quickHelpOpen ? "Hide help" : "Quick Help"}
              </button>
              <NotificationBellButton />
            </div>
          </div>

          <div className="help-chat-scroll min-h-0 flex-1 space-y-5 overflow-y-auto overflow-x-hidden px-[1cm] py-5">
            {messages.map((m) =>
              m.role === "ayra" ? (
                <div key={m.id} className="flex max-w-[85%] items-start gap-2.5 sm:max-w-[70%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/help-center/ayra-pfp.svg"
                    alt=""
                    className="mt-0.5 size-8 shrink-0 rounded-full object-cover object-top"
                  />
                  <div className="min-w-0">
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[#334155] shadow-[0_8px_24px_-12px_rgba(15,23,42,0.2)] ring-1 ring-[#F1F5F9]">
                      {m.text}
                    </div>
                    <p className="mt-1.5 text-[0.6875rem] text-[#94A3B8]">{m.time}</p>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="ml-auto flex max-w-[85%] flex-col items-end sm:max-w-[70%]">
                  <div className="rounded-2xl bg-[#E8EAF6] px-4 py-3 text-sm leading-6 text-[#312E81] shadow-[0_8px_24px_-14px_rgba(15,23,42,0.18)]">
                    {m.text}
                  </div>
                  <p className="mt-1.5 inline-flex items-center gap-1 text-[0.6875rem] text-[#94A3B8]">
                    {m.time}
                    <ReadCheck />
                  </p>
                </div>
              ),
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#F1F5F9] px-[1cm] py-4">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => send(s.label)}
                  className="inline-flex max-w-full items-center gap-1 rounded-full bg-[#EFF6FF] px-2.5 py-1.5 text-[0.6875rem] font-semibold leading-tight text-[#2b5ce6] transition hover:bg-[#DBEAFE]"
                >
                  <Image src={s.icon} alt="" width={12} height={12} className="size-3 shrink-0" />
                  {s.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-2 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.2)]"
            >
              <button
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-[#F8FAFC]"
                aria-label="Attach file"
              >
                <Image
                  src="/help-center/icon-attach.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px]"
                />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#141B2B] outline-none placeholder:text-[#94A3B8]"
              />
              <button
                type="submit"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white transition hover:bg-[#244FE6]"
                aria-label="Send message"
              >
                <Image
                  src="/help-center/icon-send.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              </button>
            </form>
          </div>
        </section>

        {/* Quick Help sidebar */}
        {quickHelpOpen ? (
          <aside className="flex w-full shrink-0 flex-col border-t border-[#E2E8F0] bg-[#EEF0FF] px-4 py-5 sm:px-5 lg:w-[19.5rem] lg:border-l lg:border-t-0 xl:w-[22rem]">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <p className="inline-flex items-center gap-1.5 text-base font-bold text-[#5B21B6]">
                  <Image
                    src="/help-center/icon-sparkle.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="size-3.5"
                  />
                  Quick Help
                </p>
                <p className="mt-1 text-sm text-[#94A3B8]">Choose a topic or ask anything</p>
              </div>
              <button
                type="button"
                onClick={() => setQuickHelp(false)}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-white hover:text-[#5B21B6]"
                aria-label="Close Quick Help"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2.5">
              {QUICK_HELP.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => send(item.prompt)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-left shadow-[0_8px_20px_-16px_rgba(15,23,42,0.25)] transition hover:shadow-md"
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.bg}`}
                  >
                    <Image src={item.icon} alt="" width={18} height={18} className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[#141B2B]">{item.title}</span>
                    <span className="block text-xs text-[#94A3B8]">{item.subtitle}</span>
                  </span>
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ›
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3.5 shadow-[0_8px_20px_-16px_rgba(15,23,42,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/help-center/ayra-pfp.svg"
                  alt=""
                  className="size-12 shrink-0 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-sm font-bold text-[#141B2B]">Need more help?</p>
                  <p className="text-xs text-[#64748B]">I&apos;m just a message away!</p>
                </div>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </DashboardShell>
  );
}

function ReadCheck() {
  return (
    <svg viewBox="0 0 16 12" className="size-3.5 text-[#2b5ce6]" fill="none" aria-hidden>
      <path
        d="M1 6.5 3.8 9.2 8.5 3.5M6.5 9.2 7.8 10.5 14.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
