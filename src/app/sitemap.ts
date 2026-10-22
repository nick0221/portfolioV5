import type { MetadataRoute } from "next";

// Required by `output: "export"` (STATIC_EXPORT verification builds).
export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
