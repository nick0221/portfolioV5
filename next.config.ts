import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1` produces a fully static `out/` build. It exists so the
 * site can be verified without a Next server (this sandbox blocks
 * `uv_interface_addresses`, which `next start` calls at boot); Vercel uses the
 * normal server build.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  ...(staticExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
