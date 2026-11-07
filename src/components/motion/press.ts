/**
 * Gerak hover & klik bersama (Motion — https://motion.dev/docs/react-gestures).
 * Spring kaku tanpa pantulan: responsif, tapi pengunjung tidak "melihat animasinya".
 * Warna & bayangan diatur CSS (.btn / .lift); Motion hanya menggerakkan posisi.
 */
import type { Transition } from "motion/react";

export const snappy: Transition = { type: "spring", stiffness: 500, damping: 32, mass: 0.6 };

/** Tombol: naik sedikit saat hover, mengecil ringan saat diklik */
export const pressButton = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97, transition: { duration: 0.06 } },
  transition: snappy,
} as const;

/** Kartu: terangkat sedikit saat hover, tertekan ringan saat diklik */
export const pressCard = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.99, transition: { duration: 0.08 } },
  transition: snappy,
} as const;
