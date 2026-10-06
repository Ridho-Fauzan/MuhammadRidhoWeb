"use client";

import { motion } from "motion/react";
import { ArrowDown, Hand, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import MotionLink from "./motion/MotionLink";
import { pressButton } from "./motion/press";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import MobileIdCard from "./MobileIdCard";
import DecryptedText from "./reactbits/DecryptedText";
import RotatingText from "./reactbits/RotatingText";
import SocialIcons from "./SocialIcons";
import WebGLBoundary from "./WebGLBoundary";
import { drawCardArt } from "./lanyardArt";

// Komponen berat (WebGL / fisika) dimuat hanya di browser agar halaman awal tetap ringan
const RetroField = dynamic(() => import("./RetroField"), { ssr: false });
const Lanyard = dynamic(() => import("./reactbits/Lanyard"), { ssr: false });

export default function Hero() {
  const { lang, t, tx } = useLang();
  const role = tx(profile.role);

  // Gambar kartu & tali dibuat dari data profile.ts, lalu dipasang ke Lanyard
  const [art, setArt] = useState<{ front: string; back: string; strap: string } | null>(null);
  useEffect(() => {
    let alive = true;
    drawCardArt({ name: profile.name, role, handle: profile.handle, avatarUrl: profile.avatarUrl, shortName: profile.shortName }).then(
      (a) => alive && setArt(a),
    );
    return () => {
      alive = false;
    };
  }, [role]);

  return (
    <section className="relative min-h-[100svh] flex items-center px-6 pt-28 pb-20 overflow-hidden noise">
      {/* Latar: shader dither "dusk" ThreeUI retro (matahari terbenam pixel) */}
      <div className="absolute inset-0 pointer-events-none">
        <WebGLBoundary>
          <RetroField className="absolute inset-0 opacity-100 dark:opacity-100 [:root:not(.dark)_&]:opacity-35 [:root:not(.dark)_&]:mix-blend-multiply" />
        </WebGLBoundary>
      </div>
      {/* Vignette agar teks tetap terbaca (gaya .atd-retro__vignette) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_90%_at_30%_40%,color-mix(in_srgb,var(--background)_70%,transparent)_0%,transparent_60%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_55%,transparent)_0%,transparent_30%,transparent_70%,var(--background)_100%)]" />

      {/* Lanyard: kartu ID 3D yang tergantung dari atas & bisa ditarik (desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[48%] z-10"
      >
        {art && (
          <WebGLBoundary>
            <Lanyard
              key={art.front.length}
              className="w-full h-full"
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              frontImage={art.front}
              backImage={art.back}
              lanyardImage={art.strap}
            />
          </WebGLBoundary>
        )}
        <p className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-foreground bg-background/80 border-2 border-border">
          <Hand className="w-3.5 h-3.5 text-accent" /> {t.hero.hint}
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          {/* Mobile & tablet: kartu ID interaktif (ayun, balik, giroskop); di desktop diganti Lanyard 3D */}
          <div className="lg:hidden -mt-10 mb-8">
            <MobileIdCard
              front={art?.front}
              back={art?.back}
              avatarUrl={profile.avatarUrl}
              name={profile.name}
              shortName={profile.shortName}
              flipLabel={t.hero.flipCard}
              hint={t.hero.hintMobile}
            />
          </div>

          <p className="text-sm uppercase tracking-[0.25em] text-accent">&gt; {t.hero.greeting}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
            <DecryptedText
              key={lang}
              text={profile.name}
              animateOn="view"
              sequential
              speed={35}
              revealDirection="start"
              className="gradient-text"
              encryptedClassName="text-accent-2"
              parentClassName="inline-block"
            />
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-base sm:text-xl uppercase tracking-[0.12em]">
            <span className="text-muted">{t.hero.iAm}</span>
            <RotatingText
              key={lang}
              texts={profile.roles.map(tx)}
              mainClassName="px-3 py-1.5 bg-accent text-on-accent border-2 border-foreground shadow-[3px_3px_0_var(--shadow)] overflow-hidden justify-center"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2600}
            />
          </div>

          <p className="mt-6 text-base sm:text-lg text-foreground/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">{tx(profile.tagline)}</p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.15em] text-muted">
            <MapPin className="w-4 h-4 text-accent" /> {tx(profile.location)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <MotionLink
              {...pressButton}
              href="/projects"
              className="retro-btn inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-on-accent uppercase tracking-[0.15em] text-sm"
            >
              <svg viewBox="0 0 7 7" className="w-3 h-3 fill-current" style={{ shapeRendering: "crispEdges" }} aria-hidden>
                <rect x="1" y="0" width="2" height="7" />
                <rect x="3" y="1" width="2" height="5" />
                <rect x="5" y="2" width="1" height="3" />
                <rect x="6" y="3" width="1" height="1" />
              </svg>
              {t.hero.viewProjects}
            </MotionLink>
            <MotionLink
              {...pressButton}
              href="/contact"
              className="retro-btn inline-flex items-center gap-2 px-6 py-3.5 bg-surface text-foreground uppercase tracking-[0.15em] text-sm hover:bg-accent-2 hover:text-on-accent"
            >
              {t.hero.contactMe}
            </MotionLink>
          </div>

          <SocialIcons className="mt-8 justify-center lg:justify-start" />
        </motion.div>

        {/* Kolom kanan dikosongkan untuk Lanyard */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      <a
        href="#stack"
        aria-label={t.hero.scrollDown}
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-accent animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
