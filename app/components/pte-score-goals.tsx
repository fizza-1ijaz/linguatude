import Image from "next/image";
import {
  getDhaGuidance,
  getDhaMetaLine,
  getPathwaySkillScores,
  hasDhaPathways,
} from "@/lib/content";

const LEVEL_STYLES = {
  competent: {
    pointsClass: "bg-[#e6f6ed] text-[#16a34a]",
    cardClass: "bg-[#eaf6ee] border-[#c1ebd1]",
    skillBorder: "border-[#c1ebd1]",
    iconBg: "bg-gradient-to-br from-[#4ade80] to-[#16a34a]",
    iconRing: "shadow-[0_0_0_4px_rgba(34,197,94,0.1)] border-[rgba(34,197,94,0.3)]",
    icon: "/pte/score-competent.svg",
  },
  proficient: {
    pointsClass: "bg-[#e0e7ff] text-[#2563eb]",
    cardClass: "bg-[#bccbfd] border-[#c7d2fe]",
    skillBorder: "border-[#c7d2fe]",
    iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]",
    iconRing: "shadow-[0_0_0_4px_rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.3)]",
    icon: "/pte/score-proficient.svg",
  },
  superior: {
    pointsClass: "bg-[#fef3c7] text-[#d97706]",
    cardClass: "bg-[#fffbeb] border-[#fde68a]",
    skillBorder: "border-[#fde68a]",
    iconBg: "bg-gradient-to-br from-[#fbbf24] to-[#d97706]",
    iconRing: "shadow-[0_0_0_4px_rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.3)]",
    icon: "/pte/score-superior.svg",
  },
} as const;

export function PteScoreGoals() {
  const dha = getDhaGuidance();
  const meta = getDhaMetaLine();

  if (!hasDhaPathways()) {
    return null;
  }

  return (
    <section
      id="goals"
      className="scroll-mt-24 bg-[#eaf0fd] py-16 sm:py-20"
      aria-labelledby="goals-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            id="goals-heading"
            className="text-balance text-3xl font-extrabold text-[#0f172a] sm:text-4xl"
          >
            Know exactly what the points need
          </h2>
          {meta ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] sm:text-xl sm:leading-5">
              <span className="relative size-5 shrink-0 overflow-clip">
                <Image
                  src="/pte/lin-meta.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="size-full"
                />
              </span>
              {meta}
            </p>
          ) : null}
          {dha.disclaimer ? (
            <p className="max-w-2xl text-xs leading-4 text-[#64748b] sm:text-sm sm:leading-5">
              {dha.disclaimer}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-10 md:grid-cols-3 md:gap-6">
          {dha.pathways.map((pathway) => {
            const style =
              LEVEL_STYLES[pathway.id as keyof typeof LEVEL_STYLES] ??
              LEVEL_STYLES.competent;
            const scores = getPathwaySkillScores(pathway);

            return (
              <article key={pathway.id} className="relative flex h-full flex-col pt-8">
                <div
                  className={`absolute left-1/2 top-0 z-10 flex size-16 -translate-x-1/2 items-center justify-center rounded-full border ${style.iconBg} ${style.iconRing}`}
                >
                  <span className="relative size-8 overflow-clip">
                    <Image
                      src={style.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="size-full"
                    />
                  </span>
                </div>

                <div
                  className={`flex h-full flex-col rounded-2xl border px-5 pb-6 pt-12 shadow-[0_4px_8px_rgba(0,0,0,0.25)] ${style.cardClass}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold tracking-tight text-[#111827] sm:text-xl">
                      {pathway.title}
                    </h3>
                    {pathway.migrationPointsLabel ? (
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${style.pointsClass}`}
                      >
                        {pathway.migrationPointsLabel}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {scores.map((skill) => (
                      <div
                        key={skill.label}
                        className={`rounded-lg border bg-white px-1 py-3 text-center ${style.skillBorder}`}
                      >
                        <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-[#6b7280]">
                          {skill.label}
                        </p>
                        <p className="mt-1 text-xl font-bold text-[#111827]">
                          {skill.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex min-h-[2.25rem] items-center justify-center">
                    {pathway.highlight ? (
                      <span className="rounded-full bg-[#e0e7ff] px-4 py-1.5 text-center text-sm font-semibold text-[#2563eb]">
                        {pathway.highlight}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
