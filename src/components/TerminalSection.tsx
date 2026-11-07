"use client";

import { useLang } from "@/i18n/useLang";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Terminal from "./Terminal";

/** Command line interaktif di beranda — jalan pintas ke semua halaman lewat perintah `cd`. */
export default function TerminalSection() {
  const { t } = useLang();
  return (
    <section id="terminal" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle center eyebrow={t.terminalSection.eyebrow} title={t.terminalSection.title} subtitle={t.terminalSection.subtitle} />
        <Reveal delay={0.1}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
