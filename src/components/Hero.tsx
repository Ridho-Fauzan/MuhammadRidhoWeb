"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import SocialIcons from "./SocialIcons";
import Typewriter from "./Typewriter";

// Inisial otomatis dari nama, mis. "Muhammad Ridho Fathi Fauzan" -> "MF" (huruf depan kata pertama & terakhir)
const words = profile.name.trim().split(/\s+/);
const initials = (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-60 w-[28rem] h-[28rem] rounded-full bg-accent-2/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          {profile.openToWork && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              Terbuka untuk peluang baru
            </div>
          )}

          <p className="text-muted mb-3">
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight min-h-[2.5em] sm:min-h-[2.4em]">
            Hi, I&apos;m <br />
            <Typewriter texts={profile.typewriter} className="gradient-text" />
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted max-w-xl mx-auto md:mx-0">{profile.tagline}</p>

          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="w-4 h-4 text-accent" /> {profile.location}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
            {profile.heroBadges.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="px-3 py-1 text-xs sm:text-sm rounded-md border border-border bg-surface text-muted"
              >
                {b}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-accent text-white dark:text-zinc-950 font-semibold hover:bg-accent-dark transition-colors"
            >
              Lihat Proyek
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors"
            >
              Hubungi Saya
            </a>
          </div>

          <SocialIcons className="mt-8 justify-center md:justify-start" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-accent/40 animate-spin-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-accent-2 p-1">
              <div className="relative w-full h-full rounded-full bg-surface overflow-hidden flex items-center justify-center">
                {profile.avatarUrl ? (
                  <Image src={profile.avatarUrl} alt={profile.name} fill className="object-cover" priority />
                ) : (
                  <span className="text-5xl sm:text-7xl font-bold gradient-text">{initials}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll ke bawah"
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
