import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogHero } from "@/app/components/blog-hero";
import { BlogListingClient } from "@/app/components/blog-listing-client";
import { SiteHeader } from "@/app/components/site-header";
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
      <section className="relative z-10 -mt-6 px-4 sm:-mt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl justify-center">
          <div className="h-14 w-full max-w-xl animate-pulse rounded-[10px] bg-[#f2f3f7]" />
        </div>
      </section>
      <section className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[#464557]">Loading articles…</p>
        </div>
      </section>
    </>
  );
}

export default async function BlogPage() {
  const indexData = await getBlogIndexDataForLinguatudeOrEmpty();
  const { posts, categories, seo } = indexData;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      <SiteHeader />

      <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <BlogHero headline={seo.headline} subheadline={seo.subheadline} />

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
