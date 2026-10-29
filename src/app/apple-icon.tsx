/** Ikon saat website disimpan ke layar utama iPhone/iPad (180×180), dari logo pixel di assets/pixelLogo.ts. */
import { ImageResponse } from "next/og";
import { LOGO_SIZE, logoColors, logoGrid } from "@/assets/pixelLogo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS membulatkan sudut sendiri, jadi latar dibuat penuh dan logo diberi sedikit jarak tepi.
const cell = 10;
const pad = (size.width - LOGO_SIZE * cell) / 2;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: logoColors.bg }}>
        {logoGrid.flatMap((row, y) =>
          row.map((c, x) =>
            c && c !== "bg" ? (
              <div
                key={`${x}-${y}`}
                style={{ position: "absolute", left: pad + x * cell, top: pad + y * cell, width: cell, height: cell, background: logoColors[c] }}
              />
            ) : null,
          ),
        )}
      </div>
    ),
    size,
  );
}
