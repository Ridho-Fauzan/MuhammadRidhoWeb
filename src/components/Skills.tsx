"use client";

import { Braces, Gamepad2, Globe, PencilRuler, Wrench } from "lucide-react";
import { skills } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import SpotlightCard from "./reactbits/SpotlightCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Urutan icon = urutan kategori di profile.ts
const icons = [Gamepad2, Braces, PencilRuler, Globe, Wrench];

export default function Skills() {
  const { t, tx } = useLang();

  return (
    <section id="skills" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <SpotlightCard
                  className="group h-full p-6 bg-background hover:border-accent/40 transition-colors"
                  spotlightColor="rgba(249, 199, 79, 0.14)"
                >
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-accent text-on-accent border-2 border-foreground group-hover:-translate-y-0.5 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg">{tx(s.category)}</h3>
                  </div>
                  <div className="relative flex flex-wrap gap-2">
                    {s.items.map((it, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-xs bg-surface border-2 border-border text-foreground/85 hover:bg-accent hover:text-on-accent hover:border-foreground"
                      >
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
