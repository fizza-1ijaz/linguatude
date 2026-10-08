import type { NextConfig } from "next";

/**
 * ISR / `revalidate` need a Node server (`next build` + `next start`).
 * Set `NEXT_STATIC_EXPORT=true` for a static `out/` folder (no on-demand revalidation).
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return [
            {
              source: "/signin",
              destination: "/login",
              permanent: true,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
