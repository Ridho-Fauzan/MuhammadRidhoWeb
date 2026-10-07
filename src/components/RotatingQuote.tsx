"use client";

/**
 * Kutipan footer yang bergantian otomatis (Motion AnimatePresence).
 * - Tinggi area dikunci ke kutipan terpanjang -> halaman tidak "loncat" saat kutipan berganti.
 * - Berhenti saat di-hover / difokus, dan saat footer tidak terlihat di layar.
 * - Titik pixel & tombol ◀ ▶ di bawah untuk memilih kutipan (timer mulai ulang setelah dipilih).
 * - Reduce motion: tetap berganti, tapi tanpa gerakan (langsung muncul).
 */
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import { ArrowButton, PixelDots } from "./PixelPager";

export default function RotatingQuote({ className = "" }: { className?: string }) {
  const { t, tx, lang } = useLang();
  const quotes = profile.quotes.map((q) => ({ text: tx(q.text), by: q.by, from: q.from }));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const count = quotes.length;

  useEffect(() => {
    if (count < 2 || paused || !inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), Math.max(2, profile.quoteSeconds) * 1000);
    return () => clearTimeout(id);
  }, [index, count, paused, inView]);

  if (!count) return null;
  const current = index % count;

  const block = (q: (typeof quotes)[number]) => (
    <>
      <span className="block font-display text-xl sm:text-3xl leading-tight text-foreground">
        <span className="text-accent">&ldquo;</span>
        {q.text}
        <span className="text-accent">&rdquo;</span>
      </span>
      {(q.by || q.from) && (
        <span className="block mt-3 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-muted">
          — {q.by}
          {q.by && q.from && " · "}
          {q.from && <span className="text-accent-2">{q.from}</span>}
        </span>
      )}
    </>
  );

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* semua kutipan ditumpuk di satu sel grid: yang tak terlihat hanya menjaga tinggi */}
      <div className="grid">
        {quotes.map((q, i) => (
          <p key={`ghost-${i}`} aria-hidden className="invisible col-start-1 row-start-1">
            {block(q)}
          </p>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${lang}-${current}`}
            className="col-start-1 row-start-1 self-end"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
          >
            {block(quotes[current])}
          </motion.p>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-3">
          <ArrowButton dir="left" label={t.footer.prevQuote} onClick={() => setIndex((i) => (i - 1 + count) % count)} className="w-6 h-6 -ml-1.5" />
          <PixelDots count={count} index={current} onPick={setIndex} groupLabel={t.footer.quotes} />
          <ArrowButton dir="right" label={t.footer.nextQuote} onClick={() => setIndex((i) => (i + 1) % count)} className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
