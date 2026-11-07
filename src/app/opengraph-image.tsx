/**
 * Gambar preview saat link website dibagikan (WhatsApp, LinkedIn, X, Discord, dll).
 * Dibuat otomatis saat build dari data/profile.ts — tidak perlu desain manual.
 * Gaya editorial yang sama dengan situs: latar hampir hitam, judul besar, aksen indigo.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogFonts } from "@/assets/fonts";
import { profile } from "@/data/profile";
import { seoLang, siteUrl } from "@/data/seo";
import { tr } from "@/i18n/types";

export const alt = `${profile.name} | ${tr(profile.role, "en")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Warna tema gelap (globals.css)
const c = {
  bg: "#0a0a0b",
  surface: "#121214",
  fg: "#f5f5f4",
  muted: "#a1a1aa",
  border: "#26262a",
  accent: "#8b93ff",
};

export default async function OpengraphImage() {
  const [fonts, avatar] = await Promise.all([ogFonts(), readFile(join(process.cwd(), "public", profile.avatarUrl))]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;
  const host = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: c.bg,
          padding: "48px 64px",
          fontFamily: "Plus Jakarta Sans",
          color: c.fg,
          backgroundImage: `linear-gradient(${c.border} 1px, transparent 1px), linear-gradient(90deg, ${c.border} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      >
        {/* baris atas: wordmark + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 800, fontSize: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: c.fg, color: c.bg }}>
              {profile.shortName.charAt(0)}
            </div>
            <div style={{ display: "flex" }}>
              {profile.shortName.toUpperCase()}
              <span style={{ color: c.accent }}>.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Fragment Mono", fontSize: 22, color: c.muted }}>{host}</div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Fragment Mono", fontSize: 20, letterSpacing: 4, color: c.muted }}>
              {tr(profile.role, seoLang).toUpperCase()}
            </div>
            <div style={{ display: "flex", marginTop: 18, fontWeight: 800, fontSize: 78, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
              {profile.name}
            </div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 24, lineHeight: 1.45, color: c.muted, fontWeight: 500 }}>
              {tr(profile.tagline, seoLang)}
            </div>
            <div style={{ display: "flex", marginTop: 28, gap: 12 }}>
              {profile.heroBadges.map((b) => (
                <div
                  key={b}
                  style={{ display: "flex", padding: "8px 18px", fontSize: 20, borderRadius: 999, border: `1px solid ${c.border}`, background: c.surface }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* foto */}
          <div style={{ display: "flex", padding: 10, borderRadius: 28, background: c.surface, border: `1px solid ${c.border}` }}>
            <img src={avatarSrc} alt="" width={280} height={350} style={{ objectFit: "cover", objectPosition: "50% 20%", borderRadius: 20 }} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
