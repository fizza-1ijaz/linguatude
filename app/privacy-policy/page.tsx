import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Linguatude",
  description:
    "Interim Privacy Policy for the Linguatude Coming Soon website. Governing law: Bahrain PDPL No. 30 of 2018.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-0 w-full min-w-0 flex-1 bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto max-w-3xl break-words [overflow-wrap:anywhere]">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-6 space-y-2 border-b border-[var(--border)] pb-8 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            <span className="font-medium text-[var(--foreground)]">
              Status:
            </span>{" "}
            Interim — pre-launch version for Coming Soon website only
          </p>
          <p>
            <span className="font-medium text-[var(--foreground)]">
              Governing law:
            </span>{" "}
            Bahrain Personal Data Protection Law (PDPL) No. 30 of 2018
          </p>
          <p>
            <span className="font-medium text-[var(--foreground)]">
              Last updated:
            </span>{" "}
            27th March, 2026
          </p>
        </div>

        <div className="mt-10 space-y-10 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          <section aria-labelledby="pp-1">
            <h2
              id="pp-1"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              1. Who We Are
            </h2>
            <p className="mt-4">
              Linguatude is an AI-powered English test preparation platform
              developed by Skyen Solutions, a trade name of Qismat Ventures
              W.L.L. (CR 190698-1), registered in Bahrain.
            </p>
            <p className="mt-4">
              In this Privacy Policy, &apos;Linguatude&apos;, &apos;we&apos;,
              &apos;us&apos;, and &apos;our&apos; refer to the team operating the
              website at linguatude.com. If you have questions about how we handle
              your data, please contact us at{" "}
              <a
                href="mailto:support@linguatude.com"
                className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
              >
                support@linguatude.com
              </a>{" "}
              or at our registered address: Office 501, Building 1025, Road 3621,
              Block 436, Al Seef, Bahrain.
            </p>
          </section>

          <section aria-labelledby="pp-2">
            <h2
              id="pp-2"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              2. What This Policy Covers
            </h2>
            <p className="mt-4">
              This interim Privacy Policy applies to the Linguatude website at
              linguatude.com during its pre-launch phase. It covers two types of
              data collection currently active: website analytics via Google
              Analytics, and email addresses submitted through our launch
              notification form.
            </p>
            <p className="mt-4">
              Linguatude is not yet a live platform. When it launches, this policy
              will be updated in full before user accounts, learning data, audio
              processing, and additional features become active. Given the nature
              of the platform — which will process spoken audio and written
              responses — a comprehensive update will be essential before
              launch.
            </p>
          </section>

          <section aria-labelledby="pp-3">
            <h2
              id="pp-3"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              3. What Data We Collect
            </h2>

            <h3
              id="pp-3-1"
              className="mt-6 text-lg font-semibold text-[var(--foreground)]"
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
              className="mt-8 text-lg font-semibold text-[var(--foreground)]"
            >
              3.2 Email Address — Launch Notification
            </h3>
            <p className="mt-3">
              If you submit your email address through our Notify Me form, we
              collect and store that address solely to send you a notification
              when Linguatude launches. We will not use your email for any other
              purpose without your explicit consent. You may withdraw consent and
              have your email removed at any time by contacting us at{" "}
              <a
                href="mailto:support@linguatude.com"
                className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
              >
                support@linguatude.com
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="pp-4">
            <h2
              id="pp-4"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              4. Legal Basis for Processing
            </h2>
            <p className="mt-4">
              Analytics data is processed on the basis of your consent, given
              through the cookie consent banner. Email addresses are processed on
              the basis of your consent, given at the point of submission. Both
              forms of consent may be withdrawn at any time.
            </p>
          </section>

          <section aria-labelledby="pp-5">
            <h2
              id="pp-5"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              5. How We Share Your Data
            </h2>
            <p className="mt-4">
              We do not sell your data. We do not share your email address with
              third parties for marketing purposes. Analytics data is processed by
              Google in accordance with Google&apos;s own privacy policies. Email
              addresses may be stored via a third-party email service provider
              bound by a data processing agreement.
            </p>
          </section>

          <section aria-labelledby="pp-6">
            <h2
              id="pp-6"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              6. How Long We Keep Your Data
            </h2>
            <p className="mt-4">
              Email addresses collected through the notification form will be
              retained until Linguatude launches and launch notifications are
              sent, or until you request removal — whichever comes first. We will
              seek separate consent before sending any further communications
              after launch notification.
            </p>
          </section>

          <section aria-labelledby="pp-7">
            <h2
              id="pp-7"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              7. Your Rights
            </h2>
            <p className="mt-4">
              Depending on your location, you may have rights to access, correct,
              delete, or restrict processing of your personal data, and to
              withdraw consent at any time. To exercise any right, please contact
              us at{" "}
              <a
                href="mailto:support@linguatude.com"
                className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
              >
                support@linguatude.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section aria-labelledby="pp-8">
            <h2
              id="pp-8"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              8. A Note on Future Data Collection
            </h2>
            <p className="mt-4">
              When the Linguatude platform launches, it will process a broader
              range of personal data including account information, learning
              progress, written responses, and spoken audio for speaking
              evaluation. A comprehensive Privacy Policy covering all of these
              uses will be published and presented to users before they create an
              account or use any platform features.
            </p>
          </section>

          <section aria-labelledby="pp-9">
            <h2
              id="pp-9"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              9. Changes to This Policy
            </h2>
            <p className="mt-4">
              This policy will be updated before the Linguatude platform goes live.
              Material changes will be communicated to users who have submitted
              their email through the notification form.
            </p>
          </section>

          <section aria-labelledby="pp-10">
            <h2
              id="pp-10"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              10. Contact
            </h2>
            <ul className="mt-4 list-none space-y-2">
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Email:
                </span>{" "}
                <a
                  href="mailto:support@linguatude.com"
                  className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  support@linguatude.com
                </a>
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Website:
                </span>{" "}
                <a
                  href="https://linguatude.com"
                  className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  linguatude.com
                </a>
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Postal address:
                </span>{" "}
                Office 501, Building 1025, Road 3621, Block 436, Al Seef, Bahrain
              </li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
