"use client";

import { useLang } from "@/i18n/useLang";
import PageBackground from "./PageBackground";
import { CardHand } from "./PickCards";
import SectionTitle from "./SectionTitle";

/** "Pick your card!" di beranda — kartu navigasi ke halaman lain */
export default function Explore() {
  const { t } = useLang();
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <PageBackground variant="grid-diagonal" />
      <div className="relative max-w-6xl mx-auto">
        <SectionTitle title={t.explore.title} subtitle={t.explore.subtitle} />
        <CardHand />
      </div>
    </section>
  );
}
