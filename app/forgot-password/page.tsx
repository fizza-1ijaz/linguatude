import type { Metadata } from "next";
import {
  AuthBackLink,
  AuthBackToLogin,
  AuthCard,
  AuthShell,
} from "@/app/components/auth-shell";
import { ForgotPasswordForm } from "@/app/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password | Linguatude",
  description:
    "Enter the email address you used to register. We'll send you a link to reset your password.",
  alternates: { canonical: "/forgot-password" },
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell topSlot={<AuthBackLink href="/login" />}>
      <AuthCard className="flex flex-col gap-7">
        <header>
          <h1 className="text-[1.75rem] font-bold leading-10 tracking-tight text-[#141b2b] sm:text-[2rem]">
            Reset your password
          </h1>
          <p className="mt-2 text-base leading-6 text-[#434655]">
            Enter the email address you used to register. We&apos;ll send you a
            link to reset your password.
          </p>
        </header>

        <ForgotPasswordForm />

        <div className="flex justify-center">
          <AuthBackToLogin />
        </div>
      </AuthCard>
    </AuthShell>
  );
}
