import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

/** Fields needed to emit Schema.org BlogPosting JSON-LD */
export type BlogPostForJsonLd = {
  title: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  display_date: string | null;
  author_name: string | null;
  keywords: string | null;
  article_section: string | null;
};

export function buildBlogPostingJsonLd(
  blog: BlogPostForJsonLd,
): Record<string, unknown> {
  const url = `${SITE_URL}/blog/${blog.slug}`;
  const headline = blog.meta_title?.trim() || blog.title;
  const description =
    blog.meta_description?.trim() ||
    blog.description?.trim() ||
    undefined;

  const image =
    blog.cover_image_url?.trim() || `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  if (description) jsonLd.description = description;

  if (blog.display_date) {
    jsonLd.datePublished = new Date(blog.display_date).toISOString();
  }

  if (image) jsonLd.image = image;

  const kw = blog.keywords?.trim();
  if (kw) jsonLd.keywords = kw;

  const section = blog.article_section?.trim();
  if (section) jsonLd.articleSection = section;

  const author = blog.author_name?.trim();
  if (author) {
    jsonLd.author = {
      "@type": "Person",
      name: author,
    };
  }

  return jsonLd;
}
