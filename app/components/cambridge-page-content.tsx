import Image from "next/image";
import Link from "next/link";
import { CambridgeWaitlistForm } from "@/app/components/cambridge-waitlist-form";

const TRUST_ITEMS = [
  {
    lines: ["Migration", "focused"] as const,
    icon: "/cambridge/trust-migration.svg",
    fullIcon: true,
  },
  {
    lines: ["Real world", "skills"] as const,
    icon: "/cambridge/trust-skills.svg",
    fullIcon: false,
  },
  {
    lines: ["Band ready", "practice"] as const,
    icon: "/cambridge/trust-band.svg",
    fullIcon: false,
  },
] as const;

const BENEFITS = [
  {
    title: ["Exam-aligned", "practice"] as const,
    description: "B2 First and C1 Advanced skills, built by experts.",
    icon: "/cambridge/benefit-exam.svg",
    iconClass: "h-6 w-[1.833rem]",
  },
  {
    title: ["Real exam", "experience"] as const,
    description: "Authentic tasks with AI feedback to help you improve faster.",
    icon: "/cambridge/benefit-real.svg",
    iconClass: "h-[1.833rem] w-[1.667rem]",
  },
  {
    title: ["Launch updates"] as const,
    description: "Be the first to know when prep goes live.",
    icon: "/cambridge/benefit-launch.svg",
    iconClass: "h-[1.67rem] w-[1.667rem]",
  },
] as const;

export function CambridgePageContent() {
  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="cambridge-hero-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
            <div className="relative z-10 flex min-w-0 flex-col items-start animate-[fade-in-up_0.75s_ease-out_both]">
              <p className="inline-flex items-center gap-2 rounded-3xl bg-[#bed4fa] px-5 py-3 text-sm font-bold uppercase tracking-[0.7px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-base">
                <span>Coming 2027</span>
                <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              </p>

              <h1
                id="cambridge-hero-heading"
                className="mt-8 max-w-[11ch] text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1e1b4b] sm:text-5xl lg:text-[4rem] lg:leading-[1.25]"
              >
                Cambridge exams are{" "}
                <span className="text-[#2D5BFF]">Coming</span>
              </h1>

              <p className="mt-6 max-w-lg text-pretty text-lg font-medium leading-7 text-[#4b5563] sm:text-xl">
                B2 First and C1 Advanced practice. Join the list.
              </p>

              <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-6 py-3 text-base font-bold text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 sm:px-8 sm:py-4 sm:text-lg"
                >
                  Start free
                  <span className="relative size-5 shrink-0 overflow-clip">
                    <Image
                      src="/cambridge/icon-arrow.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-full"
                    />
                  </span>
                </Link>
                <Link
                  href="#benefits"
                  className="inline-flex items-center justify-center rounded-xl border border-[#2D5BFF] bg-white px-6 py-3.5 text-center text-base font-bold text-[#2D5BFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 sm:px-8"
                >
                  Your Goals start here
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[32rem] animate-[fade-in-up_0.85s_ease-out_both] lg:max-w-none">
              <div className="pointer-events-none absolute -left-2 top-2 z-[2] hidden size-16 sm:block sm:size-20 lg:left-0 lg:top-4">
                <span className="relative block size-full overflow-clip">
                  <Image
                    src="/cambridge/paper-plane.svg"
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rotate-12"
                  />
                </span>
              </div>
              <div className="relative aspect-square w-full -rotate-6">
                <Image
                  src="/cambridge/hero-books.png"
                  alt="Stack of practice books and a study plan notepad"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 520px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="waitlist"
        className="relative z-20 -mt-4 scroll-mt-24 px-4 pb-8 sm:-mt-8 sm:px-6 lg:px-8"
        aria-labelledby="waitlist-heading"
      >
        <div className="relative mx-auto max-w-2xl rounded-2xl bg-[#f4f6f9] px-6 pb-6 pt-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_8px_30px_rgba(0,0,0,0.08)] sm:px-12 sm:pb-8 sm:pt-10">
          <div className="mx-auto flex size-[7.5rem] items-center justify-center rounded-full bg-[#f3f5ff] shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
            <span className="relative size-12 overflow-clip">
              <Image
                src="/cambridge/people-outline.svg"
                alt=""
                width={48}
                height={48}
                className="size-full"
              />
            </span>
          </div>

          <h2
            id="waitlist-heading"
            className="mt-8 text-center text-4xl font-bold text-[#1a1f36] sm:text-5xl sm:leading-none"
          >
            Be{" "}
            <span className="relative inline-block text-[#2d5cfe]">
              first
              <span
                className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#2d5cfe]"
                aria-hidden
              />
            </span>{" "}
            in line
          </h2>

          <p className="mx-auto mt-5 max-w-md text-center text-lg font-semibold leading-snug text-[#4f566b]">
            Cambridge prep is on the way. Join the waitlist and we&apos;ll notify
            you at launch.
          </p>

          <div className="mx-auto mt-8 max-w-lg">
            <CambridgeWaitlistForm />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl bg-[#e7eaed] px-4 py-3 sm:flex-row sm:gap-6">
            <p className="flex items-center gap-2 text-sm">
              <span className="relative size-8 overflow-clip">
                <Image
                  src="/cambridge/people-small.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-full"
                />
              </span>
              <span className="font-semibold text-[#1a1f36]">1,240</span>
              <span className="text-[#4f566b]">people waiting</span>
            </p>
            <span
              className="hidden h-6 w-px bg-[#bbbcbd] sm:block"
              aria-hidden
            />
            <p className="flex items-center gap-2 text-sm text-[#4f566b]">
              <span className="relative size-8 overflow-clip">
                <Image
                  src="/cambridge/shield.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="size-full"
                />
              </span>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#2D5BFF] p-4 text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:p-6">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
            {TRUST_ITEMS.map((item, index) => (
              <li
                key={item.lines.join(" ")}
                className={`flex items-center gap-3 sm:justify-center sm:gap-4 sm:px-4 ${
                  index > 0 ? "sm:border-l sm:border-[#e5e7eb]/80" : ""
                }`}
              >
                <span className="relative size-10 shrink-0 overflow-clip sm:size-12">
                  {item.fullIcon ? (
                    <Image src={item.icon} alt="" width={48} height={48} className="size-full" />
                  ) : (
                    <span className="flex size-full items-center justify-center rounded-full bg-white">
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold leading-6 sm:text-base">
                  {item.lines[0]}
                  <br />
                  {item.lines[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="benefits"
        className="scroll-mt-24 bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
        aria-labelledby="benefits-heading"
      >
        <h2 id="benefits-heading" className="sr-only">
          Cambridge prep benefits
        </h2>
        <div className="mx-auto max-w-5xl rounded-2xl bg-[#f4f6f9] px-4 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.08)] sm:px-6 sm:py-12">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {BENEFITS.map((benefit, index) => (
              <li
                key={benefit.title.join(" ")}
                className={`flex gap-4 px-2 sm:px-6 ${
                  index > 0 ? "md:border-l md:border-[rgba(133,133,137,0.5)]" : ""
                }`}
              >
                <span className="flex size-16 shrink-0 items-center justify-center overflow-clip rounded-full bg-[rgba(196,192,255,0.3)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={30}
                    height={30}
                    className={benefit.iconClass}
                  />
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-tight text-[#161641] sm:text-2xl sm:leading-[1.25]">
                    {benefit.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-1 text-base leading-6 text-[#464557]">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
