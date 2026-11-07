"use client";

/**
 * Indeks halaman bergaya editorial memakai React Bits "FlowingMenu":
 * saat kursor melewati sebuah baris, pita marquee berisi deskripsi mengalir masuk.
 * - <PageIndex />                 : di beranda ("Jelajahi"), semua halaman selain beranda.
 * - <PageIndex current="about" /> : di bawah tiap halaman ("Lanjut jelajahi"), tanpa halaman yang sedang dibuka.
 */
import { pages, type PageKey } from "@/data/pages";
import { useLang } from "@/i18n/useLang";
import FlowingMenu, { type FlowingMenuItem } from "./reactbits/FlowingMenu";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

type CardKey = Exclude<PageKey, "home">;
const cardPages = pages.filter((p) => p.key !== "home") as unknown as { key: CardKey; href: string }[];

export default function PageIndex({ current }: { current?: CardKey }) {
  const { t } = useLang();
  const compact = !!current;
  const items: FlowingMenuItem[] = cardPages
    .filter((p) => p.key !== current)
    .map((p) => ({
      text: t.nav[p.key],
      link: p.href,
      marquee: t.explore.cards[p.key],
      meta: String(cardPages.findIndex((c) => c.key === p.key) + 1).padStart(2, "0"),
    }));

  return (
    <section className={`px-6 ${compact ? "pt-10 pb-24" : "py-28"}`}>
      <div className="max-w-6xl mx-auto">
        {compact ? (
          <p className="eyebrow mb-6">{t.explore.next}</p>
        ) : (
          <SectionTitle eyebrow={t.explore.eyebrow} title={t.explore.title} subtitle={t.explore.subtitle} />
        )}

        <Reveal>
          <div
            className="overflow-hidden rounded-[1.5rem] border border-border font-extrabold uppercase tracking-[-0.03em]"
            style={{ height: items.length * (compact ? 76 : 104) }}
          >
            <FlowingMenu
              items={items}
              ariaLabel={compact ? t.explore.next : t.explore.title}
              align="left"
              showArrow
              speed={50}
              bandRadius={0}
              textColor="var(--foreground)"
              bgColor="var(--surface)"
              marqueeBgColor="var(--foreground)"
              marqueeTextColor="var(--background)"
              borderColor="var(--border)"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
