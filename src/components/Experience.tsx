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
        <ol className="relative border-l border-border ml-2">
          {experiences.map((e, i) => (
            <li key={i} className="relative mb-10 pl-8 last:mb-0">
              <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-accent" />
              <Reveal delay={i * 0.1}>
                <p className="text-xs text-accent mb-1">{tx(e.period)}</p>
                <h3 className="text-lg font-semibold">{tx(e.role)}</h3>
                <p className="mt-0.5 text-muted">{tx(e.company)}</p>
                <p className="mt-2 text-sm text-muted">{tx(e.description)}</p>
                {e.tech && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-0.5 text-xs rounded border border-border text-muted">
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
