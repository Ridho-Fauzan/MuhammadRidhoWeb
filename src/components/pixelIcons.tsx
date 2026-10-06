/**
 * Ikon pixel 7x7 (gaya ikon ThreeUI retro dock) untuk tiap halaman.
 * Dipakai navbar, kartu "Pick your card", dan footer.
 * Gambar di dalam <svg viewBox="0 0 7 7"> dengan fill="currentColor".
 */
import type { PageKey } from "@/data/pages";

export const PAGE_ICONS: Record<PageKey, React.ReactNode> = {
  home: (
    <>
      <rect x="3" y="0" width="1" height="1" />
      <rect x="2" y="1" width="3" height="1" />
      <rect x="1" y="2" width="5" height="1" />
      <rect x="0" y="3" width="7" height="1" />
      <rect x="1" y="4" width="5" height="3" />
      <rect x="3" y="5" width="1" height="2" fill="var(--rd-bar)" />
    </>
  ),
  about: (
    <>
      <rect x="2" y="0" width="3" height="3" />
      <rect x="1" y="4" width="5" height="1" />
      <rect x="0" y="5" width="7" height="2" />
    </>
  ),
  skills: (
    <>
      <rect x="2" y="1" width="1" height="1" />
      <rect x="1" y="2" width="1" height="1" />
      <rect x="0" y="3" width="1" height="1" />
      <rect x="1" y="4" width="1" height="1" />
      <rect x="2" y="5" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="6" y="3" width="1" height="1" />
      <rect x="5" y="4" width="1" height="1" />
      <rect x="4" y="5" width="1" height="1" />
    </>
  ),
  projects: (
    <>
      <rect x="0" y="1" width="3" height="1" />
      <rect x="0" y="2" width="7" height="5" />
    </>
  ),
  experience: (
    <>
      <rect x="2" y="0" width="3" height="1" />
      <rect x="2" y="1" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="0" y="2" width="7" height="5" />
      <rect x="3" y="4" width="1" height="1" fill="var(--rd-bar)" />
    </>
  ),
  contact: (
    <>
      <rect x="0" y="1" width="7" height="5" />
      <rect x="1" y="2" width="1" height="1" fill="var(--rd-bar)" />
      <rect x="2" y="3" width="1" height="1" fill="var(--rd-bar)" />
      <rect x="3" y="4" width="1" height="1" fill="var(--rd-bar)" />
      <rect x="4" y="3" width="1" height="1" fill="var(--rd-bar)" />
      <rect x="5" y="2" width="1" height="1" fill="var(--rd-bar)" />
    </>
  ),
};


/** Bungkus ikon pixel jadi <svg> siap pakai */
export function PixelIcon({ k, className = "w-4 h-4", cut = "var(--surface)" }: { k: PageKey; className?: string; cut?: string }) {
  // `cut` = warna lubang di dalam ikon (mis. pintu rumah, amplop)
  return (
    <svg
      viewBox="0 0 7 7"
      className={`fill-current ${className}`}
      style={{ shapeRendering: "crispEdges", ["--rd-bar" as string]: cut }}
      aria-hidden
    >
      {PAGE_ICONS[k]}
    </svg>
  );
}
