"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { contactPhoto, photos, profile, whatsappUrl } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import ContactForm from "./ContactForm";
import Magnet from "./reactbits/Magnet";
import TiltedCard from "./reactbits/TiltedCard";
import Reveal from "./Reveal";
import { pressButton } from "./motion/press";
import SocialIcons, { SocialIcon } from "./SocialIcons";

export default function Contact() {
  const { t, tx } = useLang();
  const photo = photos[contactPhoto];

  return (
    <section id="contact" className="relative py-16 px-6">
      <div className="relative w-full max-w-6xl mx-auto grid gap-14 lg:grid-cols-[1fr_1.05fr] items-center">
        <Reveal className="text-center lg:text-left">
          <p className="eyebrow mb-6">{t.contact.eyebrow}</p>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end lg:items-end">
            <h1 className="font-extrabold uppercase text-ink leading-[0.9] tracking-[-0.045em] text-[clamp(3.25rem,9vw,6.5rem)]">
              {t.contact.title1}
              <br />
              {t.contact.title2}
              <span className="text-accent [-webkit-text-fill-color:var(--accent)]">.</span>
            </h1>
            {photo && (
              <TiltedCard
                imageSrc={photo.src}
                altText={tx(photo.alt)}
                imagePosition={photo.focus}
                captionText={t.contact.photoCaption}
                width={120}
                height={150}
                className="shrink-0 rotate-[4deg] mb-2"
              />
            )}
          </div>
          <p className="mt-8 text-muted text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">{t.contact.text}</p>
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
            <Magnet padding={60} magnetStrength={4}>
              <motion.a {...pressButton} href={`mailto:${profile.email}`} className="btn btn-primary">
                <Mail className="w-4 h-4" /> {t.contact.button}
              </motion.a>
            </Magnet>
            {whatsappUrl && (
              <motion.a {...pressButton} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn">
                <SocialIcon k="whatsapp" className="w-4 h-4 text-[#25d366]" /> {t.contact.whatsapp}
                <ArrowUpRight className="w-4 h-4 text-muted" />
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
