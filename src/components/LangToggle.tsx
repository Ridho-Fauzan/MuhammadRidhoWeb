"use client";

import { setLang, useLang } from "@/i18n/useLang";

export default function LangToggle() {
  const { lang, t } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "id" ? "en" : "id")}
      aria-label={t.toggles.lang}
      title={t.toggles.lang}
      className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-accent/50 transition-colors"
    >
      <span className={lang === "id" ? "text-accent" : "text-muted"}>ID</span>
      <span className="text-muted mx-1">/</span>
      <span className={lang === "en" ? "text-accent" : "text-muted"}>EN</span>
    </button>
  );
}
