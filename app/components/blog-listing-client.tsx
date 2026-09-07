"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { BlogCategoryRow, BlogListRow } from "@/lib/blogs";

const PAGE_SIZE = 6;

const CATEGORY_PILL_STYLES = [
  { bg: "bg-[#eaf0fd]", text: "text-[#2D5BFF]" },
  { bg: "bg-[#eee8ff]", text: "text-[#5b3fd4]" },
  { bg: "bg-[#e8f7ef]", text: "text-[#1f7a4c]" },
  { bg: "bg-[#fff0e8]", text: "text-[#c45a1a]" },
] as const;

type Props = {
  posts: BlogListRow[];
  categories: BlogCategoryRow[];
  emptyStateMessage: string;
};

function pillStyleFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % CATEGORY_PILL_STYLES.length;
  }
  return CATEGORY_PILL_STYLES[hash];
}

function estimateReadMinutes(post: BlogListRow) {
  const text = [post.title, post.description].filter(Boolean).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.min(20, Math.round(words / 40) || 5));
}

export function BlogListingClient({
  posts,
  categories,
  emptyStateMessage,
}: Props) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("category")?.trim() ?? "";
  const hasKnownCategory = categories.some((c) => c.slug === raw);
  const activeCategorySlug = hasKnownCategory ? raw : "";
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = useMemo(() => {
    if (!activeCategorySlug) return posts;
    return posts.filter((p) => p.category?.slug === activeCategorySlug);
  }, [posts, activeCategorySlug]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategorySlug]);

  const shownPosts = visiblePosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < visiblePosts.length;

  const showFilteredEmpty =
    visiblePosts.length === 0 && activeCategorySlug.length > 0;
  const emptyCopy = showFilteredEmpty
    ? "No posts in this category yet. Try another filter or view all articles."
    : emptyStateMessage;

  return (
    <>
      {categories.length > 0 && (
        <section
          className="relative z-10 -mt-6 px-4 sm:-mt-8 sm:px-6 lg:px-8"
          aria-label="Filter posts by category"
        >
          <div className="mx-auto flex max-w-5xl justify-center">
            <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-[10px] border border-[rgba(199,196,219,0.3)] bg-[#f2f3f7] p-2 shadow-[0_4px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.05)] sm:gap-1 sm:p-2.5">
              <Link
                href="/blog"
                scroll={false}
                onClick={() => setVisibleCount(PAGE_SIZE)}
                className={`inline-flex rounded-full px-5 py-2 text-sm font-medium transition sm:px-6 sm:text-base ${
                  !activeCategorySlug
                    ? "bg-[#2D5BFF] text-white"
                    : "text-[#464557] hover:bg-white/70"
                }`}
              >
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${encodeURIComponent(category.slug)}`}
                  scroll={false}
                  onClick={() => setVisibleCount(PAGE_SIZE)}
                  className={`inline-flex rounded-full px-5 py-2 text-sm font-medium transition sm:px-6 sm:text-base ${
                    activeCategorySlug === category.slug
                      ? "bg-[#2D5BFF] text-white"
                      : "text-[#464557] hover:bg-white/70"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="flex-1 bg-white px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-[-0.025em] text-[#191c1f] sm:text-[2.625rem] sm:leading-[1.2]">
            What we stand for
          </h2>

          {visiblePosts.length === 0 && (
            <p className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-[#464557] sm:text-lg">
              {emptyCopy}
            </p>
          )}

          {visiblePosts.length > 0 && (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {shownPosts.map((post) => {
                  const categoryName = post.category?.name;
                  const pill = post.category
                    ? pillStyleFor(post.category.slug)
                    : CATEGORY_PILL_STYLES[0];
                  const minutes = estimateReadMinutes(post);

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(199,196,219,0.5)] bg-white shadow-[0_4px_8px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                    >
                      <div
                        className="relative aspect-[382/192] w-full shrink-0 overflow-hidden"
                        style={{
                          backgroundImage:
                            "linear-gradient(136deg, #f0f2ff 0%, #e3dfff 100%)",
                        }}
                      >
                        {post.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.cover_image_url}
                            alt=""
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                              Linguatude
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        {categoryName ? (
                          <span
                            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs ${pill.bg} ${pill.text}`}
                          >
                            {categoryName}
                          </span>
                        ) : null}

                        <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-[#191c1f] group-hover:text-[#2D5BFF]">
                          {post.title}
                        </h3>

                        {post.description ? (
                          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-5 text-[#464557]">
                            {post.description}
                          </p>
                        ) : (
                          <div className="flex-1" />
                        )}

                        <div className="mt-6 flex items-center justify-between border-t border-[rgba(199,196,219,0.3)] pt-4">
                          <span className="text-sm text-[#464557]">
                            {categoryName
                              ? `${categoryName} · ${minutes} min`
                              : `${minutes} min`}
                          </span>
                          <span className="relative size-4 shrink-0 overflow-clip opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100">
                            <Image
                              src="/blog/card-arrow.svg"
                              alt=""
                              width={16}
                              height={16}
                              className="size-full"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {canLoadMore ? (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) => count + PAGE_SIZE)
                    }
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#2D5BFF] bg-white px-6 py-3 text-base font-semibold text-[#3d00ff] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
                  >
                    Load more posts
                    <span className="relative h-[0.3rem] w-[0.45rem] overflow-clip">
                      <Image
                        src="/blog/chevron-down.svg"
                        alt=""
                        width={7}
                        height={5}
                        className="size-full"
                      />
                    </span>
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
