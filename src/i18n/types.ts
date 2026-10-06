export type Lang = "id" | "en";

/**
 * Teks yang bisa diterjemahkan.
 * - String biasa  -> sama di kedua bahasa, mis. "Unity"
 * - { id, en }    -> beda per bahasa, mis. { id: "Sekarang", en: "Now" }
 */
export type L = string | { id: string; en: string };

/** Ambil teks sesuai bahasa aktif. */
export const tr = (v: L, lang: Lang): string => (typeof v === "string" ? v : v[lang]);
