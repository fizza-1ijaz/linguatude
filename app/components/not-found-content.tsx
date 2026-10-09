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

export function NotFoundContent() {
  return (
    <section
      className="mkt-hero relative isolate flex min-h-[calc(100svh-3.75rem)] flex-col overflow-hidden lg:min-h-[calc(100svh-4.75rem)]"
      aria-labelledby="not-found-heading"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 pb-8 pt-2 text-center sm:px-6 sm:pb-10 sm:pt-3 lg:px-8 lg:pb-12 lg:pt-4">
        <div className="relative aspect-[951/535] w-full max-w-[48rem] animate-[fade-in-up_0.75s_ease-out_both] sm:max-w-[54rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/404.svg"
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mt-2 max-w-xl animate-[fade-in-up_0.85s_ease-out_both] sm:mt-3">
          <h1
            id="not-found-heading"
            className="text-balance text-3xl font-extrabold tracking-[-0.025em] text-[#1e1b4b] sm:text-4xl lg:text-5xl lg:leading-[1.15]"
          >
            This page took the wrong exam.
          </h1>
          <p className="mt-3 text-base font-medium text-[#6b7280] sm:text-lg">
            The link may be old or mistyped.
          </p>
        </div>

        <div className="mt-5 animate-[fade-in-up_0.95s_ease-out_both]">
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

        <div className="mt-7 w-full max-w-5xl animate-[fade-in-up_1s_ease-out_both] sm:mt-8">
          <div className="rounded-2xl bg-[#eaf0fd] px-3 py-6 shadow-[0_4px_8px_rgba(0,0,0,0.08)] sm:px-4 sm:py-7 lg:px-2">
            <h2
              id="explore-heading"
              className="text-center text-lg font-bold text-[#1e1b4b] sm:text-xl"
            >
              You can also explore
            </h2>

            <nav
              className="mt-6 flex flex-wrap items-stretch justify-center sm:mt-7 lg:flex-nowrap"
              aria-label="Explore Linguatude"
            >
              {EXPLORE_LINKS.map((item, index) => (
                <div key={item.href} className="flex items-stretch">
                  {index > 0 ? (
                    <span
                      className="mx-1 hidden w-px self-stretch bg-[#c7cdd8]/80 sm:mx-2 sm:block lg:mx-3"
                      aria-hidden
                    />
                  ) : null}
                  <Link
                    href={item.href}
                    className="group flex min-w-[7.25rem] flex-col items-center gap-3 px-2 py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/50 sm:min-w-[8rem]"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <span className="relative size-7 overflow-clip">
                        <Image
                          src={item.icon}
                          alt=""
                          width={28}
                          height={28}
                          className="size-full object-contain"
                        />
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#374151] transition group-hover:text-[#2D5BFF]">
                      <Image
                        src="/404/arrow-sky.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5 shrink-0"
                      />
                      {item.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
