"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ExamReadyStep = "part1" | "part2-prep" | "part2-record" | "part3";
type ExamPhase = ExamReadyStep | "recording" | "saved";

const PREP_SECONDS = 45;
const RECORD_SECONDS = 107; // 01:47
const SAVED_ADVANCE_MS = 2000;

const QUESTIONS: Record<"part1" | "part2" | "part3", string> = {
  part1: "Tell me about the area where you grew up.",
  part2: "Describe a memorable journey.",
  part3: "Do you agree that spending time with family is important?",
};

const CUE_BULLETS = [
  "where you went",
  "who you went with",
  "what happened",
  "why it was memorable",
] as const;

const CANDIDATE_LINES = [
  "I enjoy spending time with my family on weekends.",
  "We usually go out for lunch or watch a movie together.",
  "It helps me relax after a busy week at work.",
] as const;

const WAVE_HEIGHTS = [
  10, 14, 18, 12, 22, 16, 28, 20, 34, 24, 40, 30, 46, 36, 52, 42, 58, 48, 62,
  50, 66, 54, 70, 58, 74, 60, 78, 64, 80, 66, 82, 68, 80, 64, 76, 60, 70, 54,
  62, 48, 56, 42, 48, 34, 40, 28, 32, 22, 26, 16, 20, 12, 14, 10,
];

export function SpeakExam() {
  const router = useRouter();
  const [phase, setPhase] = useState<ExamPhase>("part1");
  const [recordingFrom, setRecordingFrom] = useState<"part1" | "part2" | "part3">(
    "part1",
  );
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [prepRemaining, setPrepRemaining] = useState(PREP_SECONDS);
  const [recordRemaining, setRecordRemaining] = useState(RECORD_SECONDS);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const tick = window.setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (phase !== "part2-prep") return;
    let remaining = PREP_SECONDS;
    setPrepRemaining(PREP_SECONDS);
    const id = window.setInterval(() => {
      remaining -= 1;
      setPrepRemaining(remaining);
      if (remaining <= 0) {
        window.clearInterval(id);
        setPhase("part2-record");
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  const goToSaved = useCallback(() => {
    setPhase("saved");
  }, []);

  useEffect(() => {
    if (phase !== "recording") return;
    let remaining = RECORD_SECONDS;
    setRecordRemaining(RECORD_SECONDS);
    const id = window.setInterval(() => {
      remaining -= 1;
      setRecordRemaining(remaining);
      if (remaining <= 0) {
        window.clearInterval(id);
        goToSaved();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, goToSaved]);

  useEffect(() => {
    if (phase !== "saved") return;
    const id = window.setTimeout(() => {
      if (recordingFrom === "part1") setPhase("part2-prep");
      else if (recordingFrom === "part2") setPhase("part3");
      else router.push("/dashboard/speak/test-results");
    }, SAVED_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [phase, recordingFrom, router]);

  const sessionLabel = formatTime(sessionSeconds);
  const prepLabel = formatTime(prepRemaining);
  const recordLabel = formatTime(recordRemaining);

  const questionText = useMemo(() => {
    if (recordingFrom === "part1") return QUESTIONS.part1;
    if (recordingFrom === "part2") return QUESTIONS.part2;
    return QUESTIONS.part3;
  }, [recordingFrom]);

  const startRecording = useCallback((from: "part1" | "part2" | "part3") => {
    setRecordingFrom(from);
    setRecordRemaining(RECORD_SECONDS);
    setPhase("recording");
  }, []);

  const advanceFromMic = useCallback(() => {
    if (phase === "part1") startRecording("part1");
    else if (phase === "part2-prep") setPhase("part2-record");
    else if (phase === "part2-record") startRecording("part2");
    else if (phase === "part3") startRecording("part3");
  }, [phase, startRecording]);

  const closeRecording = useCallback(() => {
    router.push("/dashboard/speak");
  }, [router]);

  if (phase === "recording") {
    return (
      <ExamRecordingScreen
        question={questionText}
        timeLabel={recordLabel}
        onClose={closeRecording}
        onStop={goToSaved}
      />
    );
  }

  if (phase === "saved") {
    return <ExamSavedScreen question={questionText} />;
  }

  const partLabel =
    phase === "part1" ? "Part 1" : phase === "part3" ? "Part 3" : "Part 2";
  const filledDots = phase === "part1" ? 1 : phase === "part3" ? 3 : 2;
  const questionLabel =
    phase === "part1"
      ? "Question 1 of 4"
      : phase === "part3"
        ? "Question 1 of 3"
        : "Question 1 of 1";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#F8F9FC] text-[#1E293B]">
      <header className="flex items-start justify-between gap-4 px-5 pt-6 sm:px-10 sm:pt-8">
        <div>
          <p className="text-base font-bold text-[#1E3A8A] sm:text-lg">{partLabel}</p>
          <div className="mt-2 flex items-center gap-1.5" aria-hidden>
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`size-2.5 rounded-full ${
                  n <= filledDots ? "bg-[#2b5ce6]" : "bg-[#CBD5E1]"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="pt-0.5 text-base font-bold text-[#141B2B] sm:text-lg">
          {questionLabel}
        </p>
        <p className="pt-0.5 text-sm text-[#64748B] sm:text-base">
          Session time:{" "}
          <span className="font-semibold tabular-nums text-[#2b5ce6]">
            {sessionLabel}
          </span>
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        {phase === "part1" ? (
          <Part1Card />
        ) : phase === "part3" ? (
          <Part3Card />
        ) : (
          <CueCard
            prepLabel={prepLabel}
            prepProgress={prepRemaining / PREP_SECONDS}
            notes={notes}
            onNotesChange={setNotes}
          />
        )}

        <div className="mt-10 flex flex-col items-center gap-3">
          {phase === "part2-prep" ? (
            <>
              <button
                type="button"
                onClick={advanceFromMic}
                className="flex size-[4.25rem] items-center justify-center rounded-full bg-[#F5D78E] text-white shadow-sm transition hover:bg-[#F0CB74] sm:size-[4.75rem]"
                aria-label="Skip preparation"
              >
                <MicButtonIcon />
              </button>
              <p className="text-base font-bold text-[#141B2B]">Preparing...</p>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <span
                  className="absolute size-[5.5rem] rounded-full border border-[#FDBA74]/70 sm:size-[6rem]"
                  aria-hidden
                />
                <span
                  className="absolute size-[6.5rem] rounded-full border border-[#FED7AA]/50 sm:size-[7rem]"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={advanceFromMic}
                  className="relative flex size-[4.25rem] items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_8px_24px_-6px_rgba(249,115,22,0.55)] transition hover:bg-[#EA580C] sm:size-[4.75rem]"
                  aria-label="Record answer"
                >
                  <MicButtonIcon />
                </button>
              </div>
              <p className="text-base font-bold text-[#141B2B]">Tap to record</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function ExamRecordingScreen({
  question,
  timeLabel,
  onClose,
  onStop,
}: {
  question: string;
  timeLabel: string;
  onClose: () => void;
  onStop: () => void;
}) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-[#0B1220] px-4 py-6 text-white sm:px-8 sm:py-8">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md bg-white text-[#334155] shadow-sm transition hover:bg-[#F8FAFC] sm:right-6 sm:top-6 sm:size-10"
        aria-label="Close recording"
      >
        <CloseIcon />
      </button>

      <div className="mt-2 w-full max-w-xl rounded-2xl bg-[#1A2336] px-6 py-4 text-center sm:mt-4 sm:px-8 sm:py-5">
        <p className="text-base font-medium leading-7 text-white sm:text-lg sm:leading-8">
          {question}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <WaveformVisualizer />

        <p className="mt-10 text-sm font-medium text-white/90 sm:text-base">
          Time Remaining
        </p>
        <p className="mt-1 text-5xl font-bold tabular-nums tracking-tight text-white sm:text-6xl">
          {timeLabel}
        </p>
        <p className="mt-3 text-base font-semibold text-[#F97316] sm:text-lg">
          Examiner is waiting...
        </p>
      </div>

      <div className="mb-4 flex flex-col items-center gap-4 sm:mb-8">
        <button
          type="button"
          onClick={onStop}
          className="flex size-[4.75rem] items-center justify-center rounded-full bg-[#EF4444] text-white shadow-[0_0_0_8px_rgba(239,68,68,0.22)] transition hover:bg-[#DC2626] sm:size-[5.25rem]"
          aria-label="Stop recording"
        >
          <span className="size-5 rounded-[3px] bg-white sm:size-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onStop}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-white/80 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Stop and submit
        </button>
      </div>
    </div>
  );
}

function ExamSavedScreen({ question }: { question: string }) {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-[#0B1220] px-4 py-6 text-white sm:px-8 sm:py-8">
      <div className="mt-2 w-full max-w-xl rounded-2xl bg-[#1A2336] px-6 py-4 text-center sm:mt-4 sm:px-8 sm:py-5">
        <p className="text-base font-medium leading-7 text-white sm:text-lg sm:leading-8">
          {question}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="relative flex size-[7.5rem] items-center justify-center sm:size-[8.5rem]">
          <span
            className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#60A5FA]"
            aria-hidden
          />
          <span
            className="absolute inset-3 rounded-full bg-[#1E3A5F] sm:inset-3.5"
            aria-hidden
          />
          <svg
            viewBox="0 0 24 24"
            className="relative size-10 text-[#60A5FA] sm:size-12"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 12.5 10 17.5 19 7.5"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="mt-8 max-w-md text-2xl font-bold leading-9 text-white sm:text-3xl sm:leading-10">
          Time&apos;s up — your response has been saved.
        </h1>
        <p className="mt-5 text-sm text-[#94A3B8] sm:text-base">
          Submitting your response and moving to the next question...
        </p>
      </div>
    </div>
  );
}

function WaveformVisualizer() {
  return (
    <div
      className="flex h-[5.5rem] w-full max-w-lg items-center justify-center gap-[3px] sm:h-28 sm:gap-1"
      aria-hidden
    >
      {WAVE_HEIGHTS.map((h, i) => {
        const edge = i < 6 || i > WAVE_HEIGHTS.length - 7;
        const nearEdge = i < 10 || i > WAVE_HEIGHTS.length - 11;
        return (
          <span
            key={i}
            className={`w-[3px] rounded-full sm:w-1 ${
              edge
                ? "bg-[#3A4558]"
                : nearEdge
                  ? "bg-[#4B5A73]"
                  : "bg-[#5B9BFF]"
            }`}
            style={{
              height: `${h}%`,
              transformOrigin: "center bottom",
              animation: edge
                ? undefined
                : `exam-wave ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * 0.03}s infinite alternate`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes exam-wave {
          from { transform: scaleY(0.55); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

function Part1Card() {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 text-center shadow-[0_10px_40px_-20px_rgba(15,23,42,0.28)] sm:px-10 sm:py-12">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2b5ce6]">
        <ClipboardIcon />
      </span>
      <p className="mt-4 text-base font-semibold text-[#2b5ce6]">Examiner</p>
      <p className="mt-6 text-xl font-bold leading-8 text-[#141B2B] sm:text-2xl sm:leading-9">
        Tell me about the area where you grew up.
      </p>
    </div>
  );
}

function CueCard({
  prepLabel,
  prepProgress,
  notes,
  onNotesChange,
}: {
  prepLabel: string;
  prepProgress: number;
  notes: string;
  onNotesChange: (v: string) => void;
}) {
  const circumference = 2 * Math.PI * 42;
  const dash = Math.max(0, Math.min(1, prepProgress)) * circumference;

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.28)] sm:p-8">
      <p className="text-base font-bold text-[#2b5ce6]">Cue Card — Part 2</p>
      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-[#94A3B8]">
            TOPIC:
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#141B2B] sm:text-[1.75rem]">
            A memorable journey
          </h2>
          <ul className="mt-4 space-y-2">
            {CUE_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-sm font-medium text-[#334155] sm:text-base"
              >
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-[2px] bg-[#2b5ce6]"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-end">
          <p className="text-sm font-bold text-[#141B2B]">Preparation time</p>
          <div className="relative mt-2 flex size-[6.5rem] items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#2b5ce6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <p className="relative text-lg font-bold tabular-nums text-[#2b5ce6]">
              {prepLabel}
            </p>
          </div>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Jot notes here (not recorded)"
        rows={3}
        className="mt-6 w-full resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#334155] outline-none placeholder:text-[#94A3B8] focus:border-[#2b5ce6] focus:ring-2 focus:ring-[#2b5ce6]/20"
      />
    </div>
  );
}

function Part3Card() {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-[#FDBA74]/70 bg-[#FFF8F0] px-6 py-8 text-center shadow-[0_10px_40px_-20px_rgba(15,23,42,0.22)] sm:px-10 sm:py-10">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#FFEDD5] text-[#9A3412]">
        <UserSilhouetteIcon />
      </span>
      <p className="mt-3 text-base font-bold text-[#C2410C]">Candidate 2</p>
      <div className="mt-5 text-left">
        <p className="text-sm font-bold text-[#9A3412]">Candidate 2 said:</p>
        <div className="mt-2 space-y-1 text-sm leading-6 text-[#334155] sm:text-[0.9375rem]">
          {CANDIDATE_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white px-4 py-3">
        <p className="text-sm font-bold text-[#C2410C]">
          Your turn — respond to what Candidate 2 said
        </p>
      </div>
    </div>
  );
}

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <rect
        x="4"
        y="3.5"
        width="12"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7.5 3.5V3a1.5 1.5 0 0 1 1.5-1h2A1.5 1.5 0 0 1 12.5 3v.5M7 9h6M7 12h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserSilhouetteIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-6" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3.2" fill="currentColor" />
      <path
        d="M4 16.5c1.2-2.8 3.2-4 6-4s4.8 1.2 6 4"
        fill="currentColor"
      />
    </svg>
  );
}

function MicButtonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-7 ${className ?? ""}`} fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="white" />
      <path
        d="M6 12a6 6 0 0 0 12 0M12 18v3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
