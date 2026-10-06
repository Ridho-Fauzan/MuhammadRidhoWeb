"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages } from "@/data/pages";
import { useLang } from "@/i18n/useLang";

/** Tombol "Selanjutnya: …" di bawah tiap halaman agar pengunjung bisa lanjut tanpa naik ke navbar */
export default function PageNav() {
  const pathname = usePathname();
  const { t } = useLang();
  const i = pages.findIndex(
    (p) => p.href !== "/" && pathname.startsWith(p.href),
  );
  if (i < 0) return null;
  const next = pages[i + 1];

  return (
    <div className="px-6 pb-20">
      <nav className="max-w-6xl mx-auto flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t.pager.back}
        </Link>
        {next && (
          <Link
            href={next.href}
            className="group inline-flex items-center justify-between gap-6 px-6 py-4 rounded-2xl border border-border bg-surface hover:border-accent/50 transition-colors"
          >
            <span>
              <span className="block text-xs font-mono uppercase tracking-widest text-muted">
                {t.pager.next}
              </span>
              <span className="block text-lg font-semibold font-display group-hover:text-accent transition-colors">
                {t.nav[next.key]}
              </span>
            </span>
            <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </nav>
    </div>
  );
}
