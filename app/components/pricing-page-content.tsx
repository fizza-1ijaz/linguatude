import Image from "next/image";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: readonly string[];
  cta: string;
  popular?: boolean;
  icon: string;
  iconClass: string;
};

const PLANS: readonly Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    description: "Get started at no cost.",
    features: [
      "Practice with sample questions",
      "Limited mock test access",
      "Basic performance insights",
      "Email support",
    ],
    cta: "Start free",
    icon: "/pricing/icon-free.svg",
    iconClass: "size-6",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "14.99",
    description: "Billed monthly. Cancel anytime.",
    features: [
      "Full access to all features",
      "Unlimited mock tests",
      "AI-powered feedback",
      "Priority email support",
      "Progress & mastery tracking",
    ],
    cta: "Choose Monthly",
    popular: true,
    icon: "/pricing/icon-monthly.svg",
    iconClass: "size-6",
  },
  {
    id: "annual",
    name: "Annual",
    price: "89.99",
    description: "Billed yearly. Best value.",
    features: [
      "Everything in Monthly",
      "Save more with annual plan",
      "Exclusive yearly benefits",
      "Priority email support",
      "Progress & mastery tracking",
    ],
    cta: "Choose Annual",
    icon: "/pricing/icon-annual.svg",
    iconClass: "size-6",
  },
] as const;

function StartFreeButton({ className }: { className?: string }) {
  return (
    <Link
      href="/#start"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-4 text-lg font-bold text-white transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 ${className ?? ""}`}
    >
      Start free
      <span className="relative size-4 shrink-0 overflow-clip">
        <Image
          src="/pricing/icon-arrow.svg"
          alt=""
          width={16}
          height={16}
          className="size-full"
        />
      </span>
    </Link>
  );
}

export function PricingPageContent() {
  return (
    <>
      <section
        className="mkt-hero relative isolate overflow-hidden"
        aria-labelledby="pricing-hero-heading"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-[5.75rem]">
          <span className="flex size-[4.875rem] items-center justify-center rounded-full border border-[#2D5BFF] bg-white shadow-sm">
            <span className="relative size-[3.25rem] overflow-clip">
              <Image
                src="/pricing/icon-dollar.svg"
                alt=""
                width={52}
                height={52}
                className="size-full"
              />
            </span>
          </span>

          <h1
            id="pricing-hero-heading"
            className="mt-8 max-w-xl text-balance text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#191c1f] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
          >
            Simple pricing,{" "}
            <span className="text-[#2D5BFF]">both exams</span> included.
          </h1>

          <p className="mt-6 text-lg font-medium leading-7 text-[#464557]">
            Start free. Upgrade when ready.
          </p>

          <div className="mt-10">
            <StartFreeButton />
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        aria-labelledby="plans-heading"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 size-[3.75rem] opacity-40"
          aria-hidden
        >
          <Image
            src="/pricing/plans-deco.svg"
            alt=""
            width={60}
            height={60}
            className="size-full"
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <h2
            id="plans-heading"
            className="text-center text-3xl font-extrabold tracking-tight text-[#191c1f] sm:text-4xl"
          >
            Plans
          </h2>

          <ul className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-5 lg:items-end">
            {PLANS.map((plan) => (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25),0_10px_40px_-10px_rgba(0,0,0,0.05)] ${
                  plan.popular
                    ? "border-2 border-[#2D5BFF] lg:-mb-0 lg:min-h-[39rem]"
                    : "border border-[#c7c4db] lg:min-h-[37.7rem]"
                }`}
              >
                {plan.popular ? (
                  <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D5BFF] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}

                <div className="flex flex-1 flex-col">
                  <span className="flex size-12 items-center justify-center rounded-full bg-[#d6dfff]">
                    <span className={`relative overflow-clip ${plan.iconClass}`}>
                      <Image
                        src={plan.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-full"
                      />
                    </span>
                  </span>

                  <h3 className="mt-4 text-2xl font-bold leading-8 text-[#191c1f]">
                    {plan.name}
                  </h3>

                  <p className="mt-4 flex items-end gap-1.5">
                    <span className="pb-2 text-sm font-semibold text-[#464557]">
                      A$
                    </span>
                    <span className="text-5xl font-extrabold leading-none tracking-tight text-[#191c1f] sm:text-[3.5rem]">
                      {plan.price}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-5 text-[#464557]">
                    {plan.description}
                  </p>

                  <ul className="mt-8 flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="relative mt-0.5 size-5 shrink-0 overflow-clip">
                          <Image
                            src="/pricing/icon-check.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-full"
                          />
                        </span>
                        <span className="text-sm leading-5 text-[#464557]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/#start"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-base font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60 ${
                    plan.id === "free"
                      ? "border border-[#2D5BFF] bg-white text-[#2D5BFF] hover:bg-[#f8faff]"
                      : "bg-[#2D5BFF] text-white hover:bg-[#244FE6]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pb-16"
        aria-labelledby="pricing-cta-heading"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 rounded-2xl border border-[#e3dfff] bg-[#f4f6f9] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] sm:p-10 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#d6dfff] shadow-sm">
              <span className="relative size-[1.875rem] overflow-clip">
                <Image
                  src="/pricing/icon-shield.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="size-full"
                />
              </span>
            </span>
            <div>
              <h2
                id="pricing-cta-heading"
                className="text-xl font-bold leading-8 text-[#191c1f] sm:text-2xl"
              >
                All plans include both PTE and IELTS preparation.
              </h2>
              <p className="mt-2 text-base leading-6 text-[#464557] sm:text-lg sm:leading-6">
                One subscription. Everything you need.
              </p>
            </div>
          </div>
          <StartFreeButton className="w-full shrink-0 sm:w-auto" />
        </div>
      </section>
    </>
  );
}
