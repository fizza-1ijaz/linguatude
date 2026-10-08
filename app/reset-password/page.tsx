import type { Metadata } from "next";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { ResetPasswordForm } from "@/app/components/reset-password-form";

export const metadata: Metadata = {
  title: "Set a new password | Linguatude",
  description: "Choose a strong password you haven't used before.",
  alternates: { canonical: "/reset-password" },
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell wide>
      <AuthCard>
        <header className="text-center">
          <h1 className="text-[1.5rem] font-bold leading-9 tracking-tight text-[#141b2b] sm:text-[1.75rem]">
            Set a new password
          </h1>
          <p className="mt-2 text-base leading-6 text-[#434655]">
            Choose a strong password you haven&apos;t used before.
          </p>
        </header>

        <div className="mt-7">
          <ResetPasswordForm />
        </div>
      </AuthCard>
    </AuthShell>
  );
}
