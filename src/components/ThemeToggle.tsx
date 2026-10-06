"use client";

import { useSyncExternalStore } from "react";

// Membaca tema langsung dari class <html> (di-set oleh script di layout.tsx)
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true;

/** const { dark, toggle } = useTheme(); */
export function useTheme() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    listeners.forEach((l) => l());
  };
  return { dark, toggle };
}
