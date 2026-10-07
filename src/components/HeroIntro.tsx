"use client";

/**
 * Bagian perkenalan di hero, bergaya game retro:
 *  1. Pemilih "kelas" (seperti layar pilih karakter): peran berganti otomatis, bisa diganti dengan ◀ ▶.
 *  2. Kotak dialog RPG: tagline diketik huruf demi huruf, diakhiri ▼ berkedip. Klik = tampil penuh.
 *  3. Chip lokasi + "gear" (profile.heroBadges).
 */
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import RotatingText, { type RotatingTextRef } from "./reactbits/RotatingText";

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 4 7" className={`w-2 h-3.5 fill-current ${dir === "left" ? "rotate-180" : ""}`} style={{ shapeRendering: "crispEdges" }} aria-hidden>
    <rect x="0" y="0" width="1" height="7" />
    <rect x="1" y="1" width="1" height="5" />
    <rect x="2" y="2" width="1" height="3" />
    <rect x="3" y="3" width="1" height="1" />
  </svg>
);

/* ---------------------------------- 1. Pemilih kelas ---------------------------------- */

function ClassSelect() {
  const { t, tx } = useLang();
  const roles = profile.roles.map(tx);
  const ref = useRef<RotatingTextRef>(null);
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [nudge, setNudge] = useState<"left" | "right" | null>(null);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);

  // pilihan manual menghentikan putaran otomatis sebentar
  const pick = (dir: "left" | "right") => {
    if (dir === "left") ref.current?.previous();
    else ref.current?.next();
    setNudge(dir);
    setAuto(false);
    if (resume.current) clearTimeout(resume.current);
    resume.current = setTimeout(() => setAuto(true), 8000);
  };
  useEffect(() => () => void (resume.current && clearTimeout(resume.current)), []);

  const arrowBtn = (dir: "left" | "right") => (
    <motion.button
      type="button"
      onClick={() => pick(dir)}
      aria-label={dir === "left" ? t.hero.prevClass : t.hero.nextClass}
      whileHover={{ x: dir === "left" ? -2 : 2 }}
      whileTap={{ scale: 0.85 }}
      animate={nudge === dir ? { x: [0, dir === "left" ? -4 : 4, 0] } : { x: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      onAnimationComplete={() => setNudge(null)}
      className="flex items-center justify-center w-9 self-stretch text-accent hover:text-foreground"
    >
      <Arrow dir={dir} />
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center lg:items-start gap-2">
      <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
        {t.hero.classLabel} <span className="text-accent tabular-nums">{String(index + 1).padStart(2, "0")}</span>/{String(roles.length).padStart(2, "0")}
      </span>
      <div className="flex items-stretch">
        {arrowBtn("left")}
        <RotatingText
          ref={ref}
          texts={roles}
          auto={auto}
          onNext={setIndex}
          mainClassName="px-4 py-2 text-base sm:text-xl uppercase tracking-[0.12em] bg-accent text-on-accent border-2 border-foreground shadow-[4px_4px_0_var(--shadow)] overflow-hidden justify-center"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2800}
        />
        {arrowBtn("right")}
      </div>
    </div>
  );
}

/* ---------------------------------- 2. Kotak dialog ---------------------------------- */

const CHAR_MS = 22; // jeda antar huruf

/** Tunggu layar boot selesai (sessionStorage "booted" diisi BootScreen saat selesai) */
function useBootDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const check = () => {
      try {
        return !!sessionStorage.getItem("booted");
      } catch {
        return true;
      }
    };
    if (check()) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }
    const id = setInterval(() => check() && (setDone(true), clearInterval(id)), 120);
    return () => clearInterval(id);
  }, []);
  return done;
}

function DialogueBox() {
  const { tx, lang } = useLang();
  const full = tx(profile.tagline);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const booted = useBootDone();
  const [typed, setTyped] = useState({ lang, n: 0 });
  // ganti bahasa -> mulai mengetik dari awal
  const n = typed.lang === lang ? typed.n : 0;
  const finished = reduce || n >= full.length;

  const skip = useCallback(() => setTyped({ lang, n: full.length }), [lang, full.length]);

  useEffect(() => {
    if (reduce || !inView || !booted || n >= full.length) return;
    // Berbasis waktu: kalau perangkat sedang sibuk dan timer telat, huruf yang "tertinggal" dikejar sekaligus,
    // jadi kecepatan ketik tetap ±45 huruf/detik. Jeda lebih lama setelah tanda baca, seperti dialog game.
    const prev = full[n - 1];
    const delay = n === 0 ? 450 : /[.,!?]/.test(prev ?? "") ? 180 : CHAR_MS;
    const scheduled = performance.now();
    const id = setTimeout(() => {
      const late = performance.now() - scheduled - delay;
      let next = n + 1 + Math.max(0, Math.floor(late / CHAR_MS));
      // berhenti tepat setelah tanda baca berikutnya supaya jedanya tetap terasa
      const punct = full.slice(n, next).search(/[.,!?]/);
      if (punct >= 0) next = n + punct + 1;
      setTyped({ lang, n: Math.min(full.length, next) });
    }, delay);
    return () => clearTimeout(id);
  }, [n, full, lang, inView, booted, reduce]);

  return (
    <div
      ref={ref}
      data-dialog
      onClick={skip}
      className={`relative mt-8 max-w-xl mx-auto lg:mx-0 text-left p-4 pt-5 sm:p-5 sm:pt-6 bg-surface/85 backdrop-blur-[2px] border-2 border-foreground shadow-[5px_5px_0_var(--shadow)] ${finished ? "" : "cursor-pointer"}`}
    >
      {/* papan nama pembicara */}
      <span className="absolute -top-3.5 left-3 px-2 py-0.5 font-display text-xs sm:text-sm bg-accent-2 text-on-accent border-2 border-foreground">
        {profile.shortName.toUpperCase()}
      </span>
      {/* sudut dalam pixel */}
      <span aria-hidden className="absolute top-1 right-1 w-1.5 h-1.5 bg-foreground/40" />
      <span aria-hidden className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-foreground/40" />

      <p className="sr-only">{full}</p>
      <div aria-hidden className="grid text-base sm:text-lg text-foreground/90 leading-relaxed">
        {/* teks penuh tak terlihat menjaga ukuran kotak -> tidak ada lompatan layout */}
        <span className="invisible col-start-1 row-start-1">{full} __</span>
        <span className="col-start-1 row-start-1">
          {reduce ? full : full.slice(0, n)}
          <AnimatePresence>
            {finished ? (
              <motion.span
                key="next"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block ml-2 text-accent align-middle animate-[dialog-bob_0.9s_steps(2)_infinite]"
              >
                <svg viewBox="0 0 7 4" className="w-3 h-[7px] fill-current" style={{ shapeRendering: "crispEdges" }} aria-hidden>
                  <rect x="0" y="0" width="7" height="1" />
                  <rect x="1" y="1" width="5" height="1" />
                  <rect x="2" y="2" width="3" height="1" />
                  <rect x="3" y="3" width="1" height="1" />
                </svg>
              </motion.span>
            ) : (
              <span className="inline-block w-2 h-[1.1em] -mb-0.5 ml-0.5 bg-accent animate-blink align-baseline" />
            )}
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------- 3. Chip lokasi & gear ---------------------------------- */

const PinIcon = () => (
  <svg viewBox="0 0 7 9" className="w-2.5 h-3.5 fill-current" style={{ shapeRendering: "crispEdges" }} aria-hidden>
    <rect x="2" y="0" width="3" height="1" />
    <rect x="1" y="1" width="5" height="1" />
    <rect x="0" y="2" width="2" height="3" />
    <rect x="5" y="2" width="2" height="3" />
    <rect x="1" y="5" width="5" height="1" />
    <rect x="2" y="6" width="3" height="1" />
    <rect x="3" y="7" width="1" height="2" />
  </svg>
);

function Chips() {
  const { t, tx } = useLang();
  const chip = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-[0.15em] border-2";
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
      <span className={`${chip} border-accent/70 text-accent bg-background/60`}>
        <PinIcon /> {tx(profile.location)}
      </span>
      {profile.heroBadges.length > 0 && (
        // label "Gear" + chip-nya satu kelompok supaya tidak terpisah saat turun baris
        <span className="inline-flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted ml-1">{t.hero.gear}</span>
          {profile.heroBadges.map((b, i) => (
            <motion.span
              key={b}
              className={`${chip} border-border text-foreground/85 bg-background/60`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
            >
              {b}
            </motion.span>
          ))}
        </span>
      )}
    </div>
  );
}

export default function HeroIntro() {
  const { lang } = useLang();
  return (
    <>
      <div className="mt-7">
        {/* key: ganti bahasa -> pemilih mulai lagi dari kelas pertama, penghitung ikut reset */}
        <ClassSelect key={lang} />
      </div>
      <DialogueBox />
      <Chips />
    </>
  );
}
