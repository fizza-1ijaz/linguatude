"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/app/components/marketing-motion";
import {
  formatVerifiedDate,
  getDhaGuidance,
  getDhaMetaLine,
  getPathwaySkillScores,
  getProficientPathway,
  hasDhaPathways,
} from "@/lib/content";

const BULLET_ICONS = [
  "/home/icon-pr-1.svg",
  "/home/icon-pr-2.svg",
  "/home/icon-pr-3.svg",
] as const;

export function HomePrBanner() {
  const reduce = useReducedMotion();
  const dha = getDhaGuidance();
  const meta = getDhaMetaLine();
  const verified = formatVerifiedDate(dha.lastVerified);
  const pathway = getProficientPathway();
  const skillScores = pathway ? getPathwaySkillScores(pathway) : [];
  const bullets = dha.homepageBullets ?? [];

  return (
    <section
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="pr-heading"
    >
      <Reveal>
        <motion.div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#220a83] via-[#1d4cf5] to-[#2d5bff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
          whileHover={
            reduce
              ? undefined
              : { boxShadow: "0 32px 60px -16px rgba(29,76,245,0.45)" }
          }
          transition={{ duration: 0.35 }}
        >
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-16">
              <Stagger>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <motion.span
                      className="relative mt-1 size-10 shrink-0 overflow-clip"
                      animate={reduce ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src="/home/icon-pin.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="size-full"
                      />
                    </motion.span>
                    <h2
                      id="pr-heading"
                      className="text-balance text-3xl font-bold leading-10 text-white sm:text-4xl"
                    >
                      Aiming for
                      <br />
                      Australian PR points?
                    </h2>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <p className="mt-6 max-w-md text-pretty text-lg leading-7 text-[#d1d5db]">
                    {hasDhaPathways()
                      ? "We help you hit the right scores in every skill — with guidance aligned to the current approved English pathways."
                      : "We help you prepare for Australian English requirements with component-level practice and clear goals."}
                  </p>
                </StaggerItem>

                {pathway && skillScores.length > 0 ? (
                  <StaggerItem>
                    <div className="mt-5 max-w-md rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">
                        Current pathway: {pathway.title}
                        {pathway.migrationPointsLabel ? (
                          <span className="ml-2 font-medium text-white/80">
                            ({pathway.migrationPointsLabel})
                          </span>
                        ) : null}
                      </p>
                      <dl className="mt-3 grid grid-cols-4 gap-2">
                        {skillScores.map((skill, i) => (
                          <motion.div
                            key={skill.label}
                            className="rounded-lg bg-white/15 px-1 py-2 text-center"
                            whileHover={reduce ? undefined : { y: -3, backgroundColor: "rgba(255,255,255,0.28)" }}
                            transition={{ delay: i * 0.02 }}
                          >
                            <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/75">
                              {skill.label.slice(0, 1)}
                            </dt>
                            <dd className="mt-0.5 text-lg font-bold text-white">
                              {skill.value}
                            </dd>
                          </motion.div>
                        ))}
                      </dl>
                      {meta ? (
                        <p className="mt-3 text-xs leading-4 text-white/70">{meta}</p>
                      ) : verified ? (
                        <p className="mt-3 text-xs leading-4 text-white/70">
                          Verified {verified}
                        </p>
                      ) : null}
                    </div>
                  </StaggerItem>
                ) : meta ? (
                  <StaggerItem>
                    <p className="mt-4 text-sm text-white/70">{meta}</p>
                  </StaggerItem>
                ) : null}

                {dha.disclaimer ? (
                  <StaggerItem>
                    <p className="mt-3 max-w-md text-xs leading-4 text-white/60">
                      {dha.disclaimer}
                    </p>
                  </StaggerItem>
                ) : null}

                <StaggerItem>
                  <div className="mt-8">
                    <motion.div
                      whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      className="inline-flex"
                    >
                      <Link
                        href="/pte"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#1a1a24] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        Explore PTE for Australia
                        <span className="relative size-5 shrink-0 overflow-clip">
                          <Image
                            src="/home/icon-arrow.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-full [filter:brightness(0)]"
                          />
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <div className="relative min-h-[18rem] sm:min-h-[22rem] lg:min-h-full">
              <Image
                src="/home/sydney.png"
                alt="Sydney Opera House at night"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-[rgba(45,59,108,0.55)]" aria-hidden />

              <Stagger
                as="ul"
                className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col justify-center gap-6 border-l border-white py-10 pl-8 pr-6 sm:pl-12 sm:pr-10 lg:pl-14"
              >
                {bullets.map((point, index) => (
                  <StaggerItem key={point.title} as="li" className="flex items-start gap-4">
                    <motion.span
                      className="flex size-10 shrink-0 items-center justify-center overflow-clip rounded-full bg-white"
                      whileHover={reduce ? undefined : { scale: 1.1, rotate: 6 }}
                    >
                      <Image
                        src={BULLET_ICONS[index % BULLET_ICONS.length]}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5"
                      />
                    </motion.span>
                    <p className="font-medium text-white">
                      <span className="block text-lg leading-7">{point.title}</span>
                      <span className="block text-sm leading-5">{point.subtitle}</span>
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
