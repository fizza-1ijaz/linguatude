import Image from "next/image";

const FEATURES = [
  {
    title: "Full IELTS mocks",
    description: "Real exam practice with AI scoring.",
    icon: "/ielts/feat-mocks.svg",
    iconClass: "h-[23px] w-[19px]",
  },
  {
    title: "Writing evaluator",
    description: "Band descriptors mapped to your answer.",
    icon: "/ielts/feat-writing.svg",
    iconClass: "size-[19px]",
  },
  {
    title: "Vocabulary builder",
    description: "Academic words in context.",
    icon: "/ielts/feat-vocab.svg",
    iconClass: "h-[19px] w-[26px]",
  },
  {
    title: "Study smarter",
    description: "Personalized plan that adapts to you.",
    icon: "/ielts/feat-plan.svg",
    iconClass: "size-6",
  },
] as const;

export function IeltsFeatures() {
  return (
    <section className="bg-white py-12 sm:py-16" aria-labelledby="ielts-features-heading">
      <h2 id="ielts-features-heading" className="sr-only">
        IELTS Academic features
      </h2>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#bed4fa] px-4 py-8 shadow-[0_8px_15px_rgba(0,0,0,0.04)] sm:px-6 sm:py-10">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.title}
                className={`flex gap-4 px-2 sm:px-4 ${
                  index < FEATURES.length - 1
                    ? "lg:border-r lg:border-[#7a7a7c]"
                    : ""
                }`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded-lg bg-white">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={26}
                    height={24}
                    className={feature.iconClass}
                  />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#191c1f] sm:text-xl sm:leading-6">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-[#464557]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
