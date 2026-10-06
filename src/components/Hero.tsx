"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, MousePointer2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import DecryptedText from "./reactbits/DecryptedText";
import Magnet from "./reactbits/Magnet";
import RotatingText from "./reactbits/RotatingText";
import SocialIcons from "./SocialIcons";
import WebGLBoundary from "./WebGLBoundary";

// Komponen berat (WebGL / tilt) dimuat hanya di browser agar halaman awal tetap ringan
const EmeraldHorizon = dynamic(
  () => import("./threeui/EmeraldHorizonBackground").then((m) => m.EmeraldHorizonBackground),
  { ssr: false },
);
const ProfileCard = dynamic(() => import("./reactbits/ProfileCard"), { ssr: false });

export default function Hero() {
  const { lang, t, tx } = useLang();

  return (
    <section className="relative min-h-[100svh] flex items-center px-6 pt-28 pb-20 overflow-hidden noise">
      {/* Latar: shader ThreeUI + gradasi agar teks tetap terbaca */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block opacity-90">
        <WebGLBoundary>
          <EmeraldHorizon className="absolute inset-0" speed={0.6} glow={1.1} />
        </WebGLBoundary>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/10 via-background/30 to-background" />
      {/* Mode terang: cahaya lembut sebagai pengganti shader */}
      <div className="dark:hidden absolute -top-32 right-0 w-[36rem] h-[36rem] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="dark:hidden absolute bottom-0 -left-40 w-[30rem] h-[30rem] rounded-full bg-accent-2/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          {/* Foto bulat hanya di mobile; di desktop diganti ProfileCard */}
          <div className="lg:hidden mx-auto mb-8 relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_40px_-8px] shadow-accent/60">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-surface">
              {profile.avatarUrl && <Image src={profile.avatarUrl} alt={profile.name} fill className="object-cover" priority />}
            </div>
          </div>

          <p className="font-mono text-sm text-muted">{t.hero.greeting}</p>
          <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            <DecryptedText
              key={lang}
              text={profile.name}
              animateOn="view"
              sequential
              speed={35}
              revealDirection="start"
              className="gradient-text"
              encryptedClassName="text-accent/50"
              parentClassName="inline-block"
            />
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-lg sm:text-2xl font-medium">
            <span className="text-muted">{t.hero.iAm}</span>
            <RotatingText
              key={lang}
              texts={profile.roles.map(tx)}
              mainClassName="px-3 py-1 rounded-lg bg-accent text-white dark:text-zinc-950 overflow-hidden justify-center"
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

          <p className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">{tx(profile.tagline)}</p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="w-4 h-4 text-accent" /> {tx(profile.location)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            <Magnet padding={60} magnetStrength={4}>
              <a
                href="#projects"
                className="inline-block px-7 py-3.5 rounded-xl bg-accent text-white dark:text-zinc-950 font-semibold shadow-lg shadow-accent/25 hover:bg-accent-dark transition-colors"
              >
                {t.hero.viewProjects}
              </a>
            </Magnet>
            <Magnet padding={60} magnetStrength={4}>
              <a
                href="#contact"
                className="inline-block px-7 py-3.5 rounded-xl border border-border bg-background/50 backdrop-blur hover:border-accent hover:text-accent transition-colors"
              >
                {t.hero.contactMe}
              </a>
            </Magnet>
          </div>

          <SocialIcons className="mt-8 justify-center lg:justify-start" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col items-center"
        >
          <ProfileCard
            avatarUrl={profile.avatarUrl}
            miniAvatarUrl={profile.avatarUrl}
            iconUrl=""
            grainUrl=""
            name={profile.name.split(" ").slice(0, 2).join(" ")}
            title={tx(profile.role)}
            handle={profile.handle}
            status={tx(profile.status)}
            contactText={t.hero.cardContact}
            behindGlowColor="rgba(52, 211, 153, 0.55)"
            innerGradient="linear-gradient(145deg, rgba(16,185,129,0.35) 0%, rgba(34,211,238,0.25) 100%)"
            enableTilt
            onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          />
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted font-mono">
            <MousePointer2 className="w-3.5 h-3.5 text-accent" /> {t.hero.hint}
          </p>
        </motion.div>
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
