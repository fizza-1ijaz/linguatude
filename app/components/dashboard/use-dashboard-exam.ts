"use client";

import { useEffect, useState } from "react";

export const EXAM_STORAGE_KEY = "linguatude_dashboard_exam";

export type DashboardExam = "ielts" | "pte";

export function readDashboardExam(): DashboardExam {
  if (typeof window === "undefined") return "ielts";
  try {
    const stored = window.localStorage.getItem(EXAM_STORAGE_KEY);
    return stored === "pte" ? "pte" : "ielts";
  } catch {
    return "ielts";
  }
}

export function useDashboardExam(): DashboardExam {
  const [exam, setExam] = useState<DashboardExam>("ielts");

  useEffect(() => {
    function sync() {
      setExam(readDashboardExam());
    }
    sync();
    function onStorage(e: StorageEvent) {
      if (e.key === EXAM_STORAGE_KEY || e.key == null) sync();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return exam;
}

export function isPteExam(exam: DashboardExam) {
  return exam === "pte";
}

/** Noun: Band (IELTS) vs Score (PTE) */
export function scoreNoun(exam: DashboardExam) {
  return exam === "pte" ? "Score" : "Band";
}

export function estimatedOverallLabel(exam: DashboardExam) {
  return exam === "pte"
    ? "Estimated PTE Score"
    : "Estimated IELTS Band Score";
}

export function overallEstimatedLabel(exam: DashboardExam) {
  return exam === "pte" ? "Overall score (estimated)" : "Overall band (estimated)";
}

export function estimateDisclaimer(exam: DashboardExam) {
  return exam === "pte"
    ? "Estimated by Linguatude from your practice performance. Not an official PTE result."
    : "Estimated by Linguatude from your practice performance. Not an official IELTS result.";
}

export function scoreScaleMax(exam: DashboardExam) {
  return exam === "pte" ? 90 : 9;
}

/** Map a demo IELTS band (0–9) to a demo PTE score (10–90). */
export function demoScoreFromBand(band: number, exam: DashboardExam) {
  if (exam !== "pte") return band;
  return Math.min(90, Math.max(10, Math.round(band * 10)));
}

export function formatEstimateValue(value: number, exam: DashboardExam) {
  if (exam === "pte") return String(Math.round(value));
  return value.toFixed(1);
}
