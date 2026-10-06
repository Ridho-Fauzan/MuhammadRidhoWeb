"use client";

import { useEffect, useRef, useState } from "react";
import { experiences, profile, projects, skills, socials } from "@/data/profile";

type Line = { type: "in" | "out"; content: React.ReactNode };

const user = profile.shortName.toLowerCase().replace(/\s+/g, "");
const COMMANDS = ["help", "whoami", "about", "skills", "projects", "experience", "social", "contact", "clear", "date", "sudo"];

function run(cmd: string): React.ReactNode | "clear" {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return null;
    case "help":
      return (
        <div className="space-y-0.5">
          <p className="text-amber-300">Perintah yang tersedia:</p>
          {[
            ["whoami", "Info singkat"],
            ["about", "Tentang saya"],
            ["skills", "Daftar skill"],
            ["projects", "Daftar proyek"],
            ["experience", "Riwayat pengalaman"],
            ["social", "Link media sosial"],
            ["contact", "Cara menghubungi saya"],
            ["clear", "Bersihkan terminal"],
          ].map(([k, v]) => (
            <p key={k} className="pl-4">
              <span className="text-cyan-400">{k}</span> <span className="text-zinc-400">- {v}</span>
            </p>
          ))}
          <p className="pt-2 text-zinc-400">Tip: tekan Tab untuk autocomplete, ↑/↓ untuk riwayat.</p>
        </div>
      );
    case "whoami":
      return (
        <p>
          <span className="text-emerald-400">{profile.name}</span> — {profile.role} @ {profile.location}
        </p>
      );
    case "about":
      return <p className="text-zinc-300">{profile.about[0]}</p>;
    case "skills":
      return (
        <div>
          {skills.map((s) => (
            <p key={s.category}>
              <span className="text-amber-300">{s.category.padEnd(10)}</span>{" "}
              <span className="text-zinc-300">{s.items.join(", ")}</span>
            </p>
          ))}
        </div>
      );
    case "projects":
      return (
        <div>
          {projects.map((p) => (
            <p key={p.title}>
              <span className="text-cyan-400">{p.title}</span> <span className="text-zinc-400">[{p.tags.join(", ")}]</span>
            </p>
          ))}
        </div>
      );
    case "experience":
      return (
        <div>
          {experiences.map((e) => (
            <p key={e.role + e.period}>
              <span className="text-zinc-400">{e.period}</span> <span className="text-emerald-400">{e.role}</span> @ {e.company}
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
          Kirim email ke{" "}
          <a href={`mailto:${profile.email}`} className="text-cyan-400 underline">
            {profile.email}
          </a>
        </p>
      );
    case "date":
      return <p>{new Date().toString()}</p>;
    case "sudo":
    case "sudo rm -rf /":
      return <p className="text-red-400">Nice try. Permission denied.</p>;
    case "clear":
      return "clear";
    default:
      return (
        <p>
          <span className="text-red-400">command not found:</span> {cmd}. Ketik <span className="text-cyan-400">help</span>.
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
  const [lines, setLines] = useState<Line[]>([
    { type: "out", content: <p>Selamat datang di terminal portfolio saya!</p> },
    {
      type: "out",
      content: (
        <p className="text-zinc-400">
          Ketik <span className="text-cyan-400">help</span> untuk melihat perintah yang tersedia.
        </p>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const result = run(input);
    if (result === "clear") {
      setLines([]);
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
      className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl shadow-accent/5 text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-zinc-400 text-xs">{user}@portfolio: ~</span>
      </div>
      <div ref={bodyRef} className="terminal-scroll h-80 overflow-y-auto p-4 space-y-1.5 cursor-text">
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
            aria-label="Input terminal"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
