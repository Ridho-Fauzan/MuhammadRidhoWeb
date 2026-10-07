"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { pages } from "@/data/pages";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import { getLenis } from "./SmoothScroll";
import MotionLink from "./motion/MotionLink";
import { pressButton } from "./motion/press";
import PixelBuddy from "./PixelBuddy";
import RotatingQuote from "./RotatingQuote";
import { PixelIcon } from "./pixelIcons";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const { t } = useLang();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t-2 border-border bg-surface">
      {/* gradasi pixel bertingkat (dither) emas -> koral di bagian bawah */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 footer-dither" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingQuote />
            </motion.div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MotionLink
                {...pressButton}
                href="/contact"
                className="retro-btn inline-flex items-center gap-2 px-5 py-3 bg-accent text-on-accent uppercase tracking-[0.15em] text-sm"
              >
                {t.footer.getInTouch} <ArrowUpRight className="w-4 h-4" />
              </MotionLink>
              <SocialIcons />
            </div>
          </div>

          <nav aria-label={t.footer.menu} className="lg:justify-self-end">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted">{t.footer.menu}</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 lg:grid-cols-1">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.12em] text-foreground/85 hover:text-accent transition-colors"
                  >
                    <PixelIcon
                      k={p.key}
                      className="w-3 h-3 text-muted group-hover:text-accent transition-[color,transform] duration-300 group-hover:translate-x-0.5"
                    />
                    <span className="link-u pb-0.5">{t.nav[p.key]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex items-end justify-between gap-6">
          <div className="flex items-end gap-4">
            <PixelBuddy className="w-12 h-16 sm:w-14 sm:h-[4.75rem]" />
            <p className="pb-1 text-[11px] uppercase tracking-[0.15em] text-foreground/80">
              © {new Date().getFullYear()} {profile.name}.
              <br className="sm:hidden" /> {t.footer.builtWith}
            </p>
          </div>
          <motion.button
            {...pressButton}
            type="button"
            onClick={toTop}
            aria-label={t.footer.backToTop}
            title={t.footer.backToTop}
            className="retro-btn shrink-0 p-2.5 bg-surface text-foreground hover:bg-accent hover:text-on-accent"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
