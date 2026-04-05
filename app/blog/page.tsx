import type { Metadata } from "next";
import { getBlogIndexPageData } from "@/lib/cms/blogs";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title:
    "The Linguatude Blog — IELTS, TOEFL, PTE Preparation & English Learning",
  description:
    "Guides, tips, and research-backed articles on IELTS, TOEFL, PTE Academic, and Cambridge English preparation — plus honest perspectives on AI in language learning.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const data = getBlogIndexPageData();

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <section
          className="border-b border-[var(--border)] bg-[var(--surface)]/70 py-12 sm:py-16"
          aria-labelledby="blog-heading"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h1
              id="blog-heading"
              className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl animate-[fade-in-up_0.8s_ease-out_both]"
            >
              Prepare Smarter. Every Article Here Has One Goal — Getting You
              Ready.
            </h1>
            <p
              className="mt-5 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg animate-[fade-in-up_0.8s_ease-out_both]"
              style={{ animationDelay: "100ms" }}
            >
              Guides, exam insights, and practical advice on IELTS, TOEFL, PTE
              Academic, Cambridge English, and the role of AI in language test
              preparation.
            </p>
          </div>
        </section>

        {data.categories.length > 0 && (
          <section
            className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 py-6"
            aria-label="Blog categories"
          >
            <div
              className="categories mx-auto flex max-w-5xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]"
              style={{ animationDelay: "200ms" }}
            >
              {data.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--foreground)] shadow-sm shadow-[var(--primary)]/[0.06]"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="flex-1 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {data.posts.length === 0 && (
              <p className="max-w-3xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                The first articles are on their way — covering IELTS preparation,
                TOEFL strategies, PTE Academic practice, and what AI can
                genuinely do to help you prepare for an English proficiency test.
                Check back soon.
              </p>
            )}

            {data.posts.length > 0 && (
              <div
                className="blog-grid-fluid animate-[fade-in-up_0.8s_ease-out_both]"
                style={{ animationDelay: "300ms" }}
              >
                {data.posts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 shadow-sm shadow-[var(--primary)]/[0.06] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]/95 hover:shadow-xl sm:p-7"
                  >
                    <h2 className="text-balance text-xl font-bold tracking-tight leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)] sm:text-2xl">
                      {post.title}
                    </h2>

                    {post.category && (
                      <span className="mt-3 inline-flex w-fit rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[var(--accent-hover)] dark:text-[var(--accent)]">
                        {post.category.name}
                      </span>
                    )}

                    {post.excerpt && (
                      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                        {post.excerpt}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
