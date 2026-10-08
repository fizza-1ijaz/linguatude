import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { CheckEmailContent } from "@/app/components/check-email-content";

export const metadata: Metadata = {
  title: "Check your inbox | Linguatude",
  description: "We've sent a password reset link to your email.",
  alternates: { canonical: "/forgot-password/check-email" },
  robots: { index: false, follow: false },
};

export default function CheckEmailPage() {
  return (
    <AuthShell>
      <AuthCard>
        <Suspense
          fallback={
            <p className="text-center text-sm text-[#434655]">Loading…</p>
          }
        >
          <CheckEmailContent />
        </Suspense>
      </AuthCard>
    </AuthShell>
  );
}
