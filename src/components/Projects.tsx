"use client";

/**
 * Daftar proyek: kartu kecil (gambar + judul + tag) berbasis React Bits PixelCard.
 * Diklik -> kartu "membesar" jadi modal berisi deskripsi + link kode & demo.
 * Transisi membesar memakai shared layout Motion (layoutId) — https://motion.dev/docs/react-layout-animations
 */
import { ArrowUpRight, Hourglass, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import { pressButton, pressCard } from "./motion/press";
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
        <SectionTitle as="h1" eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />

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
        className="card lift group relative h-full flex flex-col p-2.5 overflow-hidden"
        style={{ visibility: isOpen ? "hidden" : "visible", borderRadius: 20 }}
      >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.85rem] bg-surface-2">
            <ProjectImage project={p} index={index} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            {p.featured && (
              <span className="absolute top-2.5 left-2.5 chip !bg-background/90 backdrop-blur">
                <Star className="w-3 h-3 fill-current text-accent" /> {t.projects.featured}
              </span>
            )}
          </div>

          <div className="relative flex-1 flex flex-col gap-3 px-2.5 pt-4 pb-2.5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold uppercase tracking-tight leading-snug">{title}</h2>
              <span className="grid place-items-center shrink-0 w-8 h-8 rounded-full border border-border text-muted transition-[transform,color,border-color] duration-300 group-hover:rotate-45 group-hover:text-foreground group-hover:border-foreground" aria-hidden>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
            {p.tags.length > 0 && <p className="eyebrow mt-auto">{p.tags.join(" · ")}</p>}
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
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-muted">{tx(p.title)}</div>
      )}
    </motion.div>
  );
}

function ComingSoonCard({ project: p }: { project: Project }) {
  const { t, tx } = useLang();
  return (
    <div aria-label={t.projects.comingSoon} className="h-full flex flex-col p-2.5 rounded-[20px] border border-dashed border-border-strong">
      <div className="relative aspect-[16/10] flex items-center justify-center rounded-[0.85rem] bg-surface-2 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_14px,color-mix(in_srgb,var(--border)_70%,transparent)_14px,color-mix(in_srgb,var(--border)_70%,transparent)_15px)]">
        <Hourglass className="w-6 h-6 text-muted animate-pulse" aria-hidden />
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <span className="eyebrow">{t.projects.comingSoon}</span>
        <h2 className="text-lg font-bold uppercase tracking-tight text-muted">{tx(p.title)}</h2>
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
  // Legacy repo/demo links plus named resource links defined per project.
  const links = [
    ...(p.repoUrl ? [{ label: t.projects.code, url: p.repoUrl, github: true, primary: false }] : []),
    ...(hasDemo ? [{ label: t.projects.demo, url: p.demoUrl, github: false, primary: true }] : []),
    ...(p.resources?.filter((resource) => resource.url && resource.url !== "#").map((resource) => ({ label: tx(resource.label), url: resource.url, github: false, primary: resource.primary ?? false })) ?? []),
  ];

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
        className="relative w-full max-w-2xl max-h-[88svh] overflow-y-auto overscroll-contain border border-border bg-surface shadow-[0_40px_80px_-30px_rgb(var(--shadow-color)/0.6)]"
        style={{ borderRadius: 24 }}
      >
        <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden bg-surface-2">
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
                className={`relative shrink-0 w-24 aspect-video rounded-lg border-2 overflow-hidden transition-[border-color,opacity] ${shot === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"}`}
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
          className="absolute top-3 right-3 z-10 grid place-items-center w-10 h-10 rounded-full bg-background/90 backdrop-blur text-foreground border border-border hover:border-foreground transition-colors"
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
            <span className="chip mb-4">
              <Star className="w-3 h-3 fill-current text-accent" /> {t.projects.featured}
            </span>
          )}
          <h3 id={titleId} className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            {title}
          </h3>
          {p.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-5 text-muted leading-relaxed">{tx(p.description)}</p>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <motion.a
                  key={`${link.label}-${link.url}`}
                  {...pressButton}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${link.primary ? "btn-primary" : ""}`}
                >
                  {link.github ? <SocialIcon k="github" className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  {link.label}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
