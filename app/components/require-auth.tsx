"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/app/components/auth-provider";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

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

  return <>{children}</>;
}
