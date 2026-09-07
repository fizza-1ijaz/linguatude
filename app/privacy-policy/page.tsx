import type { Metadata } from "next";
import { PrivacyPolicyPageShell } from "@/app/components/privacy-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Linguatude",
  description:
    "Interim Privacy Policy for the Linguatude Coming Soon website. Governing law: Bahrain PDPL No. 30 of 2018.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageShell />;
}
