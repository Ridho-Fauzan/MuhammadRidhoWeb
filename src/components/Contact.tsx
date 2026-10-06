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
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Latar partikel React Bits — bergerak mengikuti kursor */}
      <div className="absolute inset-0 opacity-60 dark:opacity-100">
        <WebGLBoundary>
          <Particles
            particleColors={["#34d399", "#22d3ee", "#a7f3d0"]}
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

      <Reveal className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-6xl font-bold">
          {t.contact.title1} <span className="gradient-text">{t.contact.title2}</span>
        </h2>
        <p className="mt-6 text-muted text-lg">{t.contact.text}</p>
        <div className="mt-10 flex justify-center">
          <Magnet padding={80} magnetStrength={3}>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white dark:text-zinc-950 font-semibold shadow-lg shadow-accent/30 hover:bg-accent-dark transition-colors"
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
