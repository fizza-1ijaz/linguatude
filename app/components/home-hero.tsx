import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  "Speaking AI Scoring",
  "Writing Feedback",
  "DHA Target Tracking",
  "All Task Types",
] as const;

const AVATARS = [
  "/home/avatar-1.png",
  "/home/avatar-2.png",
  "/home/avatar-3.png",
] as const;

const TRUST_ITEMS = [
  {
    lines: ["Trusted by", "real test takers"] as const,
    icon: "/home/trust-shield.svg",
  },
  {
    lines: ["AI scores in", "seconds"] as const,
    icon: "/home/trust-bolt.svg",
  },
  {
    lines: ["Practice with", "confidence"] as const,
    icon: "/home/trust-shield-check.svg",
  },
] as const;

function StartFreeButton({ className }: { className?: string }) {
  return (
    <Link
      href="#start"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-6 py-3 text-base font-bold text-white shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3),0_4px_6px_-4px_rgba(79,70,229,0.3)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-lg ${className ?? ""}`}
    >
      Start free
      <span className="relative size-5 shrink-0 overflow-clip">
        <Image src="/home/icon-arrow.svg" alt="" width={20} height={20} className="size-full" />
      </span>
    </Link>
  );
}

export function HomeHero() {
  return (
    <section
      className="home-hero relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div className="relative z-10 flex min-w-0 flex-col items-start animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-3xl bg-[#bed4fa] px-5 py-3 text-sm font-bold uppercase tracking-[0.7px] text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:text-base">
              <span>PTE ACADEMIC</span>
              <span className="size-1 rounded-full bg-[#2D5BFF]" aria-hidden />
              <span>FIRST-CLASS</span>
            </p>

            <h1
              id="hero-heading"
              className="mt-8 max-w-[14ch] text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1e1b4b] sm:text-5xl lg:text-[4rem] lg:leading-[1.15]"
            >
              Pass <span className="text-[#2D5BFF]">PTE</span> or{" "}
              <span className="text-[#2D5BFF]">IELTS</span> on your first try.
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-lg font-medium leading-7 text-[#4b5563] sm:text-xl">
              AI scoring on every answer. Built for Australia.
            </p>

            <div className="mt-8 flex w-full flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <StartFreeButton />

              <div className="flex items-center gap-3 animate-[fade-in-up_0.75s_ease-out_both]">
                <div className="flex" aria-hidden>
                  {AVATARS.map((src, i) => (
                    <span
                      key={src}
                      className="relative size-10 overflow-hidden rounded-full border-2 border-white"
                      style={{ marginLeft: i === 0 ? 0 : -12, zIndex: 3 - i }}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={40}
                        height={40}
                        className="size-full object-cover"
                      />
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium leading-snug text-[#4b5563]">
                  Join 100,000+
                  <br />
                  test takers
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] animate-[fade-in-up_0.85s_ease-out_both] lg:max-w-none">
            <div className="hero-visual relative mx-auto aspect-[690/550] w-full overflow-hidden rounded-[3rem] sm:rounded-[4rem] lg:rounded-[6.25rem]">
              <Image
                src="/home/hero-student.png"
                alt="Student preparing for PTE and IELTS with Linguatude on a laptop"
                fill
                priority
                className="object-cover object-[35%_center]"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>

            <aside
              className="absolute left-0 top-0 z-[2] flex w-[min(100%,14.5rem)] items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.25),0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:left-[-0.5rem] sm:top-[-1.25rem] sm:w-[14.3rem] sm:gap-4 sm:px-4 animate-[fade-in-up_0.9s_ease-out_both]"
              aria-label="Sample overall score"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#1f2937]">Overall Score</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-[#2D5BFF] sm:text-5xl">
                    64
                  </span>
                  <span className="text-xl font-semibold text-[#9ca3af]">/90</span>
                </p>
                <div className="mt-1 flex items-center gap-3 pt-1">
                  <span className="text-sm font-semibold text-[#2D5BFF]">Good</span>
                  <span className="rounded-full bg-[#d4ddff] px-3 py-1 text-xs font-semibold text-[#2D5BFF]">
                    62–68
                  </span>
                </div>
              </div>
              <span className="relative size-14 shrink-0 overflow-clip sm:size-16">
                <Image
                  src="/home/score-arc.svg"
                  alt=""
                  width={64}
                  height={64}
                  className="size-full"
                />
              </span>
            </aside>

            <aside
              className="absolute bottom-4 right-0 z-[2] w-[min(100%,11.8rem)] rounded-2xl bg-white px-2 py-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_10px_20px_-10px_rgba(0,0,0,0.02)] sm:bottom-6 sm:right-[-0.5rem] sm:px-2 sm:py-6 animate-[fade-in-up_0.95s_ease-out_both]"
              aria-label="Platform features"
            >
              <ul className="flex flex-col gap-4">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm font-semibold text-[#1f2937]"
                  >
                    <span className="inline-flex size-5 shrink-0 items-center justify-center overflow-clip rounded-full bg-[#2D5BFF]">
                      <Image
                        src="/home/icon-check.svg"
                        alt=""
                        width={12}
                        height={12}
                        className="size-3"
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div
          className="relative z-10 mx-auto mt-10 w-full max-w-4xl rounded-2xl bg-[#2D5BFF] p-4 text-white shadow-[0_4px_8px_rgba(0,0,0,0.25),0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:mt-12 sm:p-6 animate-[fade-in-up_0.85s_ease-out_both]"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
            {TRUST_ITEMS.map((item, index) => (
              <li
                key={item.lines.join(" ")}
                className={`flex items-center gap-3 sm:justify-center sm:gap-4 sm:px-4 ${
                  index > 0 ? "sm:border-l sm:border-[#e5e7eb]/80" : ""
                }`}
              >
                <span className="relative size-10 shrink-0 overflow-clip sm:size-12">
                  {index === 0 ? (
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
