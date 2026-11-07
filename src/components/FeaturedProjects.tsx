"use client";

/** "Proyek Unggulan" di beranda — kartu besar proyek `featured` dari profile.ts, menuju halaman /projects. */
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import MotionLink from "./motion/MotionLink";
import { pressButton, pressCard } from "./motion/press";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects() {
  const { t, tx } = useLang();
  const items = projects.filter((p) => p.featured && !p.comingSoon).slice(0, 3);
  if (!items.length) return null;

  return (
    <section id="featured" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={t.featured.eyebrow} title={t.featured.title} />

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((p, i) => {
            const wide = items.length === 3 && i === 0;
            return (
              <Reveal key={i} delay={i * 0.08} className={wide ? "md:col-span-2" : ""}>
                <MotionLink {...pressCard} href="/projects" className="group block">
                  <div className="card lift p-3 bg-surface-2">
                    <div className={`relative overflow-hidden rounded-[0.9rem] bg-surface ${wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}>
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={tx(p.title)}
                          fill
                          sizes={wide ? "(min-width: 1152px) 1152px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                          className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                        />
                      )}
                      <span className="absolute top-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-background/90 text-foreground backdrop-blur transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4 px-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight">{tx(p.title)}</h3>
                      <p className="eyebrow mt-1.5">{p.tags.slice(0, 3).join(" · ")}</p>
                    </div>
                    <span className="font-mono text-xs text-muted pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </MotionLink>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <MotionLink {...pressButton} href="/projects" className="btn">
            {t.featured.all} <ArrowUpRight className="w-4 h-4" />
          </MotionLink>
        </Reveal>
      </div>
    </section>
  );
}
