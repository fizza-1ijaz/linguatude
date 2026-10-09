import Image from "next/image";
import Link from "next/link";

export function AuthBrandPanel() {
  return (
    <aside className="auth-brand relative hidden h-full min-h-0 overflow-hidden bg-[linear-gradient(180deg,#2B5CE6_0%,#1A3DA8_100%)] md:flex md:flex-col md:justify-between md:px-8 md:py-6 lg:px-10 lg:py-8 xl:px-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Complex%20Geometry%20Composition.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-2.5 text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span className="relative size-8 shrink-0 overflow-hidden rounded-lg sm:size-9">
          <Image
            src="/linguatude.webp"
            alt=""
            width={36}
            height={36}
            className="size-full object-cover"
            priority
          />
        </span>
        <span className="text-lg font-bold tracking-tight lg:text-xl">
          Linguatude
        </span>
      </Link>

      <div className="relative z-10 max-w-sm pb-1 lg:pb-2">
        <p className="auth-brand-copy text-balance text-2xl font-extrabold leading-[1.2] tracking-tight text-white lg:text-3xl xl:text-[2.35rem] xl:leading-[1.15]">
          Your AI coach for English tests
        </p>
        <p className="auth-brand-sub mt-3 text-pretty text-sm font-medium leading-6 text-white/80 lg:mt-4 lg:text-[0.95rem] lg:leading-6">
          Master your exams with personalized, intelligent practice sessions
          designed just for you.
        </p>
      </div>
    </aside>
  );
}
