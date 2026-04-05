import type { NextConfig } from "next";

/**
 * ISR / `revalidate` need a Node server (`next build` + `next start`).
 * Set `NEXT_STATIC_EXPORT=true` for a static `out/` folder (no on-demand revalidation).
 */
const nextConfig: NextConfig = {
  ...(process.env.NEXT_STATIC_EXPORT === "true"
    ? { output: "export" as const }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
