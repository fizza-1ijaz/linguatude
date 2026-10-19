import Image from "next/image";
import Link from "next/link";

const TRUST_ITEMS = [
  {
    lines: ["Migration", "focused"] as const,
    icon: "/ielts-general/trust-migration.svg",
    fullIcon: true,
  },
  {
    lines: ["Real world", "skills"] as const,
    icon: "/ielts-general/trust-skills.svg",
    fullIcon: false,
  },
  {
    lines: ["Band ready", "practice"] as const,
    icon: "/ielts-general/trust-band.svg",
    fullIcon: false,
  },
] as const;

export function IeltsGeneralHero() {
  return (
    <section
      className="home-hero relative isolate flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden lg:min-h-[calc(100svh-4.75rem)]"
      aria-labelledby="ielts-general-hero-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 xl:gap-8">
          <div className="relative z-10 flex min-w-0 flex-col items-start animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex flex-wrap items-center gap-2 rounded-3xl bg-[#bed4fa] px-4 py-2 text-xs font-bold uppercase tracking-[0.7px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-sm">
              <span>Migration</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>Work Visas</span>
            </p>

            <h1
              id="ielts-general-hero-heading"
              className="mt-4 max-w-[14ch] text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-[#1e1b4b] sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-[3.25rem]"
            >
              <span className="text-[#2D5BFF]">IELTS</span> general training for
              life in <span className="text-[#2D5BFF]">Australia</span>
            </h1>

            <p className="mt-3 max-w-lg text-pretty text-base font-medium leading-6 text-[#4b5563] sm:mt-4 sm:text-lg sm:leading-7">
              Letters, everyday reading and band-focused practice for life and
              work
            </p>

            <div className="mt-5 flex w-full flex-col items-stretch gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="#difference"
                className="inline-flex items-center justify-center rounded-xl border border-[#2D5BFF] bg-white px-5 py-2.5 text-center text-sm font-bold text-[#2D5BFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 sm:px-6 sm:py-3 sm:text-base"
              >
                Your Goals start here
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] animate-[fade-in-up_0.85s_ease-out_both] sm:max-w-[32rem] lg:mx-0 lg:ml-auto lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3.5rem]">
              <Image
                src="/ielts-general/hero-sydney.png"
                alt="Sydney Harbour with Opera House and Harbour Bridge"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>

            <aside
              className="absolute bottom-0 left-1/2 z-[2] flex w-[min(100%,22rem)] -translate-x-1/2 translate-y-1/2 items-start justify-center gap-3 rounded-xl border border-white/50 bg-white/90 p-3.5 text-center shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] sm:gap-3.5 sm:p-4 animate-[fade-in-up_0.95s_ease-out_both]"
              aria-label="Everyday situations focus"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e3dffc]">
                <Image
                  src="/ielts-general/float-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="size-5"
                />
              </span>
              <div className="min-w-0 flex-1 text-center">
                <p className="text-xs font-semibold leading-snug text-[#1a1e38] sm:text-[0.8125rem]">
                  Built for everyday situations you&apos;ll actually use in
                  Australia.
                </p>
                <span
                  className="mx-auto mt-1.5 block h-1 w-7 rounded-full bg-[#4328eb]"
                  aria-hidden
                />
              </div>
            </aside>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 w-full max-w-4xl shrink-0 rounded-2xl bg-[#2D5BFF] p-3 text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:mt-14 sm:p-4 animate-[fade-in-up_0.85s_ease-out_both]">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0">
            {TRUST_ITEMS.map((item, index) => (
              <li
                key={item.lines.join(" ")}
                className={`flex items-center gap-2.5 sm:justify-center sm:gap-3 sm:px-3 ${
                  index > 0 ? "sm:border-l sm:border-[#e5e7eb]/80" : ""
                }`}
              >
                <span className="relative size-9 shrink-0 overflow-clip sm:size-10">
                  {item.fullIcon ? (
                    <Image src={item.icon} alt="" width={40} height={40} className="size-full" />
                  ) : (
                    <span className="flex size-full items-center justify-center rounded-full bg-white">
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5"
                      />
                    </span>
                  )}
                </span>
                <span className="text-xs font-semibold leading-5 sm:text-sm sm:leading-5">
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
