"use client";

import { useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  PteCheckAnswer,
  PteReadingSidebar,
  PteTaskHeaderRight,
} from "@/app/components/dashboard/pte-shared";

const BANK = ["expand", "decline", "legislation", "variety"] as const;

export function PteReadingFib() {
  const [blanks, setBlanks] = useState<(string | null)[]>([null, null, null, null]);
  const [bank, setBank] = useState<string[]>([...BANK]);

  function fill(index: number) {
    if (bank.length === 0) return;
    const [word, ...rest] = bank;
    setBlanks((prev) => {
      const next = [...prev];
      if (next[index]) setBank((b) => [...rest, next[index]!]);
      else setBank(rest);
      next[index] = word;
      return next;
    });
  }

  function clear(index: number) {
    setBlanks((prev) => {
      const word = prev[index];
      if (!word) return prev;
      const next = [...prev];
      next[index] = null;
      setBank((b) => [...b, word]);
      return next;
    });
  }

  function Blank({ i }: { i: number }) {
    const word = blanks[i];
    return (
      <button
        type="button"
        onClick={() => (word ? clear(i) : fill(i))}
        className={`mx-1 inline-flex min-w-[5.5rem] items-center justify-center rounded-lg border-2 border-dashed px-2 py-0.5 text-sm font-semibold align-baseline ${
          word
            ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
            : "border-[#C4B5FD] bg-[#FAF5FF] text-[#A78BFA]"
        }`}
      >
        {word ?? `(${i + 1})`}
      </button>
    );
  }

  return (
    <DashboardShell
      title="Reading Fill in the Blanks"
      contentBgClassName="bg-[#F8FAFC]"
      mainClassName="flex px-4 sm:px-6 lg:px-[1cm] flex-1 flex-col py-5"
      headerRight={<PteTaskHeaderRight />}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F5F3FF] px-4 py-3.5">
            <div className="inline-flex items-start gap-2.5 text-sm text-[#5B21B6]">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED] text-xs text-white">
                ≡
              </span>
              <div>
                <p className="font-bold">
                  Complete the passage by dragging the correct words into the blanks.
                </p>
                <p className="mt-0.5 text-[#7C3AED]">
                  Note: You may need to change the form of the word.
                </p>
              </div>
            </div>
            <button type="button" className="text-sm font-semibold text-[#7C3AED]">
              See strategy tips →
            </button>
          </div>

          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#141B2B]">Urban Green Spaces</h2>
            <p className="mt-4 text-sm leading-8 text-[#334155]">
              Urban green spaces are essential for the health and wellbeing of city
              residents. They help to <Blank i={0} /> air quality by filtering pollutants
              and cooling urban heat islands. Many cities are now introducing policies and{" "}
              <Blank i={1} /> that protect parks and community gardens. Without careful
              planning, rapid development often leads to <Blank i={2} /> of natural spaces.
              Community programmes can also promote the <Blank i={3} /> of green spaces
              across neighbourhoods.
            </p>

            <div className="mt-6 rounded-2xl bg-[#FAF5FF] p-4">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#7C3AED]">
                ✉ Word bank
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Drag words below into the correct blanks above.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {bank.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      const slot = blanks.findIndex((b) => b === null);
                      if (slot >= 0) {
                        setBank((b) => b.filter((x) => x !== w));
                        setBlanks((prev) => {
                          const next = [...prev];
                          next[slot] = w;
                          return next;
                        });
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#7C3AED] bg-white px-3 py-2 text-sm font-semibold text-[#7C3AED]"
                  >
                    <span className="text-[#C4B5FD]">⋮⋮</span>
                    {w}
                  </button>
                ))}
                {bank.length === 0 ? (
                  <p className="text-sm text-[#94A3B8]">All words placed</p>
                ) : null}
              </div>
            </div>
          </section>

          <PteCheckAnswer note="You can use each word only once. There are no extra words" />
        </div>

        <PteReadingSidebar
          question="6 / 12"
          questionPct={50}
          section="11 / 20"
          sectionPct={55}
          tip="Read the words before and after each blank to check meaning and grammar before choosing a word."
        />
      </div>
    </DashboardShell>
  );
}
