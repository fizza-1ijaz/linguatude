import type { Metadata } from "next";
import { PrivacyPolicyPageShell } from "@/app/components/privacy-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Linguatude",
  description:
    "Interim Privacy Policy for the Linguatude Coming Soon website. Operated by Skyen Systems Pty Ltd. Version 17 November 2026.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageShell />;
}
