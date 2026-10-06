"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Garis tipis 2px di paling atas layar yang terisi sesuai posisi scroll */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-accent pointer-events-none"
      style={{ scaleX }}
    />
  );
}
