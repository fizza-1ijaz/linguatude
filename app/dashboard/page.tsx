import type { Metadata } from "next";
import { DashboardHome } from "@/app/components/dashboard/dashboard-home";

export const metadata: Metadata = {
  title: "Home | Linguatude",
  description: "Your Linguatude learning dashboard.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardHome />;
}
