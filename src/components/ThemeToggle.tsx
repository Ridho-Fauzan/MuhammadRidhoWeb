"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useLang } from "@/i18n/useLang";

// Membaca tema langsung dari class <html> (di-set oleh script di layout.tsx)
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true;

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { t } = useLang();

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    listeners.forEach((l) => l());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.toggles.toLight : t.toggles.toDark}
      className="p-2 rounded-lg border border-border text-muted hover:text-accent hover:border-accent/50 transition-colors"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
