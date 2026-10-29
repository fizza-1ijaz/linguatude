import type { Metadata } from "next";
import { AccountDevices } from "@/app/components/dashboard/account-devices";

export const metadata: Metadata = {
  title: "Device Management | Linguatude",
  description: "Manage the devices where you're logged in to Linguatude.",
  robots: { index: false, follow: false },
};

export default function AccountDevicesPage() {
  return <AccountDevices />;
}
