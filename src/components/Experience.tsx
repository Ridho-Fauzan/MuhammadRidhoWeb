"use client";

import { experiences } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

/** Linimasa editorial: periode di kiri, isi di kanan, dipisah garis tipis. */
export default function Experience() {
  const { t, tx } = useLang();

  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle as="h1" eyebrow={t.experience.eyebrow} title={t.experience.title} subtitle={t.experience.subtitle} />
        <ol className="border-t border-border">
          {experiences.map((e, i) => (
            <li key={i} className="border-b border-border">
              <Reveal delay={i * 0.1} className="grid gap-4 py-10 md:grid-cols-[14rem_1fr_auto] md:gap-10">
                <p className="eyebrow md:pt-2">{tx(e.period)}</p>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{tx(e.role)}</h2>
                  <p className="mt-2 font-semibold text-accent">{tx(e.company)}</p>
                  <p className="mt-4 max-w-2xl text-muted leading-relaxed">{tx(e.description)}</p>
                  {e.tech && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.tech.map((tech, j) => (
                        <span key={j} className="chip">
                          {tx(tech)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="hidden md:block font-mono text-xs text-muted pt-2">{String(i + 1).padStart(2, "0")}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
