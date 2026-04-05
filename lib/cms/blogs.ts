export type BlogIndexCategory = {
  id: string;
  name: string;
};

export type BlogIndexPost = {
  id: string;
  title: string;
  excerpt: string | null;
  category: { name: string } | null;
};

export type BlogIndexPageData = {
  site_id: string;
  blog_page_meta_title: string | null;
  blog_page_meta_description: string | null;
  blog_page_headline: string | null;
  blog_page_subheadline: string | null;
  blog_empty_state_message: string | null;
  categories: BlogIndexCategory[];
  posts: BlogIndexPost[];
};

const STATIC_BLOG_INDEX: BlogIndexPageData = {
  site_id: "linguatude-static",
  blog_page_meta_title: null,
  blog_page_meta_description: null,
  blog_page_headline: null,
  blog_page_subheadline: null,
  blog_empty_state_message: null,
  categories: [],
  posts: [],
};

/** Synchronous static blog data for `output: 'export'` builds. */
export function getBlogIndexPageData(): BlogIndexPageData {
  return STATIC_BLOG_INDEX;
}
