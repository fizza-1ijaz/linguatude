const SECTIONS = [
  {
    title: "1. About this Policy",
    body: "This Policy explains payments, Premium subscriptions, free trials, renewals, cancellations and refunds for Linguatude, operated by Skyen Systems Pty Ltd (ACN 701 564 730; ABN 19 701 564 730), Australia. It applies to Linguatude services purchased through our website or mobile applications, subject to the applicable purchase channel and consumer law.\n\nBy starting a subscription, you authorise the applicable payment provider to collect the charges disclosed before you confirm your purchase. Nothing in this Policy excludes rights or remedies that cannot lawfully be excluded.",
  },
  {
    title: "2. Free and Premium Plans",
    body: "Linguatude offers Free access and optional Premium subscriptions. IELTS Premium and PTE Academic Premium are separate subscriptions. Purchasing one does not include Premium access to the other. You may hold both subscriptions at the same time and may receive separate charges.\n\nPremium is offered on Monthly and Yearly billing options. The features and usage allowances applicable to each plan are shown in the service. Premium usage is subject to limits; it is not unlimited. For each exam, a paid Premium entitlement currently includes 100 combined AI-scored Speaking and Writing submissions and three full mock examinations per entitlement month. Yearly subscriptions receive monthly allowance refreshes rather than the full year’s allowance at once. Unused allowances do not roll over.",
  },
  {
    title: "3. Prices, Currency and Taxes",
    body: "Current subscription prices, billing frequency, currency, applicable taxes and total payable are displayed before purchase. Prices may differ by country, purchase channel and applicable taxes. Your bank or payment provider may apply currency conversion or international transaction charges, which are outside Linguatude’s control.\n\nIf we increase the price of an existing subscription, we will notify affected subscribers in advance and explain the new price, effective date and cancellation options. An increase will apply to a future renewal, not retrospectively to an already-paid period. We will seek consent where required by law or the applicable payment platform.",
  },
  {
    title: "4. Seven-Day Premium Trial",
    body: "Eligible learners may activate a seven-day Premium trial for each exam workspace. The trial does not begin merely because you create an account or complete onboarding. You must explicitly activate it and select a Monthly or Yearly subscription, with a valid payment method where required.\n\nBefore activation, we will disclose the selected plan, price, billing frequency, first charge date and cancellation method. We will send an advance reminder before the trial ends, subject to applicable platform processes. Unless you cancel before the trial expires, the selected subscription automatically becomes paid and the disclosed charge is collected.\n\nEach eligible exam/account trial is available once. The trial includes up to 25 combined AI-scored Speaking and Writing submissions and one full mock examination for that exam. Unused trial allowances expire when the trial ends; paid allowances start with the paid entitlement.\n\nIf you cancel before the trial ends, you will not be charged for the first paid subscription period. Trial access continues until its original expiry and then reverts to Free. Re-enabling conversion during the original trial does not restart or extend the trial.",
  },
  {
    title: "5. Billing and Automatic Renewal",
    body: "Website subscriptions are processed using Stripe. In-app subscriptions purchased on iOS are billed through Apple; those purchased on Android are billed through Google Play. The applicable provider handles payment authorisation and collection.\n\nPaid Monthly and Yearly subscriptions renew automatically at the end of each billing period unless cancelled in time. The renewal charge is the applicable subscription price disclosed to you, subject to properly notified price changes, taxes and applicable law. Your subscription remains separate for each exam.",
  },
  {
    title: "6. Changing Your Billing Plan",
    body: "For supported website subscriptions, changing from Monthly to Yearly may involve provider-calculated credits or prorated charges. We will show the applicable amount and effective date before you confirm the change. A change from Yearly to Monthly takes effect at the end of the already-paid Yearly term.\n\nChanging billing frequency does not grant a new free trial, duplicate Premium access or automatically reset usage allowances. App-store plan changes follow the applicable store’s supported procedures.",
  },
  {
    title: "7. Cancelling a Subscription",
    body: "You may cancel a website subscription through Account → Billing & Subscriptions. If you purchased through Apple, manage your subscription through your Apple account subscriptions. If you purchased through Google Play, manage it through Google Play subscriptions. Deleting the app or your account does not necessarily cancel a store-managed subscription.\n\nCancelling a paid subscription stops future automatic renewals but ordinarily does not end Premium access immediately. You retain Premium until the end of the current paid period, after which the relevant exam returns to Free. Cancellation does not itself provide a refund for the current period. Your learning history, diagnostic results and previously generated feedback remain associated with your account, subject to our other applicable policies.",
  },
  {
    title: "8. Refunds",
    body: "Payments for initial paid subscription periods and successful renewals are generally non-refundable, including when you change your mind, do not use the service or forget to cancel before renewal. Linguatude does not offer an automatic seven-day or fourteen-day goodwill refund window after payment.\n\nThis general rule does not limit refunds, cancellations, repairs, repeat performance or other remedies available under Australian Consumer Law or other mandatory consumer-protection laws applicable to your purchase. Where the service fails to meet a legally applicable guarantee, we will provide the remedy required by law. A customer’s use of Premium features does not, by itself, extinguish statutory rights.",
  },
  {
    title: "9. Incorrect, Duplicate or Disputed Charges",
    body: "If you believe you have been charged incorrectly, charged more than once for the same subscription period or charged after a cancellation that should have prevented renewal, contact billing@linguatude.com. We will investigate the transaction and correct verified billing errors, including refunds where appropriate. We do not impose an arbitrary reporting deadline that limits statutory rights.\n\nIf you believe a payment was unauthorised, contact us and your payment provider promptly. Please do not send full payment card numbers, security codes or passwords by email.",
  },
  {
    title: "10. Approved Refund Processing",
    body: "For website purchases, approved refunds will ordinarily be returned through Stripe to the original payment method wherever possible. The time until the funds appear depends on the payment provider, payment method and financial institution, subject to applicable legal requirements.\n\nFor purchases billed by Apple or Google Play, refund requests and processing generally follow the applicable store’s procedures. Contact the relevant store for store-managed refunds; you may also contact Linguatude for assistance or to raise concerns about your statutory rights.",
  },
  {
    title: "11. Failed Payments",
    body: "If a renewal payment fails, the subscription may enter a Past Due state. The applicable provider may retry collection and allow a configured recovery period. Premium access may continue during that configured period. If recovery ultimately fails, the affected exam subscription returns to Free.\n\nRetry schedules and recovery periods vary by payment provider and configuration; no fixed grace period is promised by this Policy. You may need to update your payment method through the provider managing your subscription. A downgrade does not automatically delete your account or existing learning history.",
  },
  {
    title: "12. Consumer Rights",
    body: "Our services come with rights and remedies under laws that may apply to your purchase, including Australian Consumer Law where applicable. Nothing in this Policy excludes, restricts or modifies any consumer guarantee, statutory remedy or other mandatory right that cannot lawfully be excluded. Customers in other countries may have additional mandatory protections depending on the laws applicable to their transactions.",
  },
  {
    title: "13. Contact and Complaints",
    body: "For payment enquiries, subscription billing disputes and refund requests, contact billing@linguatude.com. Please include the email associated with your Linguatude account, the relevant exam subscription, the date and amount of the charge, and a brief explanation. Do not include sensitive card credentials.",
  },
  {
    title: "14. Changes to this Policy",
    body: "We may update this Policy to reflect changes in our services, payment processes or legal requirements. The current version will be available on our website with its effective or last-updated date. We will notify affected customers in advance of material changes where appropriate or required by law. Changes do not retrospectively remove rights that have already accrued.",
  },
] as const;

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="mt-4 space-y-4">
      {text.split("\n\n").map((para) => (
        <p
          key={para.slice(0, 48)}
          className="text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

export function RefundPolicyPageContent() {
  return (
    <>
      <section
        className="mkt-hero relative isolate overflow-x-clip"
        aria-labelledby="refund-heading"
      >
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="relative z-10 max-w-3xl animate-[fade-in-up_0.75s_ease-out_both]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3px] text-[#2D5BFF]">
              <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
              Linguatude
            </p>

            <h1
              id="refund-heading"
              className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-[#1e1b4b] sm:text-4xl lg:text-5xl"
            >
              Payment, Subscription, Cancellation and Refund Policy
            </h1>

            <p className="mt-4 text-lg font-bold leading-6 text-[#6b7280] sm:text-xl">
              Effective date: 29 October 2026
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-[#eaf0fd] p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-8">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e3dfff] text-[#2D5BFF]">
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
                Billing &amp; refunds at a glance
              </h2>
              <p className="mt-2 border-l-4 border-[#2D5BFF] pl-4 text-base font-medium leading-7 text-[#1e1b4b] sm:text-lg">
                IELTS and PTE Premium are separate. Free has 0 full mocks.
                Trial is 7 days with 25 AI + 1 mock. Paid Premium is 100 AI + 3
                mocks per month. Payments are generally non-refundable except
                where consumer law requires otherwise.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-0 divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
            {SECTIONS.map((section) => (
              <section key={section.title} className="py-8">
                <h2 className="text-xl font-bold text-[#1e1b4b] sm:text-2xl">
                  {section.title}
                </h2>
                <Paragraphs text={section.body} />
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm leading-6 text-[#6b7280]">
            Questions? Email{" "}
            <a
              href="mailto:billing@linguatude.com"
              className="font-semibold text-[#2D5BFF] hover:underline"
            >
              billing@linguatude.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
