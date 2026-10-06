"use client";

/**
 * Scroll halus untuk mouse wheel / trackpad (Lenis).
 * - Sentuhan (HP/tablet) tetap scroll native bawaan browser.
 * - Otomatis mati kalau pengguna memilih "reduce motion".
 * - Elemen yang punya scroll sendiri (mis. Terminal) tetap bisa di-scroll (allowNestedScroll).
 * - Inersia dihentikan saat pindah halaman supaya Next.js bisa langsung ke paling atas.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

let current: Lenis | null = null;
/** Instance Lenis aktif (null di HP / sebelum mount) — dipakai mis. untuk mengunci scroll saat modal terbuka */
export const getLenis = () => current;

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      autoRaf: true,
      anchors: true, // jarak dari navbar diambil dari scroll-margin-top di globals.css
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = current = null;
    };
  }, []);

  // Setelah Next.js memindah scroll ke atas halaman baru, samakan posisi internal Lenis
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
      lenisRef.current?.resize();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
