"use client";

import { ArrowUpRight, ExternalLink, FolderGit2, Star } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import SpotlightCard from "./reactbits/SpotlightCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SocialIcon } from "./SocialIcons";

export default function Projects() {
  const { t, tx } = useLang();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <SpotlightCard
                className="group h-full flex flex-col bg-surface hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
                spotlightColor="rgba(52, 211, 153, 0.12)"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-2/20">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={tx(p.title)}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-muted">
                      <span className="text-accent">&lt;</span>
                      {tx(p.title)}
                      <span className="text-accent"> /&gt;</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur text-accent ring-1 ring-accent/30">
                    <Star className="w-3 h-3 fill-current" /> {t.projects.featured}
                  </span>
                  {p.demoUrl && p.demoUrl !== "#" && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.projects.demo}: ${tx(p.title)}`}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="relative flex-1 flex flex-col p-6">
                  <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">{tx(p.title)}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed flex-1">{tx(p.description)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-md bg-accent/10 text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks demo={p.demoUrl} repo={p.repoUrl} labels={t.projects} />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <Reveal>
              <h3 className="mt-20 mb-6 text-2xl font-semibold">{t.projects.others}</h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} className="h-full">
                  <SpotlightCard
                    className="h-full flex flex-col p-6 bg-surface hover:border-accent/40 transition-colors"
                    spotlightColor="rgba(52, 211, 153, 0.12)"
                  >
                    <FolderGit2 className="relative w-8 h-8 text-accent mb-4" />
                    <h4 className="relative text-lg font-semibold">{tx(p.title)}</h4>
                    <p className="relative mt-2 text-sm text-muted flex-1">{tx(p.description)}</p>
                    <p className="relative mt-4 text-xs font-mono text-muted">{p.tags.join(" · ")}</p>
                    <ProjectLinks demo={p.demoUrl} repo={p.repoUrl} labels={t.projects} />
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectLinks({ demo, repo, labels }: { demo?: string; repo?: string; labels: { code: string; demo: string } }) {
  if (!demo && !repo) return null;
  return (
    <div className="relative mt-5 flex gap-5 text-sm">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors">
          <SocialIcon k="github" className="w-4 h-4" /> {labels.code}
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors">
          <ExternalLink className="w-4 h-4" /> {labels.demo}
        </a>
      )}
    </div>
  );
}
