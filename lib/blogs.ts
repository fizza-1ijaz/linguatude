import { cache } from "react";
import { unstable_cache } from "next/cache";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

/** Matches `export const revalidate` on blog routes; override with BLOG_REVALIDATE_SECONDS. */
const BLOG_REVALIDATE_SECONDS = Math.max(
  1,
  Number(process.env.BLOG_REVALIDATE_SECONDS ?? "10"),
);

const LINGUATUDE_SITE_KEY =
  process.env.NEXT_PUBLIC_BLOG_SITE_KEY ?? "linguatude";

const SUPABASE_QUERY_RETRIES = Math.max(
  1,
  Number(process.env.SUPABASE_BUILD_RETRIES || "5"),
);
const SUPABASE_RETRY_DELAY_MS = Math.max(
  500,
  Number(process.env.SUPABASE_BUILD_RETRY_DELAY_MS || "2000"),
);

function isTransientSupabaseFailure(message: string): boolean {
  if (!message) return false;
  if (message.includes("<!DOCTYPE") || message.includes("Bad gateway"))
    return true;
  return /502|503|504|Cloudflare|timeout|fetch failed|ECONNRESET|ETIMEDOUT|NetworkError|Failed to fetch/i.test(
    message,
  );
}

async function pause(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

function truncateForError(message: string, max = 420) {
  const t = message.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

async function execPostgrestWithRetries<T>(
  label: string,
  op: () => PromiseLike<{
    data: T;
    error: { message?: string; code?: string } | null;
  }>,
): Promise<T> {
  let lastMsg = "";
  for (let attempt = 1; attempt <= SUPABASE_QUERY_RETRIES; attempt++) {
    const { data, error } = await op();
    if (!error) return data as T;

    lastMsg = error.message || error.code || "unknown error";

    if (!isTransientSupabaseFailure(lastMsg)) {
      throw new Error(`${label}: ${truncateForError(lastMsg)}`);
    }

    if (attempt >= SUPABASE_QUERY_RETRIES) break;

    console.warn(
      `[blogs] ${label}: transient failure (attempt ${attempt}/${SUPABASE_QUERY_RETRIES}), retrying in ${SUPABASE_RETRY_DELAY_MS * attempt}ms…`,
    );
    await pause(SUPABASE_RETRY_DELAY_MS * attempt);
  }

  throw new Error(`${label}: ${truncateForError(lastMsg)}`);
}

/** DB column is `date_published`; exposed to the app as `display_date`. */
const BLOG_SEO_FIELDS =
  "slug, title, description, meta_title, meta_description, cover_image_url, date_published, author_name, keywords, article_section";

export type BlogListRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  display_date: string | null;
  author_name: string | null;
  keywords: string | null;
  article_section: string | null;
  category: BlogCategoryRef | null;
};

export type BlogPostRow = BlogListRow & {
  content: string | null;
};

export type BlogCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

export type BlogCategoryRow = BlogCategoryRef & {
  sort_order: number;
};

export type BlogIndexSeo = {
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  empty_state_message: string;
};

export type BlogIndexDataForLinguatude = {
  site_id: string;
  seo: BlogIndexSeo;
  categories: BlogCategoryRow[];
  posts: BlogListRow[];
};

type SiteBlogPageRow = {
  id: string;
  blog_page_meta_title?: string | null;
  blog_page_meta_description?: string | null;
  blog_page_headline?: string | null;
  blog_page_subheadline?: string | null;
  blog_page_empty_state_message?: string | null;
};

const DEFAULT_INDEX_SEO: BlogIndexSeo = {
  title:
    "The Linguatude Blog — IELTS, TOEFL, PTE Preparation & English Learning",
  description:
    "Guides, tips, and research-backed articles on IELTS, TOEFL, PTE Academic, and Cambridge English preparation — plus honest perspectives on AI in language learning.",
  headline: "The Linguatude blog",
  subheadline: "Strategy, score maths and honest prep advice.",
  empty_state_message:
    "The first articles are on their way — covering IELTS preparation, TOEFL strategies, PTE Academic practice, and what AI can genuinely do to help you prepare for an English proficiency test. Check back soon.",
};

type BlogRowFromDb = {
  date_published?: string | null;
  display_date?: string | null;
};

function normalizeDisplayDate(row: BlogRowFromDb): string | null {
  return row.date_published ?? row.display_date ?? null;
}

function normalizeCategory(value: unknown): BlogCategoryRef | null {
  if (!value || Array.isArray(value) || typeof value !== "object") return null;
  const row = value as Partial<BlogCategoryRef>;
  if (!row.id || !row.name || !row.slug) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
  };
}

function toSeo(site: SiteBlogPageRow | null): BlogIndexSeo {
  if (!site) return DEFAULT_INDEX_SEO;
  return {
    title: site.blog_page_meta_title?.trim() || DEFAULT_INDEX_SEO.title,
    description:
      site.blog_page_meta_description?.trim() || DEFAULT_INDEX_SEO.description,
    headline: site.blog_page_headline?.trim() || DEFAULT_INDEX_SEO.headline,
    subheadline:
      site.blog_page_subheadline?.trim() || DEFAULT_INDEX_SEO.subheadline,
    empty_state_message:
      site.blog_page_empty_state_message?.trim() ||
      DEFAULT_INDEX_SEO.empty_state_message,
  };
}

export const getSiteIdForLinguatude = cache(async (): Promise<string | null> => {
  if (!isSupabaseConfigured) return null;

  const data = await execPostgrestWithRetries("resolve linguatude site_id", () =>
    supabase
      .from("sites")
      .select("id")
      .eq("site_key", LINGUATUDE_SITE_KEY)
      .limit(1)
      .maybeSingle() as PromiseLike<{
      data: { id: string } | null;
      error: { message?: string; code?: string } | null;
    }>,
  );

  return data?.id ?? null;
});

async function loadLinguatudeBlogPageSeo(
  siteId: string,
): Promise<SiteBlogPageRow | null> {
  try {
    return await execPostgrestWithRetries("load linguatude blog page seo", () =>
      supabase
        .from("sites")
        .select(
          "id, blog_page_meta_title, blog_page_meta_description, blog_page_headline, blog_page_subheadline, blog_page_empty_state_message",
        )
        .eq("id", siteId)
        .limit(1)
        .maybeSingle() as PromiseLike<{
        data: SiteBlogPageRow | null;
        error: { message?: string; code?: string } | null;
      }>,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const missingEmptyStateColumn =
      message.includes("blog_page_empty_state_message") &&
      message.includes("does not exist");

    if (!missingEmptyStateColumn) {
      throw error;
    }

    return await execPostgrestWithRetries(
      "load linguatude blog page seo (legacy schema)",
      () =>
        supabase
          .from("sites")
          .select(
            "id, blog_page_meta_title, blog_page_meta_description, blog_page_headline, blog_page_subheadline",
          )
          .eq("id", siteId)
          .limit(1)
          .maybeSingle() as PromiseLike<{
          data: SiteBlogPageRow | null;
          error: { message?: string; code?: string } | null;
        }>,
    );
  }
}

async function fetchBlogIndexDataForLinguatudeUncached(): Promise<BlogIndexDataForLinguatude> {
  const siteId = await getSiteIdForLinguatude();

  if (!siteId) {
    return {
      site_id: "",
      seo: DEFAULT_INDEX_SEO,
      categories: [],
      posts: [],
    };
  }

  const [siteRow, categoriesData, postsData] = await Promise.all([
    loadLinguatudeBlogPageSeo(siteId),
    execPostgrestWithRetries("load linguatude blog categories", () =>
      supabase
        .from("blog_categories")
        .select("id, name, slug, sort_order")
        .eq("site_id", siteId)
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
    ),
    execPostgrestWithRetries("load linguatude blogs", () =>
      supabase
        .from("blogs")
        .select(
          `id, ${BLOG_SEO_FIELDS}, category:blog_categories(id, name, slug)`,
        )
        .eq("site_id", siteId)
        .eq("status", "published")
        .order("date_published", { ascending: false }),
    ),
  ]);

  const categories = (
    (categoriesData ?? []) as Array<{
      id: string;
      name: string;
      slug: string;
      sort_order: number | null;
    }>
  ).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    sort_order: row.sort_order ?? 0,
  }));

  const posts = (
    (postsData ?? []) as Array<
      Omit<BlogListRow, "category" | "display_date"> &
        BlogRowFromDb & { category: unknown }
    >
  ).map((row) => {
    const { date_published: _datePublished, ...rest } = row;
    return {
      ...rest,
      display_date: normalizeDisplayDate(row),
      category: normalizeCategory(row.category),
    };
  });

  return {
    site_id: siteId,
    seo: toSeo(siteRow),
    categories,
    posts,
  };
}

/** Supabase-backed index; Data Cache revalidate mirrors `fetch(..., { next: { revalidate } })`. */
export async function getBlogIndexDataForLinguatude(): Promise<BlogIndexDataForLinguatude> {
  return unstable_cache(
    () => fetchBlogIndexDataForLinguatudeUncached(),
    ["blog-index", LINGUATUDE_SITE_KEY],
    { revalidate: BLOG_REVALIDATE_SECONDS },
  )();
}

async function fetchBlogBySlugForLinguatudeUncached(
  slug: string,
): Promise<BlogPostRow | null> {
  const siteId = await getSiteIdForLinguatude();
  if (!siteId) return null;

  const row = await execPostgrestWithRetries(`fetch linguatude blog "${slug}"`, () =>
    supabase
      .from("blogs")
      .select(
        `id, content, ${BLOG_SEO_FIELDS}, category:blog_categories(id, name, slug)`,
      )
      .eq("site_id", siteId)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle(),
  );

  if (!row) return null;

  const typedRow = row as Omit<BlogPostRow, "category" | "display_date"> &
    BlogRowFromDb & { category: unknown };
  const { date_published: _datePublished, ...rest } = typedRow;
  return {
    ...rest,
    display_date: normalizeDisplayDate(typedRow),
    category: normalizeCategory(typedRow.category),
  };
}

export async function getBlogBySlugForLinguatude(
  slug: string,
): Promise<BlogPostRow | null> {
  return unstable_cache(
    () => fetchBlogBySlugForLinguatudeUncached(slug),
    ["blog-post", LINGUATUDE_SITE_KEY, slug],
    { revalidate: BLOG_REVALIDATE_SECONDS },
  )();
}

export async function getBlogsForConfiguredSite(): Promise<BlogListRow[]> {
  try {
    const data = await getBlogIndexDataForLinguatude();
    return data.posts;
  } catch (e) {
    if (process.env.BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR === "1") {
      console.warn(
        "[blogs] BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR=1: returning empty blog list after Supabase failure.",
      );
      return [];
    }
    throw e;
  }
}

export async function getBlogBySlugForConfiguredSite(
  slug: string,
): Promise<BlogPostRow | null> {
  return getBlogBySlugForLinguatude(slug);
}

async function fetchBlogSlugsForConfiguredSiteUncached(): Promise<
  { slug: string; display_date: string | null }[]
> {
  const siteId = await getSiteIdForLinguatude();
  if (!siteId) return [];

  const data = await execPostgrestWithRetries("fetch blog slugs", () =>
    supabase
      .from("blogs")
      .select("slug, date_published")
      .eq("site_id", siteId)
      .eq("status", "published"),
  );
  return (
    (data ?? []) as Array<{ slug: string; date_published: string | null }>
  ).map((row) => ({
    slug: row.slug,
    display_date: row.date_published,
  }));
}

export async function getBlogSlugsForConfiguredSite(): Promise<
  { slug: string; display_date: string | null }[]
> {
  try {
    return await unstable_cache(
      () => fetchBlogSlugsForConfiguredSiteUncached(),
      ["blog-slugs", LINGUATUDE_SITE_KEY],
      { revalidate: BLOG_REVALIDATE_SECONDS },
    )();
  } catch (e) {
    if (process.env.BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR === "1") {
      console.warn(
        "[blogs] BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR=1: returning no static blog slugs after Supabase failure.",
      );
      return [];
    }
    throw e;
  }
}

/** Safe for static export builds when Supabase may be unavailable. */
export async function getBlogIndexDataForLinguatudeOrEmpty(): Promise<BlogIndexDataForLinguatude> {
  try {
    return await getBlogIndexDataForLinguatude();
  } catch (e) {
    if (process.env.BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR === "1") {
      console.warn(
        "[blogs] BUILD_SKIP_BLOGS_ON_SUPABASE_ERROR=1: returning empty blog index after Supabase failure.",
      );
      return {
        site_id: "",
        seo: DEFAULT_INDEX_SEO,
        categories: [],
        posts: [],
      };
    }
    throw e;
  }
}
