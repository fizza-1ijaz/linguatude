import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import {
  callFinalizeDiagnostic,
  callGetDiagnosticAudio,
  callSkipDiagnostic,
  callStartDiagnostic,
  getDiagnosticLockDetails,
} from "@/lib/functions-diagnostic";

export type SkillRange = {
  low: number;
  high: number;
  itemsBasis: number;
};

export type DiagnosticResult = {
  skills: Record<string, SkillRange | null>;
  overall: SkillRange | null;
  strengths: string[];
  weaknesses: string[];
  summary: string;
};

export type DiagnosticSection = {
  skill: string;
  type: string;
  itemId: string;
};

export type DiagnosticRun = {
  id: string;
  examId: string;
  status: string;
  sections: DiagnosticSection[];
  failureReason?: string;
  failureStage?: string;
  result?: DiagnosticResult | null;
};

export type ExamItem = {
  id: string;
  examId: string;
  type: string;
  difficulty?: unknown;
  payload: Record<string, unknown>;
};

export type StudyPlanInfo = {
  mode: "goal" | "general";
  dailyMinutes?: number | null;
  studyDays?: number[] | null;
  focusPreference?: string | null;
  targetOverall?: number | null;
  testDate?: Date | null;
};

export class DiagnosticLockedError extends Error {
  unlockAt: Date | null;
  constructor(unlockAt: Date | null) {
    super("Diagnostic retake is locked.");
    this.name = "DiagnosticLockedError";
    this.unlockAt = unlockAt;
  }
}

function asSkillRange(raw: unknown): SkillRange | null {
  if (typeof raw !== "object" || raw === null) return null;
  const low = (raw as { low?: unknown }).low;
  const high = (raw as { high?: unknown }).high;
  if (typeof low !== "number" || typeof high !== "number") return null;
  const itemsBasis = (raw as { itemsBasis?: unknown }).itemsBasis;
  return {
    low,
    high,
    itemsBasis: typeof itemsBasis === "number" ? itemsBasis : 0,
  };
}

function asResult(raw: unknown): DiagnosticResult | null {
  if (typeof raw !== "object" || raw === null) return null;
  const skillsRaw = (raw as { skills?: unknown }).skills;
  const skills: Record<string, SkillRange | null> = {};
  for (const name of ["listening", "reading", "writing", "speaking"] as const) {
    skills[name] =
      typeof skillsRaw === "object" && skillsRaw !== null
        ? asSkillRange((skillsRaw as Record<string, unknown>)[name])
        : null;
  }
  const strings = (v: unknown) =>
    Array.isArray(v) ? v.filter((e): e is string => typeof e === "string") : [];
  return {
    skills,
    overall: asSkillRange((raw as { overall?: unknown }).overall),
    strengths: strings((raw as { strengths?: unknown }).strengths),
    weaknesses: strings((raw as { weaknesses?: unknown }).weaknesses),
    summary:
      typeof (raw as { summary?: unknown }).summary === "string"
        ? (raw as { summary: string }).summary
        : "",
  };
}

export function parseDiagnosticRun(
  id: string,
  map: Record<string, unknown>,
): DiagnosticRun {
  const sections: DiagnosticSection[] = [];
  const raw = map.sections;
  if (Array.isArray(raw)) {
    for (const entry of raw) {
      if (
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as { skill?: unknown }).skill === "string" &&
        typeof (entry as { type?: unknown }).type === "string" &&
        typeof (entry as { itemId?: unknown }).itemId === "string"
      ) {
        sections.push({
          skill: (entry as { skill: string }).skill,
          type: (entry as { type: string }).type,
          itemId: (entry as { itemId: string }).itemId,
        });
      }
    }
  }
  return {
    id,
    examId: typeof map.examId === "string" ? map.examId : "",
    status: typeof map.status === "string" ? map.status : "preparing",
    sections,
    failureReason:
      typeof map.failureReason === "string" ? map.failureReason : undefined,
    failureStage:
      typeof map.failureStage === "string" ? map.failureStage : undefined,
    result: asResult(map.result),
  };
}

export function parseExamItem(
  id: string,
  map: Record<string, unknown>,
): ExamItem {
  const payload = map.payload;
  return {
    id,
    examId: typeof map.examId === "string" ? map.examId : "",
    type: typeof map.type === "string" ? map.type : "",
    difficulty: map.difficulty,
    payload:
      typeof payload === "object" && payload !== null
        ? (payload as Record<string, unknown>)
        : {},
  };
}

export function parseStudyPlan(
  map: Record<string, unknown>,
): StudyPlanInfo {
  const target = map.target;
  const date = map.testDate;
  let testDate: Date | null = null;
  if (date instanceof Date) testDate = date;
  else if (
    typeof date === "object" &&
    date !== null &&
    "toDate" in date &&
    typeof (date as { toDate: () => Date }).toDate === "function"
  ) {
    testDate = (date as { toDate: () => Date }).toDate();
  }

  return {
    mode: map.mode === "goal" ? "goal" : "general",
    dailyMinutes:
      typeof map.dailyMinutes === "number" ? map.dailyMinutes : null,
    studyDays: Array.isArray(map.studyDays)
      ? map.studyDays.filter((d): d is number => typeof d === "number")
      : null,
    focusPreference:
      typeof map.focusPreference === "string" ? map.focusPreference : null,
    targetOverall:
      typeof target === "object" &&
      target !== null &&
      typeof (target as { overall?: unknown }).overall === "number"
        ? (target as { overall: number }).overall
        : null,
    testDate,
  };
}

export async function startDiagnostic(examId: string) {
  try {
    return await callStartDiagnostic(examId);
  } catch (err) {
    const locked = getDiagnosticLockDetails(err);
    if (locked) {
      throw new DiagnosticLockedError(
        locked.unlockAt ? new Date(locked.unlockAt) : null,
      );
    }
    throw err;
  }
}

export function watchDiagnosticRun(
  uid: string,
  runId: string,
  onNext: (run: DiagnosticRun | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, "users", uid, "diagnostics", runId),
    (snap) => {
      if (!snap.exists()) {
        onNext(null);
        return;
      }
      onNext(parseDiagnosticRun(snap.id, snap.data() as Record<string, unknown>));
    },
    (err) => onError?.(err),
  );
}

export async function fetchExamItem(
  examId: string,
  itemId: string,
): Promise<ExamItem | null> {
  const snap = await getDoc(doc(db, "exams", examId, "items", itemId));
  if (!snap.exists()) return null;
  return parseExamItem(snap.id, snap.data() as Record<string, unknown>);
}

export async function fetchDiagnosticAudio(
  runId: string,
  itemId: string,
): Promise<Uint8Array> {
  const data = await callGetDiagnosticAudio(runId, itemId);
  const binary = atob(data.audio);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function finalizeDiagnostic(runId: string): Promise<string> {
  const data = await callFinalizeDiagnostic(runId);
  return data.status ?? "failed";
}

export async function skipDiagnostic(examId: string): Promise<void> {
  await callSkipDiagnostic(examId);
}

export async function fetchStudyPlan(
  uid: string,
  examId: string,
): Promise<StudyPlanInfo | null> {
  const snap = await getDoc(doc(db, "users", uid, "plans", examId));
  if (!snap.exists()) return null;
  return parseStudyPlan(snap.data() as Record<string, unknown>);
}

export async function createDiagnosticAttempt(input: {
  attemptId: string;
  examId: string;
  itemId: string;
  runId: string;
  response: Record<string, unknown>;
}): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in.");
  await setDoc(doc(collection(db, "attempts"), input.attemptId), {
    uid: user.uid,
    examId: input.examId,
    itemId: input.itemId,
    mode: "diagnostic",
    sessionId: input.runId,
    response: input.response,
    status: "created",
    createdAt: serverTimestamp(),
  });
}

export async function uploadSpeakingAudio(
  attemptId: string,
  blob: Blob,
): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in.");
  const ext = blob.type.includes("wav") ? "wav" : "webm";
  const path = `audio/${user.uid}/${attemptId}.${ext}`;
  await uploadBytes(ref(storage, path), blob, {
    contentType: blob.type || `audio/${ext}`,
  });
  return path;
}

export function newAttemptId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `att_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export type ListeningQuestion = {
  id: string;
  text: string;
  options: string[];
  optionIds: string[];
};

export function listeningQuestionsFromItem(
  item: ExamItem | null | undefined,
): ListeningQuestion[] | null {
  const questions = item?.payload.questions;
  if (!Array.isArray(questions)) return null;
  const out: ListeningQuestion[] = [];
  for (const q of questions) {
    if (typeof q !== "object" || q === null) return null;
    const optionsRaw = (q as { options?: unknown }).options;
    if (!Array.isArray(optionsRaw)) return null;
    const options = optionsRaw.filter(
      (o): o is Record<string, unknown> => typeof o === "object" && o !== null,
    );
    out.push({
      id: String((q as { id?: unknown }).id ?? ""),
      text: String((q as { text?: unknown }).text ?? ""),
      options: options.map((o) => String(o.text ?? "")),
      optionIds: options.map((o) => String(o.id ?? "")),
    });
  }
  return out.length ? out : null;
}

export type McqContent = {
  itemId: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  passage?: string;
};

export function mcqFromItem(item: ExamItem | null | undefined): McqContent | null {
  if (!item) return null;
  const question = item.payload.question;
  const rawOptions = item.payload.options;
  if (typeof question !== "string" || !question.trim()) return null;
  if (!Array.isArray(rawOptions) || rawOptions.length < 2) return null;
  const options: Array<{ id: string; text: string }> = [];
  for (const raw of rawOptions) {
    if (typeof raw !== "object" || raw === null) return null;
    const id = (raw as { id?: unknown }).id;
    const text = (raw as { text?: unknown }).text;
    if (typeof id !== "string" || typeof text !== "string") return null;
    options.push({ id, text });
  }
  let passage: string | undefined;
  const stimulus = item.payload.stimulus;
  const paragraphs = item.payload.paragraphs;
  if (typeof stimulus === "string" && stimulus.trim()) passage = stimulus;
  else if (Array.isArray(paragraphs)) {
    passage = paragraphs
      .filter((p): p is Record<string, unknown> => typeof p === "object" && p !== null)
      .map((p) => p.text)
      .filter((t): t is string => typeof t === "string")
      .join("\n\n");
  }
  return { itemId: item.id, question, options, passage };
}
