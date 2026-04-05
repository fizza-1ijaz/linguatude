/** Canonical site URL (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://linguatude.com"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/logo.jpg";
