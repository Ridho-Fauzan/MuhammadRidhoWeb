/**
 * Logo pixel "R" (16×16) — satu sumber untuk favicon, ikon tab, dan ikon iPhone.
 * Setelah mengubah gambar di bawah, jalankan:  npm run icons
 * (membuat ulang src/app/icon.svg dan src/app/favicon.ico). Ikon iPhone ikut otomatis saat build.
 *
 * Gambar huruf saja dengan "#". Bayangan koral (geser 1 pixel ke kanan-bawah)
 * dan latar gelap dengan sudut membulat ditambahkan otomatis.
 */
const glyph = [
  "................",
  "................",
  "...#######......",
  "...########.....",
  "...##....##.....",
  "...##....##.....",
  "...##....##.....",
  "...########.....",
  "...#######......",
  "...##..##.......",
  "...##...##......",
  "...##....##.....",
  "...##....##.....",
  "................",
  "................",
  "................",
];

export const LOGO_SIZE = 16;
export const logoColors = { bg: "#0b0819", letter: "#f9c74f", shadow: "#f47b5c" };

export type LogoCell = keyof typeof logoColors | null;

const isLetter = (x: number, y: number) => glyph[y]?.[x] === "#";
const isCorner = (x: number, y: number) => (x === 0 || x === LOGO_SIZE - 1) && (y === 0 || y === LOGO_SIZE - 1);

/** logoGrid[y][x] = warna pixel (null = transparan) */
export const logoGrid: LogoCell[][] = Array.from({ length: LOGO_SIZE }, (_, y) =>
  Array.from({ length: LOGO_SIZE }, (_, x): LogoCell => {
    if (isLetter(x, y)) return "letter";
    if (isLetter(x - 1, y - 1)) return "shadow";
    return isCorner(x, y) ? null : "bg";
  }),
);
