import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { siteDescription, siteName } from "@/data/seo";

/** /manifest.webmanifest — nama & ikon saat website ditambahkan ke layar utama HP */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: profile.shortName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0819",
    theme_color: "#0b0819",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
