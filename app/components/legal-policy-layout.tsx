import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";

const linkClass =
  "font-medium text-[#2D5BFF] underline decoration-[#2D5BFF]/40 underline-offset-2 transition hover:decoration-[#2D5BFF]";

export function LegalPolicyShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}

export function LegalPolicyHero({
  id,
  title,
  status,
  version,
}: {
  id: string;
  title: string;
  status: string;
  version: string;
}) {
  return (
    <section
      className="mkt-hero relative isolate overflow-x-clip"
      aria-labelledby={id}
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="relative z-10 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3px] text-[#2D5BFF]">
            <span className="size-2 rounded-full bg-[#2D5BFF]" aria-hidden />
            Linguatude
          </p>
          <h1
            id={id}
            className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-[#1e1b4b] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          <div className="mt-4 space-y-1 text-base leading-7 text-[#6b7280] sm:text-lg">
            <p>
              <span className="font-semibold text-[#1e1b4b]">Status:</span>{" "}
              {status}
            </p>
            <p>
              <span className="font-semibold text-[#1e1b4b]">Version:</span>{" "}
              {version}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#e5e7eb] py-8" aria-labelledby={id}>
      <h2
        id={id}
        className="text-xl font-bold tracking-tight text-[#1e1b4b] sm:text-2xl"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-pretty text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
        {children}
      </div>
    </section>
  );
}

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e5e7eb]">
      <table className="min-w-full border-collapse text-left text-sm sm:text-base">
        <thead className="bg-[#f8fafc]">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-[#e5e7eb] px-3 py-3 font-semibold text-[#1e1b4b] sm:px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="align-top">
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${i}`}
                  className="border-b border-[#e5e7eb] px-3 py-3 text-[#4b5563] sm:px-4"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalArticle({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <article className="mx-auto max-w-3xl">{children}</article>
    </section>
  );
}
