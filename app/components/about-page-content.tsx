import Image from "next/image";
import Link from "next/link";

const VALUES = [
  {
    title: "Honesty first",
    description:
      "We prioritize integrity in test preparation. Our AI assessments are designed to give you a true reflection of your current abilities, not inflated scores to make you feel good temporarily. Real progress requires honest feedback.",
    icon: "/about/icon-honesty.svg",
  },
  {
    title: "Australia focus",
    description:
      "Our curriculum and scoring criteria are meticulously aligned with Australian migration and study requirements. We understand the specific nuances required to succeed in entering Australian institutions and society.",
    icon: "/about/icon-australia.svg",
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
          src="/about/icon-arrow.svg"
          alt=""
          width={16}
          height={16}
          className="size-full"
        />
      </span>
    </Link>
  );
}

export function AboutPageContent() {
  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block" aria-hidden>
          <div className="relative h-full w-full opacity-20">
            <Image
              src="/about/hero-collage.png"
              alt=""
              fill
              priority
              className="object-contain object-bottom blur-[1px]"
              sizes="48vw"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="max-w-lg animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,196,219,0.3)] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[1.2px] text-[#464557]">
              <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
              Our mission
            </p>

            <h1
              id="about-hero-heading"
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#191c1f] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
            >
              Why we built
              <br />
              <span className="text-[#2D5BFF]">Linguatude.</span>
            </h1>

            <p className="mt-6 max-w-md text-pretty text-lg font-medium leading-7 text-[#464557] sm:text-xl">
              English tests decide careers, visas and reunions. We believe
              everyone deserves high-fidelity, accurate preparation to achieve
              their required scores without unnecessary stress.
            </p>

            <div className="mt-8">
              <StartFreeButton />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#eaf0fd] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="values-heading"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 size-[3.75rem] opacity-40"
          aria-hidden
        >
          <Image
            src="/about/values-deco.svg"
            alt=""
            width={60}
            height={60}
            className="size-full"
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="values-heading"
              className="text-3xl font-bold tracking-[-0.025em] text-[#191c1f] sm:text-[2.625rem] sm:leading-[1.2]"
            >
              What we stand for
            </h2>
            <p className="mt-2 text-lg font-medium leading-7 text-[#464557]">
              Our core principles that guide every feature we build and every
              assessment we score.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className="relative overflow-hidden rounded-xl border-l-8 border-[#2D5BFF] bg-white py-8 pl-10 pr-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_20px_40px_rgba(61,0,255,0.08)]"
              >
                <span
                  className="absolute right-0 top-0 size-32 rounded-bl-[100px] bg-[#2D5BFF]"
                  aria-hidden
                />
                <span className="relative flex size-16 items-center justify-center overflow-clip rounded-2xl border border-[rgba(199,196,219,0.2)] bg-[#edeef2] p-3 shadow-[0_4px_8px_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(0,0,0,0.25)]">
                  <span className="relative size-[1.875rem] overflow-clip">
                    <Image
                      src={value.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="size-full"
                    />
                  </span>
                </span>
                <h3 className="relative mt-6 text-2xl font-bold leading-8 text-[#191c1f]">
                  {value.title}
                </h3>
                <p className="relative mt-4 text-base leading-[1.625] text-[#464557]">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pb-16"
        aria-labelledby="about-cta-heading"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl border border-[#e3dfff] bg-[#f4f6f9] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:p-10 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#d6dfff] shadow-sm">
              <span className="relative size-10 overflow-clip">
                <Image
                  src="/about/icon-rocket.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-full"
                />
              </span>
            </span>
            <div>
              <h2
                id="about-cta-heading"
                className="text-xl font-bold leading-8 text-[#191c1f] sm:text-2xl"
              >
                Build to help you move forward
              </h2>
              <p className="mt-2 text-base leading-6 text-[#464557]">
                Smarter preparation. Stronger results. Real progress
              </p>
            </div>
          </div>
          <StartFreeButton className="w-full shrink-0 sm:w-auto" />
        </div>
      </section>
    </>
  );
}
