import Image from "next/image";
import Link from "next/link";

type Props = {
  headline?: string;
  subheadline?: string;
};

export function BlogHero({
  headline = "The Linguatude blog",
  subheadline = "Strategy, score maths and honest prep advice.",
}: Props) {
  const blogMatch = headline.match(/^(.*?)(\bblog\b)(.*)$/i);

  return (
    <section
      className="home-hero relative isolate overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[70%] opacity-20 lg:block"
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/blog/hero-collage.png"
            alt=""
            fill
            priority
            className="object-contain object-right-top"
            sizes="70vw"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="max-w-lg animate-[fade-in-up_0.75s_ease-out_both]">
          <span className="flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="relative size-[1.4rem] overflow-clip">
              <Image
                src="/blog/icon-pencil.svg"
                alt=""
                width={23}
                height={23}
                className="size-full"
              />
            </span>
          </span>

          <h1
            id="blog-heading"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#191c1f] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
          >
            {blogMatch ? (
              <>
                {blogMatch[1].trimEnd()}
                {blogMatch[1].trim() ? <br /> : null}
                <span className="text-[#2D5BFF]">{blogMatch[2]}</span>
                {blogMatch[3]}
              </>
            ) : (
              headline
            )}
          </h1>

          <p className="mt-5 max-w-md text-pretty text-lg font-medium leading-7 text-[#464557]">
            {subheadline}
          </p>

          <div className="mt-6">
            <Link
              href="/#start"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
            >
              Start free
              <span className="relative size-4 shrink-0 overflow-clip">
                <Image
                  src="/blog/icon-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-full"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
