import { RequireAuth } from "@/app/components/require-auth";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
