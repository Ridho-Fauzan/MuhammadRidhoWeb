/**
 * Gambar preview saat link website dibagikan (WhatsApp, LinkedIn, X, Discord, dll).
 * Dibuat otomatis saat build dari data/profile.ts — tidak perlu desain manual.
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
  bg: "#0b0819",
  surface: "#1a1030",
  fg: "#f4e6c8",
  muted: "#b9a7e8",
  gold: "#f9c74f",
  coral: "#f47b5c",
  shadow: "#050310",
};

export default async function OpengraphImage() {
  const [fonts, avatar] = await Promise.all([
    ogFonts(),
    readFile(join(process.cwd(), "public", profile.avatarUrl)),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;
  const host = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, padding: 40, fontFamily: "Fragment Mono" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: c.surface,
            border: `4px solid ${c.fg}`,
            boxShadow: `14px 14px 0 ${c.shadow}`,
          }}
        >
          {/* bar atas ala navbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: `4px solid ${c.fg}` }}>
            <div style={{ display: "flex", fontFamily: "Silkscreen", fontWeight: 700, fontSize: 28, color: c.gold }}>
              {`+ ${profile.shortName.toUpperCase()}//OS`}
            </div>
            <div style={{ display: "flex", fontSize: 22, color: c.muted }}>{host}</div>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 48px", gap: 40 }}>
            {/* teks */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 26, color: c.coral }}>&gt; Hi, I&apos;m</div>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  fontFamily: "Silkscreen",
                  fontWeight: 700,
                  fontSize: 46,
                  lineHeight: 1.15,
                  color: c.fg,
                }}
              >
                {profile.name}
              </div>
              <div style={{ display: "flex", marginTop: 18, fontSize: 32, color: c.gold }}>{tr(profile.role, seoLang)}</div>
              <div style={{ display: "flex", marginTop: 14, fontSize: 21, lineHeight: 1.45, color: c.muted }}>
                {tr(profile.tagline, seoLang)}
              </div>
              <div style={{ display: "flex", marginTop: 26, gap: 12 }}>
                {profile.heroBadges.map((b) => (
                  <div key={b} style={{ display: "flex", padding: "6px 14px", fontSize: 20, color: c.fg, border: `2px solid ${c.muted}`, background: c.bg }}>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* foto polaroid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "14px 14px 44px",
                background: c.fg,
                border: `3px solid ${c.shadow}`,
                boxShadow: `10px 10px 0 ${c.shadow}`,
                transform: "rotate(3deg)",
              }}
            >
              <div style={{ position: "absolute", top: -16, left: 95, width: 100, height: 28, background: c.coral, opacity: 0.9, transform: "rotate(-4deg)" }} />
              <img src={avatarSrc} alt="" width={260} height={320} style={{ objectFit: "cover", objectPosition: "50% 20%", border: `3px solid ${c.shadow}` }} />
            </div>
          </div>

          {/* garis warna di bawah, sama seperti garis judul section */}
          <div style={{ display: "flex", height: 14 }}>
            <div style={{ flex: 2, background: c.gold }} />
            <div style={{ flex: 1, background: c.coral }} />
            <div style={{ flex: 1, background: c.muted }} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
