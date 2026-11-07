"use client";

/**
 * Latar interaktif tiap halaman, warnanya ikut tema (netral + aksen indigo):
 * - "dots"   : React Bits DotGrid — titik-titik yang menyibak & memantul mengikuti kursor.
 * - "matrix" : ThreeUI Dot Matrix — titik berdenyut pelan (WebGL).
 * Canvas dibuat "sticky" setinggi layar (bukan setinggi halaman) agar ringan, dimuat hanya di browser,
 * dibungkus error boundary, dan memudar ke bawah supaya teks tetap mudah dibaca.
 */
import dynamic from "next/dynamic";
import { useTheme } from "./ThemeToggle";
import WebGLBoundary from "./WebGLBoundary";

const DotGrid = dynamic(() => import("./reactbits/DotGrid"), { ssr: false });
const DotMatrix = dynamic(() => import("./threeui/DotMatrixBackground").then((m) => m.DotMatrixBackground), { ssr: false });

export type BackgroundVariant = "dots" | "matrix";

export default function PageBackground({ variant = "dots" }: { variant?: BackgroundVariant }) {
  const { dark } = useTheme();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="sticky top-0 h-[100svh] w-full [mask-image:linear-gradient(to_bottom,#000_0%,#000_45%,transparent_95%)]">
        <WebGLBoundary>
          {variant === "dots" ? (
            // pointer-events aktif hanya di canvas DotGrid (konten di atasnya tetap bisa diklik karena lapisan ini di belakang)
            <DotGrid
              dotSize={3}
              gap={26}
              baseColor={dark ? "#26262a" : "#dedcd8"}
              activeColor={dark ? "#8b93ff" : "#4f46e5"}
              proximity={130}
              shockRadius={220}
              shockStrength={3}
              glow={0.3}
              opacity={0.9}
              clickShock={false}
            />
          ) : (
            <DotMatrix
              className="absolute inset-0"
              gridScale={42}
              radius={0.16}
              pulseSpeed={0.6}
              opacity={dark ? 0.45 : 0.6}
              mouseAmount={0.03}
              colorA={dark ? "#3a3a40" : "#cfcecb"}
              colorB={dark ? "#8b93ff" : "#4f46e5"}
            />
          )}
        </WebGLBoundary>
      </div>
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[56rem] h-[30rem] rounded-full opacity-50 blur-3xl bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" />
    </div>
  );
}
