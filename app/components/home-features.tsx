import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    title: "Speaking AI",
    description:
      "Advanced AI evaluates fluency, pronunciation, content and more with instant feedback.",
    href: "#start",
    border: "border-[#d8b4ff]",
    shadow: "shadow-[0_4px_4px_rgba(168,85,247,0.25),0_4px_20px_rgba(0,0,0,0.05)]",
    inset: "shadow-[inset_0_4px_4px_#a855f7]",
    iconWrap: "border border-[#2D5BFF] bg-[#e6cfff]",
    iconInner: (
      <span className="flex size-10 items-center justify-center rounded-xl bg-[#2D5BFF] shadow-sm">
        <Image src="/home/icon-speaking.svg" alt="" width={20} height={20} className="size-5" />
      </span>
    ),
    arrow: "/home/icon-arrow-circ.svg",
    arrowBorder: "border-[#2D5BFF]",
    bg: (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/2 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-1/2">
          <Image src="/home/feature-wave.svg" alt="" fill className="object-cover object-bottom" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[13%]">
          <Image src="/home/feature-wave-2.svg" alt="" fill className="object-cover object-bottom" />
        </div>
      </div>
    ),
  },
  {
    title: "Writing traits",
    description:
      "Detailed trait-level feedback on grammar, coherence, lexical resource and more.",
    href: "#start",
    border: "border-[#699bfe]",
    shadow: "shadow-[0_4px_4px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.05)]",
    inset: "shadow-[inset_0_4px_4px_#2662d8]",
    iconWrap: "border-2 border-[#2D5BFF] bg-[#eaefff]",
    iconInner: (
      <Image src="/home/icon-writing.svg" alt="" width={28} height={28} className="size-7" />
    ),
    arrow: "/home/icon-arrow-circ-blue.svg",
    arrowBorder: "border-[#4f76ff]",
    bg: (
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[48%] w-[75%] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/home/feature-writing-bg.svg"
          alt=""
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    ),
  },
  {
    title: "DHA targets",
    description:
      "Know the exact scores you need for Australian migration, study or work.",
    href: "#start",
    border: "border-[#acffc9]",
    shadow: "shadow-[0_4px_4px_rgba(0,0,0,0.25),0_4px_20px_rgba(0,0,0,0.05)]",
    inset: "shadow-[inset_0_4px_4px_#6ea380]",
    iconWrap: "border border-[#16a34a] bg-[#dcfce7]",
    iconInner: (
      <Image src="/home/icon-dha.svg" alt="" width={32} height={32} className="size-8" />
    ),
    arrow: "/home/icon-arrow-circ-green.svg",
    arrowBorder: "border-[#16a34a]",
    bg: (
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[48%] w-[75%] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/home/feature-dha-bg.svg"
          alt=""
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    ),
  },
] as const;

export function HomeFeatures() {
  return (
    <section
      id="features"
      className="scroll-mt-20 bg-[#eaf0fd] py-16 sm:py-20 lg:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          className="text-center text-balance text-3xl font-extrabold tracking-tight text-[#1a1a2e] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.5]"
        >
          Every task type.{" "}
          <span className="text-[#2D5BFF]">Scored in seconds.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:mt-12 lg:gap-6">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className={`relative flex min-h-[22rem] flex-col overflow-hidden rounded-3xl border bg-white p-8 ${feature.border} ${feature.shadow}`}
            >
              <div className={`pointer-events-none absolute inset-0 rounded-3xl ${feature.inset}`} aria-hidden />
              {feature.bg}

              <div className="relative z-10 flex h-full flex-col">
                <div
                  className={`mb-6 flex size-16 items-center justify-center rounded-full ${feature.iconWrap}`}
                >
                  {feature.iconInner}
                </div>

                <h3 className="text-xl font-bold text-[#111827]">{feature.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b5563]">
                  {feature.description}
                </p>

                <Link
                  href={feature.href}
                  className={`mt-6 inline-flex size-10 items-center justify-center overflow-clip rounded-full border-2 ${feature.arrowBorder} transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40`}
                  aria-label={`Learn more about ${feature.title}`}
                >
                  <Image src={feature.arrow} alt="" width={20} height={20} className="size-5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
