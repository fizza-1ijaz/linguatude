"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/app/components/marketing-motion";
import { getPricingPlans, type PricingExamId } from "@/lib/content";

type Plan = ReturnType<typeof getPricingPlans>["exams"]["pte"]["plans"][number];

function formatPrice(plan: Plan): string {
  if (typeof plan.price === "number") {
    return plan.price % 1 === 0 ? String(plan.price) : plan.price.toFixed(2);
  }
  if ("priceDisplay" in plan && typeof plan.priceDisplay === "string") {
    return plan.priceDisplay;
  }
  return "—";
}

function StartFreeButton({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="inline-flex"
    >
      <Link
        href="/#start"
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 ${className ?? ""}`}
      >
        Start free
        <span className="relative size-4 shrink-0 overflow-clip">
          <Image
            src="/pricing/icon-arrow.svg"
            alt=""
            width={16}
            height={16}
            className="size-full"
          />
        </span>
      </Link>
    </motion.div>
  );
}

export function PricingPageContent() {
  const data = getPricingPlans();
  const examIds = Object.keys(data.exams) as PricingExamId[];
  const [examId, setExamId] = useState<PricingExamId>("pte");
  const exam = data.exams[examId];
  const reduce = useReducedMotion();

  return (
    <>
      <section
        className="mkt-hero-bottom relative isolate overflow-hidden"
        aria-labelledby="pricing-hero-heading"
      >
        <Stagger className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-10 pt-12 text-center sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pt-[5.75rem]">
          <StaggerItem>
            <motion.span
              className="flex size-[4.875rem] items-center justify-center rounded-full border border-[#2D5BFF] bg-white shadow-sm"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative size-[3.25rem] overflow-clip">
                <Image
                  src="/pricing/icon-dollar.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="size-full"
                />
              </span>
            </motion.span>
          </StaggerItem>

          <StaggerItem>
            <h1
              id="pricing-hero-heading"
              className="mt-8 max-w-xl text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#191c1f] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
            >
              Choose your exam &amp; plan
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-xl text-lg font-medium leading-7 text-[#464557]">
              Flexible plans designed to help you prepare for your goals. Select
              your exam to view the available options
            </p>
          </StaggerItem>

          <StaggerItem>
            <div
              className="mt-8 inline-flex rounded-full border border-[#c7c4db]/60 bg-white p-1 shadow-sm"
              role="tablist"
              aria-label="Select exam"
            >
              {examIds.map((id) => {
                const active = id === examId;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setExamId(id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 sm:px-6 sm:text-base ${
                      active
                        ? "bg-[#2D5BFF] text-white shadow-sm"
                        : "bg-transparent text-[#464557] hover:text-[#191c1f]"
                    }`}
                  >
                    {data.exams[id].label}
                  </button>
                );
              })}
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      <section
        className="relative bg-white px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16"
        aria-labelledby="plans-heading"
      >
        <Reveal>
          <div className="mx-auto max-w-6xl rounded-3xl border border-[rgba(199,196,219,0.35)] bg-white p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#2D5BFF] text-sm font-extrabold text-white">
              {exam.shortLabel}
            </span>
            <div>
              <h2
                id="plans-heading"
                className="text-2xl font-extrabold tracking-tight text-[#191c1f] sm:text-3xl"
              >
                {exam.label}
              </h2>
              <p className="mt-2 max-w-3xl text-base leading-6 text-[#464557]">
                {exam.description}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
          <Stagger
            key={examId}
            as="ul"
            className="mt-8 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {exam.plans.map((plan) => {
              const featured = "featured" in plan && plan.featured;
              const isGreenBadge =
                "badgeTone" in plan && plan.badgeTone === "green";
              const trialHeader = Boolean(plan.badge && featured && !isGreenBadge);

              return (
                <StaggerItem key={plan.id} as="li" className="flex">
                  <motion.article
                    className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_8px_rgba(0,0,0,0.12)] ${
                      featured
                        ? "border-2 border-[#2D5BFF]"
                        : "border border-[#e5e7eb]"
                    }`}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -6,
                            boxShadow:
                              "0 20px 40px -18px rgba(45,91,255,0.25), 0 8px 16px -10px rgba(15,23,42,0.12)",
                          }
                    }
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    {trialHeader ? (
                      <div className="flex min-h-10 items-center justify-center bg-[#2D5BFF] px-4 py-2.5 text-sm font-bold text-white">
                        {plan.badge}
                      </div>
                    ) : null}

                    <div className="relative flex flex-1 flex-col p-6">
                      {plan.badge && isGreenBadge ? (
                        <span className="absolute right-4 top-4 rounded-full bg-[#e6f6ed] px-3 py-1 text-xs font-bold text-[#16a34a]">
                          {plan.badge}
                        </span>
                      ) : null}

                      <h3
                        className={`text-lg font-bold text-[#191c1f] ${
                          plan.badge && isGreenBadge ? "pr-28" : ""
                        }`}
                      >
                        {plan.name}
                      </h3>

                      <p className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-4xl font-extrabold tracking-tight text-[#191c1f]">
                          ${formatPrice(plan)}
                        </span>
                        <span className="text-sm font-medium text-[#464557]">
                          {plan.priceSuffix}
                        </span>
                      </p>

                      <ul className="mt-6 flex flex-1 flex-col gap-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <span className="relative mt-0.5 size-5 shrink-0 overflow-clip">
                              <Image
                                src="/pricing/icon-check.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="size-full"
                              />
                            </span>
                            <span className="text-sm leading-5 text-[#464557]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/#start"
                        className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-base font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 ${
                          plan.ctaVariant === "primary"
                            ? "bg-[#2D5BFF] text-white hover:bg-[#244FE6]"
                            : "border border-[#2D5BFF] bg-white text-[#2D5BFF] hover:bg-[#f8faff]"
                        }`}
                      >
                        {plan.cta}
                      </Link>

                      {"note" in plan && plan.note ? (
                        <p className="mt-3 text-center text-xs leading-4 text-[#777589]">
                          {plan.note}
                        </p>
                      ) : (
                        <div className="mt-3 min-h-[2rem]" aria-hidden />
                      )}
                    </div>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </Stagger>
          </AnimatePresence>
        </div>
        </Reveal>
      </section>

      <section
        className="bg-white px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16"
        aria-labelledby="pricing-cta-heading"
      >
        <Reveal>
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-2xl border border-[#e3dfff] bg-[#f4f6f9] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:p-10 lg:flex-row lg:items-center">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <motion.span
                className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#d6dfff] shadow-sm"
                animate={reduce ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="relative size-[1.875rem] overflow-clip">
                  <Image
                    src="/pricing/icon-shield.svg"
                    alt=""
                    width={30}
                    height={30}
                    className="size-full"
                  />
                </span>
              </motion.span>
              <div>
                <h2
                  id="pricing-cta-heading"
                  className="text-xl font-bold leading-8 text-[#191c1f] sm:text-2xl"
                >
                  {data.banner.title}
                </h2>
                <p className="mt-2 text-base leading-6 text-[#464557] sm:text-lg sm:leading-6">
                  {data.banner.subtitle}
                </p>
              </div>
            </div>
            <StartFreeButton className="w-full shrink-0 sm:w-auto" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
