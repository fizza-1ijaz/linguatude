"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DIAGNOSTIC_SKILL_ROUTES } from "@/app/components/diagnostic/diagnostic-test-shell";
import {
  ONBOARDING_ROUTES,
  readOnboardingState,
} from "@/app/components/onboarding/onboarding-state";

const SECTION_SECONDS = 3 * 60;
const AUDIO_SECONDS = 3 * 60;

const SKILL_TABS = [
  { id: "listening", label: "Listening", icon: HeadphonesIcon },
  { id: "reading", label: "Reading", icon: BookIcon },
  { id: "writing", label: "Writing", icon: PenIcon },
  { id: "speaking", label: "Speaking", icon: MicIcon },
] as const;

const QUESTIONS = [
  {
    id: "q1",
    prompt: "What is the main topic of the conversation?",
    hint: "Choose ONE answer",
    options: [
      "City development and community spaces",
      "University course enrollment",
      "Travel booking for a holiday",
      "A job interview process",
    ],
  },
  {
    id: "q2",
    prompt: "What does the speaker say about the new community centre?",
    hint: "Choose ONE answer",
    options: [
      "It will replace the old library entirely",
      "It will include spaces for local events",
      "It is only open to students",
      "Construction has been cancelled",
    ],
  },
  {
    id: "q3",
    prompt: "What is the woman planning to do next?",
    hint: "Choose ONE answer",
    options: [
      "Visit the planning office",
      "Call her neighbour",
      "Leave the city",
      "Cancel her membership",
    ],
  },
] as const;

type Answers = Record<string, number | null>;

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function DiagnosticListeningTest() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sectionLeft, setSectionLeft] = useState(SECTION_SECONDS);
  const [audioPos, setAudioPos] = useState(72); // match design ~01:12
  const [playing, setPlaying] = useState(false);
  const [audioDone, setAudioDone] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.7);
  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
  });
  const endedRef = useRef(false);

  const questionsLocked = false;
  const answeredCount = QUESTIONS.filter((q) => answers[q.id] != null).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const canSubmit = true;

  useEffect(() => {
    const state = readOnboardingState();
    if (
      !state.exam ||
      (state.exam === "ukvi" && !state.ukviLevel) ||
      !state.experienceDone ||
      !state.goalsDone
    ) {
      router.replace(ONBOARDING_ROUTES.diagnostic);
      return;
    }
    setReady(true);
  }, [router]);

  // Hide page scrollbars while this screen is mounted
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hide-scrollbar");
    return () => root.classList.remove("hide-scrollbar");
  }, []);

  // Section countdown (display only — does not force navigation)
  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => {
      setSectionLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready]);

  // Simulated audio progress
  useEffect(() => {
    if (!ready || !playing || audioDone) return;
    const tickMs = 1000 / speed;
    const id = window.setInterval(() => {
      setAudioPos((p) => {
        if (p + 1 >= AUDIO_SECONDS) {
          setPlaying(false);
          setAudioDone(true);
          return AUDIO_SECONDS;
        }
        return p + 1;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [ready, playing, audioDone, speed]);

  const waveform = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const wave =
          0.35 +
          0.45 * Math.abs(Math.sin(i * 0.45 + audioPos * 0.08)) +
          0.2 * Math.abs(Math.sin(i * 0.17));
        return Math.min(1, wave);
      }),
    [audioPos],
  );

  function submitSection() {
    if (!canSubmit) return;
    endedRef.current = true;
    router.push(ONBOARDING_ROUTES.diagnosticReading);
  }

  function cycleSpeed() {
    setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1));
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#f4f6fb] text-sm text-[#64748b]">
        Loading…
      </div>
    );
  }

  return (
    <div className="diagnostic-test min-h-dvh bg-[#f4f6fb] text-[#141b2b]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ebf5] bg-white px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/onboarding/logo-cap.svg"
            alt=""
            width={32}
            height={32}
            className="size-8"
            priority
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#2b5ce6] sm:text-base">
              Linguatude
            </p>
            <p className="truncate text-xs text-[#64748b] sm:text-sm">
              IELTS Master Diagnostics
            </p>
          </div>
        </div>

        <nav className="order-3 flex w-full justify-center gap-1 sm:order-none sm:w-auto sm:gap-2">
          {SKILL_TABS.map((tab) => {
            const active = tab.id === "listening";
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={DIAGNOSTIC_SKILL_ROUTES[tab.id]}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition sm:px-3 ${
                  active
                    ? "border-b-2 border-[#2b5ce6] text-[#2b5ce6]"
                    : "text-[#94a3b8] hover:text-[#64748b]"
                }`}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 text-sm font-semibold text-[#141b2b]">
          <ClockIcon className="size-4 text-[#2b5ce6]" />
          <span className="tabular-nums">
            Time remaining: {formatTime(sectionLeft)}
          </span>
        </div>
      </header>

      {/* Body — page scrolls; no nested scroll areas */}
      <div className="mx-auto flex w-full max-w-7xl items-start gap-4 px-4 py-4 sm:px-6 lg:gap-6">
        <main className="flex min-w-0 flex-1 flex-col gap-3 pb-4">
          <h1 className="text-xl font-bold text-[#2b5ce6] sm:text-2xl">
            Listening · Section 1 of 4
          </h1>

          <div className="flex items-start gap-2.5 rounded-2xl bg-[#2b5ce6] px-4 py-3 text-sm font-medium text-white sm:px-5">
            <InfoCircleIcon className="mt-0.5 size-5 shrink-0" />
            <p>
              Listen to the audio, then answer the questions below. You can take
              notes while listening.
            </p>
          </div>

          {/* Audio player */}
          <section className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-xs font-semibold text-[#2b5ce6]">
                Audio 1 of 1
              </span>
              <h2 className="flex-1 text-center text-base font-bold text-[#141b2b] sm:text-lg">
                City Development and Community Spaces
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  playing
                    ? "bg-[#eef2ff] text-[#2b5ce6]"
                    : audioDone
                      ? "bg-[#ecfdf5] text-[#059669]"
                      : "bg-[#f1f5f9] text-[#64748b]"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    playing
                      ? "animate-pulse bg-[#2b5ce6]"
                      : audioDone
                        ? "bg-[#059669]"
                        : "bg-[#94a3b8]"
                  }`}
                />
                {playing
                  ? "Audio is playing..."
                  : audioDone
                    ? "Audio finished"
                    : "Paused"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  if (audioDone) {
                    setAudioPos(0);
                    setAudioDone(false);
                    setPlaying(true);
                    return;
                  }
                  setPlaying((p) => !p);
                }}
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2b5ce6] text-white shadow-sm transition hover:bg-[#244fe6] sm:size-14"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex h-10 items-end gap-[3px]">
                  {waveform.map((h, i) => (
                    <span
                      key={i}
                      className={`w-full max-w-[6px] rounded-full ${
                        playing ? "bg-[#2b5ce6]/70" : "bg-[#93a4d6]/55"
                      }`}
                      style={{ height: `${Math.max(12, h * 100)}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
                  <div
                    className="h-full rounded-full bg-[#2b5ce6] transition-[width] duration-300"
                    style={{
                      width: `${(audioPos / AUDIO_SECONDS) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-xs font-medium tabular-nums text-[#64748b]">
                  <span>{formatTime(audioPos)}</span>
                  <span>{formatTime(AUDIO_SECONDS)}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#f1f5f9] pt-3">
              <div className="flex items-center gap-2">
                <VolumeIcon className="size-4 text-[#64748b]" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-1.5 w-24 accent-[#2b5ce6]"
                  aria-label="Volume"
                />
              </div>
              <button
                type="button"
                onClick={cycleSpeed}
                className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-xs font-bold text-[#141b2b]"
              >
                {speed}x
              </button>
              <button
                type="button"
                className="ml-auto rounded-lg p-1.5 text-[#64748b] transition hover:bg-[#f1f5f9]"
                aria-label="Settings"
              >
                <GearIcon className="size-4" />
              </button>
            </div>
          </section>

          {/* Locked banner */}
          {questionsLocked ? (
            <div className="flex items-start gap-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#475569]">
              <LockIcon className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
              <p>
                Questions are locked while the audio is playing. You will be
                able to answer the questions after the audio finishes.
              </p>
            </div>
          ) : null}

          {/* Questions */}
          <section className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:p-5">
            <h3 className="text-base font-bold text-[#141b2b]">
              Questions ({answeredCount} / {QUESTIONS.length} answered)
            </h3>

            <ul className="mt-3 divide-y divide-[#eef2f7]">
              {QUESTIONS.map((q, index) => {
                const selected = answers[q.id];
                return (
                  <li
                    key={q.id}
                    className={`py-3.5 first:pt-2 last:pb-2 ${
                      questionsLocked ? "opacity-55" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-sm font-bold text-[#2b5ce6]">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#141b2b]">
                          {q.prompt}
                        </p>
                        <p className="mt-0.5 text-sm text-[#94a3b8]">{q.hint}</p>

                        {!questionsLocked ? (
                          <div className="mt-3 flex flex-col gap-2">
                            {q.options.map((opt, oi) => {
                              const checked = selected === oi;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: oi,
                                    }))
                                  }
                                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                                    checked
                                      ? "border-[#2b5ce6] bg-[#eef2ff] font-medium text-[#141b2b]"
                                      : "border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f8fafc]"
                                  }`}
                                >
                                  <span
                                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                                      checked
                                        ? "border-[#2b5ce6] bg-[#2b5ce6] shadow-[inset_0_0_0_2px_white]"
                                        : "border-[#cbd5e1]"
                                    }`}
                                  />
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                      {questionsLocked ? (
                        <LockIcon className="mt-1 size-4 shrink-0 text-[#94a3b8]" />
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#f1f5f9] px-3.5 py-2.5 text-sm text-[#64748b]">
              <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
              <p>
                You must answer all questions to enable the Submit section
                button.
              </p>
            </div>
          </section>
        </main>

        {/* Sidebar — both cards stick while the page scrolls */}
        <aside className="hidden w-72 shrink-0 lg:block xl:w-80">
          <div className="sticky top-[5.25rem] flex flex-col gap-4">
            <div className="rounded-2xl border border-[#c7d2fe] bg-[#eef2ff] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#2b5ce6]">
                <span className="flex size-8 items-center justify-center rounded-full bg-white">
                  <ClockIcon className="size-4" />
                </span>
                Section info
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#141b2b]">Listening</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#475569]">
                You will hear an audio recording. Listen carefully and then
                answer the questions that follow.
              </p>
              <div className="mt-4 space-y-1.5 border-t border-[#c7d2fe]/70 pt-3 text-sm text-[#334155]">
                <p>
                  <span className="font-semibold">Section time:</span> 3 minutes
                </p>
                <p>
                  <span className="font-semibold">Questions:</span> 3 questions
                </p>
              </div>
            </div>

            {questionsLocked ? (
              <div className="flex flex-col items-center rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-sm">
                <span className="flex size-14 items-center justify-center rounded-full bg-[#eef2ff] text-[#2b5ce6]">
                  <LockIcon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#141b2b]">
                  Questions locked
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Please listen to the entire audio. The questions will appear
                  automatically when it finishes.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#bbf7d0] bg-[#ecfdf5] p-5 text-center">
                <h3 className="text-base font-bold text-[#065f46]">
                  Questions unlocked
                </h3>
                <p className="mt-1.5 text-sm text-[#047857]">
                  Select one answer for each question, then submit the section.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 z-30 flex flex-col gap-3 border-t border-[#e8ebf5] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex max-w-3xl items-start gap-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#475569]">
          <ClockIcon className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" />
          <p>
            Switch freely between Listening, Reading, Writing, and Speaking
            using the tabs above.
          </p>
        </div>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={submitSection}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2b5ce6] px-5 text-base font-semibold text-white transition hover:bg-[#244fe6] disabled:cursor-not-allowed disabled:bg-[#93c5fd]"
        >
          Submit section
          <Image
            src="/onboarding/icon-arrow-sm.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        </button>
      </footer>
    </div>
  );
}

function ClockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4.5l3 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InfoCircleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 11v5M12 8h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function VolumeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10v4h3l4 3V7L7 10H4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.5a3.5 3.5 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M17.8 6.2l-1.4 1.4M7.6 16.4l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeadphonesIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13v3.5A2.5 2.5 0 0 0 6.5 19H8v-6H6.5A2.5 2.5 0 0 0 4 15.5V13a8 8 0 1 1 16 0v2.5A2.5 2.5 0 0 1 17.5 18H16v-5h1.5A2.5 2.5 0 0 1 20 15.5V13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15.5H7.5A2.5 2.5 0 0 0 5 21V5.5z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function PenIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20l4.2-1.1L19 8.1 15.9 5 5.1 15.8 4 20z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="3"
        width="6"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
