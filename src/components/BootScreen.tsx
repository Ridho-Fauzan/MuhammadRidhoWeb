"use client";

/**
 * Layar "booting" retro saat pertama kali membuka situs (sekali per sesi tab).
 * - Dirender di HTML server supaya tidak ada kedipan konten sebelum layar muncul.
 * - Script di <head> (layout.tsx) menandai <html data-booted> kalau sudah pernah boot di sesi ini -> langsung disembunyikan CSS.
 * - Pengaman: tanpa JavaScript / reduce motion -> tidak tampil; kalau JS macet, CSS menyembunyikannya setelah 4 detik.
 * - Klik / tekan tombol apa saja untuk melewati.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";

const DURATION = 1100; // ms dari 0 ke 100
const BLOCKS = 20;

export default function BootScreen() {
  const { t } = useLang();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.booted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // CSS sudah menyembunyikannya; cukup lepas dari DOM
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }
    const finish = () => {
      if (done.current) return;
      done.current = true;
      setPct(100);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      setTimeout(() => setShow(false), 220);
    };

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // naik cepat lalu melambat di akhir, seperti loading sungguhan
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  // kunci scroll selama boot
  useEffect(() => {
    if (!show) return;
    const html = document.documentElement;
    if (html.dataset.booted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [show]);

  const filled = Math.round((pct / 100) * BLOCKS);
  const line = (at: number, text: string) =>
    pct >= at && (
      <p>
        {text} <span className="text-[#7fd1ae]">{pct >= at + 25 ? "OK" : "..."}</span>
      </p>
    );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="boot fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0819] text-[#f4e6c8] font-mono"
          exit={{ opacity: 0, y: "-6%", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden
        >
          {/* scanline */}
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0.45)_0_1px,transparent_1px_3px)]" />

          <div className="relative w-[min(88vw,420px)] text-sm">
            <p className="font-display text-3xl sm:text-4xl text-[#f9c74f]">
              {profile.shortName.toUpperCase()}
              <span className="text-[#f47b5c]">{"//"}</span>OS
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#b9a7e8]">BIOS v1.0 · {new Date().getFullYear()}</p>

            <div className="mt-6 space-y-1 text-xs uppercase tracking-[0.12em] text-[#b9a7e8] min-h-[3.5rem]">
              {line(0, t.boot.checking)}
              {line(30, t.boot.loading)}
              {pct >= 100 && <p className="text-[#f9c74f]">{t.boot.ready}_</p>}
            </div>

            {/* bar progres blok pixel */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex flex-1 gap-[3px] p-[3px] border-2 border-[#f4e6c8]">
                {Array.from({ length: BLOCKS }, (_, i) => (
                  <span key={i} className={`h-3 flex-1 ${i < filled ? "bg-[#f9c74f]" : "bg-[#241548]"}`} />
                ))}
              </div>
              <span className="w-12 text-right tabular-nums text-[#f9c74f]">{String(pct).padStart(3, "0")}%</span>
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#b9a7e8]/60">{t.boot.skip}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
