import type { MetadataRoute } from "next";
import { pages } from "@/data/pages";
import { siteUrl } from "@/data/seo";

/** /sitemap.xml — daftar halaman untuk Google, dibuat otomatis dari data/pages.ts */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({
    url: `${siteUrl}${p.href === "/" ? "" : p.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p.href === "/" ? 1 : 0.8,
  }));
}
