"use client";

/**
 * "Pick your card" — kartu navigasi ke halaman lain.
 * - variant="hand": kartu dikipas seperti kartu di tangan (beranda). Hover = kartu naik & lurus.
 * - variant="row" : baris kartu kecil di bawah tiap halaman ("Pilih kartu berikutnya").
 * Gambar dari cardImages (profile.ts): pixel art Kenney (*.pixel.png, tajam & berwarna) atau foto (hitam-putih, berwarna saat hover).
 * Kosong: ikon pixel besar.
 * Animasi: Motion (whileInView, whileHover, whileTap).
 */
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { pages, type PageKey } from "@/data/pages";
import { cardImages } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import MotionLink from "./motion/MotionLink";
import { pressCard, snappy } from "./motion/press";
import { PixelIcon } from "./pixelIcons";

type CardKey = Exclude<PageKey, "home">;

/** Warna tiap kartu — palet "dusk" + dua warna pelengkap */
const CARD_COLOR: Record<CardKey, string> = {
  about: "#f9c74f",
  skills: "#f47b5c",
  projects: "#b9a7e8",
  experience: "#7fd1ae",
  contact: "#e8829b",
};
const INK = "#1a1030";

/** File "*.pixel.png" = pixel art (lihat scripts/kenney): tidak di-blur oleh optimasi gambar & tidak dibuat hitam-putih */
const isPixelArt = (src: string) => /\.pixel\.(png|gif|webp)$/i.test(src);

const cardPages = pages.filter((p) => p.key !== "home") as { key: CardKey; href: string }[];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/* ---------------------------------- Kartu di tangan (beranda) ---------------------------------- */

export function CardHand() {
  const { t } = useLang();
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const n = cardPages.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  // setelah animasi masuk selesai, hover tidak lagi pakai delay bertingkat
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:flex lg:justify-center lg:gap-0 lg:pt-10 lg:pb-6"
      onMouseLeave={() => setHovered(null)}
    >
      {cardPages.map((p, i) => {
        // posisi kipas: miring ke luar & sedikit turun di pinggir (busur)
        const mid = (n - 1) / 2;
        const offset = i - mid;
        const fan = desktop ? { rotate: offset * 6, y: Math.abs(offset) * Math.abs(offset) * 6 } : { rotate: 0, y: 0 };
        const isHover = hovered === i;
        const dim = desktop && hovered !== null && !isHover;

        return (
          <motion.div
            key={p.key}
            className={`relative ${desktop ? "-mx-1.5 w-[210px] shrink-0" : ""} ${i === n - 1 ? "max-sm:col-span-2 max-sm:justify-self-center max-sm:w-[calc(50%-0.5rem)]" : ""}`}
            // kartu kanan menumpuk di atas kartu kiri (seperti kartu di tangan) -> judul kiri tiap kartu tetap terbaca
            style={{ zIndex: isHover ? 20 : i + 1, transformOrigin: "50% 120%" }}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: 0 }}
            animate={
              !inView && !reduce
                ? { opacity: 0, y: 60, rotate: 0 }
                : { ...fan, ...(isHover && desktop ? { rotate: 0, y: -28, scale: 1.05 } : { scale: 1 }), opacity: dim ? 0.75 : 1 }
            }
            transition={{ ...snappy, delay: settled ? 0 : i * 0.06 }}
            onMouseEnter={() => setHovered(i)}
          >
            <MotionLink
              href={p.href}
              whileTap={{ scale: 0.97 }}
              aria-label={t.nav[p.key]}
              className="group block"
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <PlayingCard k={p.key} index={i} active={isHover} />
            </MotionLink>
          </motion.div>
        );
      })}
    </div>
  );
}

function PlayingCard({ k, index, active }: { k: CardKey; index: number; active: boolean }) {
  const { t } = useLang();
  const color = CARD_COLOR[k];
  const image = cardImages[k];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative aspect-[5/7] overflow-hidden border-2 border-foreground transition-shadow duration-300"
      style={{
        background: color,
        color: INK,
        boxShadow: active ? "10px 10px 0 var(--shadow)" : "5px 5px 0 var(--shadow)",
      }}
    >
      {/* tekstur titik pixel */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: `radial-gradient(${INK} 1px, transparent 1px)`, backgroundSize: "10px 10px" }}
      />

      {/* sudut atas: nomor + ikon kecil (seperti kartu remi) */}
      <div className="relative flex items-start justify-between p-3">
        <span className="font-display text-lg leading-none">{num}</span>
        <PixelIcon k={k} className="w-4 h-4" cut={color} />
      </div>

      {/* tengah: foto (jika ada) atau ikon pixel besar */}
      <div className="absolute inset-x-3 top-11 bottom-[4.5rem] sm:bottom-20 border-2 overflow-hidden" style={{ borderColor: INK }}>
        {image && isPixelArt(image) ? (
          // pixel art: tetap berwarna & tajam; saat hover adegannya sedikit "melompat"
          <motion.div
            className="absolute inset-0"
            animate={{ y: active ? -3 : 0, scale: active ? 1.06 : 1 }}
            transition={snappy}
          >
            <Image
              src={image}
              alt=""
              fill
              unoptimized
              sizes="220px"
              className="object-cover [image-rendering:pixelated]"
            />
          </motion.div>
        ) : image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="220px"
            className={`object-cover transition-[filter,transform] duration-500 ${active ? "grayscale-0 scale-105" : "grayscale"} group-hover:grayscale-0`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: INK, color }}>
            <motion.div animate={{ y: active ? -4 : 0, scale: active ? 1.08 : 1 }} transition={snappy}>
              <PixelIcon k={k} className="w-16 h-16 sm:w-20 sm:h-20" cut={INK} />
            </motion.div>
          </div>
        )}
      </div>

      {/* bawah: judul + deskripsi singkat */}
      <div className="absolute inset-x-3 bottom-3">
        <div className="flex items-end justify-between gap-2">
          <h3 className="text-base sm:text-lg leading-tight" style={{ color: INK }}>
            {t.nav[k]}
          </h3>
          <ArrowUpRight
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${active ? "translate-x-0.5 -translate-y-0.5" : ""}`}
            aria-hidden
          />
        </div>
        <p className="hidden sm:block mt-1 text-[11px] leading-snug line-clamp-2 opacity-80">{t.explore.cards[k]}</p>
      </div>
    </div>
  );
}

/* ---------------------------------- Baris kartu (bawah halaman) ---------------------------------- */

export function CardRow({ current }: { current: CardKey }) {
  const { t } = useLang();
  const items = cardPages.filter((p) => p.key !== current);

  return (
    <section className="relative px-6 pb-20 pt-6">
      <div className="max-w-6xl mx-auto">
        <p className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 text-xs uppercase tracking-[0.18em] bg-accent text-on-accent border-2 border-foreground shadow-[3px_3px_0_var(--shadow)]">
          <svg viewBox="0 0 4 7" className="w-1.5 h-2.5 fill-current animate-blink" style={{ shapeRendering: "crispEdges" }} aria-hidden>
            <rect x="0" y="0" width="1" height="7" />
            <rect x="1" y="1" width="1" height="5" />
            <rect x="2" y="2" width="1" height="3" />
            <rect x="3" y="3" width="1" height="1" />
          </svg>
          {t.explore.next}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((p, i) => {
            const color = CARD_COLOR[p.key];
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionLink
                  {...pressCard}
                  href={p.href}
                  className="lift group relative flex items-center gap-3 p-3 border-2 border-border bg-surface shadow-[5px_5px_0_var(--shadow)] overflow-hidden"
                  style={{ ["--card" as string]: color }}
                >
                  {/* warna kartu menyapu dari kiri saat hover */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-[var(--ease-out)]"
                    style={{ background: color }}
                  />
                  <span
                    className="relative flex items-center justify-center w-10 h-10 shrink-0 border-2"
                    style={{ background: color, color: INK, borderColor: INK }}
                  >
                    <PixelIcon k={p.key} className="w-5 h-5" cut={color} />
                  </span>
                  <span className="relative flex-1 min-w-0 font-display text-sm sm:text-base truncate text-foreground group-hover:text-[#1a1030] group-focus-visible:text-[#1a1030] transition-colors">
                    {t.nav[p.key]}
                  </span>
                  <ArrowUpRight className="relative w-4 h-4 shrink-0 text-muted group-hover:text-[#1a1030] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" aria-hidden />
                </MotionLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
