import Image from "next/image";
import Link from "next/link";

const CARDS = [
  {
    title: "Task 1 letters",
    description:
      "Write letters for common real-life situations — requests, explanations, invitations and more.",
    image: "/ielts-general/card-letters.png",
    imageAlt: "Handwriting a letter on a desk",
    gradient: "from-[#f0f2ff] via-[rgba(240,242,255,0.9)] to-transparent",
    iconBg: "bg-[#2D5BFF]",
    icon: "/ielts-general/icon-pencil.svg",
    rule: "bg-[#2D5BFF]",
    actionBorder: "border-[#2D5BFF]",
    actionIcon: "/ielts-general/icon-plus-blue.svg",
  },
  {
    title: "Everyday reading",
    description:
      "Read everyday notices, ads, articles and texts you'll encounter in daily life and work.",
    image: "/ielts-general/card-reading.png",
    imageAlt: "Reading on a tablet",
    gradient: "from-[#f0fff4] via-[rgba(240,255,244,0.9)] to-transparent",
    iconBg: "bg-[#48bb78]",
    icon: "/ielts-general/icon-book.svg",
    rule: "bg-[#48bb78]",
    actionBorder: "border-[#48bb78]",
    actionIcon: "/ielts-general/icon-plus-green.svg",
  },
] as const;

export function IeltsGeneralDifference() {
  return (
    <section
      id="difference"
      className="scroll-mt-24 bg-[#eaf0fd] py-16 sm:py-20"
      aria-labelledby="difference-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2
            id="difference-heading"
            className="text-balance text-3xl font-extrabold tracking-tight text-[#191c1f] sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            What&apos;s different in{" "}
            <span className="text-[#3d00ff]">General Training</span>
          </h2>
          <span className="mt-4 h-1 w-16 bg-[#3d00ff]" aria-hidden />
          <p className="mt-4 max-w-2xl text-pretty text-base font-medium text-[#464557] sm:text-lg">
            Focused on everyday situations you&apos;ll actually use in Australia.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="relative min-h-[26rem] overflow-hidden rounded-xl border border-[#e1e2e6] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25),0_8px_30px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover object-right"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`}
                  aria-hidden
                />
              </div>

              <div className="relative z-10 flex h-full min-h-[26rem] flex-col justify-between p-8 sm:p-12">
                <div>
                  <span
                    className={`inline-flex size-12 items-center justify-center overflow-clip rounded-full shadow-sm ${card.iconBg}`}
                  >
                    <Image
                      src={card.icon}
                      alt=""
                      width={22}
                      height={18}
                      className="h-auto w-[1.375rem]"
                    />
                  </span>
                  <h3 className="mt-8 text-2xl font-extrabold text-[#191c1f]">
                    {card.title}
                  </h3>
                  <span
                    className={`mt-4 block h-0.5 w-10 ${card.rule}`}
                    aria-hidden
                  />
                  <p className="mt-4 max-w-sm text-base font-semibold leading-6 text-[#464557]">
                    {card.description}
                  </p>
                </div>

                <Link
                  href="#start"
                  className={`mt-8 inline-flex size-10 items-center justify-center overflow-clip rounded-full border-[3px] bg-white/80 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 ${card.actionBorder}`}
                  aria-label={`Learn more about ${card.title}`}
                >
                  <Image
                    src={card.actionIcon}
                    alt=""
                    width={10}
                    height={10}
                    className="size-2.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
