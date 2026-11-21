import { doc, getDoc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { callEnsureEntitlement } from "@/lib/functions-learning";

export type EntitlementState =
  | "free"
  | "trial"
  | "trial_cancelled"
  | "paid"
  | "paid_cancelled"
  | "past_due"
  | "expired"
  | string;

export type EntitlementDoc = {
  state: EntitlementState;
  plan?: "monthly" | "yearly" | null;
  source?: "apple" | "google" | "stripe" | null;
  trialUsed?: boolean;
  aiAllowance?: number;
  aiUsed?: number;
  aiReserved?: number;
  mockAllowance?: number;
  mockUsed?: number;
  cycleStart?: unknown;
  cycleEnd?: unknown;
  currentPeriodEnd?: unknown;
};

export async function getEntitlement(
  examId: string,
  uid = auth.currentUser?.uid,
): Promise<EntitlementDoc | null> {
  if (!uid) return null;
  const snap = await getDoc(doc(db, "users", uid, "entitlements", examId));
  if (!snap.exists()) return null;
  return snap.data() as EntitlementDoc;
}

export function watchEntitlement(
  examId: string,
  onNext: (ent: EntitlementDoc | null) => void,
  uid = auth.currentUser?.uid,
): Unsubscribe | null {
  if (!uid) {
    onNext(null);
    return null;
  }
  return onSnapshot(
    doc(db, "users", uid, "entitlements", examId),
    (snap) => {
      onNext(snap.exists() ? (snap.data() as EntitlementDoc) : null);
    },
    () => onNext(null),
  );
}

/** Best-effort: ask server to seed Free entitlement for this exam. */
export async function ensureEntitlement(examId: string): Promise<EntitlementDoc | null> {
  try {
    await callEnsureEntitlement(examId);
  } catch (err) {
    console.warn("ensureEntitlement:", err);
  }
  return getEntitlement(examId);
}

export function remainingAi(ent: EntitlementDoc | null | undefined): number | null {
  if (!ent) return null;
  const allowance = Number(ent.aiAllowance ?? 0);
  const used = Number(ent.aiUsed ?? 0) + Number(ent.aiReserved ?? 0);
  return Math.max(0, allowance - used);
}

export function remainingMocks(
  ent: EntitlementDoc | null | undefined,
): number | null {
  if (!ent) return null;
  const allowance = Number(ent.mockAllowance ?? 0);
  const used = Number(ent.mockUsed ?? 0);
  return Math.max(0, allowance - used);
}

export function entitlementLabel(ent: EntitlementDoc | null | undefined): string {
  switch (ent?.state) {
    case "trial":
      return "Trial";
    case "trial_cancelled":
      return "Trial (cancelled)";
    case "paid":
      return ent.plan === "yearly" ? "Premium · Yearly" : "Premium · Monthly";
    case "paid_cancelled":
      return "Premium (cancelled)";
    case "past_due":
      return "Past due";
    case "expired":
      return "Expired";
    case "free":
    default:
      return "Free";
  }
}
