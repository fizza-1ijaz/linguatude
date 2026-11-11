import type { Metadata } from "next";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { VerifyEmailContent } from "@/app/components/verify-email-content";

export const metadata: Metadata = {
  title: "Verify your email | Linguatude",
  description: "Enter the 6-digit verification code sent to your email.",
  alternates: { canonical: "/verify-email" },
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <AuthShell>
      <AuthCard className="px-4 py-6 sm:px-8 sm:py-9">
        <VerifyEmailContent />
      </AuthCard>
    </AuthShell>
  );
}
