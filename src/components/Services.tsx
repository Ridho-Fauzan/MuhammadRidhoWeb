"use client";

/**
 * "Yang Saya Kerjakan" di beranda — daftar layanan yang bisa dibuka-tutup (accordion).
 * Baris yang terbuka berganti warna penuh (seperti referensi editorial), isinya dari `services` di profile.ts.
 */
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { services } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import SectionTitle from "./SectionTitle";

export default function Services() {
  const { t, tx } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />

        <ul className="space-y-3">
          {services.map((s, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-[1.75rem] border transition-colors duration-300 ${
                    isOpen ? "bg-foreground text-background border-foreground" : "bg-surface border-border hover:border-border-strong"
                  }`}
                >
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-5 text-left"
                    >
                      <span
                        className={`grid place-items-center shrink-0 w-9 h-9 rounded-full border font-mono text-xs ${
                          isOpen ? "border-background/30" : "border-border text-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 uppercase">{tx(s.title)}</span>
                      <span
                        className={`grid place-items-center shrink-0 w-9 h-9 rounded-full border transition-transform duration-300 ${
                          isOpen ? "rotate-45 border-background/30" : "border-border"
                        }`}
                        aria-hidden
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-6 sm:pl-[5.25rem] grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                          <p className="max-w-2xl text-background/75 leading-relaxed">{tx(s.description)}</p>
                          <div className="flex flex-wrap gap-2">
                            {s.tools.map((tool) => (
                              <span key={tool} className="px-3 py-1 rounded-full border border-background/25 text-xs font-medium">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
