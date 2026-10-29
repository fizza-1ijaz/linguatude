import { redirect } from "next/navigation";

export default function LoginDeviceLimitRedirectPage() {
  redirect("/dashboard/account/devices/limit");
}
