"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/app/components/site-footer";

const AUTH_PREFIXES = ["/signup", "/signin", "/forgot-password", "/reset-password"] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = AUTH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`),
  );

  return (
    <>
      {children}
      {hideFooter ? null : <SiteFooter />}
    </>
  );
}
