"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText, Hand, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import MobileIdCard from "./MobileIdCard";
import MotionLink from "./motion/MotionLink";
import { pressButton } from "./motion/press";
import BlurText from "./reactbits/BlurText";
import Magnet from "./reactbits/Magnet";
import RotatingText from "./reactbits/RotatingText";
import ShinyText from "./reactbits/ShinyText";
import SocialIcons from "./SocialIcons";
import WebGLBoundary from "./WebGLBoundary";
import { drawCardArt } from "./lanyardArt";
import { useTheme } from "./ThemeToggle";

// Kartu ID 3D (WebGL + fisika) dimuat hanya di browser agar halaman awal tetap ringan
const Lanyard = dynamic(() => import("./reactbits/Lanyard"), { ssr: false });
const Threads = dynamic(() => import("./reactbits/Threads"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { lang, t, tx } = useLang();
  const role = tx(profile.role);
  const { dark } = useTheme();

  // Gambar kartu & tali dibuat dari data profile.ts (warna ikut tema), lalu dipasang ke Lanyard
  const [art, setArt] = useState<{ front: string; back: string; strap: string } | null>(null);
  useEffect(() => {
    let alive = true;
    drawCardArt({ name: profile.name, role, handle: profile.handle, avatarUrl: profile.avatarUrl, shortName: profile.shortName, light: !dark }).then(
      (a) => alive && setArt(a),
    );
    return () => {
      alive = false;
    };
  }, [role, dark]);

  const roles = profile.roles.map(tx);

  return (
    <section className="relative min-h-[100svh] flex items-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Latar: grid tipis yang memudar + benang bergelombang React Bits "Threads" + cahaya aksen lembut */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-70 [mask-image:linear-gradient(to_top,#000_20%,transparent)]">
        <WebGLBoundary>
          <Threads
            color={dark ? "#f5f5f4" : "#0c0c0d"}
            accentColor={dark ? "#8b93ff" : "#4f46e5"}
            amplitude={1.2}
            distance={0.3}
            lineCount={40}
            thickness={0.5}
            speed={0.35}
            brightness={dark ? 0.9 : 1.1}
            opacity={dark ? 0.55 : 0.4}
            enableMouseInteraction
          />
        </WebGLBoundary>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] rounded-full opacity-60 blur-3xl bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />

      {/* Lanyard: kartu ID 3D yang tergantung dari atas & bisa ditarik (desktop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[46%] z-10"
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
        <p className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 chip">
          <Hand className="w-3.5 h-3.5 text-accent" /> {t.hero.hint}
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-center lg:text-left"
        >
          {/* Mobile & tablet: kartu ID interaktif; di desktop diganti Lanyard 3D */}
          <div className="lg:hidden -mt-10 mb-10">
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

          <p className="chip">
            <span className="status-dot" aria-hidden />
            <ShinyText key={lang} text={tx(profile.availability)} color="var(--muted)" shineColor="var(--foreground)" speed={3} />
          </p>

          <p className="eyebrow mt-8">{t.hero.greeting}</p>
          <h1 className="mt-3 font-extrabold uppercase text-ink text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">
            {profile.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2 text-xl sm:text-2xl font-semibold">
            <span className="text-muted">{t.hero.iAm}</span>
            <RotatingText
              key={lang}
              texts={roles}
              mainClassName="text-accent overflow-hidden"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2600}
            />
          </div>

          <BlurText
            key={`tagline-${lang}`}
            text={tx(profile.tagline)}
            animateBy="words"
            direction="bottom"
            delay={35}
            trigger="load"
            className="mt-6 max-w-xl mx-auto lg:mx-0 justify-center lg:justify-start text-base sm:text-lg text-muted leading-relaxed"
          />

          <div className="mt-9 flex flex-wrap gap-3 justify-center lg:justify-start">
            <Magnet padding={60} magnetStrength={4}>
              <MotionLink {...pressButton} href="/projects" className="btn btn-primary">
                {t.hero.viewProjects} <ArrowUpRight className="w-4 h-4" />
              </MotionLink>
            </Magnet>
            <MotionLink {...pressButton} href="/contact" className="btn">
              {t.hero.contactMe}
            </MotionLink>
            {profile.resumeUrl && (
              <motion.a {...pressButton} href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn">
                <FileText className="w-4 h-4" aria-hidden />
                {t.hero.resume}
              </motion.a>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-center lg:justify-between gap-5">
            <SocialIcons />
            <p className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="w-4 h-4" aria-hidden /> {t.hero.basedIn} {tx(profile.location)}
            </p>
          </div>
        </motion.div>

        {/* Kolom kanan dikosongkan untuk Lanyard */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      <a
        href="#stack"
        aria-label={t.hero.scrollDown}
        className="hidden md:grid place-items-center absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
      >
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}
