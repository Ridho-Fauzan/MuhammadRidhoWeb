"use client";

import { useSyncExternalStore } from "react";
import type { L, Lang } from "./types";
import { tr } from "./types";
import { ui } from "./ui";

// Bahasa aktif disimpan di atribut <html lang="..."> (di-set awal oleh script di layout.tsx)
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = (): Lang => (document.documentElement.lang === "en" ? "en" : "id");
const getServerSnapshot = (): Lang => "id";

export function setLang(lang: Lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  listeners.forEach((l) => l());
}

/** const { lang, t, tx } = useLang();  t = teks UI, tx(v) = terjemahkan data dari profile.ts */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { lang, t: ui[lang], tx: (v: L) => tr(v, lang) };
}
