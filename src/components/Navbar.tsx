"use client";

/**
 * Navbar yang sembunyi saat scroll ke bawah dan muncul lagi saat scroll ke atas.
 * Pola dari motion.dev "Scroll Direction: Hide Header"
 * (https://motion.dev/examples/react-scroll-hide-header): useScroll + useMotionValueEvent + animate.
 * Tampilan mengikuti ThreeUI "Animated Top Dock — Command Bar" (https://threeui.com/css/animated-top-dock/modern, MIT):
 * wordmark di kiri, dock menu di tengah yang melebar dengan pegas saat kursor mendekat, aksi di kanan.
 * Di layar kecil menu pindah ke panel yang dibuka lewat tombol ☰.
 */
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pages } from "@/data/pages";
import { profile } from "@/data/profile";
import { setLang, useLang } from "@/i18n/useLang";
import { createTopDockController } from "./threeui/topDockController";
import { useTheme } from "./ThemeToggle";

const SHOW_NEAR_TOP = 120; // px dari atas: navbar selalu tampil
const MIN_DELTA = 4; // abaikan getaran scroll yang sangat kecil
// Pegas proximity ThreeUI: item melebar saat kursor mendekat; lockTrack = bar tidak ikut melebar
const DOCK_OPTIONS = { proximity: 110, spring: 0.19, damping: 0.7, widthGrowth: 18, heightGrowth: 0, drop: 0, lockTrack: true };

export default function Navbar() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { lang, t } = useLang();
  const { dark, toggle } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const dockRef = useRef<HTMLUListElement>(null);

  // Dibuat ulang saat bahasa berubah karena lebar label ikut berubah
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    return createTopDockController(dock, () => DOCK_OPTIONS);
  }, [lang]);

  // Halaman baru selalu dimulai dengan navbar terlihat & menu HP tertutup
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setHidden(false);
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = current - previous;
    setScrolled(current > 12);
    if (current < SHOW_NEAR_TOP) return setHidden(false);
    if (Math.abs(delta) < MIN_DELTA) return;
    setHidden(delta > 0);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHidden = hidden && !focused && !open;
  const active = pages.find((p) => (p.href === "/" ? pathname === "/" : pathname.startsWith(p.href)))?.key;

  const iconBtn =
    "inline-flex items-center justify-center h-10 min-w-10 px-2.5 rounded-full border border-border bg-surface text-foreground hover:border-foreground transition-colors";

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3"
      animate={{ y: isHidden ? "-120%" : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      style={{ pointerEvents: isHidden ? "none" : undefined }}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between gap-3 h-14 pl-4 pr-2 rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-background/80 backdrop-blur-xl border-border shadow-[0_8px_30px_-12px_rgb(var(--shadow-color)/0.25)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-[15px]" aria-label={t.nav.home}>
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-foreground text-background text-sm">
            {profile.shortName.charAt(0)}
          </span>
          <span className="uppercase">
            {profile.shortName}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul ref={dockRef} data-dock-state="idle" className="flex items-center gap-1 p-1 rounded-full border border-border bg-surface/70">
            {pages.map((p) => {
              const isActive = active === p.key;
              return (
                <li key={p.href} data-dock-item className="relative flex">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Link
                    href={p.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex flex-1 justify-center px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                      isActive ? "text-background" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t.nav[p.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            aria-label={t.toggles.lang}
            title={t.toggles.lang}
            className={`${iconBtn} font-mono text-[11px] tracking-wider`}
          >
            {lang === "id" ? "ID" : "EN"}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? t.toggles.toLight : t.toggles.toDark}
            title={dark ? t.toggles.toLight : t.toggles.toDark}
            className={iconBtn}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.toggles.closeMenu : t.toggles.menu}
            className={`${iconBtn} md:hidden`}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden max-w-6xl mx-auto mt-2 p-2 rounded-3xl border border-border bg-background/95 backdrop-blur-xl"
          >
            <ul>
              {pages.map((p, i) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={active === p.key ? "page" : undefined}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold ${
                      active === p.key ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t.nav[p.key]}
                    <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
