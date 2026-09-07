import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    title: ["AI Speaking", "Scores"] as const,
    description:
      "Get accurate, band-aligned scores with detailed feedback for every speaking answer.",
    icon: "/features/icon-speaking.svg",
    iconClass: "size-[1.5625rem]",
  },
  {
    title: ["Writing Trait", "Feedback"] as const,
    description:
      "Detailed feedback across task achievement, coherence, lexical resource and grammar.",
    icon: "/features/icon-writing.svg",
    iconClass: "h-[1.5625rem] w-[1.484rem]",
  },
  {
    title: ["Adaptive Study", "Plan"] as const,
    description:
      "Personalised plan that adapts to your level, performance and goals.",
    icon: "/features/icon-plan.svg",
    iconClass: "h-[1.406rem] w-[1.5625rem]",
  },
  {
    title: ["Full Mock Tests"] as const,
    description:
      "Timed, real-exam simulations with AI scoring and in-depth review.",
    icon: "/features/icon-mock.svg",
    iconClass: "h-[1.328rem] w-[1.875rem]",
  },
  {
    title: ["DHA Target", "Tracking"] as const,
    description:
      "Track your DHA or visa targets and see how close you are to your goal.",
    icon: "/features/icon-dha.svg",
    iconClass: "size-[1.5625rem]",
  },
  {
    title: ["Spaced", "Vocabulary"] as const,
    description:
      "Build and retain high-impact vocabulary with intelligent spaced repetition.",
    icon: "/features/icon-vocab.svg",
    iconClass: "h-5 w-[1.719rem]",
  },
  {
    title: ["30-Minute Daily", "Plan"] as const,
    description:
      "A focused daily pathway designed to deliver consistent results in just 30 minutes.",
    icon: "/features/icon-daily.svg",
    iconClass: "h-[1.641rem] w-[1.406rem]",
  },
  {
    title: ["Progress &", "Mastery Tracking"] as const,
    description:
      "Monitor progress, review score history and build mastery over time.",
    icon: "/features/icon-progress.svg",
    iconClass: "size-[1.406rem]",
  },
] as const;

function StartFreeButton({ className }: { className?: string }) {
  return (
    <Link
      href="/#start"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 ${className ?? ""}`}
    >
      Start free
      <span className="relative size-4 shrink-0 overflow-clip">
        <Image
          src="/features/icon-arrow.svg"
          alt=""
          width={16}
          height={16}
          className="size-full"
        />
      </span>
    </Link>
  );
}

export function FeaturesPageContent() {
  return (
    <>
      <section
        className="mkt-hero relative isolate overflow-hidden"
        aria-labelledby="features-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-[5.375rem]">
          <p className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-[1.4px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-base">
            All the tools you need
          </p>

          <h1
            id="features-hero-heading"
            className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#191c1f] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
          >
            Powerful features.
            <br />
            <span className="text-[#2D5BFF]">One subscription.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-lg font-medium leading-7 text-[#464557] sm:text-xl">
            Everything you need to prepare smarter and perform your best for PTE
            and IELTS — in one place.
          </p>

          <div className="mt-6 sm:mt-7">
            <StartFreeButton />
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        aria-labelledby="features-grid-heading"
      >
        <h2 id="features-grid-heading" className="sr-only">
          Platform features
        </h2>
        <div
          className="pointer-events-none absolute left-0 top-0 size-[3.75rem] opacity-40"
          aria-hidden
        >
          <Image
            src="/features/grid-deco.svg"
            alt=""
            width={60}
            height={60}
            className="size-full"
          />
        </div>

        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <li
              key={feature.title.join(" ")}
              className="flex flex-col items-center rounded-2xl border border-[rgba(199,196,219,0.3)] bg-white px-6 py-8 text-center shadow-[0_4px_8px_rgba(0,0,0,0.25),0_8px_30px_rgba(0,0,0,0.04)]"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#d6dfff]">
                <span className={`relative overflow-clip ${feature.iconClass}`}>
                  <Image
                    src={feature.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="size-full"
                  />
                </span>
              </span>

              <h3 className="mt-6 text-xl font-bold leading-8 text-[#191c1f] sm:text-2xl">
                {feature.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <span
                className="mt-4 h-0.5 w-8 rounded-full bg-[#2D5BFF]"
                aria-hidden
              />

              <p className="mt-4 text-sm leading-[1.625] text-[#464557]">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pb-16"
        aria-labelledby="features-cta-heading"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl border border-[#e3dfff] bg-[#f4f6f9] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:p-10 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#d6dfff] shadow-sm">
              <span className="relative h-[1.875rem] w-6 overflow-clip">
                <Image
                  src="/features/icon-shield.svg"
                  alt=""
                  width={24}
                  height={30}
                  className="size-full"
                />
              </span>
            </span>
            <div>
              <h2
                id="features-cta-heading"
                className="text-xl font-bold leading-8 text-[#191c1f] sm:text-2xl"
              >
                Smarter preparation. Better results.
              </h2>
              <p className="mt-2 text-base leading-7 text-[#464557] sm:text-lg">
                All the features you need to achieve your target band.
              </p>
            </div>
          </div>
          <StartFreeButton className="w-full shrink-0 sm:w-auto" />
        </div>
      </section>
    </>
  );
}
