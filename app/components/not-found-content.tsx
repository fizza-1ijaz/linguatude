import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const EXPLORE_LINKS = [
  {
    href: "/pte",
    label: "PTE Australia",
    icon: "/pte/trust-au.svg",
  },
  {
    href: "/ielts",
    label: "IELTS Academic",
    icon: "/ielts/feat-plan.svg",
  },
  {
    href: "/features",
    label: "Features",
    icon: "/features/icon-plan.svg",
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: "/pricing/icon-dollar.svg",
  },
  {
    href: "/blog",
    label: "Blog",
    icon: "/blog/icon-pencil.svg",
  },
  {
    href: "/contact",
    label: "Contact",
    icon: "/contact/icon-message.svg",
  },
] as const;

function hasHeroImage() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "404", "hero.png"));
  } catch {
    return false;
  }
}

export function NotFoundContent() {
  const showHero = hasHeroImage();

  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="not-found-heading"
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="relative aspect-[951/535] w-full max-w-[59.4rem] animate-[fade-in-up_0.75s_ease-out_both]">
            {showHero ? (
              <Image
                src="/404/hero.png"
                alt=""
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 950px"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center">
                <p className="text-[clamp(6rem,22vw,12rem)] font-extrabold leading-none tracking-[-0.06em] text-[#2D5BFF]/90">
                  404
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 max-w-xl animate-[fade-in-up_0.85s_ease-out_both] sm:mt-8">
            <h1
              id="not-found-heading"
              className="text-balance text-3xl font-extrabold tracking-[-0.025em] text-[#1e1b4b] sm:text-4xl lg:text-5xl lg:leading-[1.15]"
            >
              This page took the wrong exam.
            </h1>
            <p className="mt-4 text-base font-medium text-[#6b7280] sm:text-lg">
              The link may be old or mistyped.
            </p>
          </div>

          <div className="mt-6 animate-[fade-in-up_0.95s_ease-out_both] sm:mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#2D5BFF] px-6 py-3 text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
            >
              <Image
                src="/blog/arrow-left.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 brightness-0 invert"
              />
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-white px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20"
        aria-labelledby="explore-heading"
      >
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] px-4 py-8 sm:px-8 sm:py-10">
          <h2
            id="explore-heading"
            className="text-center text-lg font-bold text-[#1e1b4b] sm:text-xl"
          >
            You can also explore
          </h2>

          <nav
            className="mt-8 flex flex-wrap items-stretch justify-center gap-y-8"
            aria-label="Explore Linguatude"
          >
            {EXPLORE_LINKS.map((item, index) => (
              <div key={item.href} className="flex items-stretch">
                {index > 0 ? (
                  <span
                    className="mx-2 hidden w-px self-stretch bg-[#e5e7eb] sm:mx-4 lg:mx-6 lg:block"
                    aria-hidden
                  />
                ) : null}
                <Link
                  href={item.href}
                  className="group flex min-w-[7.5rem] flex-col items-center gap-3 px-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 sm:min-w-[8.5rem]"
                >
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-[0_4px_12px_-4px_rgba(45,91,255,0.25)] ring-1 ring-[#e5e7eb] transition group-hover:ring-[#2D5BFF]/40">
                    <span className="relative size-8 overflow-clip">
                      <Image
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="size-full object-contain"
                      />
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#374151] transition group-hover:text-[#2D5BFF]">
                    {item.label}
                    <Image
                      src="/home/icon-arrow.svg"
                      alt=""
                      width={14}
                      height={14}
                      className="size-3.5 opacity-70"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
