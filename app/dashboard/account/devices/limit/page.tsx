import type { Metadata } from "next";
import { LoginDeviceLimit } from "@/app/components/login-device-limit";

export const metadata: Metadata = {
  title: "Sign in on a 4th device | Linguatude",
  description:
    "You can use Linguatude on 3 devices. Remove an existing device to continue.",
  robots: { index: false, follow: false },
};

export default function DeviceLimitPage() {
  return <LoginDeviceLimit />;
}
