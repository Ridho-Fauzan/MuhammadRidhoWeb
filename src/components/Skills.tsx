import { Code2, Database, Server, Wrench } from "lucide-react";
import { skills } from "@/data/profile";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const icons = [Code2, Server, Database, Wrench];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface/60 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="02" title="Skills" subtitle="Teknologi dan tools yang saya gunakan sehari-hari." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s.category} delay={i * 0.1}>
                <div className="h-full p-6 rounded-xl border border-border bg-background hover:border-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold">{s.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span key={it} className="px-2.5 py-1 text-xs rounded-md bg-surface border border-border text-muted">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
