import Image from "next/image";
import Link from "next/link";

const TRUST_ITEMS = [
  {
    lines: ["AI Band", "scoring"] as const,
    icon: "/ielts/trust-band.svg",
    bakedCircle: true,
  },
  {
    lines: ["Examine your", "weak areas"] as const,
    icon: "/ielts/trust-examine.svg",
    bakedCircle: false,
  },
  {
    lines: ["Improve with", "every answer"] as const,
    icon: "/ielts/trust-improve.svg",
    bakedCircle: false,
  },
] as const;

export function IeltsHero() {
  return (
    <section
      className="home-hero relative isolate overflow-hidden"
      aria-labelledby="ielts-hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
          <div className="relative z-10 flex min-w-0 flex-col items-start animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex flex-wrap items-center gap-2 rounded-3xl bg-[#bed4fa] px-5 py-3 text-sm font-bold uppercase tracking-[0.7px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-base">
              <span>University</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>AHPRA</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>Skilled Visas</span>
            </p>

            <h1
              id="ielts-hero-heading"
              className="mt-6 max-w-[14ch] text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1e1b4b] sm:mt-8 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]"
            >
              <span className="text-[#2D5BFF]">IELTS</span> Academic, coached by{" "}
              <span className="text-[#2D5BFF]">AI</span>
            </h1>

            <p className="mt-5 max-w-lg text-pretty text-lg font-medium leading-7 text-[#4b5563] sm:text-xl">
              Band-scored speaking and writing with examiner-style feedback
            </p>

            <div className="mt-7 flex w-full flex-col items-stretch gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="#start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-6 py-3 text-base font-bold text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 sm:px-8 sm:py-4 sm:text-lg"
              >
                Start free
                <span className="relative size-5 shrink-0 overflow-hidden">
                  <Image
                    src="/ielts/icon-arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full"
                  />
                </span>
              </Link>
              <Link
                href="#feedback"
                className="inline-flex items-center justify-center rounded-xl border border-[#2D5BFF] bg-white px-6 py-3.5 text-center text-base font-bold text-[#2D5BFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 sm:px-8"
              >
                Your Goals start here
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] animate-[fade-in-up_0.85s_ease-out_both] lg:mx-0 lg:ml-auto lg:max-w-none">
            <div className="pointer-events-none absolute -left-3 -top-3 z-[2] hidden size-12 sm:block lg:-left-4 lg:-top-4 lg:size-14">
              <Image
                src="/ielts/paper-plane.svg"
                alt=""
                width={56}
                height={56}
                className="size-full rotate-[12deg]"
              />
            </div>
            <div className="relative mx-auto aspect-[690/550] w-full max-w-[26rem] lg:max-w-[28rem]">
              <Image
                src="/ielts/writing-card.png"
                alt="IELTS Writing Task 2 AI feedback card showing estimated band 7.5"
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 1024px) 90vw, 448px"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-4xl rounded-2xl bg-[#2D5BFF] px-4 py-5 text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:mt-12 sm:px-6 sm:py-6 animate-[fade-in-up_0.85s_ease-out_both]">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-0">
            {TRUST_ITEMS.map((item, index) => (
              <li
                key={item.lines.join(" ")}
                className={`flex min-w-0 items-center gap-3 sm:justify-center sm:gap-4 sm:px-5 ${
                  index > 0 ? "sm:border-l sm:border-white/35" : ""
                }`}
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full sm:size-12">
                  {item.bakedCircle ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center rounded-full bg-white">
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-5 sm:size-6"
                      />
                    </span>
                  )}
                </span>
                <span className="min-w-0 text-sm font-semibold leading-6 sm:text-base">
                  {item.lines[0]}
                  <br />
                  {item.lines[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
