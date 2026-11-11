import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { SigninForm } from "@/app/components/signin-form";
import { SocialAuthButtons } from "@/app/components/social-auth-buttons";

export const metadata: Metadata = {
  title: "Login | Linguatude",
  description: "Log in to your Linguatude account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell wide>
      <AuthCard>
        <header className="text-center">
          <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-tight text-[#141b2b] sm:text-[1.75rem]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm font-medium text-[#434655] sm:text-[0.95rem]">
            Please enter your details to sign in.
          </p>
        </header>

        <div className="mt-5">
          <SigninForm />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.04em] text-[#9ca3af]">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
        </div>

        <div className="mt-4">
          <SocialAuthButtons mode="login" />
        </div>

        <p className="mt-5 text-center text-sm text-[#6b7280]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#2D5BFF] underline decoration-[#2D5BFF]/35 underline-offset-2 transition hover:decoration-[#2D5BFF]"
          >
            Create account
          </Link>
        </p>
      </AuthCard>
    </AuthShell>
  );
}
