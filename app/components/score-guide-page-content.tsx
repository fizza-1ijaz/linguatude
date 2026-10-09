import Image from "next/image";
import Link from "next/link";
import {
  formatVerifiedDate,
  getDhaGuidance,
  getPathwaySkillScores,
  hasDhaPathways,
} from "@/lib/content";

const HERO_TRUST = [
  {
    lines: ["Understand indicative", "score comparisons"] as const,
    icon: "/home/icon-chart.svg",
  },
  {
    lines: ["Understand", "migration points"] as const,
    icon: "/pte/trust-dha.svg",
  },
  {
    lines: ["Choose the", "right exam"] as const,
    icon: "/features/icon-plan.svg",
  },
] as const;

const LEVEL_ICONS = {
  competent: "/score-guide/icon-star.svg",
  proficient: "/score-guide/icon-plus.svg",
  superior: "/score-guide/icon-target.svg",
} as const;

function formatIeltsBand(value: number | null | undefined): string {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return Number(value).toFixed(1);
}

export function ScoreGuidePageContent() {
  const dha = getDhaGuidance();
  const verified = formatVerifiedDate(dha.lastVerified);
  const pathways = hasDhaPathways() ? dha.pathways : [];
  const hasData = pathways.length > 0;

  return (
    <>
      <section
        className="mkt-hero relative isolate flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden lg:min-h-[calc(100svh-4.75rem)]"
        aria-labelledby="score-guide-heading"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-6">
            <div className="relative z-10 max-w-xl animate-[fade-in-up_0.75s_ease-out_both]">
              <h1
                id="score-guide-heading"
                className="text-balance text-4xl font-extrabold tracking-[-0.025em] text-[#1e1b4b] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]"
              >
                PTE vs IELTS: the score guide.
              </h1>

              <p className="mt-5 text-lg font-bold leading-7 text-[#6b7280] sm:text-xl">
                Compare indicative scores and understand Australian English
                requirements.
              </p>

              <div className="mt-6">
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
                    className="size-4 brightness-0 invert"
                  />
                </Link>
              </div>
            </div>

            <div
              className="pointer-events-none relative mx-auto w-full max-w-[36rem] lg:max-w-none"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/score-guide/hero.svg"
                alt=""
                className="mx-auto h-auto max-h-[min(42svh,22rem)] w-full object-contain object-center sm:max-h-[min(48svh,26rem)]"
              />
            </div>
          </div>

          <div className="mt-8 w-full animate-[fade-in-up_0.9s_ease-out_both] sm:mt-10">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_-12px_rgba(45,91,255,0.25)] sm:grid-cols-3 sm:gap-0 sm:p-5">
              {HERO_TRUST.map((item, index) => (
                <div
                  key={item.lines.join("-")}
                  className={`flex items-center gap-4 px-2 sm:px-4 ${
                    index > 0 ? "sm:border-l sm:border-[#e5e7eb]" : ""
                  }`}
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf0fd] sm:size-16">
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
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl bg-[#e8edff] p-6 shadow-[0_8px_24px_-14px_rgba(15,23,42,0.18)] sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-8 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm sm:size-16">
              <Image
                src="/score-guide/icon-cloud.svg"
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
            </span>
            <div>
              {hasData ? (
                <>
                  <h2 className="text-lg font-bold text-[#1e1b4b]">
                    {dha.source
                      ? `${dha.source} instrument`
                      : "Comparison data ready"}
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#6b7280] sm:text-base">
                    Latest indicative comparison data
                    {verified ? ` · verified ${verified}` : ""}.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-[#1e1b4b]">
                    Data is loading from CMS...
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#6b7280] sm:text-base">
                    Please wait while we load the latest indicative comparison
                    data.
                  </p>
                </>
              )}
            </div>
          </div>

          <span
            className="hidden h-20 w-px bg-[#c7cdd8]/80 sm:block"
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
        className="bg-white px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8"
        aria-labelledby="equivalence-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="equivalence-heading"
              className="text-balance text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl"
            >
              Indicative score comparison
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-[#6b7280] sm:text-base">
              For guidance only. This comparison is not an official score
              conversion
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_24px_-14px_rgba(15,23,42,0.16)]">
            <div className="grid grid-cols-4 gap-0 bg-[#2D5BFF] px-3 py-4 text-center text-white sm:px-6 sm:py-5">
              <p className="text-xs font-bold sm:text-sm">Proficiency Level</p>
              <div>
                <p className="text-xs font-bold sm:text-sm">PTE Components</p>
                <p className="mt-0.5 text-[0.65rem] font-medium text-white/85 sm:text-xs">
                  (Minimum Scores)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold sm:text-sm">IELTS Equivalent</p>
                <p className="mt-0.5 text-[0.65rem] font-medium text-white/85 sm:text-xs">
                  (Each Component)
                </p>
              </div>
              <div>
                <p className="text-xs font-bold sm:text-sm">
                  Australian Migration Points
                </p>
                <p className="mt-0.5 text-[0.65rem] font-medium text-white/85 sm:text-xs">
                  (Indicative)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-0 border-b border-[#eef0f4] bg-[#fafbfe] px-3 py-3 text-center text-[0.65rem] font-medium text-[#9aa3b2] sm:px-6 sm:text-xs">
              <p className="text-left">English level</p>
              <div>
                <p>PTE Academic — minimum component scores</p>
                <p className="mt-1 flex justify-center gap-4 text-[0.7rem] font-bold tracking-wide text-[#6b7280] sm:gap-6">
                  <span>L</span>
                  <span>R</span>
                  <span>W</span>
                  <span>S</span>
                </p>
              </div>
              <p>IELTS Academic — indicative band reference</p>
              <p>Migration points — where applicable</p>
            </div>

            {hasData ? (
              <ul className="divide-y divide-[#eef0f4]">
                {pathways.map((pathway) => {
                  const icon =
                    LEVEL_ICONS[pathway.id as keyof typeof LEVEL_ICONS] ??
                    LEVEL_ICONS.competent;
                  const scores = getPathwaySkillScores(pathway);

                  return (
                    <li
                      key={pathway.id}
                      className="grid grid-cols-4 items-center gap-0 px-3 py-5 sm:px-6 sm:py-6"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2D5BFF] sm:size-11">
                          <Image
                            src={icon}
                            alt=""
                            width={20}
                            height={20}
                            className="size-5"
                          />
                        </span>
                        <p className="text-sm font-bold text-[#1e1b4b] sm:text-base">
                          {pathway.title}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-3 sm:gap-5">
                        {scores.map((skill) => (
                          <span
                            key={skill.label}
                            className="min-w-[1.5rem] text-center text-sm font-bold text-[#1e1b4b] sm:text-base"
                          >
                            {skill.value}
                          </span>
                        ))}
                      </div>

                      <p className="text-center text-sm font-bold text-[#1e1b4b] sm:text-base">
                        {formatIeltsBand(pathway.ieltsAcademicMinEach)}
                      </p>

                      <p className="text-center text-sm font-bold text-[#1e1b4b] sm:text-base">
                        {pathway.migrationPointsLabel ?? "—"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-6 py-10 text-center text-sm text-[#6b7280]">
                Please wait while we load the latest indicative comparison data.
              </p>
            )}

            <div className="flex flex-col gap-3 bg-[#eaf0fd] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3 sm:items-center">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
                  <Image
                    src="/pp/icon-info.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </span>
                <p className="text-sm font-medium leading-5 text-[#1e1b4b]">
                  Equivalence is indicative and provided for general guidance
                  only. Always check official requirements with the relevant
                  authority.
                </p>
              </div>
              <div className="shrink-0 text-left text-sm font-semibold text-[#464557] sm:text-right">
                {verified ? <p>Last updated: {verified}</p> : null}
                <p>Source: Linguatude CMS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-2xl bg-[#eef4ff] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2D5BFF] text-sm font-bold text-white">
              i
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#1e1b4b] sm:text-lg">
                Indicative information only
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#6b7280] sm:text-base">
                PTE and IELTS scores are not directly interchangeable. This
                comparison is provided for general guidance and may vary by
                institution, visa and purpose. Australian migration requirements
                can change. Always verify the current requirements with{" "}
                <strong className="font-bold text-[#464557]">
                  the Australian Department of Home Affairs
                </strong>{" "}
                before applying.
              </p>
            </div>
          </div>
          <Link
            href="https://immi.homeaffairs.gov.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2D5BFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
          >
            Visit Australian Department of Home Affairs
            <Image
              src="/pte/icon-arrow.svg"
              alt=""
              width={14}
              height={14}
              className="size-3.5 brightness-0 invert"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
