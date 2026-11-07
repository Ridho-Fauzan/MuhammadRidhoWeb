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
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { useLang } from "@/i18n/useLang";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";

const tech: { title: string; node: React.ReactNode }[] = [
  { title: "Figma", node: <SiFigma /> },
  { title: "React", node: <SiReact /> },
  { title: "Next.js", node: <SiNextdotjs /> },
  { title: "TypeScript", node: <SiTypescript /> },
  { title: "JavaScript", node: <SiJavascript /> },
  { title: "Vue", node: <SiVuedotjs /> },
  { title: "Tailwind CSS", node: <SiTailwindcss /> },
  { title: "HTML", node: <SiHtml5 /> },
  { title: "CSS", node: <SiCss /> },
  { title: "three.js", node: <SiThreedotjs /> },
  { title: "Vite", node: <SiVite /> },
  { title: "Git", node: <SiGit /> },
  { title: "GitHub", node: <SiGithub /> },
  { title: "Vercel", node: <SiVercel /> },
];

const logos: LogoItem[] = tech.map((x) => ({
  title: x.title,
  ariaLabel: x.title,
  node: (
    <span className="inline-flex items-center gap-2.5 text-muted hover:text-foreground transition-colors">
      {x.node}
      <span className="text-sm font-semibold tracking-tight">{x.title}</span>
    </span>
  ),
}));

export default function TechMarquee() {
  const { t } = useLang();
  return (
    <section id="stack" aria-label={t.stack.title} className="py-10 border-y border-border">
      <p className="eyebrow text-center mb-7">{t.stack.title}</p>
      <LogoLoop
        logos={logos}
        speed={50}
        direction="left"
        logoHeight={22}
        gap={56}
        pauseOnHover
        fadeOut
        fadeOutColor="var(--background)"
        ariaLabel={t.stack.title}
      />
    </section>
  );
}
