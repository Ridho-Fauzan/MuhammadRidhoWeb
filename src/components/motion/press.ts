/**
 * Gerak hover & klik bersama (Motion — https://motion.dev/docs/react-gestures).
 * Spring kaku tanpa pantulan: responsif, tapi pengunjung tidak "melihat animasinya".
 * Bayangan & warna diatur CSS (.retro-btn / .lift); Motion hanya menggerakkan posisi.
 */
import type { Transition } from "motion/react";

export const snappy: Transition = { type: "spring", stiffness: 500, damping: 32, mass: 0.6 };

/** Tombol retro: naik sedikit saat hover, tertekan ke bayangan saat diklik */
export const pressButton = {
  whileHover: { x: -2, y: -2 },
  whileTap: { x: 3, y: 3, transition: { duration: 0.06 } },
  transition: snappy,
} as const;

/** Kartu: terangkat sedikit lebih jauh, tertekan ringan saat diklik */
export const pressCard = {
  whileHover: { x: -3, y: -3 },
  whileTap: { x: 1, y: 1, transition: { duration: 0.08 } },
  transition: snappy,
} as const;
