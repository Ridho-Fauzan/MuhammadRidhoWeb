"use client";

import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Terminal from "./Terminal";

export default function About() {
  const { t, tx } = useLang();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.about.title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start [&>*]:min-w-0">
          <div className="space-y-5 text-muted leading-relaxed">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{tx(p)}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {profile.stats.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-surface text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</p>
                    <p className="text-xs mt-1">{tx(s.label)}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-sm text-muted mb-3">
              <span className="text-accent">&gt;</span> {t.about.terminalHint}
            </p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
