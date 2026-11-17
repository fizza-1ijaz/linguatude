import {
  LegalArticle,
  LegalLink,
  LegalPolicyHero,
  LegalPolicyShell,
  LegalSection,
  LegalTable,
} from "@/app/components/legal-policy-layout";

export function DataAccountDeletionPageContent() {
  return (
    <>
      <LegalPolicyHero
        id="deletion-heading"
        title="Data & Account Deletion Policy"
        status="Interim policy for the Coming Soon website"
        version="17 November 2026"
      />

      <LegalArticle>
        <p className="text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
          How to request removal of launch-notification data, and what will
          apply when learner accounts launch.
        </p>

        <LegalSection id="del-1" title="1. Scope and operator">
          <p>
            This policy explains data-deletion requests for Linguatude. The
            responsible operator is Skyen Systems Pty Ltd (Australia), ACN 701
            564 730, ABN 19 701 564 730. Contact{" "}
            <LegalLink href="mailto:support@linguatude.com">
              support@linguatude.com
            </LegalLink>
            . It is separate from the{" "}
            <LegalLink href="/privacy-policy">Privacy Policy</LegalLink> and
            should be linked independently from the website footer and any
            future account/privacy settings.
          </p>
          <p>
            Current scope: the Coming Soon website. Linguatude learner accounts,
            speaking recordings, AI scoring and subscriptions are not yet active
            under the interim website described to us. Sections marked
            &quot;After platform launch&quot; are implementation requirements,
            not representations that those controls already exist.
          </p>
        </LegalSection>

        <LegalSection
          id="del-2"
          title="2. Delete a Coming Soon notification email"
        >
          <p>
            If you entered your email address in the Notify Me form and want it
            removed, email{" "}
            <LegalLink href="mailto:support@linguatude.com?subject=Delete%20my%20launch-notification%20email">
              support@linguatude.com
            </LegalLink>{" "}
            from that address, with the subject &quot;Delete my
            launch-notification email&quot;. If you no longer control the
            address, explain that in your request; we may ask for proportionate
            verification. You do not need a Linguatude account to make this
            request.
          </p>
          <p>
            After verifying the request, we will remove the email address from
            the active launch-notification list and instruct any relevant
            email-service provider to remove it as appropriate, subject to
            legally required or technically unavoidable temporary retention. We
            will confirm the outcome by email where feasible. We will not use
            the removed address for subsequent launch marketing unless you
            subscribe again.
          </p>
        </LegalSection>

        <LegalSection id="del-3" title="3. What deletion means today">
          <LegalTable
            headers={["Data", "Request method", "Expected handling"]}
            rows={[
              [
                "Notify Me email",
                "Email support@linguatude.com",
                "Remove from active notification list, subject to applicable exceptions",
              ],
              [
                "Support correspondence",
                "Email support@linguatude.com",
                "Assess deletion against operational and legal retention needs",
              ],
              [
                "Google Analytics information",
                "Withdraw analytics consent using site controls; contact support for rights requests",
                "Stop future non-essential analytics after withdrawal; evaluate any identifiable records and applicable provider controls",
              ],
            ]}
          />
          <p>
            Deletion of an email address does not necessarily erase historic
            aggregate statistics that cannot reasonably identify an individual.
            Consent withdrawal does not automatically reverse processing already
            lawfully completed. We will not claim to delete data from Google
            Analytics on a per-person basis unless the necessary identifiers and
            provider tools support that action.
          </p>
        </LegalSection>

        <LegalSection id="del-4" title="4. How requests are assessed">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Receive the request at support@linguatude.com and identify the
              data and action requested.
            </li>
            <li>
              Verify the requester only to the extent reasonably necessary;
              avoid collecting excessive identity documents.
            </li>
            <li>
              Locate relevant records and any processors holding them; determine
              whether a legal exception or retention obligation applies.
            </li>
            <li>
              Delete or de-identify eligible records, and instruct processors
              where applicable.
            </li>
            <li>
              Confirm completion, partial completion or a lawful reason for
              refusal, and explain any available review or complaint route.
            </li>
          </ol>
        </LegalSection>

        <LegalSection
          id="del-5"
          title="5. When information may need to be retained"
        >
          <p>
            Some information may need to be retained for legal obligations,
            fraud prevention, security, dispute handling, financial records or
            the establishment, exercise or defence of legal claims. We will
            restrict use of retained information and remove it when the relevant
            basis no longer applies. Backup copies may remain temporarily under
            documented backup rotation and access controls; deletion from active
            systems should not be described as instantaneous erasure of every
            backup.
          </p>
        </LegalSection>

        <LegalSection id="del-6" title="6. Timing and confirmation">
          <p>
            We will acknowledge and handle requests without undue delay and
            within the deadlines required by the laws that apply to the request.
            We will explain if more information or an extension is lawfully
            needed. No universal 30-day deletion guarantee is stated because
            legal requirements and technical circumstances differ.
          </p>
        </LegalSection>

        <LegalSection
          id="del-7"
          title="7. After platform launch: account deletion"
        >
          <p>
            Before learner accounts become available, Linguatude must provide a
            discoverable account-deletion process in the app and a working
            web-based request route where required by the applicable app-store
            rules. The final flow should let users request deletion of the
            account and associated personal data, not merely deactivate the
            account or uninstall the app. The actual screen names and URLs must
            be inserted only after implementation and QA.
          </p>
          <p>
            Account deletion must be distinguished from cancelling a
            subscription. Users should be told how to cancel active Stripe,
            Apple or Google subscriptions before deletion and whether any
            ongoing subscription or payment obligation survives account deletion
            under the applicable provider rules. Do not promise that deleting an
            account automatically cancels a store-managed subscription unless
            the integration has been verified.
          </p>
        </LegalSection>

        <LegalSection
          id="del-8"
          title="8. After platform launch: categories to review for deletion"
        >
          <LegalTable
            headers={["Category", "Expected deletion review"]}
            rows={[
              [
                "Profile and login",
                "Identity, email, authentication tokens, account preferences",
              ],
              [
                "Learning records",
                "Diagnostic results, target scores, study plans, progress and history",
              ],
              [
                "Practice content",
                "Written submissions, speaking audio, transcriptions and generated feedback",
              ],
              [
                "AI/service processors",
                "Deletion or retention rules for AI providers, storage, logs and subprocessors",
              ],
              [
                "Billing records",
                "Payment identifiers, receipts, invoices and records required for financial or legal compliance",
              ],
              [
                "Security and backups",
                "Audit logs, abuse records and backup expiry according to documented retention schedules",
              ],
            ]}
          />
          <p>
            The previously proposed speaking-audio retention limit is &quot;up
            to 90 days&quot;; it must be validated against actual storage,
            backup and AI-provider arrangements before being published as an
            enforceable promise. Any exceptions must be disclosed in the launch
            policy.
          </p>
        </LegalSection>

        <LegalSection
          id="del-9"
          title="9. After platform launch: export, partial deletion and re-registration"
        >
          <p>
            If data export or selective deletion is offered, the product must
            accurately describe which records can be exported or removed and in
            what format. A deletion request should explain its consequences,
            including loss of access to saved progress and feedback.
            Re-registering should not silently restore data that was promised
            deleted. These behaviours require engineering specifications and
            tests before public claims are made.
          </p>
        </LegalSection>

        <LegalSection
          id="del-10"
          title="10. Your rights, complaints and contact"
        >
          <p>
            Deletion and access rights depend on applicable privacy law and may
            be limited by lawful exceptions. If you disagree with our response,
            contact{" "}
            <LegalLink href="mailto:support@linguatude.com">
              support@linguatude.com
            </LegalLink>{" "}
            for review; you may also have the right to complain to an applicable
            privacy regulator. See the separate{" "}
            <LegalLink href="/privacy-policy">
              Linguatude Privacy Policy
            </LegalLink>{" "}
            for broader information on collection, uses, sharing and rights.
            Billing questions:{" "}
            <LegalLink href="mailto:billing@linguatude.com">
              billing@linguatude.com
            </LegalLink>
            .
          </p>
        </LegalSection>

        <LegalSection id="del-11" title="11. Policy updates">
          <p>
            We will update this policy before the learning platform goes live
            and whenever the deletion processes materially change. The published
            policy must match the live functionality and applicable app-store
            and privacy-law requirements.
          </p>
        </LegalSection>
      </LegalArticle>
    </>
  );
}

export function DataAccountDeletionPolicyPageShell() {
  return (
    <LegalPolicyShell>
      <DataAccountDeletionPageContent />
    </LegalPolicyShell>
  );
}
