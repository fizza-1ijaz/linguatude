import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";

const linkClass =
  "font-medium text-[#2D5BFF] underline decoration-[#2D5BFF]/40 underline-offset-2 transition hover:decoration-[#2D5BFF]";

export function PrivacyPageContent() {
  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="privacy-heading"
      >
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-[8rem]">
          <div className="max-w-2xl animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3px] text-[#2D5BFF]">
              <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
              Get in touch
            </p>

            <h1
              id="privacy-heading"
              className="mt-4 text-balance text-4xl font-bold tracking-[-0.025em] text-[#1e1b4b] sm:text-5xl"
            >
              Privacy Policy
            </h1>

            <p className="mt-4 text-lg font-bold leading-6 text-[#6b7280] sm:text-xl">
              Last updated 27th March, 2026
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
        <article className="mx-auto max-w-5xl break-words [overflow-wrap:anywhere]">
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
                Interim — pre-launch version for Coming Soon website only.
                Governing law: Bahrain PDPL No. 30 of 2018.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-0 divide-y divide-[#e5e7eb] border-y border-[#e5e7eb] text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
            <section className="py-8" aria-labelledby="pp-1">
              <h2 id="pp-1" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                1. Who We Are
              </h2>
              <p className="mt-4">
                Linguatude is an AI-powered English test preparation platform
                developed by Skyen Solutions, a trade name of Qismat Ventures
                W.L.L. (CR 190698-1), registered in Bahrain.
              </p>
              <p className="mt-4">
                In this Privacy Policy, &apos;Linguatude&apos;, &apos;we&apos;,
                &apos;us&apos;, and &apos;our&apos; refer to the team operating
                the website at linguatude.com. If you have questions about how we
                handle your data, please contact us at{" "}
                <a href="mailto:support@linguatude.com" className={linkClass}>
                  support@linguatude.com
                </a>{" "}
                or at our registered address: Office 501, Building 1025, Road
                3621, Block 436, Al Seef, Bahrain.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-2">
              <h2 id="pp-2" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                2. What This Policy Covers
              </h2>
              <p className="mt-4">
                This interim Privacy Policy applies to the Linguatude website at
                linguatude.com during its pre-launch phase. It covers two types
                of data collection currently active: website analytics via Google
                Analytics, and email addresses submitted through our launch
                notification form.
              </p>
              <p className="mt-4">
                Linguatude is not yet a live platform. When it launches, this
                policy will be updated in full before user accounts, learning
                data, audio processing, and additional features become active.
                Given the nature of the platform — which will process spoken
                audio and written responses — a comprehensive update will be
                essential before launch.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-3">
              <h2 id="pp-3" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                3. What Data We Collect
              </h2>

              <h3
                id="pp-3-1"
                className="mt-6 text-lg font-semibold text-[#1e1b4b] sm:text-xl"
              >
                3.1 Analytics Data
              </h3>
              <p className="mt-3">
                We use Google Analytics to understand how visitors find and use
                this website. Google Analytics automatically collects technical
                information including your IP address, browser type, device type,
                pages visited, time spent on page, and approximate geographic
                location. This data is aggregated and does not identify you
                personally. Analytics cookies are placed only with your consent.
              </p>

              <h3
                id="pp-3-2"
                className="mt-8 text-lg font-semibold text-[#1e1b4b] sm:text-xl"
              >
                3.2 Email Address — Launch Notification
              </h3>
              <p className="mt-3">
                If you submit your email address through our Notify Me form, we
                collect and store that address solely to send you a notification
                when Linguatude launches. We will not use your email for any
                other purpose without your explicit consent. You may withdraw
                consent and have your email removed at any time by contacting us
                at{" "}
                <a href="mailto:support@linguatude.com" className={linkClass}>
                  support@linguatude.com
                </a>
                .
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-4">
              <h2 id="pp-4" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                4. Legal Basis for Processing
              </h2>
              <p className="mt-4">
                Analytics data is processed on the basis of your consent, given
                through the cookie consent banner. Email addresses are processed
                on the basis of your consent, given at the point of submission.
                Both forms of consent may be withdrawn at any time.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-5">
              <h2 id="pp-5" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                5. How We Share Your Data
              </h2>
              <p className="mt-4">
                We do not sell your data. We do not share your email address with
                third parties for marketing purposes. Analytics data is processed
                by Google in accordance with Google&apos;s own privacy policies.
                Email addresses may be stored via a third-party email service
                provider bound by a data processing agreement.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-6">
              <h2 id="pp-6" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                6. How Long We Keep Your Data
              </h2>
              <p className="mt-4">
                Email addresses collected through the notification form will be
                retained until Linguatude launches and launch notifications are
                sent, or until you request removal — whichever comes first. We
                will seek separate consent before sending any further
                communications after launch notification.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-7">
              <h2 id="pp-7" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                7. Your Rights
              </h2>
              <p className="mt-4">
                Depending on your location, you may have rights to access,
                correct, delete, or restrict processing of your personal data,
                and to withdraw consent at any time. To exercise any right,
                please contact us at{" "}
                <a href="mailto:support@linguatude.com" className={linkClass}>
                  support@linguatude.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-8">
              <h2 id="pp-8" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                8. A Note on Future Data Collection
              </h2>
              <p className="mt-4">
                When the Linguatude platform launches, it will process a broader
                range of personal data including account information, learning
                progress, written responses, and spoken audio for speaking
                evaluation. A comprehensive Privacy Policy covering all of these
                uses will be published and presented to users before they create
                an account or use any platform features.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-9">
              <h2 id="pp-9" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                9. Changes to This Policy
              </h2>
              <p className="mt-4">
                This policy will be updated before the Linguatude platform goes
                live. Material changes will be communicated to users who have
                submitted their email through the notification form.
              </p>
            </section>

            <section className="py-8" aria-labelledby="pp-10">
              <h2 id="pp-10" className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                10. Contact
              </h2>
              <ul className="mt-4 list-none space-y-2">
                <li>
                  <span className="font-semibold text-[#1e1b4b]">Email:</span>{" "}
                  <a href="mailto:support@linguatude.com" className={linkClass}>
                    support@linguatude.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-[#1e1b4b]">Website:</span>{" "}
                  <a href="https://linguatude.com" className={linkClass}>
                    linguatude.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-[#1e1b4b]">
                    Postal address:
                  </span>{" "}
                  Office 501, Building 1025, Road 3621, Block 436, Al Seef,
                  Bahrain
                </li>
              </ul>
            </section>
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
                A note on future updates
              </h2>
              <p className="mt-2 text-pretty text-base leading-6 text-[#4b5563] sm:text-lg">
                When the Linguatude platform launches, a comprehensive Privacy
                Policy covering accounts, learning data, and audio will be
                published before users create an account or use platform
                features.
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export function PrivacyPolicyPageShell() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <PrivacyPageContent />
      </main>
    </div>
  );
}
