"use client";

/**
 * Navbar bergaya ThreeUI "Animated Top Dock — Retro"
 * (https://threeui.com/css/animated-top-dock/retro, MIT — lihat ./threeui/LICENSE).
 * Memakai shader dither & pegas proximity asli ThreeUI; isinya diganti menu halaman portfolio.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { pages } from "@/data/pages";
import { profile } from "@/data/profile";
import { setLang, useLang } from "@/i18n/useLang";
import { PAGE_ICONS as ICONS } from "./pixelIcons";
import { createRetroPixelField } from "./threeui/retroPixelField";
import { createTopDockController } from "./threeui/topDockController";
import { useTheme } from "./ThemeToggle";
import "./RetroDock.css";

const SUN = (
  <>
    <rect x="2" y="2" width="3" height="3" />
    <rect x="3" y="0" width="1" height="1" />
    <rect x="3" y="6" width="1" height="1" />
    <rect x="0" y="3" width="1" height="1" />
    <rect x="6" y="3" width="1" height="1" />
  </>
);
const MOON = (
  <>
    <rect x="2" y="0" width="3" height="1" />
    <rect x="1" y="1" width="2" height="5" />
    <rect x="2" y="6" width="3" height="1" />
    <rect x="3" y="5" width="3" height="1" />
  </>
);

const DOCK_OPTIONS = { proximity: 122, spring: 0.19, damping: 0.7, widthGrowth: 17, heightGrowth: 0, drop: 0, distribute: true };
const FIELD_OPTIONS = { pixelSize: 4, noise: 1, levels: 7, speed: 1 };

export default function RetroDock() {
  const pathname = usePathname();
  const { lang, t } = useLang();
  const { dark, toggle } = useTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dockRef = useRef<HTMLElement>(null);

  const active = pages.find((p) => (p.href === "/" ? pathname === "/" : pathname.startsWith(p.href)))?.key;

  // Pegas proximity ThreeUI — dibuat ulang saat bahasa berubah karena lebar label ikut berubah
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    return createTopDockController(dock, () => DOCK_OPTIONS);
  }, [lang]);

  // Shader dither ThreeUI di belakang bar; berhenti saat tab tersembunyi
  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const field = createRetroPixelField(canvas, () => FIELD_OPTIONS);
    let frame = 0;
    let box = host.getBoundingClientRect();
    const resize = () => {
      box = host.getBoundingClientRect();
      field.resize(box.width, box.height);
    };
    const tick = (now: number) => {
      field.render(now);
      frame = document.hidden ? 0 : requestAnimationFrame(tick);
    };
    const onVisible = () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    document.addEventListener("visibilitychange", onVisible);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      field.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className="rd">
      <canvas ref={canvasRef} className="rd__field" aria-hidden="true" />

      <Link href="/" className="rd__brand" aria-label={t.nav.home}>
        <span className="rd__icon" aria-hidden="true">
          <svg viewBox="0 0 7 7">
            <rect x="0" y="2" width="7" height="3" />
            <rect x="2" y="0" width="3" height="7" />
          </svg>
        </span>
        <span className="rd__brand-text">{`${profile.shortName}//OS`}</span>
      </Link>

      <nav ref={dockRef} className="rd__dock" aria-label="Primary" data-dock-state="idle" data-dock-max="0.00">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rd__item"
            data-dock-item
            aria-current={active === p.key ? "page" : undefined}
            aria-label={t.nav[p.key]}
            title={t.nav[p.key]}
          >
            <span className="rd__icon" aria-hidden="true">
              <svg viewBox="0 0 7 7">{ICONS[p.key]}</svg>
            </span>
            <span className="rd__label">{t.nav[p.key]}</span>
          </Link>
        ))}
      </nav>

      <div className="rd__actions">
        <button
          type="button"
          className="rd__action rd__lang"
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          aria-label={t.toggles.lang}
          title={t.toggles.lang}
        >
          {lang === "id" ? (
            <>
              <b>ID</b>
              <span>/EN</span>
            </>
          ) : (
            <>
              <span>ID/</span>
              <b>EN</b>
            </>
          )}
        </button>
        <button
          type="button"
          className="rd__action"
          onClick={toggle}
          aria-label={dark ? t.toggles.toLight : t.toggles.toDark}
          title={dark ? t.toggles.toLight : t.toggles.toDark}
        >
          <span className="rd__icon" aria-hidden="true">
            <svg viewBox="0 0 7 7">{dark ? SUN : MOON}</svg>
          </span>
        </button>
      </div>
    </div>
  );
}
