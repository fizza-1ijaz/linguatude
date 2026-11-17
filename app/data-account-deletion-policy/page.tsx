import type { Metadata } from "next";
import { DataAccountDeletionPolicyPageShell } from "@/app/components/data-account-deletion-page-content";

export const metadata: Metadata = {
  title: "Data & Account Deletion Policy | Linguatude",
  description:
    "Interim Data & Account Deletion Policy for the Linguatude Coming Soon website. How to request removal of launch-notification data.",
  alternates: { canonical: "/data-account-deletion-policy" },
};

export default function DataAccountDeletionPolicyPage() {
  return <DataAccountDeletionPolicyPageShell />;
}
