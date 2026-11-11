import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { SignupForm } from "@/app/components/signup-form";
import { SocialAuthButtons } from "@/app/components/social-auth-buttons";

export const metadata: Metadata = {
  title: "Create account | Linguatude",
  description:
    "Create your free Linguatude account and start your IELTS journey with AI coaching.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell wide>
      <AuthCard>
        <header className="text-center">
          <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#1e1b4b] sm:text-[1.75rem]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm font-medium text-[#6b7280] sm:text-[0.95rem]">
            Start your IELTS journey today — free
          </p>
        </header>

        <div className="mt-4">
          <SignupForm />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.04em] text-[#9ca3af]">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
        </div>

        <div className="mt-3.5">
          <SocialAuthButtons mode="signup" />
        </div>

        <p className="mt-4 text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#2D5BFF] underline decoration-[#2D5BFF]/30 underline-offset-2 hover:decoration-[#2D5BFF]"
          >
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthShell>
  );
}
