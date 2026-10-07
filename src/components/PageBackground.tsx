"use client";

/**
 * Latar animasi bertema retro untuk tiap halaman.
 * Canvas dibuat "sticky" setinggi layar (bukan setinggi halaman) agar ringan,
 * dimuat hanya di browser, dan dibungkus error boundary.
 */
import dynamic from "next/dynamic";
import WebGLBoundary from "./WebGLBoundary";
import { useTheme } from "./ThemeToggle";

const FaultyTerminal = dynamic(() => import("./reactbits/FaultyTerminal"), {
  ssr: false,
});
const PixelSnow = dynamic(() => import("./reactbits/PixelSnow"), {
  ssr: false,
});
const Waves = dynamic(() => import("./reactbits/Waves"), {
  ssr: false,
});
const ShapeGrid = dynamic(() => import("./reactbits/ShapeGrid"), {
  ssr: false,
});
const DotMatrix = dynamic(
  () =>
    import("./threeui/DotMatrixBackground").then((m) => m.DotMatrixBackground),
  { ssr: false },
);

export type BackgroundVariant =
  "terminal" | "dots" | "grid" | "snow" | "waves" | "grid-diagonal";

export default function PageBackground({
  variant,
}: {
  variant: BackgroundVariant;
}) {
  const { dark } = useTheme();

  const layer = (() => {
    switch (variant) {
      case "terminal":
        return (
          <FaultyTerminal
            scale={1.6}
            gridMul={[2, 1]}
            digitSize={1.3}
            timeScale={0.35}
            scanlineIntensity={0.4}
            glitchAmount={1}
            flickerAmount={0.6}
            noiseAmp={0.8}
            curvature={0.12}
            tint={dark ? "#f9c74f" : "#6d28d9"}
            mouseReact={false}
            pageLoadAnimation
            brightness={dark ? 0.45 : 0.6}
            lightMode={!dark}
            dpr={1}
          />
        );
      case "dots":
        return (
          <DotMatrix
            className="absolute inset-0"
            gridScale={42}
            radius={0.18}
            pulseSpeed={0.6}
            opacity={dark ? 0.55 : 0.9}
            mouseAmount={0.03}
          />
        );
      case "snow":
        return (
          <PixelSnow
            color={dark ? "#b9a7e8" : "#4b2f7e"}
            variant="square"
            flakeSize={0.012}
            minFlakeSize={1.5}
            pixelResolution={180}
            speed={0.8}
            density={0.28}
            direction={115}
            brightness={dark ? 1 : 0.9}
          />
        );
      case "waves":
        // garis-garis halus yang bergelombang pelan & menyibak mengikuti kursor
        return (
          <Waves
            lineColor={dark ? "rgba(185, 167, 232, 0.32)" : "rgba(109, 40, 217, 0.22)"}
            lineWidth={1}
            waveSpeedX={0.008}
            waveSpeedY={0.004}
            waveAmpX={36}
            waveAmpY={18}
            xGap={14}
            yGap={36}
            friction={0.92}
            tension={0.006}
            maxCursorMove={90}
          />
        );
      case "grid":
      case "grid-diagonal":
        return (
          <ShapeGrid
            direction={variant === "grid" ? "up" : "diagonal"}
            speed={0.35}
            squareSize={44}
            shape="square"
            borderColor={
              dark ? "rgba(75, 47, 126, 0.55)" : "rgba(26, 16, 48, 0.12)"
            }
            hoverFillColor={dark ? "#241548" : "#e9d7ad"}
          />
        );
    }
  })();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-[100svh] w-full">
        <WebGLBoundary>
          <div
            className={`absolute inset-0 ${
              variant === "terminal"
                ? dark
                  ? "opacity-60"
                  : "opacity-25 mix-blend-multiply"
                : dark
                  ? "opacity-80"
                  : "opacity-60 mix-blend-multiply"
            }`}
          >
            {layer}
          </div>
        </WebGLBoundary>
        {/* Vignette agar teks tetap mudah dibaca */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--background)_55%,transparent)_0%,color-mix(in_srgb,var(--background)_20%,transparent)_55%,var(--background)_100%)]" />
      </div>
    </div>
  );
}
