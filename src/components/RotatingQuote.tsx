"use client";

/**
 * Kutipan footer yang bergantian otomatis (Motion AnimatePresence).
 * - Tinggi area dikunci ke kutipan terpanjang -> halaman tidak "loncat" saat kutipan berganti.
 * - Berhenti saat di-hover / difokus, dan saat footer tidak terlihat di layar.
 * - Titik pixel di bawah bisa diklik untuk memilih kutipan.
 * - Reduce motion: tetap berganti, tapi tanpa gerakan (langsung muncul).
 */
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";

export default function RotatingQuote({ className = "" }: { className?: string }) {
  const { tx, lang } = useLang();
  const quotes = profile.quotes.map(tx);
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

  const text = (q: string) => (
    <>
      <span className="text-accent">&ldquo;</span>
      {q}
      <span className="text-accent">&rdquo;</span>
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
      <div className="grid font-display text-2xl sm:text-4xl leading-tight text-foreground">
        {quotes.map((q, i) => (
          <p key={`ghost-${i}`} aria-hidden className="invisible col-start-1 row-start-1">
            {text(q)}
          </p>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${lang}-${current}`}
            className="col-start-1 row-start-1"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
          >
            {text(quotes[current])}
          </motion.p>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-2" role="group" aria-label="Quotes">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === current}
              className="p-1 -m-1"
            >
              <span
                className={`block h-2 transition-[width,background-color] duration-300 ${
                  i === current ? "w-6 bg-accent" : "w-2 bg-muted/50 hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
