import { redirect } from "next/navigation";

export default async function DashboardWaitlistRedirect({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string }>;
}) {
  const params = await searchParams;
  const exam =
    params.exam === "toefl" || params.exam === "cambridge"
      ? params.exam
      : null;
  redirect(exam ? `/waitlist?exam=${exam}` : "/waitlist");
}
