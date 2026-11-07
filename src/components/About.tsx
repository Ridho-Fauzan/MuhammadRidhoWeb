"use client";

import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import CountUp from "./reactbits/CountUp";
import PhotoStack from "./PhotoStack";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function About() {
  const { t, tx } = useLang();
  const [lead, ...rest] = profile.about;

  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle as="h1" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-14 items-center [&>*]:min-w-0">
          <div>
            {lead && (
              <Reveal>
                <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">{tx(lead)}</p>
              </Reveal>
            )}
            <div className="mt-8 space-y-5 text-muted leading-relaxed text-[1.05rem]">
              {rest.map((p, i) => (
                <Reveal key={i} delay={(i + 1) * 0.1}>
                  <p>{tx(p)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2} className="order-first lg:order-none">
            <PhotoStack />
          </Reveal>
        </div>

        {/* Statistik: grid bergaris seperti referensi editorial */}
        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-[1.25rem] border border-border bg-surface divide-y sm:divide-y-0 sm:divide-x divide-border">
            {profile.stats.map((s, i) => (
              <div key={i} className="p-8 sm:p-10 flex flex-col-reverse">
                <dt className="eyebrow mt-4">{tx(s.label)}</dt>
                <dd className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em]">
                  <CountUp to={s.value} duration={1.6} />
                  {s.suffix ?? "+"}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
