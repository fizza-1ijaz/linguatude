import Image from "next/image";
import Link from "next/link";

const MODULES = [
  {
    label: "Speaking",
    icon: "/pte/module-speaking.svg",
    className: "border-[#dbeafe] bg-[rgba(239,246,255,0.3)]",
    iconBg: "bg-[#dbeafe]",
  },
  {
    label: "Writing",
    icon: "/pte/module-writing.svg",
    className: "border-[#dcfce7] bg-[rgba(240,253,244,0.3)]",
    iconBg: "bg-[#dcfce7]",
  },
  {
    label: "Reading",
    icon: "/pte/module-reading.svg",
    className: "border-[#dbeafe] bg-[rgba(239,246,255,0.3)]",
    iconBg: "bg-[#dbeafe]",
  },
  {
    label: "Listening",
    icon: "/pte/module-listening.svg",
    className: "border-[#e0e7ff] bg-[rgba(238,242,255,0.3)]",
    iconBg: "bg-[#e0e7ff]",
  },
  {
    label: "Full mocks",
    icon: "/pte/module-mocks.svg",
    className: "border-[#dbeafe] bg-[rgba(239,246,255,0.3)]",
    iconBg: "bg-[#dbeafe]",
  },
  {
    label: "Personalised plan",
    icon: "/pte/module-plan.svg",
    className: "border-[#ccfbf1] bg-[rgba(240,253,250,0.3)]",
    iconBg: "bg-[#ccfbf1]",
  },
] as const;

export function PteModules() {
  return (
    <section className="bg-white py-12 sm:py-16" aria-labelledby="modules-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4 rounded-xl border border-[#e2e8f0] bg-[#bed4fa] px-4 py-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:items-center sm:px-5 sm:py-4">
          <span className="flex size-10 shrink-0 items-center justify-center overflow-clip rounded-full bg-white">
            <Image
              src="/pte/fee-info.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </span>
          <div>
            <p className="text-base font-semibold leading-5 text-[#111827] sm:text-xl">
              Test fee ~A$490 — verify at Pearson checkout.
            </p>
            <p className="mt-1 text-sm leading-4 text-[#434656]">
              Fees may change. Please confirm the latest price at Pearson before
              booking your test.
            </p>
          </div>
        </div>

        <h2
          id="modules-heading"
          className="mt-12 text-center text-balance text-2xl font-bold tracking-tight text-[#1e293b] sm:mt-14"
        >
          Everything you need for PTE success
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {MODULES.map((mod) => (
            <li key={mod.label}>
              <Link
                href="#start"
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40 ${mod.className}`}
              >
                <span
                  className={`flex size-8 items-center justify-center overflow-clip rounded-full ${mod.iconBg}`}
                >
                  <Image
                    src={mod.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </span>
                <span className="text-sm font-semibold text-[#334155]">
                  {mod.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
