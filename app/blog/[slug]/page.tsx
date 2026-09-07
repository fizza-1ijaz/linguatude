import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/app/components/blog-post-content";
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
        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <SiteHeader />
          <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
            <section className="home-hero relative isolate overflow-hidden">
              <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-lg font-bold text-[#2D5BFF]"
                >
                  Back to blog
                </Link>
                <p className="mt-6 inline-flex rounded-lg bg-[#f0eeff] px-6 py-2.5 text-base font-semibold text-[#2D5BFF]">
                  Article
                </p>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl">
                  Coming soon
                </h1>
                <p className="mt-4 text-lg text-[#4b5563]">
                  New articles will appear here once they are published.
                </p>
              </div>
            </section>
            <section className="px-4 pb-14 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl rounded-3xl border border-[#c5c7cb] bg-white p-8 shadow-sm">
                <p className="text-[#6b7280]">
                  We&apos;re working on new content. Check back soon.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/blog"
                    className="inline-flex rounded-full border-2 border-[#2D5BFF] px-6 py-3 text-base font-semibold text-[#2D5BFF]"
                  >
                    Back to blogs
                  </Link>
                </div>
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
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SiteHeader />
      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <BlogPostContent blog={blog} />
      </main>
    </div>
  );
}
