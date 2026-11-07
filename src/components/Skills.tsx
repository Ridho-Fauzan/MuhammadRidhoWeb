"use client";

import { Code2, MousePointerClick, PenTool, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/data/profile";
import { tr } from "@/i18n/types";
import { useLang } from "@/i18n/useLang";
import SpotlightCard from "./reactbits/SpotlightCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Icon dipilih berdasarkan nama kategori (versi EN) di profile.ts, jadi urutan kategori bebas diubah.
const iconByCategory: Record<string, LucideIcon> = {
  Frontend: Code2,
  "UI/UX Design": PenTool,
  "Web & Interaction": MousePointerClick,
  Tools: Wrench,
};

export default function Skills() {
  const { t, tx } = useLang();

  return (
    <section id="skills" className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle as="h1" eyebrow={t.skills.eyebrow} title={t.skills.title} subtitle={t.skills.subtitle} />
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((s, i) => {
            const Icon = iconByCategory[tr(s.category, "en")] ?? Sparkles;
            return (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <SpotlightCard interactive className="card lift group h-full p-7 sm:p-8" spotlightColor="rgba(129, 140, 248, 0.14)">
                  <div className="relative flex items-start justify-between gap-4 mb-8">
                    <div className="grid place-items-center w-12 h-12 rounded-2xl bg-surface-2 border border-border text-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent group-hover:border-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="relative text-2xl font-bold uppercase tracking-tight">{tx(s.category)}</h2>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {s.items.map((it, j) => (
                      <span key={j} className="chip">
                        {tx(it)}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
