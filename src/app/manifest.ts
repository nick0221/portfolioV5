import type { MetadataRoute } from "next";

// Required by `output: "export"` (STATIC_EXPORT verification builds).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NICKDEVS — Romnick Sevilla",
    short_name: "NICKDEVS",
    description:
      "Portfolio of Romnick S. Sevilla — full-stack web developer and DevOps enthusiast.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee5",
    theme_color: "#f2eee5",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
