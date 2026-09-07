import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { ForgotPasswordForm } from "@/app/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password | Linguatude",
  description:
    "Enter your email and we’ll send a link to reset your Linguatude password.",
  alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: false },
};

function BackLink() {
  return (
    <Link
      href="/signin"
      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#2D5BFF] transition hover:bg-[#2D5BFF]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
    >
      <Image
        src="/auth/chevron-left.svg"
        alt=""
        width={16}
        height={16}
        className="size-4"
      />
      Back
    </Link>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell topSlot={<BackLink />}>
      <AuthCard>
        <header>
          <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#1e1b4b] sm:text-[2rem]">
            Reset your password
          </h1>
          <p className="mt-3 text-base font-medium leading-6 text-[#6b7280]">
            Enter the email address you used to register. We&apos;ll send you a
            link to reset your password.
          </p>
        </header>

        <div className="mt-8">
          <ForgotPasswordForm />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#2D5BFF] transition hover:bg-[#2D5BFF]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
          >
            <Image
              src="/auth/chevron-left.svg"
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
            Back to sign in
          </Link>
        </div>
      </AuthCard>

      <div className="mt-6 flex justify-center md:hidden">
        <BackLink />
      </div>
    </AuthShell>
  );
}
