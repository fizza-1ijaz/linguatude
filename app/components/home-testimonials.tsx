"use client";

import Image from "next/image";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "This is a testimonial placeholder. Real feedback from our testers will appear here.",
    name: "Name Placeholder",
    location: "Location Placeholder",
  },
  {
    quote:
      "This is a testimonial placeholder. Real feedback from our testers will appear here.",
    name: "Name Placeholder",
    location: "Location Placeholder",
  },
  {
    quote:
      "This is a testimonial placeholder. Real feedback from our testers will appear here.",
    name: "Name Placeholder",
    location: "Location Placeholder",
  },
] as const;

export function HomeTestimonials({
  heading = "Real feedback from real test takers.",
}: {
  heading?: string;
}) {
  const [page, setPage] = useState(0);
  const pageCount = 3;

  return (
    <section
      className="bg-[#eaf0fd] py-16 sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
              aria-label="Previous testimonials"
              onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
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
            </button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full bg-[#2D5BFF] shadow-sm transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
              aria-label="Next testimonials"
              onClick={() => setPage((p) => (p + 1) % pageCount)}
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
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className={`flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_10px_30px_-10px_rgba(79,70,229,0.1)] transition ${
                index === page % 3 ? "ring-2 ring-[#2D5BFF]/20" : ""
              }`}
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
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`size-2 rounded-full transition ${
                i === page ? "bg-[#2D5BFF]" : "bg-[#d1d5db]"
              }`}
              aria-label={`Go to testimonial page ${i + 1}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm leading-5 text-[#6b7280]">
          Authentic testimonials from verified Linguatude testers.
          <br />
          We never publish fictional stories or unverified results.
        </p>
      </div>
    </section>
  );
}
