"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pages } from "@/data/pages";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import LangToggle from "./LangToggle";
import PillNav from "./reactbits/PillNav";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ...pages.map((p) => ({ label: t.nav[p.key], href: p.href })),
    ...(profile.resumeUrl ? [{ label: "CV", href: profile.resumeUrl }] : []),
  ];
  // Halaman aktif = halaman yang path-nya cocok (beranda hanya jika tepat "/")
  const active = pages.find((p) => (p.href === "/" ? pathname === "/" : pathname.startsWith(p.href)))?.href;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-md border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          {/* React Bits PillNav — warna mengikuti tema (monokrom) */}
          <PillNav
            key={t.nav.home}
            logo={profile.avatarUrl || "/favicon.ico"}
            logoAlt={profile.name}
            items={items}
            activeHref={active}
            baseColor="var(--foreground)"
            pillColor="var(--background)"
            pillTextColor="var(--foreground)"
            hoveredPillTextColor="var(--background)"
            ease="power3.out"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
