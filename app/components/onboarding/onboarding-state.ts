export type ExamChoice = "academic" | "ukvi" | null;
export type UkviLevel = "a1" | "a2" | "b1" | null;

/** IELTS band 0–9 in 0.5 steps */
export type BandScore = number | null;

export type SkillBands = {
  reading: BandScore;
  writing: BandScore;
  listening: BandScore;
  speaking: BandScore;
};

export type OnboardingState = {
  exam: ExamChoice;
  ukviLevel: UkviLevel;
  /** True when the learner has never taken IELTS before */
  isFirstIelts: boolean;
  previousScores: SkillBands;
  /** Whether step 3 (prior IELTS experience) was completed */
  experienceDone: boolean;
  /** Per-skill target bands (step 4) */
  targetScores: SkillBands;
  sameTargetAll: boolean;
  /** ISO date string yyyy-mm-dd, or null */
  testDate: string | null;
  noTestDate: boolean;
  /** Whether step 4 (goals + date) was completed */
  goalsDone: boolean;
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
  isFirstIelts: true,
  previousScores: emptySkillBands,
  experienceDone: false,
  targetScores: emptySkillBands,
  sameTargetAll: false,
  testDate: null,
  noTestDate: false,
  goalsDone: false,
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

/** Total progress segments shown in Figma (7). */
export const ONBOARDING_TOTAL_STEPS = 7;

export const ONBOARDING_ROUTES = {
  exam: "/onboarding",
  level: "/onboarding/level",
  goal: "/onboarding/goal",
  schedule: "/onboarding/schedule",
  diagnostic: "/onboarding/diagnostic",
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
