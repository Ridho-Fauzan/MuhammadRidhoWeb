"use client";

import { ArrowUpRight, Briefcase, Code2, FolderGit2, Mail, User } from "lucide-react";
import Link from "next/link";
import { pages } from "@/data/pages";
import { useLang } from "@/i18n/useLang";
import SpotlightCard from "./reactbits/SpotlightCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const icons = { about: User, skills: Code2, projects: FolderGit2, experience: Briefcase, contact: Mail };

/** Kartu navigasi di beranda menuju halaman lain */
export default function Explore() {
  const { t } = useLang();
  const items = pages.filter((p) => p.key !== "home") as Extract<(typeof pages)[number], { key: keyof typeof icons }>[];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.explore.title} subtitle={t.explore.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => {
            const Icon = icons[p.key];
            return (
              <Reveal key={p.href} delay={i * 0.06} className={`h-full ${i === 0 ? "lg:col-span-2" : ""}`}>
                <Link href={p.href} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-accent">
                  <SpotlightCard
                    className="h-full p-6 bg-surface group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300"
                    spotlightColor="rgba(52, 211, 153, 0.14)"
                  >
                    <div className="relative flex items-start justify-between">
                      <div className="p-2.5 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="relative mt-6 text-xl font-semibold group-hover:text-accent transition-colors">{t.nav[p.key]}</h3>
                    <p className="relative mt-2 text-sm text-muted">{t.explore.cards[p.key]}</p>
                  </SpotlightCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
