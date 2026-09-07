import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { SignupForm } from "@/app/components/signup-form";

export const metadata: Metadata = {
  title: "Create account | Linguatude",
  description:
    "Create your free Linguatude account and start your IELTS journey with AI coaching.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthCard>
        <header>
          <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#1e1b4b] sm:text-[2rem]">
            Create your account
          </h1>
          <p className="mt-2 text-base font-medium text-[#6b7280]">
            Start your IELTS journey today — free
          </p>
        </header>

        <div className="mt-7">
          <SignupForm />
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.04em] text-[#9ca3af]">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled
            title="Coming soon"
            className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#1e1b4b] opacity-75"
          >
            <Image
              src="/auth/google.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
            Google
          </button>
          <button
            type="button"
            disabled
            title="Coming soon"
            className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#1e1b4b] opacity-75"
          >
            <Image
              src="/auth/apple.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
            Apple
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-[#6b7280]">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#2D5BFF] underline decoration-[#2D5BFF]/30 underline-offset-2 hover:decoration-[#2D5BFF]"
          >
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthShell>
  );
}
