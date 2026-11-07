"use client";

/**
 * Footer bergaya editorial: blok warna kebalikan tema, ajakan "Let's Talk" raksasa,
 * tautan sosial, menu, dan tombol kembali ke atas.
 */
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { pages } from "@/data/pages";
import { profile, socials } from "@/data/profile";
import { useRef } from "react";
import { useLang } from "@/i18n/useLang";
import VariableProximity from "./reactbits/VariableProximity";
import MotionLink from "./motion/MotionLink";
import { pressButton } from "./motion/press";
import { getLenis } from "./SmoothScroll";

export default function Footer() {
  const { lang, t } = useLang();
  const ctaRef = useRef<HTMLDivElement>(null);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-invert-bg text-invert-fg">
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
          {/* tautan sosial */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target={s.key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="link-u font-mono text-xs uppercase tracking-[0.2em] opacity-70 hover:opacity-100 transition-opacity"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ajakan besar */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center"
          >
            <Link href="/contact" className="inline-block group" aria-label={t.footer.getInTouch}>
              {/* React Bits "VariableProximity": huruf menebal saat kursor mendekat (butuh variable font) */}
              <span className="block uppercase leading-[0.85] tracking-[-0.05em] text-[clamp(3.5rem,14vw,11rem)]">
                <VariableProximity
                  key={lang}
                  label={t.footer.cta}
                  containerRef={ctaRef}
                  fromFontVariationSettings="'wght' 500"
                  toFontVariationSettings="'wght' 800"
                  radius={220}
                  falloff="gaussian"
                />
              </span>
            </Link>
            <p className="mt-6 opacity-60 max-w-md mx-auto">{t.footer.ctaText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MotionLink
                {...pressButton}
                href="/contact"
                className="btn !bg-invert-fg !text-invert-bg !border-invert-fg hover:!bg-accent hover:!border-accent hover:!text-on-accent"
              >
                {t.footer.getInTouch} <ArrowUpRight className="w-4 h-4" />
              </MotionLink>
              <motion.a
                {...pressButton}
                href={`mailto:${profile.email}`}
                className="btn !bg-transparent !text-invert-fg !border-invert-fg/30 hover:!border-invert-fg"
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>

          {/* menu + hak cipta */}
          <div className="mt-20 pt-6 border-t border-invert-fg/15 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] opacity-50">
              © {new Date().getFullYear()} {profile.name}. {t.footer.builtWith}
            </p>
            <div className="flex items-center justify-between gap-6">
              <nav aria-label={t.footer.menu}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {pages.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="link-u text-sm opacity-70 hover:opacity-100 transition-opacity">
                        {t.nav[p.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <motion.button
                {...pressButton}
                type="button"
                onClick={toTop}
                aria-label={t.footer.backToTop}
                title={t.footer.backToTop}
                className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-invert-fg/25 hover:border-invert-fg transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
