import type { MetadataRoute } from "next";

// Required by `output: "export"` (STATIC_EXPORT verification builds).
export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
