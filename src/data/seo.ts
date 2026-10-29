/**
 * ============================================================
 *  SEO & METADATA — judul tab, deskripsi Google, preview link
 *  (WhatsApp, LinkedIn, X, Discord), sitemap, dan data terstruktur.
 *  Sebagian besar diambil otomatis dari data/profile.ts.
 * ============================================================
 */
import type { Metadata } from "next";
import { pages, type PageKey } from "@/data/pages";
import { experiences, profile, projects, skills, socials } from "@/data/profile";
import { tr, type Lang } from "@/i18n/types";
import { ui } from "@/i18n/ui";

/** URL utama website (tanpa "/" di akhir). Ganti kalau pindah domain. */
export const siteUrl = "https://www.bangepep.my.id";

/** Bahasa teks metadata (judul, deskripsi, preview link). */
export const seoLang: Lang = "en";
const ogLocale = { en: "en_US", id: "id_ID" } as const;

const role = tr(profile.role, seoLang);
const location = tr(profile.location, seoLang);

export const siteName = `${profile.name} | ${role}`;
export const siteDescription = `${tr(profile.tagline, seoLang)} Portfolio of ${profile.name}, a ${role} based in ${location}.`;

export const keywords = [
  profile.name,
  profile.shortName,
  profile.handle,
  ...profile.roles.map((r) => tr(r, seoLang)),
  ...profile.heroBadges,
  "Portfolio",
  location,
];

/** ["a", "b", "c"] -> "a, b, and c" */
const listText = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Gambar preview dari src/app/opengraph-image.tsx */
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: siteName, type: "image/png" };

/**
 * Pengaturan Open Graph yang sama di semua halaman. Next.js tidak menggabungkan `openGraph`
 * antar halaman, jadi gambar preview harus ikut disebut di tiap halaman.
 */
const sharedOpenGraph = {
  type: "website",
  siteName,
  locale: ogLocale[seoLang],
  alternateLocale: ogLocale[seoLang === "en" ? "id" : "en"],
  images: [ogImage],
} satisfies Metadata["openGraph"];

/** Deskripsi tiap halaman di hasil Google & preview link. */
const pageDescriptions: Record<Exclude<PageKey, "home">, string> = {
  about: `About ${profile.name}: a Computer Science student at BINUS University and ${role} from ${location}.`,
  skills: `Frontend, web, and game development skills of ${profile.name}: ${skills
    .flatMap((s) => s.items.map((i) => tr(i, seoLang)))
    .slice(0, 8)
    .join(", ")}, and more.`,
  // mis. "FloraDex (Unity 6), Kawan Aksi (HTML), and SpoJeDy (Vue 3)" — teknologi = tag pertama tiap proyek
  projects: `Projects built by ${profile.name}: ${listText(
    projects
      .filter((p) => !p.comingSoon)
      .map((p) => `${tr(p.title, seoLang).split(" — ")[0]}${p.tags[0] ? ` (${p.tags[0]})` : ""}`),
  )}.`,
  experience: `Education and experience of ${profile.name}, ${role}.`,
  contact: `Get in touch with ${profile.name} for collaboration, internships, or freelance work.`,
};

/** Metadata untuk halaman selain beranda. Dipakai di src/app/<halaman>/page.tsx. */
export function pageMetadata(key: Exclude<PageKey, "home">): Metadata {
  const path = pages.find((p) => p.key === key)!.href;
  const title = ui[seoLang].nav[key];
  const description = pageDescriptions[key];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title: `${title} | ${profile.name}`, description },
    twitter: { card: "summary_large_image", title: `${title} | ${profile.name}`, description, images: [ogImage] },
  };
}

/** Metadata dasar (dipakai di src/app/layout.tsx). */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${profile.name}` },
  description: siteDescription,
  applicationName: `${profile.shortName}//OS`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords,
  category: "portfolio",
  alternates: { canonical: "/" },
  openGraph: { ...sharedOpenGraph, url: "/", title: siteName, description: siteDescription },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

/** Data terstruktur (JSON-LD) supaya Google mengenali pemilik website. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: [profile.shortName, profile.handle],
      url: siteUrl,
      image: `${siteUrl}${profile.avatarUrl}`,
      jobTitle: role,
      description: tr(profile.tagline, seoLang),
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
      alumniOf: experiences.map((e) => ({ "@type": "EducationalOrganization", name: tr(e.company, seoLang) })),
      knowsAbout: [...new Set(skills.flatMap((s) => s.items.map((i) => tr(i, seoLang))))],
      sameAs: socials.filter((s) => ["github", "linkedin", "instagram"].includes(s.key)).map((s) => s.url),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: ["en", "id"],
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};
