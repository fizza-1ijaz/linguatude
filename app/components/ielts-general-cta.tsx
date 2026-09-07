import Image from "next/image";
import Link from "next/link";

export function IeltsGeneralCta() {
  return (
    <section
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      aria-labelledby="ielts-general-cta-heading"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#220a83] via-[#1d4cf5] to-[#2d5bff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-16">
            <div className="flex items-start gap-4">
              <span className="relative mt-1 size-10 shrink-0 overflow-clip">
                <Image
                  src="/ielts-general/icon-pin.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-full"
                />
              </span>
              <h2
                id="ielts-general-cta-heading"
                className="text-balance text-3xl font-bold leading-10 text-white sm:text-4xl"
              >
                Build for Australian
                <br />
                migration and work visas
              </h2>
            </div>

            <p className="mt-6 max-w-md text-pretty text-lg leading-7 text-[#d1d5db]">
              Practice what matters. Get band ready. Move forward with
              confidence
            </p>

            <div className="mt-8">
              <Link
                href="#start"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#1a1a24] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Start Free
                <span className="relative size-5 shrink-0 overflow-clip">
                  <Image
                    src="/ielts-general/icon-arrow.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-full [filter:brightness(0)]"
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-full">
            <Image
              src="/ielts-general/cta-sydney.png"
              alt="Sydney Opera House at dusk"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div
              className="absolute inset-0 bg-[rgba(45,59,108,0.55)]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
