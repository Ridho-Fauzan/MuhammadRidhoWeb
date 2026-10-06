import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Terminal from "./Terminal";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="01" title="About Me" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start [&>*]:min-w-0">
          <div className="space-y-5 text-muted leading-relaxed">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {profile.stats.map((s) => (
                  <div key={s.label} className="p-4 rounded-xl border border-border bg-surface text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</p>
                    <p className="text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-sm text-muted mb-3">
              <span className="text-accent">&gt;</span> Coba terminal interaktif di bawah ini:
            </p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
