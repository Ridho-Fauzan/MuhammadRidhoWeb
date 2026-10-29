/**
 * Font untuk gambar yang dibuat saat build (preview link / Open Graph & ikon).
 * File .ttf diambil dari Google Fonts (lisensi SIL OFL, lihat OFL-*.txt di folder ini).
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "src/assets/fonts");
const load = (file: string) => readFile(join(dir, file));

export async function ogFonts() {
  const [pixel, pixelBold, mono] = await Promise.all([
    load("Silkscreen-Regular.ttf"),
    load("Silkscreen-Bold.ttf"),
    load("FragmentMono-Regular.ttf"),
  ]);
  return [
    { name: "Silkscreen", data: pixel, weight: 400 as const, style: "normal" as const },
    { name: "Silkscreen", data: pixelBold, weight: 700 as const, style: "normal" as const },
    { name: "Fragment Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}
