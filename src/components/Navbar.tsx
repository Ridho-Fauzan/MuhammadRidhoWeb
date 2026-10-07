"use client";

/**
 * Navbar yang sembunyi saat scroll ke bawah dan muncul lagi saat scroll ke atas.
 * Pola dari motion.dev "Scroll Direction: Hide Header"
 * (https://motion.dev/examples/react-scroll-hide-header): useScroll + useMotionValueEvent + animate.
 * Tambahan: tetap tampil di dekat puncak halaman, saat ada fokus keyboard di dalamnya,
 * dan setiap pindah halaman.
 */
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NavSpider } from "./PixelCritters";
import RetroDock from "./RetroDock";

const SHOW_NEAR_TOP = 120; // px dari atas: navbar selalu tampil
const MIN_DELTA = 4; // abaikan getaran scroll yang sangat kecil

export default function Navbar() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Halaman baru selalu dimulai dengan navbar terlihat
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setHidden(false);
  }

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = current - previous;
    if (current < SHOW_NEAR_TOP) return setHidden(false);
    if (Math.abs(delta) < MIN_DELTA) return;
    setHidden(delta > 0);
  });

  const isHidden = hidden && !focused;

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 pt-3 px-3 sm:px-6"
      animate={{ y: isHidden ? "-110%" : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      style={{ pointerEvents: isHidden ? "none" : undefined }}
    >
      <div className="relative max-w-6xl mx-auto">
        <RetroDock />
        <NavSpider className="right-[74px] sm:right-[96px]" />
      </div>
    </motion.header>
  );
}
