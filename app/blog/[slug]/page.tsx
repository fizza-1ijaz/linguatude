import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import { buildBlogPostingJsonLd } from "@/lib/blogSchema";
import {
  getBlogBySlugForLinguatude,
  getBlogSlugsForConfiguredSite,
} from "@/lib/blogs";
import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

/** ISR: refresh article + slug list cache at most every 10s. */
export const revalidate = 10;

/** Allow new posts at URLs not in `generateStaticParams` (on-demand). */
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const rows = await getBlogSlugsForConfiguredSite();
  if (!rows || rows.length === 0) {
    return [{ slug: "coming-soon" }];
  }
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Blog" };

  const blog = await getBlogBySlugForLinguatude(slug);
  if (!blog) {
    if (slug === "coming-soon") {
      return {
        title: "Blog — Coming soon | Linguatude",
        description: "New Linguatude articles will appear here once published.",
        alternates: { canonical: `${SITE_URL}/blog/coming-soon` },
      };
    }
    return { title: "Blog" };
  }

  const title = blog.meta_title || blog.title;
  const description =
    blog.meta_description ||
    blog.description ||
    "Linguatude blog — English test preparation and AI-powered learning.";

  const canonical = `${SITE_URL}/blog/${blog.slug}`;
  const ogImage = blog.cover_image_url
    ? [{ url: blog.cover_image_url, alt: blog.title }]
    : [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`, alt: "Linguatude" }];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "Linguatude",
      locale: "en_US",
      publishedTime: blog.display_date
        ? new Date(blog.display_date).toISOString()
        : undefined,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage.map((i) => i.url),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const blog = await getBlogBySlugForLinguatude(slug);

  if (!blog) {
    if (slug === "coming-soon") {
      return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <SiteHeader />
          <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
            <section className="border-b border-[var(--border)] bg-[var(--surface)]/70 py-10 sm:py-12">
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                  Blog
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Coming soon
                </h1>
                <p className="mt-3 text-[var(--muted)]">
                  New articles will appear here once they are published.
                </p>
              </div>
            </section>
            <section className="flex-1 py-10 sm:py-12">
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 sm:p-8">
                  <p className="text-[var(--muted)]">
                    We&apos;re working on new content. Check back soon.
                  </p>
                  <p className="mt-4">
                    <Link
                      href="/blog"
                      className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                    >
                      View all articles
                    </Link>
                  </p>
                </article>
              </div>
            </section>
          </main>
        </div>
      );
    }
    notFound();
  }

  const jsonLd = buildBlogPostingJsonLd(blog);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SiteHeader />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <section className="border-b border-[var(--border)] bg-[var(--surface)]/70 py-10 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-[var(--muted)]">
              {blog.category?.name ? `Blog · ${blog.category.name}` : "Blog"}
            </p>
            <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {blog.title}
            </h1>
            {blog.description && (
              <p className="mt-3 text-pretty text-base text-[var(--muted)] sm:text-lg">
                {blog.description}
              </p>
            )}
            {blog.display_date && (
              <p className="mt-3 text-sm text-[var(--muted)]">
                <time dateTime={blog.display_date}>
                  {new Date(blog.display_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {blog.author_name ? ` · ${blog.author_name}` : null}
              </p>
            )}
          </div>
        </section>

        <section className="flex-1 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 shadow-sm shadow-[var(--primary)]/[0.06] backdrop-blur-sm sm:p-8">
              {blog.cover_image_url && (
                <div className="mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.cover_image_url}
                    alt=""
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </div>
              )}
              {blog.content ? (
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  Content for this article has not been added yet.
                </p>
              )}
              <nav
                className="mt-10 border-t border-[var(--border)] pt-8"
                aria-label="Related pages"
              >
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 transition hover:decoration-[var(--accent)]"
                >
                  All articles
                </Link>
              </nav>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
