import Image from "next/image";
import Link from "next/link";
import {
  BlogSearchBox,
  BlogStayInformedForm,
} from "@/app/components/blog-article-sidebar";
import type { BlogCategoryRow, BlogPostRow } from "@/lib/blogs";

function authorInitials(name: string | null | undefined) {
  const parts = (name ?? "Linguatude Team").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "LT";
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
  categories?: BlogCategoryRow[];
};

export function BlogPostContent({ blog, categories = [] }: Props) {
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
  const activeCategorySlug = blog.category?.slug ?? "";

  return (
    <>
      <section
        className="mkt-hero relative isolate overflow-hidden"
        aria-labelledby="article-heading"
      >
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8 lg:pb-16 lg:pt-10">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div className="animate-[fade-in-up_0.75s_ease-out_both]">
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

              <p className="mt-4 inline-flex rounded-lg bg-[#f0eeff] px-6 py-2.5 text-base font-semibold text-[#2D5BFF] shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
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
                <span className="font-medium text-[#6b7280]">
                  {minutes} min read
                </span>
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

            <div
              className="pointer-events-none relative mx-auto w-full max-w-md animate-[fade-in-up_0.85s_ease-out_both] lg:mx-0 lg:ml-auto lg:max-w-none"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/blog-hero.svg"
                alt=""
                className="h-auto w-full object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 flex-1 bg-white px-4 pb-14 pt-2 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <article className="rounded-3xl border border-[#c5c7cb] bg-white p-6 shadow-sm sm:p-10 lg:col-span-8 lg:p-12">
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

            <aside className="mt-10 flex flex-col items-center gap-8 rounded-2xl border border-[#dbe3ff] bg-[#d3ddff] p-6 shadow-[0_4px_8px_rgba(0,0,0,0.15)] sm:flex-row sm:p-8">
              <span className="flex size-24 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:size-32">
                <Image
                  src="/about/icon-rocket.svg"
                  alt=""
                  width={60}
                  height={60}
                  className="size-12 sm:size-[3.75rem]"
                />
              </span>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-xl font-bold text-[#1a1a1a] sm:text-2xl sm:leading-8">
                  Better rhythm. Higher score.
                </p>
                <p className="mt-2 text-base leading-6 text-[#6b7280]">
                  Practice with real-time feedback that shows you where pauses
                  help — and where they hurt.
                </p>
              </div>
            </aside>
          </article>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <BlogSearchBox />

            <div className="flex flex-col gap-2 rounded-3xl border border-[#c5c7cb] bg-white p-6 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#dbe3ff]">
                <Image
                  src="/blog/icon-mail.svg"
                  alt=""
                  width={17}
                  height={13}
                  className="h-[13px] w-[17px]"
                />
              </span>
              <h2 className="pt-2 text-lg font-bold text-[#111827]">
                Stay informed
              </h2>
              <p className="text-sm leading-[1.625] text-[#4b5563]">
                Get the latest tips and strategies delivered to your inbox.
              </p>
              <div className="pt-3">
                <BlogStayInformedForm />
              </div>
            </div>

            {categories.length > 0 ? (
              <div className="flex flex-col gap-4 rounded-3xl border border-[#c5c7cb] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#111827]">Categories</h2>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href="/blog"
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                        !activeCategorySlug
                          ? "bg-[#dbe3ff] font-semibold text-[#2D5BFF]"
                          : "font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
                      }`}
                    >
                      All
                      {!activeCategorySlug ? (
                        <Image
                          src="/blog/chevron-right.svg"
                          alt=""
                          width={5}
                          height={9}
                          className="h-[9px] w-[5px]"
                        />
                      ) : null}
                    </Link>
                  </li>
                  {categories.map((category) => {
                    const active = activeCategorySlug === category.slug;
                    return (
                      <li key={category.id}>
                        <Link
                          href={`/blog?category=${encodeURIComponent(category.slug)}`}
                          className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition ${
                            active
                              ? "bg-[#dbe3ff] font-semibold text-[#2D5BFF]"
                              : "font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
                          }`}
                        >
                          {category.name}
                          {active ? (
                            <Image
                              src="/blog/chevron-right.svg"
                              alt=""
                              width={5}
                              height={9}
                              className="h-[9px] w-[5px]"
                            />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        <nav className="mx-auto mt-12 flex max-w-6xl justify-center" aria-label="Blog navigation">
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
      </section>
    </>
  );
}
