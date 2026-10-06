"use client";

import { FileDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled || open ? "bg-background/80 backdrop-blur-md border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bold text-lg">
          <span className="text-accent">~/</span>
          {profile.shortName}
          <span className="text-accent animate-blink">_</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-accent border border-accent/40 rounded-lg hover:bg-accent/10 transition-colors"
            >
              <FileDown className="w-4 h-4" /> CV
            </a>
          )}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="p-2 rounded-lg border border-border text-muted"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-muted hover:text-accent border-b border-border last:border-0"
            >
              <span className="text-accent">&gt; </span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
