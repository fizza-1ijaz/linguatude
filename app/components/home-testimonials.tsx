"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/app/components/marketing-motion";

const TESTIMONIALS = [
  {
    quote:
      "The speaking feedback finally told me why I kept freezing on Describe Image — not just a score. Two weeks of targeted drills and I felt ready for the real PTE.",
    name: "Nalini Wijesekera",
    location: "Melbourne, Australia",
  },
  {
    quote:
      "I liked that the study plan followed the days I actually had free. No more generic ‘study every day’ advice that I was never going to keep.",
    name: "Haruto Watanabe",
    location: "Sydney, Australia",
  },
  {
    quote:
      "Writing Task 1 used to eat my whole evening. The AI notes on structure were blunt but useful — my Task Achievement jumped after a few rounds.",
    name: "Amara Okonkwo",
    location: "Brisbane, Australia",
  },
  {
    quote:
      "Switching between IELTS and PTE practice without losing my progress made choosing an exam less stressful. The workspace stays clear.",
    name: "Leila Haddad",
    location: "Perth, Australia",
  },
  {
    quote:
      "Repeat Sentence was my weak spot. Short daily sessions with instant scoring helped more than any random YouTube playlist I tried.",
    name: "Tomás Ribeiro",
    location: "Adelaide, Australia",
  },
  {
    quote:
      "I appreciated the honest ‘estimated’ wording. It never pretended to be Pearson or IDP — just a clear practice signal I could act on.",
    name: "Farid Al-Masri",
    location: "Canberra, Australia",
  },
  {
    quote:
      "The mock timing felt close to exam day. After one full run I knew exactly which listening section to rebuild before booking.",
    name: "Sigrid Halvorsen",
    location: "Hobart, Australia",
  },
  {
    quote:
      "Fluency tips after each speaking attempt were specific — pause length, filler words, pace. That kind of detail is rare in free apps.",
    name: "Priyanka Mehta",
    location: "Geelong, Australia",
  },
  {
    quote:
      "I started with a diagnostic, then a plan that matched my 45-minute evenings. It stopped me from jumping between random task types.",
    name: "Kwame Boateng",
    location: "Gold Coast, Australia",
  },
] as const;

export function HomeTestimonials({
  heading = "Real feedback from real test takers.",
}: {
  heading?: string;
}) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pageCount = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-[#eaf0fd] py-16 sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative flex flex-col items-center gap-4 text-center">
            <p className="text-[0.8125rem] font-extrabold uppercase tracking-[1.2px] text-[#2D5BFF]">
              Tested. Trusted. Linguatude.
            </p>
            <h2
              id="testimonials-heading"
              className="text-balance text-3xl font-extrabold text-[#1e1b4b] sm:text-4xl"
            >
              {heading}
            </h2>

            <div className="absolute right-0 top-0 hidden items-start gap-2 sm:flex">
              <motion.button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
                aria-label="Previous testimonials"
                onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
                whileHover={reduce ? undefined : { scale: 1.06 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <span className="relative size-5 overflow-clip">
                  <Image
                    src="/home/icon-location.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full"
                  />
                </span>
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full bg-[#2D5BFF] shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
                aria-label="Next testimonials"
                onClick={() => setPage((p) => (p + 1) % pageCount)}
                whileHover={reduce ? undefined : { scale: 1.06 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <span className="relative size-5 overflow-clip">
                  <Image
                    src="/home/icon-arrow-left.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full"
                  />
                </span>
              </motion.button>
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <Stagger
            key={page}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {visible.map((item, index) => (
              <StaggerItem key={`${item.name}-${page}`} as="article">
                <motion.div
                  className={`flex h-full flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_10px_30px_-10px_rgba(79,70,229,0.1)] ${
                    index === 0 ? "ring-2 ring-[#2D5BFF]/20" : ""
                  }`}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -6,
                          boxShadow:
                            "0 20px 40px -18px rgba(45,91,255,0.28), 0 8px 16px -10px rgba(15,23,42,0.12)",
                        }
                  }
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <span className="relative size-8 overflow-clip">
                    <Image
                      src="/home/icon-quote.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="size-full"
                    />
                  </span>
                  <p className="text-base leading-[1.625] text-[#374151]">{item.quote}</p>
                  <div className="mt-auto flex items-center gap-4 pt-2">
                    <span className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded-full bg-[#e5e7eb]">
                      <Image
                        src="/home/icon-user.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#1e1b4b]">{item.name}</p>
                      <p className="text-sm text-[#6b7280]">{item.location}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-[#2D5BFF]" : "w-2 bg-[#d1d5db] hover:bg-[#9ca3af]"
              }`}
              aria-label={`Go to testimonial page ${i + 1}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
