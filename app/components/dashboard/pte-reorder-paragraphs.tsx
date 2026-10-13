"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteCheckAnswer,
  PteReadingSidebar,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const INITIAL = [
  { id: "B", text: "In addition, they enhance biodiversity by providing habitats for birds, insects, and other wildlife." },
  { id: "A", text: "Urban green spaces provide multiple benefits for cities and the people who live in them." },
  { id: "D", text: "Therefore, investing in urban green spaces is essential for building sustainable and liveable cities." },
  { id: "C", text: "Moreover, green spaces encourage physical activity and reduce stress, improving overall well-being." },
] as const;

export function PteReorderParagraphs() {
  const [pool, setPool] = useState([...INITIAL]);
  const [ordered, setOrdered] = useState<(typeof INITIAL[number] | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  function place(item: (typeof INITIAL)[number], slot: number) {
    setOrdered((prev) => {
      const next = [...prev];
      const existing = next[slot];
      next[slot] = item;
      setPool((p) => {
        let updated = p.filter((x) => x.id !== item.id);
        if (existing) updated = [...updated, existing];
        return updated;
      });
      return next;
    });
  }

  function returnToPool(slot: number) {
    setOrdered((prev) => {
      const item = prev[slot];
      if (!item) return prev;
      const next = [...prev];
      next[slot] = null;
      setPool((p) => [...p, item]);
      return next;
    });
  }

  return (
    <DashboardShell
      title="Re-order Paragraphs"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#EFF6FF] px-4 py-3.5">
            <p className="inline-flex items-start gap-2.5 text-sm text-[#1E40AF]">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#2b5ce6] text-xs text-white">
                ≡
              </span>
              The four paragraphs below are from an article but are in the wrong order.
              Drag and drop them into the correct order.
            </p>
            <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2b5ce6]">
              💡 See strategy tips →
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-[#2b5ce6]">Paragraphs (unordered)</p>
              <p className="text-xs text-[#94A3B8]">Drag from here</p>
              <ul className="mt-3 space-y-2.5">
                {pool.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        const slot = ordered.findIndex((x) => x === null);
                        if (slot >= 0) place(p, slot);
                      }}
                      className="flex w-full items-start gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-3 text-left shadow-sm transition hover:border-[#2b5ce6]"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#EDE9FE] text-xs font-bold text-[#7C3AED]">
                        {p.id}
                      </span>
                      <span className="min-w-0 flex-1 text-sm leading-5 text-[#334155]">
                        {p.text}
                      </span>
                      <span className="text-[#CBD5E1]" aria-hidden>
                        ⋮⋮
                      </span>
                    </button>
                  </li>
                ))}
                {pool.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[#CBD5E1] px-3 py-8 text-center text-sm text-[#94A3B8]">
                    All paragraphs placed
                  </p>
                ) : null}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-[#2b5ce6]">Correct order</p>
              <p className="text-xs text-[#94A3B8]">Drop here in the right sequence</p>
              <ul className="mt-3 space-y-2.5">
                {ordered.map((item, i) => (
                  <li key={i}>
                    {item ? (
                      <button
                        type="button"
                        onClick={() => returnToPool(i)}
                        className="flex w-full items-start gap-2 rounded-xl border border-[#2b5ce6] bg-[#EEF2FF] px-3 py-3 text-left"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#2b5ce6] text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm leading-5 text-[#334155]">
                          {item.text}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-xl border border-dashed border-[#CBD5E1] bg-white px-3 py-5 text-sm text-[#94A3B8]">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#EDE9FE] text-xs font-bold text-[#7C3AED]">
                          {i + 1}
                        </span>
                        ↓ Drop paragraph here
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PteCheckAnswer note="Your score is based on the number of adjacent paragraphs in the correct order" />
        </div>

        <PteReadingSidebar tip="Find the opening paragraph first, then use linking words and references to determine the sequence." />
      </div>
    </DashboardShell>
  );
}
