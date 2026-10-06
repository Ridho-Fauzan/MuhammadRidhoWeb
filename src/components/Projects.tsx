import { ExternalLink, FolderGit2 } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/profile";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { SocialIcon } from "./SocialIcons";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index="03" title="Projects" subtitle="Beberapa proyek yang pernah saya kerjakan." />

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group h-full flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/50 hover:-translate-y-1 transition-all">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-2/20">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted text-sm">
                        <span className="text-accent">&lt;</span>
                        {p.title}
                        <span className="text-accent"> /&gt;</span>
                      </span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-md bg-background/80 backdrop-blur text-accent">
                    ★ Featured
                  </span>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted flex-1">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-accent">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks demo={p.demoUrl} repo={p.repoUrl} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <Reveal>
              <h3 className="mt-16 mb-6 text-lg font-semibold">
                <span className="text-accent">$</span> ls ./other-projects
              </h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <article className="h-full flex flex-col p-5 rounded-xl border border-border bg-surface hover:border-accent/50 transition-colors">
                    <FolderGit2 className="w-8 h-8 text-accent mb-3" />
                    <h4 className="font-semibold">{p.title}</h4>
                    <p className="mt-2 text-sm text-muted flex-1">{p.description}</p>
                    <p className="mt-3 text-xs text-muted">{p.tags.join(" · ")}</p>
                    <ProjectLinks demo={p.demoUrl} repo={p.repoUrl} />
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectLinks({ demo, repo }: { demo?: string; repo?: string }) {
  if (!demo && !repo) return null;
  return (
    <div className="mt-4 flex gap-4 text-sm">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
          <SocialIcon k="github" className="w-4 h-4" /> Code
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
          <ExternalLink className="w-4 h-4" /> Demo
        </a>
      )}
    </div>
  );
}
