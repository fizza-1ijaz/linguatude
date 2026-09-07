import Image from "next/image";
import Link from "next/link";

export function PteCtaBanner() {
  return (
    <section className="bg-white px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="pte-cta-heading">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-xl bg-[#2D5BFF] px-6 py-10 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] sm:px-8 sm:py-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] opacity-15 mix-blend-overlay" aria-hidden>
          <Image
            src="/pte/cta-texture.png"
            alt=""
            fill
            className="object-cover object-left"
          />
        </div>

        <h2
          id="pte-cta-heading"
          className="relative text-balance text-2xl font-bold tracking-tight text-white sm:text-[1.75rem] sm:leading-[1.25]"
        >
          Ready to hit your target PTE score?
        </h2>
        <p className="relative mt-2 text-base text-white">
          Start preparing today and move closer to your Australia goals.
        </p>
        <Link
          href="#start"
          className="relative mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-base font-bold text-[#1d4ed8] shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Start free
          <span className="relative size-4 shrink-0 overflow-clip">
            <Image
              src="/pte/cta-arrow.svg"
              alt=""
              width={16}
              height={16}
              className="size-full"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
