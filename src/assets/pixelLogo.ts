/**
 * Logo "R." (16×16) — satu sumber untuk favicon, ikon tab, dan ikon iPhone.
 * Setelah mengubah gambar di bawah, jalankan:  npm run icons
 * (membuat ulang src/app/icon.svg dan src/app/favicon.ico). Ikon iPhone ikut otomatis saat build.
 *
 * "#" = huruf, "o" = titik aksen. Latar gelap dengan sudut membulat ditambahkan otomatis.
 */
const glyph = [
  "................",
  "................",
  "................",
  "...######.......",
  "...#######......",
  "...##...###.....",
  "...##....##.....",
  "...##...###.....",
  "...#######......",
  "...######.......",
  "...##..###......",
  "...##...###.....",
  "...##....##.oo..",
  "...##....##.oo..",
  "................",
  "................",
];

export const LOGO_SIZE = 16;
export const logoColors = { bg: "#0a0a0b", letter: "#f5f5f4", accent: "#8b93ff" };

export type LogoCell = keyof typeof logoColors | null;

const at = (x: number, y: number) => glyph[y]?.[x];
const isCorner = (x: number, y: number) => {
  // sudut membulat: 2 pixel di tiap pojok
  const ex = x === 0 || x === LOGO_SIZE - 1;
  const ey = y === 0 || y === LOGO_SIZE - 1;
  const nx = x === 1 || x === LOGO_SIZE - 2;
  const ny = y === 1 || y === LOGO_SIZE - 2;
  return (ex && ey) || (ex && ny) || (nx && ey);
};

/** logoGrid[y][x] = warna pixel (null = transparan) */
export const logoGrid: LogoCell[][] = Array.from({ length: LOGO_SIZE }, (_, y) =>
  Array.from({ length: LOGO_SIZE }, (_, x): LogoCell => {
    if (at(x, y) === "#") return "letter";
    if (at(x, y) === "o") return "accent";
    return isCorner(x, y) ? null : "bg";
  }),
);
