"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { BlogCategoryRow, BlogListRow } from "@/lib/blogs";

type Props = {
  posts: BlogListRow[];
  categories: BlogCategoryRow[];
  emptyStateMessage: string;
};

export function BlogListingClient({
  posts,
  categories,
  emptyStateMessage,
}: Props) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("category")?.trim() ?? "";
  const hasKnownCategory = categories.some((c) => c.slug === raw);
  const activeCategorySlug = hasKnownCategory ? raw : "";

  const visiblePosts = useMemo(() => {
    if (!activeCategorySlug) return posts;
    return posts.filter((p) => p.category?.slug === activeCategorySlug);
  }, [posts, activeCategorySlug]);

  const showFilteredEmpty =
    visiblePosts.length === 0 && activeCategorySlug.length > 0;
  const emptyCopy = showFilteredEmpty
    ? "No posts in this category yet. Try another filter or view all articles."
    : emptyStateMessage;

  return (
    <>
      {categories.length > 0 && (
        <section
          className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 py-6"
          aria-label="Filter posts by category"
        >
          <div
            className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 animate-[fade-in-up_0.8s_ease-out_both]"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/blog"
              scroll={false}
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                !activeCategorySlug
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-hover)] dark:text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm shadow-[var(--primary)]/[0.06] hover:border-[var(--accent)]/30"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${encodeURIComponent(category.slug)}`}
                scroll={false}
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategorySlug === category.slug
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-hover)] dark:text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm shadow-[var(--primary)]/[0.06] hover:border-[var(--accent)]/30"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {visiblePosts.length === 0 && (
            <p className="max-w-3xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {emptyCopy}
            </p>
          )}

          {visiblePosts.length > 0 && (
            <div
              className="blog-post-row flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 animate-[fade-in-up_0.8s_ease-out_both]"
              style={{ animationDelay: "300ms" }}
            >
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 shadow-md shadow-[var(--primary)]/[0.08] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/35 hover:shadow-xl"
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[var(--surface-muted)]">
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_18%,var(--surface))] to-[color-mix(in_srgb,var(--accent)_12%,var(--surface))]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                          Linguatude
                        </span>
                      </div>
                    )}
                    {post.category ? (
                      <span className="absolute right-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-md bg-[var(--primary-deep)] px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--on-brand)] shadow-sm ring-1 ring-black/10 dark:ring-white/10">
                        {post.category.name}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col gap-2 p-4 sm:p-5">
                    <h2 className="text-balance text-base font-bold leading-snug tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] sm:text-lg">
                      {post.title}
                    </h2>
                    {post.description ? (
                      <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-[var(--muted)]">
                        {post.description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
