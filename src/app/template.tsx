"use client";

import { motion } from "framer-motion";

/**
 * Transisi halus setiap pindah halaman.
 * Hanya fade (tanpa geser y): Next.js mengukur posisi elemen ini untuk scroll-ke-atas,
 * jadi offset transform membuat halaman berhenti beberapa px di bawah puncak.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
