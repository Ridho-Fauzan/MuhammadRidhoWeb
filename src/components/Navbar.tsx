"use client";

import { FileDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { pages } from "@/data/pages";
import { useLang } from "@/i18n/useLang";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled || open ? "bg-background/80 backdrop-blur-md border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          <span className="text-accent">~/</span>
          {profile.shortName}
          <span className="text-accent animate-blink">_</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-surface/60 backdrop-blur">
            {pages.map((p) => {
              const active = isActive(p.href);
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.nav[p.key]}</span>
                </Link>
              );
            })}
          </div>
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
          <div className="ml-2 flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="p-2 rounded-lg border border-border text-muted"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden px-6 pb-4 flex flex-col max-w-6xl mx-auto">
          {pages.map((p) => {
            const active = isActive(p.href);
            return (
              <Link
                key={p.href}
                href={p.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`py-3 border-b border-border last:border-0 ${active ? "text-accent" : "text-muted hover:text-accent"}`}
              >
                <span className="text-accent">&gt; </span>
                {t.nav[p.key]}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
