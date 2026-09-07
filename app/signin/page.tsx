import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthCard, AuthShell } from "@/app/components/auth-shell";
import { SigninForm } from "@/app/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in | Linguatude",
  description: "Sign in to your Linguatude account.",
  alternates: { canonical: "/signin" },
  robots: { index: false, follow: false },
};

function SocialButton({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled
      title="Coming soon"
      className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#1e1b4b] opacity-75"
    >
      <Image src={icon} alt="" width={20} height={20} className="size-5" />
      {label}
    </button>
  );
}

export default function SigninPage() {
  return (
    <AuthShell>
      <AuthCard>
        <header>
          <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-tight text-[#1e1b4b] sm:text-[2rem]">
            Welcome back
          </h1>
          <p className="mt-2 text-base font-medium text-[#6b7280]">
            Please enter your details to sign in.
          </p>
        </header>

        <div className="mt-8">
          <SigninForm />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.04em] text-[#9ca3af]">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <SocialButton icon="/auth/google.svg" label="Continue with Google" />
          <SocialButton icon="/auth/apple.svg" label="Continue with Apple" />
        </div>

        <p className="mt-8 text-center text-sm text-[#6b7280]">
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
