export type ExamChoice = "academic" | "pte" | "ukvi" | null;
export type UkviLevel = "a1" | "a2" | "b1" | null;

export type FocusChoice =
  | "auto"
  | "speaking"
  | "writing"
  | "reading"
  | "listening"
  | null;

/** IELTS band 0–9 in 0.5 steps */
export type BandScore = number | null;

export type SkillBands = {
  reading: BandScore;
  writing: BandScore;
  listening: BandScore;
  speaking: BandScore;
};

export type StudyDayId = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type OnboardingState = {
  exam: ExamChoice;
  ukviLevel: UkviLevel;
  /** Daily study commitment in minutes (step 2) */
  dailyMinutes: number | null;
  /** True when the learner has never taken the exam before */
  isFirstIelts: boolean;
  previousScores: SkillBands;
  /** Whether step 3 (prior experience) was completed */
  experienceDone: boolean;
  /** Per-skill target bands (step 4) */
  targetScores: SkillBands;
  sameTargetAll: boolean;
  notSureTarget: boolean;
  /** ISO date string yyyy-mm-dd, or null */
  testDate: string | null;
  noTestDate: boolean;
  /** Whether step 4 (goals + date) was completed */
  goalsDone: boolean;
  /** Selected study weekdays (step 5) */
  studyDays: StudyDayId[];
  studyDaysDone: boolean;
  /** Learning focus preference (step 6) */
  focus: FocusChoice;
  focusDone: boolean;
  completed: boolean;
};

export const ONBOARDING_STORAGE_KEY = "linguatude_onboarding_v1";

export const emptySkillBands: SkillBands = {
  reading: null,
  writing: null,
  listening: null,
  speaking: null,
};

/** Default overall when user skips selecting targets */
export const DEFAULT_TARGET_BAND = 7.0;

export const defaultOnboardingState: OnboardingState = {
  exam: null,
  ukviLevel: null,
  dailyMinutes: null,
  isFirstIelts: true,
  previousScores: emptySkillBands,
  experienceDone: false,
  targetScores: emptySkillBands,
  sameTargetAll: false,
  notSureTarget: false,
  testDate: null,
  noTestDate: false,
  goalsDone: false,
  studyDays: ["mon", "tue", "wed", "thu"],
  studyDaysDone: false,
  focus: "auto",
  focusDone: false,
  completed: false,
};

export function readOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return defaultOnboardingState;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return defaultOnboardingState;
    const parsed = JSON.parse(raw) as Partial<OnboardingState>;
    return {
      ...defaultOnboardingState,
      ...parsed,
      previousScores: {
        ...emptySkillBands,
        ...(parsed.previousScores ?? {}),
      },
      targetScores: {
        ...emptySkillBands,
        ...(parsed.targetScores ?? {}),
      },
      studyDays: Array.isArray(parsed.studyDays)
        ? (parsed.studyDays as StudyDayId[])
        : defaultOnboardingState.studyDays,
    };
  } catch {
    return defaultOnboardingState;
  }
}

export function writeOnboardingState(partial: Partial<OnboardingState>) {
  if (typeof window === "undefined") return;
  const next = { ...readOnboardingState(), ...partial };
  window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(next));
  return next;
}

/**
 * Progress bar / step labels (8 total).
 * Listening + Reading + Writing + Speaking diagnostic screens count as ONE step (8).
 *
 * 1 Exam · 2 Study time · 3 Prior scores · 4 Goals · 5 Study days ·
 * 6 Focus · 7 Diagnostic intro · 8 Diagnostic test
 */
export const ONBOARDING_TOTAL_STEPS = 8;

/** Progress index for the multi-skill diagnostic test screens. */
export const ONBOARDING_DIAGNOSTIC_TEST_STEP = 8;

export const ONBOARDING_ROUTES = {
  exam: "/onboarding",
  /** Step 2 — daily study routine */
  level: "/onboarding/level",
  routine: "/onboarding/level",
  goal: "/onboarding/goal",
  schedule: "/onboarding/schedule",
  /** Step 5 — choose study days */
  days: "/onboarding/days",
  /** Step 6 — learning focus */
  focus: "/onboarding/focus",
  /** Step 7 — diagnostic intro */
  diagnostic: "/onboarding/diagnostic",
  /** Step 8 — diagnostic test (all skills) */
  diagnosticTest: "/onboarding/diagnostic/test",
  diagnosticReading: "/onboarding/diagnostic/test/reading",
  diagnosticWriting: "/onboarding/diagnostic/test/writing",
  diagnosticSpeaking: "/onboarding/diagnostic/test/speaking",
  diagnosticAnalysing: "/onboarding/diagnostic/analysing",
  diagnosticResults: "/onboarding/diagnostic/results",
  diagnosticPlan: "/onboarding/diagnostic/plan",
} as const;

/** Demo estimated bands shown after the quick diagnostic (Figma). */
export const DIAGNOSTIC_ESTIMATED_BANDS: SkillBands = {
  reading: 6.0,
  writing: 5.5,
  listening: 6.5,
  speaking: 6.0,
};

/** IELTS overall = mean of 4 skills, rounded to nearest 0.5 */
export function calculateIeltsOverall(scores: SkillBands): number | null {
  const values = [
    scores.reading,
    scores.writing,
    scores.listening,
    scores.speaking,
  ];
  if (values.some((v) => v == null)) return null;
  const avg =
    (values as number[]).reduce((sum, n) => sum + n, 0) / values.length;
  return Math.round(avg * 2) / 2;
}

export function withDefaultTargets(scores: SkillBands): SkillBands {
  const overall = calculateIeltsOverall(scores);
  if (overall != null) return scores;
  return {
    reading: DEFAULT_TARGET_BAND,
    writing: DEFAULT_TARGET_BAND,
    listening: DEFAULT_TARGET_BAND,
    speaking: DEFAULT_TARGET_BAND,
  };
}

export const IELTS_BAND_OPTIONS: number[] = Array.from(
  { length: 19 },
  (_, i) => i * 0.5,
);

/** @deprecated Use SkillBands — kept for older localStorage reads */
export type PreviousScores = SkillBands;
export const emptyPreviousScores = emptySkillBands;
