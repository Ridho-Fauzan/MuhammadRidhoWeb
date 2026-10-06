"use client";

import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import CountUp from "./reactbits/CountUp";
import SpotlightCard from "./reactbits/SpotlightCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Terminal from "./Terminal";

export default function About() {
  const { t, tx } = useLang();

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.about.title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start [&>*]:min-w-0">
          <div className="space-y-5 text-muted leading-relaxed text-[1.05rem]">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{tx(p)}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {profile.stats.map((s, i) => (
                  <SpotlightCard key={i} className="p-4 sm:p-5 text-center bg-surface" spotlightColor="rgba(249, 199, 79, 0.18)">
                    <p className="font-display text-3xl sm:text-4xl font-bold gradient-text">
                      <CountUp to={s.value} duration={1.6} />
                      {s.suffix}
                    </p>
                    <p className="text-xs mt-1.5 text-muted">{tx(s.label)}</p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-sm text-muted mb-3 font-mono">
              <span className="text-accent">&gt;</span> {t.about.terminalHint}
            </p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
