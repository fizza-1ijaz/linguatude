import type { Metadata } from "next";
import { DashboardHomeKeepGoing } from "@/app/components/dashboard/dashboard-home-keep-going";

export const metadata: Metadata = {
  title: "Home — Keep Going | Linguatude",
  description:
    "Dashboard empty state when there is not enough progress data yet.",
  robots: { index: false, follow: false },
};

export default function KeepGoingPage() {
  return <DashboardHomeKeepGoing />;
}
