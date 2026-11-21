import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { parseExamItem, type ExamItem, type McqContent, mcqFromItem } from "@/lib/diagnostic";
import { callGetNextItems } from "@/lib/functions-diagnostic";

/** Active items of one type from `exams/{examId}/items` (public payload only). */
export async function itemsByType(
  examId: string,
  type: string,
  max = 10,
): Promise<ExamItem[]> {
  const snap = await getDocs(
    query(
      collection(db, "exams", examId, "items"),
      where("type", "==", type),
      where("active", "==", true),
      limit(max),
    ),
  );
  return snap.docs.map((d) =>
    parseExamItem(d.id, d.data() as Record<string, unknown>),
  );
}

export async function firstOfType(
  examId: string,
  type: string,
): Promise<ExamItem | null> {
  const items = await itemsByType(examId, type, 1);
  return items[0] ?? null;
}

/** Prefer adaptive `getNextItems`; fall back to Firestore pool. */
export async function loadPracticeItems(input: {
  examId: string;
  type: string;
  count?: number;
}): Promise<ExamItem[]> {
  const count = input.count ?? 5;
  try {
    const result = await callGetNextItems({
      examId: input.examId,
      type: input.type,
      count,
    });
    const mapped = (result.items ?? []).map((raw, i) => {
      const id =
        typeof raw.id === "string"
          ? raw.id
          : typeof (raw as { itemId?: unknown }).itemId === "string"
            ? String((raw as { itemId: string }).itemId)
            : `item_${i}`;
      return parseExamItem(id, raw);
    });
    if (mapped.length) return mapped;
  } catch (err) {
    console.warn("getNextItems failed; falling back to Firestore pool", err);
  }
  return itemsByType(input.examId, input.type, count);
}

export async function loadFirstMcq(
  examId: string,
  type: string,
): Promise<McqContent | null> {
  try {
    const items = await loadPracticeItems({ examId, type, count: 1 });
    return mcqFromItem(items[0] ?? null);
  } catch (err) {
    console.warn(`loadFirstMcq(${examId}, ${type}):`, err);
    return null;
  }
}
