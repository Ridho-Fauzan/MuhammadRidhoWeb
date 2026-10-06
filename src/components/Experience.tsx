"use client";

import { experiences } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  const { t, tx } = useLang();

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t.experience.title} subtitle={t.experience.subtitle} />
        <ol className="relative border-l-4 border-dotted border-muted ml-2">
          {experiences.map((e, i) => (
            <li key={i} className="relative mb-10 pl-8 last:mb-0">
              <span className="absolute -left-[10px] top-1 w-4 h-4 bg-accent border-2 border-foreground shadow-[2px_2px_0_var(--shadow)]" />
              <Reveal delay={i * 0.1}>
                <p className="inline-block text-xs uppercase tracking-[0.15em] px-2 py-0.5 mb-2 bg-accent-2 text-on-accent">{tx(e.period)}</p>
                <h3 className="text-lg sm:text-xl">{tx(e.role)}</h3>
                <p className="mt-1 text-accent">@ {tx(e.company)}</p>
                <p className="mt-2 text-sm text-muted">{tx(e.description)}</p>
                {e.tech && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs uppercase tracking-wider border-2 border-border text-muted">
                        {tx(tech)}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
