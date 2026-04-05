import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Linguatude",
  description:
    "Interim Cookie Policy for the Linguatude Coming Soon website — cookies, Google Analytics, and your choices.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-0 w-full min-w-0 flex-1 bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto max-w-3xl break-words [overflow-wrap:anywhere]">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Cookie Policy
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
              Last updated:
            </span>{" "}
            27th March, 2026
          </p>
        </div>

        <div className="mt-10 space-y-10 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          <section aria-labelledby="cp-1">
            <h2
              id="cp-1"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              1. What Are Cookies?
            </h2>
            <p className="mt-4">
              Cookies are small text files placed on your device when you visit a
              website. They help websites function correctly, remember
              preferences, and provide information to website owners about how
              their site is used. They are not programmes and cannot install
              software on your device.
            </p>
          </section>

          <section aria-labelledby="cp-2">
            <h2
              id="cp-2"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              2. Cookies We Currently Use
            </h2>

            <h3
              id="cp-2-1"
              className="mt-6 text-lg font-semibold text-[var(--foreground)]"
            >
              2.1 Strictly Necessary Cookies
            </h3>
            <p className="mt-3">
              These cookies are essential for the website to function. They
              manage your session and remember your cookie consent choice. They do
              not require your consent and cannot be switched off.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-7 marker:text-[var(--accent)]">
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Cookie consent preference
                </span>{" "}
                — remembers your cookie settings |{" "}
                <span className="font-medium text-[var(--foreground)]">
                  Duration:
                </span>{" "}
                12 months
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  Session management
                </span>{" "}
                — maintains your active browser session |{" "}
                <span className="font-medium text-[var(--foreground)]">
                  Duration:
                </span>{" "}
                Session
              </li>
            </ul>

            <h3
              id="cp-2-2"
              className="mt-8 text-lg font-semibold text-[var(--foreground)]"
            >
              2.2 Analytics Cookies — Google Analytics (With Consent Only)
            </h3>
            <p className="mt-3">
              We use Google Analytics to understand how visitors use this
              website. These cookies are placed only with your consent and
              collect aggregated, anonymised data. They do not identify you
              personally.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-7 marker:text-[var(--accent)]">
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  _ga
                </span>{" "}
                — distinguishes unique visitors |{" "}
                <span className="font-medium text-[var(--foreground)]">
                  Duration:
                </span>{" "}
                2 years
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  _ga_[ID]
                </span>{" "}
                — maintains session state |{" "}
                <span className="font-medium text-[var(--foreground)]">
                  Duration:
                </span>{" "}
                2 years
              </li>
              <li>
                <span className="font-medium text-[var(--foreground)]">
                  _gid
                </span>{" "}
                — distinguishes visitors within 24 hours |{" "}
                <span className="font-medium text-[var(--foreground)]">
                  Duration:
                </span>{" "}
                24 hours
              </li>
            </ul>
            <p className="mt-4">
              You can opt out of Google Analytics at any time using the Google
              Analytics Opt-Out Browser Add-on at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="cp-3">
            <h2
              id="cp-3"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              3. Cookies We Do Not Currently Use
            </h2>
            <p className="mt-4">
              This website does not currently use advertising cookies, social
              media tracking cookies, or remarketing cookies. If this changes,
              this policy will be updated and your consent requested before any
              new cookies are placed.
            </p>
          </section>

          <section aria-labelledby="cp-4">
            <h2
              id="cp-4"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              4. Your Cookie Choices
            </h2>
            <p className="mt-4">
              When you first visit linguatude.com, a cookie consent banner will
              appear. You may accept all cookies, accept strictly necessary
              cookies only, or adjust your preferences. You may change your
              preferences at any time through the Cookie Settings link in the
              footer.
            </p>
            <p className="mt-4">
              You may also manage cookies through your browser settings:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-7 marker:text-[var(--accent)]">
              <li>
                Google Chrome:{" "}
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  support.google.com/chrome/answer/95647
                </a>
              </li>
              <li>
                Mozilla Firefox:{" "}
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  support.mozilla.org/en-US/kb/cookies
                </a>
              </li>
              <li>
                Apple Safari:{" "}
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  support.apple.com/guide/safari/manage-cookies
                </a>
              </li>
              <li>
                Microsoft Edge:{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                >
                  support.microsoft.com/en-us/microsoft-edge/cookies
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="cp-5">
            <h2
              id="cp-5"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              5. Changes to This Policy
            </h2>
            <p className="mt-4">
              This Cookie Policy will be updated before the Linguatude platform
              goes live. The Last Updated date at the top of this page will
              reflect any changes.
            </p>
          </section>

          <section aria-labelledby="cp-6">
            <h2
              id="cp-6"
              className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
            >
              6. Contact
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
