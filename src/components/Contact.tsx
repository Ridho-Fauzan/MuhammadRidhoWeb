"use client";

import { Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Magnet from "./reactbits/Magnet";
import Reveal from "./Reveal";
import SocialIcons from "./SocialIcons";
import WebGLBoundary from "./WebGLBoundary";

const Particles = dynamic(() => import("./reactbits/Particles"), { ssr: false });

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative min-h-[70svh] flex items-center py-24 px-6 overflow-hidden">
      {/* Latar partikel React Bits — bergerak mengikuti kursor */}
      <div className="absolute inset-0 opacity-60 dark:opacity-100">
        <WebGLBoundary>
          <Particles
            particleColors={["#f9c74f", "#f47b5c", "#b9a7e8"]}
            particleCount={180}
            particleSpread={10}
            speed={0.08}
            particleBaseSize={90}
            moveParticlesOnHover
            alphaParticles
            disableRotation={false}
          />
        </WebGLBoundary>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />

      <Reveal className="relative w-full max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl [text-shadow:4px_4px_0_var(--shadow)]">
          {t.contact.title1} <span className="gradient-text">{t.contact.title2}</span>
        </h2>
        <p className="mt-6 text-muted text-lg">{t.contact.text}</p>
        <div className="mt-10 flex justify-center">
          <Magnet padding={80} magnetStrength={3}>
            <a
              href={`mailto:${profile.email}`}
              className="retro-btn inline-flex items-center gap-2 px-8 py-4 bg-accent text-on-accent uppercase tracking-[0.15em] text-sm"
            >
              <Mail className="w-5 h-5" /> {t.contact.button}
            </a>
          </Magnet>
        </div>
        <SocialIcons className="mt-10 justify-center" />
      </Reveal>
    </section>
  );
}
