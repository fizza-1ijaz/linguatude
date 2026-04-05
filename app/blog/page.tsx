import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { BlogListingClient } from "@/app/components/blog-listing-client";
import { getBlogIndexDataForLinguatudeOrEmpty } from "@/lib/blogs";
import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

/** ISR: refresh blog index from Supabase at most every 10s in production (`next start`). */
export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const indexData = await getBlogIndexDataForLinguatudeOrEmpty();
  const { title, description } = indexData.seo;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog`,
      siteName: "Linguatude",
      type: "website",
      images: [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`, alt: "Linguatude" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`],
    },
  };
}

function BlogListingFallback() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--surface-muted)]/40 py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="h-9 w-48 animate-pulse rounded-full bg-[var(--surface-muted)]" />
        </div>
      </section>
      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)]">Loading articles…</p>
        </div>
      </section>
    </>
  );
}

export default async function BlogPage() {
  const indexData = await getBlogIndexDataForLinguatudeOrEmpty();
  const { posts, categories, seo } = indexData;

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
              {seo.headline}
            </h1>
            <p
              className="mt-5 text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg animate-[fade-in-up_0.8s_ease-out_both]"
              style={{ animationDelay: "100ms" }}
            >
              {seo.subheadline}
            </p>
          </div>
        </section>

        <Suspense fallback={<BlogListingFallback />}>
          <BlogListingClient
            posts={posts}
            categories={categories}
            emptyStateMessage={seo.empty_state_message}
          />
        </Suspense>
      </main>
    </div>
  );
}
