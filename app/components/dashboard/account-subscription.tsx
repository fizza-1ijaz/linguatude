"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/app/components/dashboard/dashboard-shell";
import {
  AccountHeaderRight,
  BackToAccount,
} from "@/app/components/dashboard/account-shared";

type SubState =
  | "manage"
  | "free"
  | "trial"
  | "active"
  | "cancelled"
  | "payment";

const STATES: { id: SubState; label: string }[] = [
  { id: "manage", label: "Manage" },
  { id: "free", label: "Free" },
  { id: "trial", label: "Trial" },
  { id: "active", label: "Active" },
  { id: "cancelled", label: "Cancelled" },
  { id: "payment", label: "Payment issue" },
];

export function AccountSubscription() {
  const [state, setState] = useState<SubState>("manage");

  const body = useMemo(() => {
    switch (state) {
      case "free":
        return <FreeView />;
      case "trial":
        return <TrialView />;
      case "active":
        return <ActiveView />;
      case "cancelled":
        return <CancelledView />;
      case "payment":
        return <PaymentIssueView />;
      default:
        return <ManageView />;
    }
  }, [state]);

  return (
    <DashboardShell
      title="Subscription"
      contentBgClassName="bg-white"
      mainClassName="flex flex-1 flex-col px-[1cm] py-5"
      headerLeft={<BackToAccount />}
      headerRight={<AccountHeaderRight />}
    >
      <div className="flex w-full flex-col gap-5 pb-10">
        <div className="flex flex-wrap gap-2">
          {STATES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState(s.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                state === s.id
                  ? "bg-[#2b5ce6] text-white"
                  : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {body}
      </div>
    </DashboardShell>
  );
}

function ManageView() {
  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <div className="p-5">
          <p className="text-xs font-medium text-[#94A3B8]">Current plan</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
              <CrownIcon />
            </span>
            <div>
              <p className="text-base font-bold text-[#141B2B]">
                IELTS Premium — Annual
              </p>
              <p className="text-sm text-[#64748B]">
                A$89.99/yr · renews 14 Mar 2027
              </p>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <InfoIcon />
          <span>Your subscription will automatically renew on 14 Mar 2027.</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <ActionRow
          iconBg="bg-[#DBEAFE]"
          iconColor="text-[#2563EB]"
          Icon={SwapIcon}
          title="Change plan"
          description="Upgrade, downgrade or change your subscription plan."
        />
        <ActionRow
          iconBg="bg-[#DBEAFE]"
          iconColor="text-[#2563EB]"
          Icon={CardIcon}
          title="Payment method"
          description="Update your payment method and billing details."
        />
        <ActionRow
          iconBg="bg-[#DBEAFE]"
          iconColor="text-[#2563EB]"
          Icon={InvoiceIcon}
          title="Billing history"
          description="View your past invoices and payments."
        />
        <ActionRow
          iconBg="bg-[#FEE2E2]"
          iconColor="text-[#DC2626]"
          Icon={XIcon}
          title="Cancel subscription"
          description="Cancel your subscription. You'll retain access until the end of your billing period."
          danger
          last
        />
      </section>

      <SecureBilling />
    </>
  );
}

function FreeView() {
  return (
    <>
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <p className="text-xs font-medium text-[#94A3B8]">Free</p>
        <div className="mt-3 flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <CrownIcon />
          </span>
          <div>
            <p className="text-base font-bold text-[#141B2B]">
              IELTS Premium — Annual
            </p>
            <p className="mt-1 text-sm text-[#64748B]">
              Get more AI practice and full mock tests for your IELTS preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Your Free access</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AllowanceCard
            tone="green"
            Icon={CheckShield}
            value="5 / 5"
            label="AI Speaking & Writing attempts this month"
          />
          <AllowanceCard
            tone="purple"
            Icon={ClipboardIcon}
            value="0"
            label="Full mock tests available"
          />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <InfoIcon />
          <span>
            Diagnostic assessments are separate from your AI and mock allowances.
          </span>
        </div>
        <h3 className="mt-5 text-sm font-bold text-[#141B2B]">Premium includes</h3>
        <ul className="mt-3 space-y-2.5 text-sm text-[#334155]">
          <li className="flex items-start gap-2">
            <BlueCheck />
            100 AI Speaking &amp; Writing attempts per entitlement month
          </li>
          <li className="flex items-start gap-2">
            <BlueCheck />
            3 full mock tests per entitlement month
          </li>
        </ul>
      </section>

      <Link
        href="/dashboard/premium"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
      >
        Upgrade to Premium
      </Link>
      <Link
        href="/dashboard/premium"
        className="text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
      >
        Choose Monthly or Yearly
      </Link>
    </>
  );
}

function TrialView() {
  return (
    <>
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <GradCap />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-bold text-[#141B2B]">IELTS Academic</p>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#15803D]">
                Premium Trial
              </span>
            </div>
            <p className="mt-1 text-sm text-[#64748B]">
              Your 7–day Premium trial is active.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#DCFCE7] px-3.5 py-3 text-sm font-medium text-[#166534]">
          <CalIcon />
          Trial ends on 21 Mar 2027
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Trial allowance</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AllowanceCard
            tone="green"
            Icon={CheckShield}
            value="25"
            label="AI Speaking & Writing attempts remaining"
          />
          <AllowanceCard
            tone="purple"
            Icon={ClipboardIcon}
            value="1"
            label="Full mock test remaining"
          />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <InfoIcon />
          <span>
            After your trial, your plan will renew as IELTS Premium (Monthly).
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Plan details</h3>
        <dl className="mt-3 divide-y divide-[#E2E8F0] text-sm">
          <DetailRow label="Plan" value="Monthly" />
          <DetailRow label="Next charge" value="$XX.XX on 21 Mar 2027" />
          <DetailRow
            label="Payment method"
            value={
              <span className="inline-flex items-center gap-2 font-bold text-[#141B2B]">
                <VisaBadge /> •••• 4242
              </span>
            }
          />
        </dl>
      </section>

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
      >
        Manage subscription
      </button>
      <button
        type="button"
        className="text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
      >
        Cancel trial
      </button>
    </>
  );
}

function ActiveView() {
  return (
    <>
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <GradCap />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-bold text-[#141B2B]">IELTS Academic</p>
              <span className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-xs font-semibold text-[#1D4ED8]">
                Premium Active
              </span>
            </div>
            <p className="mt-1 text-sm text-[#64748B]">
              Enjoy your full Premium benefits.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#E2E8F0] pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Plan
            </p>
            <p className="mt-0.5 text-sm font-bold text-[#141B2B]">Annual</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-[#141B2B]">$XX.XX / year</p>
            <p className="text-xs text-[#64748B]">Renews on 14 Mar 2028</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Your Premium allowance</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AllowanceCard
            tone="green"
            Icon={CheckShield}
            value="100"
            label="AI Speaking & Writing attempts per month"
          />
          <AllowanceCard
            tone="purple"
            Icon={ClipboardIcon}
            value="3"
            label="Full mock tests per month"
          />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <InfoIcon />
          <span>
            Allowances reset each entitlement month. Unused allowances do not roll over.
          </span>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Payment details</h3>
        <dl className="mt-3 divide-y divide-[#E2E8F0] text-sm">
          <DetailRow label="Next renewal" value="14 Mar 2028" />
          <DetailRow
            label="Payment method"
            value={
              <span className="inline-flex items-center gap-2 font-bold text-[#141B2B]">
                <VisaBadge /> •••• 4242
              </span>
            }
          />
        </dl>
      </section>

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
      >
        Manage subscription
      </button>
      <button
        type="button"
        className="text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
      >
        Cancel subscription
      </button>
    </>
  );
}

function CancelledView() {
  return (
    <>
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <GradCap />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-bold text-[#141B2B]">IELTS Academic</p>
              <span className="rounded-full bg-[#FFEDD5] px-2.5 py-0.5 text-xs font-semibold text-[#C2410C]">
                Cancelled
              </span>
            </div>
            <p className="mt-1 text-sm text-[#64748B]">
              Your subscription has been cancelled, but you still have access until the
              end of your billing period.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#FFEDD5] px-3.5 py-3 text-sm font-medium text-[#9A3412]">
          <CalIcon />
          Premium access ends on 14 Mar 2027
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Your Premium access</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AllowanceCard
            tone="green"
            Icon={CheckShield}
            value="100"
            label="AI Speaking & Writing attempts per month"
          />
          <AllowanceCard
            tone="purple"
            Icon={ClipboardIcon}
            value="3"
            label="Full mock tests per month"
          />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <ClockIcon />
          <span>
            You can continue using Premium until this date. Your learning history will
            remain available after your Premium access ends.
          </span>
        </div>
      </section>

      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white shadow-sm transition hover:bg-[#244FE6]"
      >
        Reactivate subscription
      </button>
      <button
        type="button"
        className="text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
      >
        View plan details
      </button>
    </>
  );
}

function PaymentIssueView() {
  return (
    <>
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
            <GradCap />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-bold text-[#141B2B]">IELTS Academic</p>
              <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs font-semibold text-[#B91C1C]">
                ⚠ Payment issue
              </span>
            </div>
            <p className="mt-1 text-sm text-[#64748B]">
              We couldn&apos;t process your latest payment. Please update your payment
              method.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FEE2E2] px-3.5 py-3 text-sm font-medium text-[#991B1B]">
          <ClockIcon />
          Your Premium access is currently active while we recover your payment.
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Payment method</h3>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#64748B]">
            Current status
            <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs font-semibold text-[#B91C1C]">
              Payment update required
            </span>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#2b5ce6] bg-white px-4 text-sm font-semibold text-[#2b5ce6] transition hover:bg-[#EEF2FF]"
          >
            Update payment method
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#141B2B]">Your Premium allowance</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <AllowanceCard
            tone="green"
            Icon={CheckShield}
            value="100"
            label="AI Speaking & Writing attempts per month"
          />
          <AllowanceCard
            tone="purple"
            Icon={ClipboardIcon}
            value="3"
            label="Full mock tests per month"
          />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3.5 py-3 text-sm text-[#1D4ED8]">
          <ClockIcon />
          <span>
            If your payment isn&apos;t updated, your subscription may be cancelled at the
            end of the recovery period.
          </span>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b5ce6] text-sm font-bold text-white transition hover:bg-[#244FE6]"
        >
          Manage subscription
        </button>
        <button
          type="button"
          className="mt-3 w-full text-center text-sm font-semibold text-[#2b5ce6] transition hover:underline"
        >
          Contact support
        </button>
      </section>
    </>
  );
}

function SecureBilling() {
  return (
    <section className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
        <ShieldIcon />
      </span>
      <div className="text-sm">
        <p className="font-bold text-[#141B2B]">Secure billing</p>
        <p className="mt-1 text-[#64748B]">
          Billing and payment information is managed securely by our payment provider.
        </p>
        <p className="mt-1 text-[#64748B]">
          If you need help,{" "}
          <Link href="/dashboard/account/help" className="font-semibold text-[#2b5ce6] hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function ActionRow({
  iconBg,
  iconColor,
  Icon,
  title,
  description,
  danger,
  last,
}: {
  iconBg: string;
  iconColor: string;
  Icon: () => React.ReactNode;
  title: string;
  description: string;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-[#F8FAFC] sm:px-5 ${
        last ? "" : "border-b border-[#E2E8F0]"
      }`}
    >
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-bold ${danger ? "text-[#DC2626]" : "text-[#141B2B]"}`}>
          {title}
        </span>
        <span className="mt-0.5 block text-sm text-[#64748B]">{description}</span>
      </span>
      <span className="text-[#CBD5E1]" aria-hidden>
        ›
      </span>
    </button>
  );
}

function AllowanceCard({
  tone,
  Icon,
  value,
  label,
}: {
  tone: "green" | "purple";
  Icon: () => React.ReactNode;
  value: string;
  label: string;
}) {
  const bg = tone === "green" ? "bg-[#ECFDF5]" : "bg-[#F5F3FF]";
  const iconBg = tone === "green" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#EDE9FE] text-[#7C3AED]";
  return (
    <div className={`flex items-start gap-3 rounded-xl border border-[#E2E8F0] ${bg} p-3.5`}>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon />
      </span>
      <div>
        <p className="text-lg font-bold text-[#141B2B]">{value}</p>
        <p className="text-xs text-[#64748B]">{label}</p>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <dt className="text-[#64748B]">{label}</dt>
      <dd className="text-right font-bold text-[#141B2B]">{value}</dd>
    </div>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M3.5 13.5 5 5.5l3.2 2.8L10 4l1.8 4.3L15 5.5l1.5 8H3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function GradCap() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="m3 8.5 7-3.5 7 3.5-7 3.5L3 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M15.5 10v3.2c0 1-2.5 2.3-5.5 2.3s-5.5-1.3-5.5-2.3V10M17 8.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7.2v3.5M8 5.2h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v3.2l2 1.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 6.5h11M5.5 2.5v2M10.5 2.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3.5 5.5h9M10 3l2.5 2.5L10 8M12.5 10.5h-9M6 8l-2.5 2.5L6 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M4 2.5h5.5L13 6v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.5 8.5h5M5.5 11h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="m5 5 6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
      <path d="M10 2.5 16 5v4.2c0 3.4-2.3 5.9-6 6.8-3.7-.9-6-3.4-6-6.8V5l6-2.5Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CheckShield() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M8 2.2 13 4.2v3.2c0 2.7-1.8 4.6-5 5.3-3.2-.7-5-2.6-5-5.3V4.2L8 2.2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="m5.8 7.5 1.5 1.5 2.8-2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <rect x="4" y="3.5" width="8" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3.5h4V5H6V3.5Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function BlueCheck() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-[#2b5ce6]" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="m5.5 8 1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function VisaBadge() {
  return (
    <span className="rounded bg-[#1A56DB] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white">
      VISA
    </span>
  );
}
