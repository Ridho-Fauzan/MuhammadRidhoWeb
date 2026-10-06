"use client";

/**
 * Daftar proyek: kartu kecil (gambar + judul + tag) berbasis React Bits PixelCard.
 * Diklik -> kartu "membesar" jadi modal berisi deskripsi + link kode & demo.
 * Transisi membesar memakai shared layout Motion (layoutId) — https://motion.dev/docs/react-layout-animations
 */
import { ArrowUpRight, Hourglass, Maximize2, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import { pressButton, pressCard } from "./motion/press";
import PixelCard from "./reactbits/PixelCard";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import { getLenis } from "./SmoothScroll";
import { SocialIcon } from "./SocialIcons";

const morph = { type: "spring", stiffness: 380, damping: 38, mass: 0.9 } as const;

export default function Projects() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpenIdx((idx) => {
      // kembalikan fokus ke kartu yang tadi dibuka
      if (idx !== null) requestAnimationFrame(() => triggers.current[idx]?.focus({ preventScroll: true }));
      return null;
    });
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} className="h-full">
              {p.comingSoon ? (
                <ComingSoonCard project={p} />
              ) : (
                <ProjectCard
                  project={p}
                  index={i}
                  isOpen={openIdx === i}
                  onOpen={() => setOpenIdx(i)}
                  buttonRef={(el) => {
                    triggers.current[i] = el;
                  }}
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && <ProjectModal key={openIdx} project={projects[openIdx]} index={openIdx} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------- Kartu kecil ---------------------------------- */

function ProjectCard({
  project: p,
  index,
  isOpen,
  onOpen,
  buttonRef,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const { t, tx } = useLang();
  const title = tx(p.title);

  return (
    <motion.div {...pressCard} className="h-full">
      {/* Bingkai yang "membesar" jadi modal (layoutId sama dengan panel modal) */}
      <motion.div
        layoutId={`project-${index}`}
        transition={morph}
        className="lift h-full border-2 border-border bg-surface shadow-[5px_5px_0_var(--shadow)]"
        style={{ visibility: isOpen ? "hidden" : "visible" }}
      >
        <PixelCard variant="retro" className="h-full flex flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-border bg-gradient-to-br from-accent/20 via-surface to-accent-2/20">
            <ProjectImage project={p} index={index} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            {p.featured && (
              <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 text-[11px] uppercase tracking-wider bg-background/85 text-accent border-2 border-accent/70">
                <Star className="w-3 h-3 fill-current" /> {t.projects.featured}
              </span>
            )}
          </div>

          <div className="relative flex-1 flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg leading-snug group-hover:text-accent transition-colors">{title}</h3>
              <Maximize2 className="mt-1 w-4 h-4 shrink-0 text-muted group-hover:text-accent transition-colors" aria-hidden />
            </div>
            {p.tags.length > 0 && (
              <p className="mt-auto text-[11px] uppercase tracking-[0.12em] text-muted">{p.tags.join(" · ")}</p>
            )}
          </div>

          {/* Seluruh kartu bisa diklik / difokus keyboard */}
          <button
            ref={buttonRef}
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-label={`${t.projects.open}: ${title}`}
            className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-offset-[-4px]"
          />
        </PixelCard>
      </motion.div>
    </motion.div>
  );
}

function ProjectImage({ project: p, index, sizes }: { project: Project; index: number; sizes: string }) {
  const { tx } = useLang();
  return (
    <motion.div layoutId={`project-img-${index}`} transition={morph} className="absolute inset-0">
      {p.image ? (
        <Image
          src={p.image}
          alt={tx(p.title)}
          fill
          sizes={sizes}
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-[var(--ease-out)]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-muted">
          <span className="text-accent">&lt;</span>
          {tx(p.title)}
          <span className="text-accent"> /&gt;</span>
        </div>
      )}
    </motion.div>
  );
}

function ComingSoonCard({ project: p }: { project: Project }) {
  const { t, tx } = useLang();
  return (
    <div aria-label={t.projects.comingSoon} className="h-full flex flex-col border-2 border-dashed border-muted bg-surface/40">
      <div className="relative aspect-[16/10] flex items-center justify-center border-b-2 border-dashed border-muted bg-[repeating-linear-gradient(135deg,transparent_0,transparent_14px,color-mix(in_srgb,var(--border)_55%,transparent)_14px,color-mix(in_srgb,var(--border)_55%,transparent)_15px)]">
        <Hourglass className="w-6 h-6 text-muted animate-pulse" aria-hidden />
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.projects.comingSoon}</span>
        <h3 className="text-lg text-muted">{tx(p.title)}</h3>
      </div>
    </div>
  );
}

/* ---------------------------------- Modal detail ---------------------------------- */

function ProjectModal({ project: p, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const { t, tx } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const title = tx(p.title);
  const titleId = `project-title-${index}`;
  const shots = [p.image, ...(p.gallery ?? [])].filter((x): x is string => !!x);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    // Kunci scroll halaman di belakang modal (Lenis di desktop, overflow di HP)
    const lenis = getLenis();
    lenis?.stop();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      // jaga fokus Tab tetap di dalam modal
      const items = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [onClose]);

  const hasDemo = p.demoUrl && p.demoUrl !== "#";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        layoutId={`project-${index}`}
        transition={morph}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative w-full max-w-2xl max-h-[88svh] overflow-y-auto overscroll-contain border-2 border-foreground bg-surface shadow-[8px_8px_0_var(--shadow)]"
      >
        <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden border-b-2 border-border bg-gradient-to-br from-accent/20 via-surface to-accent-2/20">
          <ProjectImage project={p} index={index} sizes="(min-width: 672px) 672px, 100vw" />
          <AnimatePresence>
            {shot > 0 && (
              <motion.div
                key={shot}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Image src={shots[shot]} alt={`${title} — ${shot + 1}`} fill sizes="672px" className="object-cover object-top" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {shots.length > 1 && (
          <div className="flex gap-2 px-6 sm:px-8 pt-4 overflow-x-auto">
            {shots.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setShot(i)}
                aria-label={`${title} — ${i + 1}`}
                aria-pressed={shot === i}
                className={`relative shrink-0 w-24 aspect-video border-2 overflow-hidden transition-[border-color,opacity] ${shot === i ? "border-accent" : "border-border opacity-60 hover:opacity-100"}`}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        <motion.button
          {...pressButton}
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          title={t.projects.close}
          className="retro-btn absolute top-3 right-3 z-10 p-2 bg-surface text-foreground hover:bg-accent hover:text-on-accent"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {/* Isi muncul setelah kartu selesai membesar, supaya teks tidak ikut "melar" */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="p-6 sm:p-8"
        >
          {p.featured && (
            <span className="inline-flex items-center gap-1 mb-3 px-2 py-0.5 text-[11px] uppercase tracking-wider text-accent border-2 border-accent/70">
              <Star className="w-3 h-3 fill-current" /> {t.projects.featured}
            </span>
          )}
          <h3 id={titleId} className="text-2xl sm:text-3xl text-accent">
            {title}
          </h3>
          {p.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs uppercase tracking-wider bg-accent text-on-accent">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-5 text-muted leading-relaxed">{tx(p.description)}</p>

          {(p.repoUrl || hasDemo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {p.repoUrl && (
                <motion.a
                  {...pressButton}
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn inline-flex items-center gap-2 px-5 py-3 bg-surface text-foreground uppercase tracking-[0.12em] text-sm hover:bg-accent-2 hover:text-on-accent"
                >
                  <SocialIcon k="github" className="w-4 h-4" /> {t.projects.code}
                </motion.a>
              )}
              {hasDemo && (
                <motion.a
                  {...pressButton}
                  href={p.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn inline-flex items-center gap-2 px-5 py-3 bg-accent text-on-accent uppercase tracking-[0.12em] text-sm"
                >
                  {t.projects.demo} <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
