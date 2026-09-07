import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using Linguatude, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Description of Services",
    body: "Linguatude provides AI-powered practice and feedback for PTE and IELTS preparation. Our services include practice tests, scoring estimates, study plans and related features.",
  },
  {
    title: "3. User Responsibilities",
    body: "You agree to use Linguatude for lawful purposes only and not to misuse or interfere with the integrity or security of our services.",
  },
  {
    title: "4. Scores and Results",
    body: "Linguatude provides AI-generated scores and feedback for practice purposes only. These are estimates and not official results from Pearson, IELTS or any governing body.",
  },
  {
    title: "5. Intellectual Property",
    body: "All content, trademarks and materials on Linguatude are owned by us or our licensors and are protected by intellectual property laws.",
  },
] as const;

export function TermsPageContent() {
  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="terms-heading"
      >
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-[8rem]">
          <div className="max-w-xl animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3px] text-[#2D5BFF]">
              <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
              Get in touch
            </p>

            <h1
              id="terms-heading"
              className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-[#1e1b4b] sm:text-5xl"
            >
              Terms of Service
            </h1>

            <p className="mt-4 text-lg font-bold leading-6 text-[#6b7280] sm:text-xl">
              Last updated 23 Jul 2026
            </p>

            <div className="mt-6">
              <Link
                href="/#start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2D5BFF] px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(76,36,251,0.2)] transition hover:bg-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/60"
              >
                Start free
                <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
                  <path
                    d="M3 8h9M9 4.5 12.5 8 9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-[#eaf0fd] p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#2D5BFF] text-white">
              <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
                <path
                  d="M12 8v5M12 16.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                The short version
              </h2>
              <p className="mt-2 border-l-4 border-[#2D5BFF] pl-4 text-base font-medium leading-7 text-[#1e1b4b] sm:text-lg">
                Scores are AI estimates — never official Pearson or IELTS results.
              </p>
            </div>
          </div>

          <p className="mt-10 text-pretty text-lg leading-8 text-[#4b5563] sm:text-xl">
            Welcome to Linguatude. By using our website, services and products,
            you agree to the following terms and conditions.
          </p>

          <div className="mt-8 space-y-0 divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
            {SECTIONS.map((section) => (
              <section key={section.title} className="py-8">
                <h2 className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-[#f4f6f9] p-6 shadow-sm sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e8e8fc] text-[#2D5BFF]">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
                <path
                  d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M14 3v5h5M9 13h6M9 17h6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                The full legal terms
              </h2>
              <p className="mt-2 text-pretty text-base leading-6 text-[#4b5563] sm:text-lg">
                The complete Terms of Service continue below. This page provides
                a summary only and does not replace the full legal terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
