import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/seo";

/** /robots.txt — izinkan semua mesin pencari dan tunjukkan lokasi sitemap */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
