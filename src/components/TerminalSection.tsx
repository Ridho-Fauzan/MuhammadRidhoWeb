"use client";

import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Terminal from "./Terminal";

/** Terminal interaktif di beranda — jalan pintas ke semua halaman lewat perintah `cd`. */
export default function TerminalSection() {
  const { t } = useLang();
  return (
    <section id="terminal" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title={t.terminalSection.title} subtitle={t.terminalSection.subtitle} />
        <Reveal delay={0.1}>
          <p className="text-sm text-muted mb-3 font-mono">
            <span className="text-accent">&gt;</span> {t.terminalSection.hint}
          </p>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
