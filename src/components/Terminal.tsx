"use client";

import { useEffect, useRef, useState } from "react";
import { experiences, profile, projects, skills, socials } from "@/data/profile";
import type { L, Lang } from "@/i18n/types";
import { tr } from "@/i18n/types";
import { ui } from "@/i18n/ui";
import { setLang, useLang } from "@/i18n/useLang";
import { pages } from "@/data/pages";
import { useRouter } from "next/navigation";

type Line = { type: "in" | "out"; content: React.ReactNode };
type Ui = (typeof ui)["id"];

const user = profile.shortName.toLowerCase().replace(/\s+/g, "");
const COMMANDS = ["cd about", "cd skills", "cd projects", "cd experience", "cd contact", "cd ~", "help", "whoami", "about", "skills", "projects", "experience", "social", "contact", "lang", "clear", "date", "sudo"];

function run(cmd: string, lang: Lang, go: (href: string) => void): React.ReactNode | "clear" {
  const c = cmd.trim().toLowerCase();
  const t: Ui = ui[lang];
  const tx = (v: L) => tr(v, lang);

  if (c === "cd" || c.startsWith("cd ")) {
    const target = c.slice(3).trim().replace(/^\/+|\/+$/g, "");
    const page = target === "" || target === "~" || target === ".." ? pages[0] : pages.find((p) => p.key === target);
    if (!page) {
      return (
        <p>
          <span className="text-red-400">cd:</span> {target}: {t.terminal.noDir}{" "}
          <span className="text-zinc-400">({pages.filter((p) => p.key !== "home").map((p) => p.key).join(", ")})</span>
        </p>
      );
    }
    setTimeout(() => go(page.href), 350);
    return <p className="text-emerald-400">→ {t.nav[page.key]}</p>;
  }

  if (c === "lang en" || c === "lang id") {
    const next = c.slice(5) as Lang;
    setLang(next);
    return <p className="text-emerald-400">{ui[next].terminal.langChanged}</p>;
  }

  switch (c) {
    case "":
      return null;
    case "help":
      return (
        <div className="space-y-0.5">
          <p className="text-amber-300">{t.terminal.available}</p>
          {(Object.keys(t.terminal.cmds) as (keyof Ui["terminal"]["cmds"])[]).map((k) => (
            <p key={k} className="pl-4">
              <span className="text-cyan-400">{k}</span> <span className="text-zinc-400">- {t.terminal.cmds[k]}</span>
            </p>
          ))}
          <p className="pt-2 text-zinc-400">{t.terminal.tip}</p>
        </div>
      );
    case "whoami":
      return (
        <p>
          <span className="text-emerald-400">{profile.name}</span> — {tx(profile.role)} @ {tx(profile.location)}
        </p>
      );
    case "about":
      return <p className="text-zinc-300">{tx(profile.about[0])}</p>;
    case "skills":
      return (
        <div>
          {skills.map((s, i) => (
            <p key={i}>
              <span className="text-amber-300">{tx(s.category)}</span>{" "}
              <span className="text-zinc-300">{s.items.map(tx).join(", ")}</span>
            </p>
          ))}
        </div>
      );
    case "projects":
      return (
        <div>
          {projects.map((p, i) => (
            <p key={i}>
              <span className="text-cyan-400">{tx(p.title)}</span> <span className="text-zinc-400">[{p.tags.join(", ")}]</span>
            </p>
          ))}
        </div>
      );
    case "experience":
      return (
        <div>
          {experiences.map((e, i) => (
            <p key={i}>
              <span className="text-zinc-400">{tx(e.period)}</span> <span className="text-emerald-400">{tx(e.role)}</span> @ {tx(e.company)}
            </p>
          ))}
        </div>
      );
    case "social":
      return (
        <div>
          {socials.map((s) => (
            <p key={s.key}>
              <span className="text-amber-300">{s.label.padEnd(12)}</span>{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                {s.url.replace(/^mailto:/, "")}
              </a>
            </p>
          ))}
        </div>
      );
    case "contact":
      return (
        <p>
          {t.terminal.emailMe}{" "}
          <a href={`mailto:${profile.email}`} className="text-cyan-400 underline">
            {profile.email}
          </a>
        </p>
      );
    case "lang":
      return <p className="text-zinc-400">{t.terminal.cmds.lang}</p>;
    case "date":
      return <p>{new Date().toLocaleString(lang === "id" ? "id-ID" : "en-US")}</p>;
    case "sudo":
    case "sudo rm -rf /":
      return <p className="text-red-400">{t.terminal.denied}</p>;
    case "clear":
      return "clear";
    default:
      return (
        <p>
          <span className="text-red-400">{t.terminal.notFound}</span> {cmd}. {t.terminal.type}{" "}
          <span className="text-cyan-400">help</span>.
        </p>
      );
  }
}

function Prompt() {
  return (
    <span className="shrink-0">
      <span className="text-emerald-400">{user}@portfolio</span>
      <span className="text-zinc-500">:</span>
      <span className="text-cyan-400">~</span>
      <span className="text-zinc-500">$ </span>
    </span>
  );
}

export default function Terminal() {
  const { lang, t } = useLang();
  const router = useRouter();
  // Pesan sambutan dirender ulang sesuai bahasa; hanya output perintah yang disimpan di state
  const [lines, setLines] = useState<Line[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const result = run(input, lang, (href) => router.push(href));
    if (result === "clear") {
      setLines([]);
      setShowWelcome(false);
    } else {
      setLines((l) => [...l, { type: "in", content: input }, ...(result ? [{ type: "out" as const, content: result }] : [])]);
    }
    if (input.trim()) setHistory((h) => [input, ...h]);
    setHIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match && input) setInput(match);
    }
  };

  return (
    <div
      className="font-mono rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl shadow-accent/5 text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-zinc-400 text-xs">{user}@portfolio: ~</span>
      </div>
      <div ref={bodyRef} className="terminal-scroll h-80 overflow-y-auto p-4 space-y-1.5 cursor-text">
        {showWelcome && (
          <>
            <p>{t.terminal.welcome}</p>
            <p className="text-zinc-400">
              {t.terminal.type} <span className="text-cyan-400">help</span> {t.terminal.forHelp}
            </p>
          </>
        )}
        {lines.map((l, i) =>
          l.type === "in" ? (
            <div key={i} className="flex flex-wrap">
              <Prompt />
              <span>{l.content}</span>
            </div>
          ) : (
            <div key={i}>{l.content}</div>
          ),
        )}
        <div className="flex">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 min-w-0 bg-transparent outline-none caret-emerald-400"
            aria-label={t.terminal.input}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
