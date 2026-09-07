import Image from "next/image";
import Link from "next/link";

const GOALS = [
  "Your PTE Goal",
  "Australian PR",
  "Study Visa",
  "Work Visa",
] as const;

const TRUST_ITEMS = [
  {
    lines: ["DHA Targets", "you can trust"] as const,
    icon: "/pte/trust-dha.svg",
    fullIcon: true,
  },
  {
    lines: ["AU- accent", "practice"] as const,
    icon: "/pte/trust-au.svg",
    fullIcon: false,
  },
  {
    lines: ["Smart AI", "feedback"] as const,
    icon: "/pte/trust-ai.svg",
    fullIcon: false,
  },
] as const;

export function PteHero() {
  return (
    <section
      className="home-hero relative isolate overflow-hidden"
      aria-labelledby="pte-hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div className="relative z-10 flex min-w-0 flex-col items-start animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex flex-wrap items-center gap-2 rounded-3xl bg-[#bed4fa] px-5 py-3 text-sm font-bold uppercase tracking-[0.7px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-base">
              <span>Migration</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>Study</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>Work</span>
            </p>

            <h1
              id="pte-hero-heading"
              className="mt-8 max-w-[12ch] text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1e1b4b] sm:text-5xl lg:text-[4rem] lg:leading-[1.15]"
            >
              <span className="text-[#2D5BFF]">PTE</span> academic prep build
              for <span className="text-[#2D5BFF]">Australia</span>
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-lg font-medium leading-7 text-[#4b5563] sm:text-xl">
              DHA component targets, AU-accent audio
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="#start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-6 py-3 text-base font-bold text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 sm:px-8 sm:py-4 sm:text-lg"
              >
                Start free
                <span className="relative size-5 shrink-0 overflow-clip">
                  <Image
                    src="/pte/icon-arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full"
                  />
                </span>
              </Link>
              <Link
                href="#goals"
                className="inline-flex items-center justify-center rounded-xl border border-[#2D5BFF] bg-white px-6 py-3.5 text-center text-base font-bold text-[#2D5BFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 sm:px-8"
              >
                Your Goals start here
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] animate-[fade-in-up_0.85s_ease-out_both] lg:max-w-none">
            <div className="relative mx-auto aspect-[690/550] w-full overflow-hidden rounded-[3rem] sm:rounded-[4rem] lg:rounded-[6.25rem]">
              <Image
                src="/pte/hero-student.png"
                alt="Student preparing for PTE Academic with Linguatude"
                fill
                priority
                className="object-cover object-[35%_center]"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>

            <aside
              className="absolute left-0 top-0 z-[2] w-[min(100%,14.5rem)] rounded-2xl bg-white px-4 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:left-[-0.5rem] sm:top-[-1.25rem] animate-[fade-in-up_0.9s_ease-out_both]"
              aria-label="Target PTE score"
            >
              <p className="text-sm font-semibold text-[#1f2937]">Target Score</p>
              <p className="mt-1 flex items-baseline gap-1 text-[#2D5BFF]">
                <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  76
                </span>
                <span className="text-4xl font-semibold">+</span>
              </p>
              <div className="mt-2">
                <span className="inline-block rounded-full bg-[#d4ddff] px-3 py-1 text-xs font-semibold text-[#2D5BFF]">
                  Proficient English
                </span>
              </div>
            </aside>

            <aside
              className="absolute bottom-4 right-0 z-[2] w-[min(100%,11.8rem)] rounded-2xl bg-white px-2 py-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:bottom-6 sm:right-[-0.5rem] sm:py-6 animate-[fade-in-up_0.95s_ease-out_both]"
              aria-label="PTE goals"
            >
              <ul className="flex flex-col gap-4">
                {GOALS.map((goal) => (
                  <li
                    key={goal}
                    className="flex items-center gap-3 text-sm font-semibold text-[#1f2937]"
                  >
                    <span className="inline-flex size-5 shrink-0 items-center justify-center overflow-clip rounded-full bg-[#2D5BFF]">
                      <Image
                        src="/pte/icon-check.svg"
                        alt=""
                        width={12}
                        height={12}
                        className="size-3"
                      />
                    </span>
                    {goal}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-4xl rounded-2xl bg-[#2D5BFF] p-4 text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:mt-12 sm:p-6 animate-[fade-in-up_0.85s_ease-out_both]">
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
      </div>
    </section>
  );
}
