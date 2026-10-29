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
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
