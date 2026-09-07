import Image from "next/image";
import Link from "next/link";

export function AuthBrandPanel() {
  return (
    <aside className="auth-brand relative hidden min-h-dvh overflow-hidden md:flex md:flex-col md:justify-between md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-14">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#1e1b4b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_10%,rgba(45,91,255,0.55)_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_85%_75%,rgba(142,178,246,0.35)_0%,transparent_50%),linear-gradient(160deg,#2430a0_0%,#1e1b4b_45%,#15205c_100%)]" />
        <div className="absolute -right-16 top-16 size-[22rem] rounded-full bg-[#2D5BFF]/25 blur-3xl" />
        <div className="absolute bottom-24 left-10 size-72 rounded-full bg-[#8eb2f6]/20 blur-3xl" />
        <div className="absolute left-[12%] top-[28%] h-24 w-[70%] rotate-[-8deg] rounded-full border border-white/10 bg-white/5" />
        <div className="absolute bottom-[18%] right-[-5%] size-80 rounded-full border border-white/10 bg-white/5" />
        <div className="absolute left-[28%] top-[48%] size-40 rounded-full border border-white/15 bg-[#2D5BFF]/20" />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-2.5 text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span className="relative h-6 w-[1.833rem] shrink-0 overflow-hidden">
          <Image
            src="/home/logo-mark.svg"
            alt=""
            width={30}
            height={24}
            className="size-full brightness-0 invert"
            priority
          />
        </span>
        <span className="text-xl font-bold tracking-tight">Linguatude</span>
      </Link>

      <div className="relative z-10 max-w-md pb-4 lg:pb-8">
        <p className="text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-white lg:text-4xl xl:text-5xl">
          Your AI coach for English tests
        </p>
        <p className="mt-4 text-pretty text-sm font-medium leading-6 text-white/80 lg:mt-5 lg:text-base lg:leading-7 xl:text-lg">
          Master your exams with personalized, intelligent practice sessions
          designed just for you.
        </p>
      </div>
    </aside>
  );
}
