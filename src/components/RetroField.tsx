"use client";

/** Latar shader dither "dusk" dari ThreeUI retro dock, dipakai di hero & halaman Kontak. */
import { useEffect, useRef } from "react";
import { createRetroPixelField } from "./threeui/retroPixelField";

export default function RetroField({
  className = "",
  pixelSize = 5,
  speed = 0.8,
  noise = 1,
  levels = 7,
}: {
  className?: string;
  pixelSize?: number;
  speed?: number;
  noise?: number;
  levels?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opts = useRef({ pixelSize, speed, noise, levels });

  useEffect(() => {
    opts.current = { pixelSize, speed, noise, levels };
  }, [pixelSize, speed, noise, levels]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const field = createRetroPixelField(canvas, () => (reduce ? { ...opts.current, speed: 0 } : opts.current));
    let frame = 0;
    let visible = true;
    const resize = () => {
      const b = host.getBoundingClientRect();
      field.resize(b.width, b.height);
    };
    const tick = (now: number) => {
      field.render(now);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    const onVisible = () => {
      if (!document.hidden && visible && !frame) frame = requestAnimationFrame(tick);
    };
    ro.observe(host);
    io.observe(host);
    document.addEventListener("visibilitychange", onVisible);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      field.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" style={{ imageRendering: "pixelated" }} />
    </div>
  );
}
