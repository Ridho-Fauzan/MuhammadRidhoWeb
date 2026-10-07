"use client";

/**
 * Navigasi pixel bersama: titik-titik (yang aktif memanjang) + tombol ◀ ▶ opsional.
 * Dipakai pemilih kelas di hero dan kutipan di footer supaya tampilannya seragam.
 */
import { motion, useAnimate } from "motion/react";

export function PixelArrow({ dir, className = "" }: { dir: "left" | "right"; className?: string }) {
  return (
    <svg
      viewBox="0 0 4 7"
      className={`w-2 h-3.5 fill-current ${dir === "left" ? "rotate-180" : ""} ${className}`}
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden
    >
      <rect x="0" y="0" width="1" height="7" />
      <rect x="1" y="1" width="1" height="5" />
      <rect x="2" y="2" width="1" height="3" />
      <rect x="3" y="3" width="1" height="1" />
    </svg>
  );
}

/** Tombol panah pixel: bergeser sedikit saat hover, "terdorong" saat diklik */
export function ArrowButton({
  dir,
  label,
  onClick,
  className = "",
}: {
  dir: "left" | "right";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLButtonElement>();
  const sign = dir === "left" ? -1 : 1;
  return (
    <motion.button
      ref={scope}
      type="button"
      onClick={() => {
        // dorongan kecil ke arah panah (tanpa me-remount tombol, jadi fokus keyboard tetap)
        animate(scope.current, { x: [0, 4 * sign, 0] }, { duration: 0.25, ease: "easeOut" });
        onClick();
      }}
      aria-label={label}
      title={label}
      whileHover={{ x: 2 * sign }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className={`flex items-center justify-center text-accent hover:text-foreground transition-colors ${className}`}
    >
      <PixelArrow dir={dir} />
    </motion.button>
  );
}

export function PixelDots({
  count,
  index,
  onPick,
  labels,
  groupLabel,
  className = "",
}: {
  count: number;
  index: number;
  onPick: (i: number) => void;
  labels?: string[];
  groupLabel: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="group" aria-label={groupLabel}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(i)}
          aria-label={labels?.[i] ?? `${i + 1} / ${count}`}
          title={labels?.[i]}
          aria-current={i === index}
          className="p-1 -m-1"
        >
          <span
            className={`block h-2 transition-[width,background-color] duration-300 ${
              i === index ? "w-6 bg-accent" : "w-2 bg-muted/50 hover:bg-muted"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
