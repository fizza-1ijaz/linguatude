import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const HERO_TRUST = [
  {
    lines: ["Score", "concordance"] as const,
    icon: "/home/icon-chart.svg",
  },
  {
    lines: ["DHA", "points"] as const,
    icon: "/pte/trust-dha.svg",
  },
  {
    lines: ["How to", "pick"] as const,
    icon: "/features/icon-plan.svg",
  },
] as const;

const ROWS = [
  {
    title: "Competent English",
    subtitle: "Visa minimum",
    icon: "/pte/score-competent.svg",
    iconBg: "bg-gradient-to-br from-[#4ade80] to-[#16a34a]",
    iconRing: "border-[rgba(34,197,94,0.3)]",
    pte: [
      { letter: "L", value: "47" },
      { letter: "R", value: "48" },
      { letter: "W", value: "51" },
      { letter: "S", value: "54" },
    ],
    ielts: "6.0 each",
    points: "0",
  },
  {
    title: "Proficient English",
    subtitle: "Most popular",
    icon: "/pte/score-proficient.svg",
    iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]",
    iconRing: "border-[rgba(59,130,246,0.3)]",
    pte: [
      { letter: "L", value: "58" },
      { letter: "R", value: "59" },
      { letter: "W", value: "69" },
      { letter: "S", value: "76" },
    ],
    ielts: "7.0 each",
    points: "+10",
  },
  {
    title: "Superior English",
    subtitle: "Maximum points",
    icon: "/pte/score-superior.svg",
    iconBg: "bg-gradient-to-br from-[#fbbf24] to-[#d97706]",
    iconRing: "border-[rgba(245,158,11,0.3)]",
    pte: [
      { letter: "L", value: "69" },
      { letter: "R", value: "70" },
      { letter: "W", value: "85" },
      { letter: "S", value: "85" },
    ],
    ielts: "8.0 each",
    points: "+20",
  },
] as const;

function hasHeroImage() {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", "score-guide", "hero.png"),
    );
  } catch {
    return false;
  }
}

export function ScoreGuidePageContent() {
  const showHero = hasHeroImage();

  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="score-guide-heading"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block" aria-hidden>
          <div className="relative h-full w-full">
            {showHero ? (
              <Image
                src="/score-guide/hero.png"
                alt=""
                fill
                priority
                className="object-contain object-right"
                sizes="52vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center pr-10 opacity-90">
                <div className="relative aspect-square w-[min(100%,28rem)]">
                  <Image
                    src="/home/score-arc.svg"
                    alt=""
                    fill
                    priority
                    className="object-contain"
                    sizes="28rem"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-[8rem]">
          <div className="max-w-xl animate-[fade-in-up_0.75s_ease-out_both]">
            <h1
              id="score-guide-heading"
              className="text-balance text-4xl font-extrabold tracking-[-0.025em] text-[#1e1b4b] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]"
            >
              PTE vs IELTS: the score guide.
            </h1>

            <p className="mt-6 text-lg font-bold leading-7 text-[#6b7280] sm:text-xl">
              Concordance, DHA points and how to pick.
            </p>

            <div className="mt-8">
              <Link
                href="/#start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
              >
                Start free
                <Image
                  src="/pte/icon-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_-12px_rgba(45,91,255,0.25)] sm:grid-cols-3 sm:gap-0 sm:p-6">
            {HERO_TRUST.map((item, index) => (
              <div
                key={item.lines.join("-")}
                className={`flex items-center gap-4 px-2 sm:px-4 ${
                  index > 0 ? "sm:border-l sm:border-[#e5e7eb]" : ""
                }`}
              >
                <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#eaf0fd]">
                  <span className="relative size-6 overflow-clip">
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </span>
                </span>
                <p className="text-left text-sm font-bold leading-5 text-[#1e1b4b] sm:text-base">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-8 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#e5e7eb]">
              <span className="relative size-10 overflow-clip">
                <Image
                  src="/pte/lin-meta.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-full object-contain"
                />
              </span>
            </span>
            <div>
              <h2 className="text-lg font-bold text-[#1e1b4b]">
                LIN 25/016 instrument
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-[#6b7280] sm:text-base">
                From 7 Aug 2025. Verified for Linguatude on 23 Jul 2026.
              </p>
            </div>
          </div>

          <span
            className="hidden h-24 w-px bg-[#e5e7eb] sm:block"
            aria-hidden
          />

          <div>
            <h2 className="text-lg font-bold text-[#1e1b4b]">
              Why use this guide?
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#6b7280] sm:text-base">
              This guide helps you understand how PTE scores compare to IELTS
              and their impact on Australian migration points.
            </p>
          </div>
        </div>
      </section>

      <section
        className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
        aria-labelledby="equivalence-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="equivalence-heading"
            className="text-center text-balance text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl"
          >
            Score equivalence (indicative)
          </h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
            <table className="min-w-[56rem] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f8f9fc]">
                  <th className="px-6 py-5 text-sm font-bold text-[#6b7280]">
                    English level
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="block text-sm font-bold text-[#1e1b4b]">
                      PTE Academic
                    </span>
                    <span className="mt-1 block text-xs font-medium text-[#6b7280]">
                      Min. component
                    </span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="block text-sm font-bold text-[#1e1b4b]">
                      IELTS Academic
                    </span>
                    <span className="mt-1 block text-xs font-medium text-[#6b7280]">
                      Min. each skill
                    </span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="block text-sm font-bold text-[#1e1b4b]">
                      Migration points
                    </span>
                    <span className="mt-1 block text-xs font-medium text-[#6b7280]">
                      SkillSelect / PR
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.title}
                    className="border-b border-[#e5e7eb] last:border-b-0"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex size-16 shrink-0 items-center justify-center rounded-full border ${row.iconBg} ${row.iconRing}`}
                        >
                          <span className="relative size-6 overflow-clip">
                            <Image
                              src={row.icon}
                              alt=""
                              width={24}
                              height={24}
                              className="size-full"
                            />
                          </span>
                        </span>
                        <div>
                          <p className="text-base font-bold text-[#111827] sm:text-lg">
                            {row.title}
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-[#6b7280]">
                            {row.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-start justify-center gap-3">
                        {row.pte.map((skill) => (
                          <div
                            key={skill.letter}
                            className="flex flex-col items-center gap-1.5"
                          >
                            <span className="flex size-6 items-center justify-center rounded-md bg-[#eaf0fd] text-[0.65rem] font-bold text-[#2D5BFF]">
                              {skill.letter}
                            </span>
                            <span className="text-lg font-bold text-[#111827]">
                              {skill.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center text-lg font-bold text-[#111827]">
                      {row.ielts}
                    </td>
                    <td className="px-6 py-6 text-center text-2xl font-extrabold text-[#2D5BFF]">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-[#eaf0fd] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-3 sm:items-center">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2D5BFF]">
                <span className="relative size-4 overflow-clip">
                  <Image
                    src="/pte/icon-info.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-full brightness-0 invert"
                  />
                </span>
              </span>
              <p className="text-sm font-medium leading-5 text-[#1e1b4b] sm:text-base">
                Indicative concordance — confirm requirements for your visa
                subclass.
              </p>
            </div>
            <p className="shrink-0 text-sm font-bold text-[#2D5BFF] sm:text-base">
              Verified 23 Jul 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
