import Image from "next/image";

export function IeltsCtaBanner() {
  return (
    <section
      className="bg-white px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8"
      aria-labelledby="ielts-cta-heading"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-xl bg-[#2D5BFF] px-6 py-10 text-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] sm:px-8 sm:py-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[30%] opacity-15 mix-blend-overlay"
          aria-hidden
        >
          <Image
            src="/ielts/cta-texture.png"
            alt=""
            fill
            className="object-cover object-left"
          />
        </div>

        <h2
          id="ielts-cta-heading"
          className="relative text-balance text-2xl font-bold tracking-tight text-white sm:text-[1.75rem] sm:leading-[1.25]"
        >
          Your best band starts here
        </h2>
        <p className="relative mt-2 text-base text-white">
          Join thousands preparing with smarter AI
        </p>
      </div>
    </section>
  );
}
