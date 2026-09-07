import Image from "next/image";
import Link from "next/link";
import type { BlogPostRow } from "@/lib/blogs";

function authorInitials(name: string | null | undefined) {
  const parts = (name ?? "Linguatude Team").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "LA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function estimateReadMinutes(blog: BlogPostRow) {
  const text = [blog.title, blog.description, blog.content?.replace(/<[^>]+>/g, " ")]
    .filter(Boolean)
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.min(30, Math.round(words / 200) || 5));
}

type Props = {
  blog: BlogPostRow;
};

export function BlogPostContent({ blog }: Props) {
  const author = blog.author_name?.trim() || "Linguatude Team";
  const initials = authorInitials(blog.author_name);
  const minutes = estimateReadMinutes(blog);
  const dateLabel = blog.display_date
    ? new Date(blog.display_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const tagLabel = blog.category?.name?.trim() || "Article";

  return (
    <>
      <section
        className="home-hero relative isolate overflow-hidden"
        aria-labelledby="article-heading"
      >
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="max-w-3xl animate-[fade-in-up_0.75s_ease-out_both]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-lg font-bold text-[#2D5BFF] transition hover:text-[#244FE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
            >
              <span className="relative size-6 shrink-0 overflow-clip">
                <Image
                  src="/blog/arrow-left.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-full"
                />
              </span>
              Back to blog
            </Link>

            <p className="mt-6 inline-flex rounded-lg bg-[#f0eeff] px-6 py-2.5 text-base font-semibold text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
              {tagLabel}
            </p>

            <h1
              id="article-heading"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-[#111827] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
            >
              {blog.title}
            </h1>

            {blog.description ? (
              <p className="mt-5 max-w-2xl text-pretty text-lg font-semibold leading-7 text-[#4b5563] sm:text-xl">
                {blog.description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#2D5BFF] text-xs font-bold text-white">
                  {initials}
                </span>
                <span className="font-semibold text-[#111827]">{author}</span>
              </div>
              <span className="hidden text-[#d1d5db] sm:inline" aria-hidden>
                |
              </span>
              <span className="font-medium text-[#6b7280]">{minutes} min read</span>
              {dateLabel ? (
                <>
                  <span className="hidden text-[#d1d5db] sm:inline" aria-hidden>
                    |
                  </span>
                  <time
                    dateTime={blog.display_date ?? undefined}
                    className="font-medium text-[#6b7280]"
                  >
                    {dateLabel}
                  </time>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-2 flex-1 bg-white px-4 pb-14 sm:-mt-4 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <article className="rounded-3xl border border-[#c5c7cb] bg-white p-6 shadow-sm sm:p-10 lg:p-12">
            {blog.cover_image_url ? (
              <div className="mb-8 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blog.cover_image_url}
                  alt=""
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            {blog.content ? (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <p className="text-base text-[#6b7280]">
                Content for this article has not been added yet.
              </p>
            )}

            <nav className="mt-12 flex justify-center" aria-label="Blog navigation">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#2D5BFF] bg-white px-6 py-3 text-base font-semibold text-[#2D5BFF] transition hover:bg-[#f8faff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5BFF]/40"
              >
                Back to blogs
                <span className="relative size-6 shrink-0 overflow-clip rotate-180">
                  <Image
                    src="/blog/arrow-left.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="size-full"
                  />
                </span>
              </Link>
            </nav>
          </article>
        </div>
      </section>
    </>
  );
}
