import {
  LegalArticle,
  LegalLink,
  LegalPolicyHero,
  LegalPolicyShell,
  LegalSection,
  LegalTable,
} from "@/app/components/legal-policy-layout";

export function PrivacyPageContent() {
  return (
    <>
      <LegalPolicyHero
        id="privacy-heading"
        title="Privacy Policy"
        status="Interim policy for the Coming Soon website"
        version="17 November 2026"
      />

      <LegalArticle>
        <p className="text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
          How Linguatude handles personal information on its pre-launch website.
        </p>

        <LegalSection id="pp-1" title="1. Who operates Linguatude">
          <p>
            Linguatude is an English test-preparation product. For this policy,
            the responsible operator is Skyen Systems Pty Ltd (Australia), ACN
            701 564 730, ABN 19 701 564 730 (&quot;Linguatude&quot;,
            &quot;we&quot;, &quot;us&quot;). Privacy enquiries:{" "}
            <LegalLink href="mailto:support@linguatude.com">
              support@linguatude.com
            </LegalLink>
            . Website:{" "}
            <LegalLink href="https://linguatude.com">linguatude.com</LegalLink>.
          </p>
          <p>
            This policy replaces the earlier pre-launch wording identifying
            Skyen Solutions / Qismat Ventures W.L.L. as the operator. The legal
            entity and its applicable privacy obligations should be verified
            against official registrations and actual operating arrangements
            before publication.
          </p>
        </LegalSection>

        <LegalSection id="pp-2" title="2. Scope: what is live today">
          <p>
            This is an interim policy for the Coming Soon website, not a claim
            that the learning platform is live. The currently described
            activities are website analytics using Google Analytics and
            collection of email addresses through a &quot;Notify Me&quot; launch
            form. Account registration, AI scoring, spoken-audio processing,
            payment subscriptions and in-app privacy controls are future
            functions and are not covered as active processing by this interim
            policy.
          </p>
        </LegalSection>

        <LegalSection id="pp-3" title="3. Information we collect">
          <LegalTable
            headers={["Category", "Information and purpose", "When collected"]}
            rows={[
              [
                "Launch notifications",
                "Email address supplied voluntarily; used to notify you when Linguatude launches.",
                "When you submit Notify Me",
              ],
              [
                "Website analytics",
                "Browser/device characteristics, pages and events, approximate location and network identifiers that analytics technology may process; used to understand traffic and website performance.",
                "When analytics is enabled with the required consent",
              ],
              [
                "Support enquiries",
                "Email address and any information you choose to include in a message; used to respond to your request.",
                "When you contact us",
              ],
            ]}
          />
          <p>
            Analytics information should not be described as inherently
            anonymous: online identifiers and combinations of technical data may
            be personal information. Please do not send passwords, payment-card
            details or sensitive personal information through the Notify Me
            form.
          </p>
        </LegalSection>

        <LegalSection id="pp-4" title="4. Purposes and legal grounds">
          <p>
            We use Notify Me email addresses for the requested launch
            notification, support messages to answer enquiries, and analytics to
            understand website performance. Where consent is required for
            non-essential cookies or analytics, those technologies should not
            run until valid consent has been obtained. Consent may be withdrawn.
            Other legal grounds, where available, depend on the law applicable
            to the person and processing activity; this policy does not assume
            one legal basis applies worldwide.
          </p>
        </LegalSection>

        <LegalSection id="pp-5" title="5. Cookies and Google Analytics">
          <p>
            Google Analytics may use cookies and related technologies. Visitors
            should be offered an effective choice to accept or reject
            non-essential analytics, and a way to revisit that choice. The
            website must implement the choice technically; merely displaying a
            banner is insufficient. For details of individual cookies and their
            lifetimes, consult the live cookie configuration and any separate{" "}
            <LegalLink href="/cookie-policy">cookie notice</LegalLink>.
          </p>
        </LegalSection>

        <LegalSection id="pp-6" title="6. Disclosure and service providers">
          <p>
            We do not sell personal information. Google may process analytics
            information on our behalf under its applicable service terms. A
            website host and an email delivery or storage provider may process
            information to operate the site and deliver launch notifications.
            The specific vendors, processing locations and contractual
            protections must match the services actually deployed; this policy
            does not assert that every vendor has been independently verified.
          </p>
        </LegalSection>

        <LegalSection id="pp-7" title="7. International handling and security">
          <p>
            Because our operator is in Australia and technology providers may
            operate in other countries, information may be processed or accessed
            internationally. We will apply protections required by applicable
            law, including relevant provider arrangements and safeguards where
            required. We use reasonable technical and organisational security
            measures appropriate to the information and risks; no online service
            can guarantee absolute security.
          </p>
        </LegalSection>

        <LegalSection id="pp-8" title="8. Retention">
          <p>
            Notify Me email addresses are kept until the launch notification has
            been sent or until removal is requested, whichever occurs first,
            unless a longer period is required by law or necessary to resolve a
            specific issue. Support correspondence is retained only as
            reasonably needed for support, security or legal obligations.
            Analytics retention depends on the actual Google Analytics settings
            and must be confirmed before publishing a specific duration.
          </p>
          <p>
            The proposed &quot;up to 90 days&quot; retention period for speaking
            audio concerns a future product feature. No speaking-audio
            collection is described as active on this Coming Soon website. That
            proposed period must be validated and explained in the full launch
            policy before audio processing begins.
          </p>
        </LegalSection>

        <LegalSection id="pp-9" title="9. Your privacy choices and rights">
          <p>
            You may request access to or correction or deletion of personal
            information, object to or restrict certain uses where the applicable
            law provides such rights, and withdraw consent. Rights and
            exceptions vary by jurisdiction. Contact{" "}
            <LegalLink href="mailto:support@linguatude.com">
              support@linguatude.com
            </LegalLink>
            . We may need reasonable verification before acting on a request. We
            will respond within the period required by applicable law; the
            earlier pre-launch statement of a universal 30-day response period
            is not adopted as an unverified legal promise.
          </p>
          <p>
            For deletion-specific requests, see our{" "}
            <LegalLink href="/data-account-deletion-policy">
              Data &amp; Account Deletion Policy
            </LegalLink>
            .
          </p>
        </LegalSection>

        <LegalSection id="pp-10" title="10. Children">
          <p>
            The Coming Soon form is not designed to knowingly collect personal
            information from children without any consent or safeguards required
            by applicable law. If you believe a child submitted information
            inappropriately, contact us to request review and removal. Age
            eligibility and parental-consent mechanisms for the future learning
            product must be established before launch.
          </p>
        </LegalSection>

        <LegalSection
          id="pp-11"
          title="11. Future learning platform: separate launch update required"
        >
          <p>
            Before the learning platform launches, this policy must be replaced
            or expanded to explain account details, prior and target exam
            scores, diagnostic and learning history, written responses, speaking
            audio, AI scoring providers, feedback and profiling/adaptive
            learning, subscriptions and payment providers, app/device data,
            retention schedules, deletion exceptions, international transfers
            and any legally required automated-decision disclosures. Future
            in-app access/export/delete controls must not be presented as
            available until implemented and tested.
          </p>
        </LegalSection>

        <LegalSection id="pp-12" title="12. Changes and contact">
          <p>
            We will publish updates on linguatude.com and provide any additional
            notice or consent required for material changes. The full launch
            policy will be made available before collecting live learner data.
            Privacy and data-rights requests:{" "}
            <LegalLink href="mailto:support@linguatude.com">
              support@linguatude.com
            </LegalLink>
            . Billing matters:{" "}
            <LegalLink href="mailto:billing@linguatude.com">
              billing@linguatude.com
            </LegalLink>
            .
          </p>
        </LegalSection>
      </LegalArticle>
    </>
  );
}

export function PrivacyPolicyPageShell() {
  return (
    <LegalPolicyShell>
      <PrivacyPageContent />
    </LegalPolicyShell>
  );
}
