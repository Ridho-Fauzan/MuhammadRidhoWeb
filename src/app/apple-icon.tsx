/** Ikon saat website disimpan ke layar utama iPhone/iPad (180×180), dibuat saat build. */
import { ImageResponse } from "next/og";
import { ogFonts } from "@/assets/fonts";
import { profile } from "@/data/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fonts = await ogFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0819",
          border: "10px solid #f9c74f",
          fontFamily: "Silkscreen",
          fontWeight: 400,
          fontSize: 120,
          paddingBottom: 12,
          color: "#f9c74f",
        }}
      >
        {profile.shortName.charAt(0).toUpperCase()}
      </div>
    ),
    { ...size, fonts },
  );
}
