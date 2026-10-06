"use client";

/**
 * Kursor retro: bingkai bidik pixel yang mengikuti mouse dengan sedikit pegas (Motion useSpring).
 * - Kursor asli tetap tampil (tidak mengganggu klik / seleksi teks).
 * - Membesar di atas link/tombol, mengecil saat diklik, hilang di atas kolom isian.
 * - Hanya untuk mouse (bukan layar sentuh) dan mati kalau pengunjung memilih "reduce motion".
 */
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], summary, label, select';
const TEXT_INPUT = 'input, textarea, [contenteditable="true"]';

export default function RetroCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"idle" | "hover" | "text">("idle");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      setMode(el?.closest(TEXT_INPUT) ? "text" : el?.closest(INTERACTIVE) ? "hover" : "idle");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = mode === "hover" ? (down ? 1.15 : 1.5) : down ? 0.75 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] text-accent"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.svg
        viewBox="0 0 12 12"
        width={28}
        height={28}
        className="block fill-current"
        style={{ shapeRendering: "crispEdges" }}
        animate={{
          scale,
          rotate: mode === "hover" ? 0 : 45,
          opacity: visible && mode !== "text" ? (mode === "hover" ? 1 : 0.75) : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* empat siku pixel */}
        <rect x="0" y="0" width="4" height="1" />
        <rect x="0" y="0" width="1" height="4" />
        <rect x="8" y="0" width="4" height="1" />
        <rect x="11" y="0" width="1" height="4" />
        <rect x="0" y="11" width="4" height="1" />
        <rect x="0" y="8" width="1" height="4" />
        <rect x="8" y="11" width="4" height="1" />
        <rect x="11" y="8" width="1" height="4" />
      </motion.svg>
    </motion.div>
  );
}
