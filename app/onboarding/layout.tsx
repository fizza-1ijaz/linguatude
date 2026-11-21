import { RequireAuth } from "@/app/components/require-auth";
import { DiagnosticSessionProvider } from "@/app/components/diagnostic/diagnostic-session-context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <DiagnosticSessionProvider>{children}</DiagnosticSessionProvider>
    </RequireAuth>
  );
}
