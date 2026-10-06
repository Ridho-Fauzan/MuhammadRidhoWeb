"use client";

import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="py-8 px-6 border-t-2 border-border text-center text-xs uppercase tracking-[0.15em] text-muted bg-surface">
      <p>
        © {new Date().getFullYear()} {profile.name}. {t.footer.builtWith}
      </p>
    </footer>
  );
}
