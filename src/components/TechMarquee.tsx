"use client";

import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiUnity,
} from "react-icons/si";
import { useLang } from "@/i18n/useLang";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";

// Simple Icons tidak lagi menyediakan logo C#, jadi dibuat sebagai teks
const CSharp = () => <span className="font-mono font-bold text-[1.05em] leading-none">C#</span>;

const tech: { title: string; node: React.ReactNode }[] = [
  { title: "Unity", node: <SiUnity /> },
  { title: "C#", node: <CSharp /> },
  { title: "three.js", node: <SiThreedotjs /> },
  { title: "JavaScript", node: <SiJavascript /> },
  { title: "TypeScript", node: <SiTypescript /> },
  { title: "React", node: <SiReact /> },
  { title: "Next.js", node: <SiNextdotjs /> },
  { title: "Tailwind CSS", node: <SiTailwindcss /> },
  { title: "HTML", node: <SiHtml5 /> },
  { title: "CSS", node: <SiCss /> },
  { title: "Git", node: <SiGit /> },
  { title: "GitHub", node: <SiGithub /> },
  { title: "Figma", node: <SiFigma /> },
];

const logos: LogoItem[] = tech.map((x) => ({
  title: x.title,
  ariaLabel: x.title,
  node: (
    <span className="inline-flex items-center gap-2.5 text-muted hover:text-accent transition-colors">
      {x.node}
      <span className="text-sm uppercase tracking-[0.12em]">{x.title}</span>
    </span>
  ),
}));

export default function TechMarquee() {
  const { t } = useLang();
  return (
    <section id="stack" aria-label={t.stack.title} className="py-8 border-y-2 border-border bg-surface">
      <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted mb-6">{t.stack.title}</p>
      <LogoLoop
        logos={logos}
        speed={60}
        direction="left"
        logoHeight={24}
        gap={48}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="var(--surface)"
        ariaLabel={t.stack.title}
      />
    </section>
  );
}
