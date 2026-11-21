"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/app/components/auth-provider";
import type { ExamChoice } from "@/app/components/onboarding/onboarding-state";
import { toExamId } from "@/lib/exam-ids";
import {
  createDiagnosticAttempt,
  DiagnosticLockedError,
  fetchDiagnosticAudio,
  fetchExamItem,
  fetchStudyPlan,
  finalizeDiagnostic,
  listeningQuestionsFromItem,
  mcqFromItem,
  newAttemptId,
  skipDiagnostic,
  startDiagnostic,
  uploadSpeakingAudio,
  watchDiagnosticRun,
  type DiagnosticResult,
  type DiagnosticRun,
  type ExamItem,
  type ListeningQuestion,
  type McqContent,
  type StudyPlanInfo,
} from "@/lib/diagnostic";
import { mapDiagnosticError } from "@/lib/functions-diagnostic";

export type DiagnosticPhase =
  | "idle"
  | "starting"
  | "preparing"
  | "ready"
  | "failed"
  | "locked"
  | "unavailable";

export type FinalizePhase = "idle" | "working" | "done" | "failed";

type DiagnosticSessionValue = {
  phase: DiagnosticPhase;
  message: string | null;
  unlockAt: Date | null;
  run: DiagnosticRun | null;
  isLive: boolean;
  examId: string | null;
  finalizePhase: FinalizePhase;
  finalizeMessage: string | null;
  plan: StudyPlanInfo | null;
  result: DiagnosticResult | null | undefined;
  listeningQuestions: ListeningQuestion[] | null;
  readingContent: McqContent | null;
  writingContent: { passage?: string; prompt?: string } | null;
  speakingContent: {
    readAloud?: string;
    question?: string;
    points: string[];
  } | null;
  prepare: (exam: ExamChoice) => Promise<void>;
  retry: (exam: ExamChoice) => Promise<void>;
  getListeningAudio: () => Promise<Uint8Array>;
  submitListening: (answers: Record<string, string>) => Promise<boolean>;
  submitReading: (optionId: string) => Promise<boolean>;
  submitWriting: (text: string) => Promise<boolean>;
  submitSpeaking: (blob: Blob, durationMs: number) => Promise<boolean>;
  finalize: () => Promise<void>;
  skip: (exam: ExamChoice) => Promise<void>;
  loadPlan: (exam: ExamChoice) => Promise<StudyPlanInfo | null>;
  reset: () => void;
};

const DiagnosticSessionContext = createContext<DiagnosticSessionValue | null>(
  null,
);

const PREPARE_TIMEOUT_MS = 4 * 60 * 1000;
const GENERIC_FAILURE =
  "We couldn't prepare your questions. Check your connection and try again.";

export function DiagnosticSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [phase, setPhase] = useState<DiagnosticPhase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [unlockAt, setUnlockAt] = useState<Date | null>(null);
  const [run, setRun] = useState<DiagnosticRun | null>(null);
  const [items, setItems] = useState<Record<string, ExamItem>>({});
  const [finalizePhase, setFinalizePhase] = useState<FinalizePhase>("idle");
  const [finalizeMessage, setFinalizeMessage] = useState<string | null>(null);
  const [plan, setPlan] = useState<StudyPlanInfo | null>(null);
  const [examId, setExamId] = useState<string | null>(null);

  const unsubRef = useRef<(() => void) | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const stopWatching = useCallback(() => {
    unsubRef.current?.();
    unsubRef.current = null;
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopWatching();
    setItems({});
    setRun(null);
    setMessage(null);
    setUnlockAt(null);
    setExamId(null);
    setPhase("idle");
    setFinalizePhase("idle");
    setFinalizeMessage(null);
    setPlan(null);
  }, [stopWatching]);

  useEffect(() => () => stopWatching(), [stopWatching]);

  const loadItemsForRun = useCallback(async (next: DiagnosticRun) => {
    const loaded: Record<string, ExamItem> = {};
    for (const section of next.sections) {
      const fetched = await fetchExamItem(next.examId, section.itemId);
      if (!fetched) throw new Error(`item ${section.itemId} missing`);
      loaded[section.skill] = fetched;
    }
    setItems(loaded);
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPhase("ready");
  }, []);

  const onRun = useCallback(
    async (next: DiagnosticRun | null) => {
      if (!next) return;
      setRun(next);

      if (next.status === "failed" && next.failureStage === "scoring") {
        setFinalizePhase("failed");
        setFinalizeMessage(next.failureReason ?? GENERIC_FAILURE);
        return;
      }
      if (next.status === "completed" && next.result) {
        setFinalizePhase("done");
        return;
      }
      if (next.status === "failed") {
        setMessage(next.failureReason ?? GENERIC_FAILURE);
        setPhase("failed");
        return;
      }

      const ready = next.status === "ready" && next.sections.length === 4;
      if (!ready || phaseRef.current === "ready") {
        return;
      }
      try {
        await loadItemsForRun(next);
      } catch (err) {
        console.warn("DiagnosticSession.loadItems:", err);
        setMessage(GENERIC_FAILURE);
        setPhase("failed");
      }
    },
    [loadItemsForRun],
  );

  const prepare = useCallback(
    async (exam: ExamChoice) => {
      const nextExamId = toExamId(exam);
      if (!nextExamId) return;

      const busy =
        phaseRef.current === "starting" ||
        phaseRef.current === "preparing" ||
        phaseRef.current === "ready";
      if (examId === nextExamId && busy) return;

      stopWatching();
      setItems({});
      setRun(null);
      setMessage(null);
      setUnlockAt(null);
      setFinalizePhase("idle");
      setFinalizeMessage(null);
      setPlan(null);

      if (!user?.uid) {
        setPhase("unavailable");
        return;
      }

      setExamId(nextExamId);
      setPhase("starting");

      try {
        const start = await startDiagnostic(nextExamId);
        setPhase("preparing");
        unsubRef.current = watchDiagnosticRun(
          user.uid,
          start.runId,
          (r) => {
            void onRun(r);
          },
          (err) => {
            console.warn("DiagnosticSession.watchRun:", err);
            setMessage(GENERIC_FAILURE);
            setPhase("failed");
          },
        );
        timeoutRef.current = window.setTimeout(() => {
          if (phaseRef.current === "preparing") {
            setMessage("This is taking longer than expected. Please try again.");
            setPhase("failed");
          }
        }, PREPARE_TIMEOUT_MS);
      } catch (err) {
        if (err instanceof DiagnosticLockedError) {
          setUnlockAt(err.unlockAt);
          setPhase("locked");
          return;
        }
        console.warn("DiagnosticSession.prepare:", err);
        setMessage(mapDiagnosticError(err) || GENERIC_FAILURE);
        setPhase("failed");
      }
    },
    [examId, onRun, stopWatching, user?.uid],
  );

  const retry = useCallback(
    async (exam: ExamChoice) => {
      setExamId(null);
      setPhase("idle");
      await prepare(exam);
    },
    [prepare],
  );

  const section = useCallback(
    (skill: string) => run?.sections.find((s) => s.skill === skill) ?? null,
    [run],
  );

  const isLive = phase === "ready" && Object.keys(items).length === 4;

  const getListeningAudio = useCallback(async () => {
    const runId = run?.id;
    const listening = section("listening");
    if (!runId || !listening) throw new Error("The diagnostic is not ready.");
    return fetchDiagnosticAudio(runId, listening.itemId);
  }, [run?.id, section]);

  const save = useCallback(
    async (skill: string, response: Record<string, unknown>) => {
      const sec = section(skill);
      if (!sec || !user?.uid || !run?.id || !isLive) return false;
      try {
        await createDiagnosticAttempt({
          attemptId: newAttemptId(),
          examId: run.examId,
          itemId: sec.itemId,
          runId: run.id,
          response,
        });
        return true;
      } catch (err) {
        console.warn(`DiagnosticSession.save(${skill}):`, err);
        return false;
      }
    },
    [isLive, run, section, user?.uid],
  );

  const submitListening = useCallback(
    (answers: Record<string, string>) => save("listening", { answers }),
    [save],
  );

  const submitReading = useCallback(
    (optionId: string) => save("reading", { selected: [optionId] }),
    [save],
  );

  const submitWriting = useCallback(
    (text: string) => save("writing", { text }),
    [save],
  );

  const submitSpeaking = useCallback(
    async (blob: Blob, durationMs: number) => {
      const sec = section("speaking");
      if (!sec || !user?.uid || !run?.id || !isLive) return false;
      const attemptId = newAttemptId();
      try {
        const path = await uploadSpeakingAudio(attemptId, blob);
        await createDiagnosticAttempt({
          attemptId,
          examId: run.examId,
          itemId: sec.itemId,
          runId: run.id,
          response: { audioPath: path, durationMs },
        });
        return true;
      } catch (err) {
        console.warn("DiagnosticSession.submitSpeaking:", err);
        return false;
      }
    },
    [isLive, run, section, user?.uid],
  );

  const finalize = useCallback(async () => {
    const runId = run?.id;
    if (!runId || finalizePhase === "working") return;
    setFinalizePhase("working");
    setFinalizeMessage(null);
    try {
      const status = await finalizeDiagnostic(runId);
      if (status === "failed") {
        setFinalizePhase("failed");
        setFinalizeMessage(GENERIC_FAILURE);
      }
      // Success arrives via watchRun → completed + result
    } catch (err) {
      console.warn("DiagnosticSession.finalize:", err);
      setFinalizePhase("failed");
      setFinalizeMessage(GENERIC_FAILURE);
    }
  }, [finalizePhase, run?.id]);

  const skip = useCallback(async (exam: ExamChoice) => {
    const id = toExamId(exam);
    if (!id || !user?.uid) return;
    try {
      await skipDiagnostic(id);
    } catch (err) {
      console.warn("DiagnosticSession.skip:", err);
    }
  }, [user?.uid]);

  const loadPlan = useCallback(
    async (exam: ExamChoice) => {
      const id = toExamId(exam);
      if (!id || !user?.uid) return null;
      try {
        const next = await fetchStudyPlan(user.uid, id);
        setPlan(next);
        return next;
      } catch (err) {
        console.warn("DiagnosticSession.loadPlan:", err);
        return null;
      }
    },
    [user?.uid],
  );

  const listeningQuestions = useMemo(
    () => listeningQuestionsFromItem(items.listening),
    [items.listening],
  );
  const readingContent = useMemo(
    () => mcqFromItem(items.reading),
    [items.reading],
  );
  const writingContent = useMemo(() => {
    const payload = items.writing?.payload;
    if (!payload) return null;
    const passage = payload.passage;
    const prompt = payload.prompt;
    if (typeof passage !== "string" && typeof prompt !== "string") return null;
    return {
      passage: typeof passage === "string" ? passage : undefined,
      prompt: typeof prompt === "string" ? prompt : undefined,
    };
  }, [items.writing]);
  const speakingContent = useMemo(() => {
    const payload = items.speaking?.payload;
    if (!payload) return null;
    const text = payload.text;
    const question = payload.question;
    const points = payload.points;
    if (typeof text !== "string" && typeof question !== "string") return null;
    return {
      readAloud: typeof text === "string" ? text : undefined,
      question: typeof question === "string" ? question : undefined,
      points: Array.isArray(points) ? points.map((p) => String(p)) : [],
    };
  }, [items.speaking]);

  const value = useMemo<DiagnosticSessionValue>(
    () => ({
      phase,
      message,
      unlockAt,
      run,
      isLive,
      examId,
      finalizePhase,
      finalizeMessage,
      plan,
      result: run?.result,
      listeningQuestions,
      readingContent,
      writingContent,
      speakingContent,
      prepare,
      retry,
      getListeningAudio,
      submitListening,
      submitReading,
      submitWriting,
      submitSpeaking,
      finalize,
      skip,
      loadPlan,
      reset,
    }),
    [
      phase,
      message,
      unlockAt,
      run,
      isLive,
      examId,
      finalizePhase,
      finalizeMessage,
      plan,
      listeningQuestions,
      readingContent,
      writingContent,
      speakingContent,
      prepare,
      retry,
      getListeningAudio,
      submitListening,
      submitReading,
      submitWriting,
      submitSpeaking,
      finalize,
      skip,
      loadPlan,
      reset,
    ],
  );

  return (
    <DiagnosticSessionContext.Provider value={value}>
      {children}
    </DiagnosticSessionContext.Provider>
  );
}

export function useDiagnosticSession(): DiagnosticSessionValue {
  const ctx = useContext(DiagnosticSessionContext);
  if (!ctx) {
    throw new Error(
      "useDiagnosticSession must be used within DiagnosticSessionProvider",
    );
  }
  return ctx;
}
