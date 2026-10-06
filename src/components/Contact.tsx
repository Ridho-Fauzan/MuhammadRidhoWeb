"use client";

import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SocialIcons from "./SocialIcons";

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="py-24 px-6">
      <Reveal className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold">
          {t.contact.title1} <span className="gradient-text">{t.contact.title2}</span>
        </h2>
        <p className="mt-6 text-muted text-lg">{t.contact.text}</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white dark:text-zinc-950 font-semibold hover:bg-accent-dark transition-colors"
        >
          <Mail className="w-5 h-5" /> {t.contact.button}
        </a>
        <SocialIcons className="mt-10 justify-center" />
      </Reveal>
    </section>
  );
}
