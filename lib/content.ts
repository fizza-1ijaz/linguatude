import dhaGuidance from "@/content/dha-guidance.json";
import ieltsSpeakingSample from "@/content/ielts-speaking-sample.json";
import pricingPlans from "@/content/pricing-plans.json";
import pteTestFee from "@/content/pte-test-fee.json";

export type DhaPathway = (typeof dhaGuidance.pathways)[number];
export type DhaGuidance = typeof dhaGuidance;
export type PteTestFee = typeof pteTestFee;
export type PricingExamId = keyof typeof pricingPlans.exams;

export function getDhaGuidance(): DhaGuidance {
  return dhaGuidance;
}

export function hasDhaPathways(): boolean {
  return Array.isArray(dhaGuidance.pathways) && dhaGuidance.pathways.length > 0;
}

export function formatVerifiedDate(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null;
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function getDhaMetaLine(): string | null {
  if (!hasDhaPathways()) return null;
  const parts: string[] = [];
  if (dhaGuidance.source) parts.push(dhaGuidance.source);
  if (dhaGuidance.effectiveFrom) {
    const from = formatVerifiedDate(dhaGuidance.effectiveFrom);
    if (from) parts.push(`from ${from}`);
  }
  const verified = formatVerifiedDate(dhaGuidance.lastVerified);
  if (verified) parts.push(`verified ${verified}`);
  return parts.length ? parts.join(" • ") : null;
}

export function getPteTestFee(): PteTestFee {
  return pteTestFee;
}

export function getPricingPlans() {
  return pricingPlans;
}

export function getIeltsSpeakingSample() {
  return ieltsSpeakingSample;
}

export function getProficientPathway(): DhaPathway | null {
  if (!hasDhaPathways()) return null;
  return (
    dhaGuidance.pathways.find((p) => p.id === "proficient") ??
    dhaGuidance.pathways[0] ??
    null
  );
}

const SKILL_ORDER = ["listening", "reading", "writing", "speaking"] as const;

export function getPathwaySkillScores(pathway: DhaPathway) {
  return SKILL_ORDER.map((key) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: pathway.pte[key],
  }));
}

export function formatPteTestFeeHeadline(): string | null {
  if (pteTestFee.amount == null || Number.isNaN(Number(pteTestFee.amount))) {
    return null;
  }
  return `Test fee ${pteTestFee.displayPrefix}${pteTestFee.amount} — verify at Pearson checkout.`;
}

export function getDhaUpdatedLabel(): string | null {
  const verified = formatVerifiedDate(dhaGuidance.lastVerified);
  if (!verified) return null;
  return `Updated ${verified}`;
}
