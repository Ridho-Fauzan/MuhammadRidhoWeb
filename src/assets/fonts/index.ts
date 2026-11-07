/**
 * Font untuk gambar yang dibuat saat build (preview link / Open Graph & ikon).
 * Diambil dari Google Fonts (lisensi SIL OFL, lihat OFL-*.txt di folder ini).
 * Satori (next/og) belum mendukung woff2 / variable font, jadi dipakai file woff/ttf statis.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "src/assets/fonts");
const load = (file: string) => readFile(join(dir, file));

export async function ogFonts() {
  const [sans, sansBold, mono] = await Promise.all([
    load("PlusJakartaSans-500.woff"),
    load("PlusJakartaSans-800.woff"),
    load("FragmentMono-Regular.ttf"),
  ]);
  return [
    { name: "Plus Jakarta Sans", data: sans, weight: 500 as const, style: "normal" as const },
    { name: "Plus Jakarta Sans", data: sansBold, weight: 800 as const, style: "normal" as const },
    { name: "Fragment Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}
