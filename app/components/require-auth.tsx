"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/app/components/auth-provider";
import { needsEmailVerification } from "@/lib/auth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (needsEmailVerification(user) && !pathname.startsWith("/verify-email")) {
      router.replace("/verify-email");
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8FAFC] text-sm font-medium text-[#64748B]">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8FAFC] text-sm font-medium text-[#64748B]">
        Redirecting to sign in…
      </div>
    );
  }

  if (needsEmailVerification(user) && !pathname.startsWith("/verify-email")) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F8FAFC] text-sm font-medium text-[#64748B]">
        Redirecting to verify email…
      </div>
    );
  }

  return <>{children}</>;
}
