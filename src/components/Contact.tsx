"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { contactPhoto, photos, profile, whatsappUrl } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import ContactForm from "./ContactForm";
import TiltedCard from "./reactbits/TiltedCard";
import Reveal from "./Reveal";
import { pressButton } from "./motion/press";
import SocialIcons, { SocialIcon } from "./SocialIcons";
import WebGLBoundary from "./WebGLBoundary";

const Particles = dynamic(() => import("./reactbits/Particles"), {
  ssr: false,
});

export default function Contact() {
  const { t, tx } = useLang();
  const photo = photos[contactPhoto];

  return (
    <section
      id="contact"
      className="relative min-h-[70svh] flex items-center py-24 px-6 overflow-hidden"
    >
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

      <div className="relative w-full max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1fr_1.05fr] items-center">
        <Reveal className="text-center lg:text-left">
          {photo && (
            <div className="mb-8 flex justify-center lg:justify-start">
              <TiltedCard
                imageSrc={photo.src}
                altText={tx(photo.alt)}
                imagePosition={photo.focus}
                captionText={t.contact.photoCaption}
                width={170}
                height={220}
                className="rotate-[-3deg]"
                overlayContent={
                  <span className="absolute -bottom-3 -right-4 inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] bg-surface text-foreground border-2 border-foreground shadow-[3px_3px_0_var(--shadow)]">
                    <span className="w-2 h-2 bg-accent animate-pulse" /> {t.contact.photoBadge}
                  </span>
                }
              />
            </div>
          )}
          <h2 className="text-4xl sm:text-6xl">
            {t.contact.title1}{" "}
            <span className="gradient-text">{t.contact.title2}</span>
          </h2>
          <p className="mt-6 text-muted text-lg max-w-xl mx-auto lg:mx-0">
            {t.contact.text}
          </p>
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <motion.a
              {...pressButton}
              href={`mailto:${profile.email}`}
              className="retro-btn inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-on-accent uppercase tracking-[0.15em] text-sm"
            >
              <Mail className="w-5 h-5" /> {t.contact.button}
            </motion.a>
            {whatsappUrl && (
              <motion.a
                {...pressButton}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn inline-flex items-center gap-2 px-6 py-3.5 bg-[#25d366] text-[#1a1030] uppercase tracking-[0.15em] text-sm"
              >
                <SocialIcon k="whatsapp" className="w-5 h-5" />{" "}
                {t.contact.whatsapp}
              </motion.a>
            )}
          </div>
          <SocialIcons className="mt-10 justify-center lg:justify-start" />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
