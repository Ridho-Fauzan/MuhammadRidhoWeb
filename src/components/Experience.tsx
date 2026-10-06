import { experiences } from "@/data/profile";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface/60 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <SectionTitle index="04" title="Experience" subtitle="Perjalanan karier dan pendidikan saya." />
        <ol className="relative border-l border-border ml-2">
          {experiences.map((e, i) => (
            <li key={e.role + e.period} className="relative mb-10 pl-8 last:mb-0">
              <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-accent" />
              <Reveal delay={i * 0.1}>
                <p className="text-xs text-accent mb-1">{e.period}</p>
                <h3 className="text-lg font-semibold">
                  {e.role} <span className="text-muted font-normal">@ {e.company}</span>
                </h3>
                <p className="mt-2 text-sm text-muted">{e.description}</p>
                {e.tech && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded border border-border text-muted">
                        {t}
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
