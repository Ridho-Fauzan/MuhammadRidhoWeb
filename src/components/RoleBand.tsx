"use client";

/**
 * Pita teks raksasa yang bergerak mengikuti kecepatan scroll (React Bits "ScrollVelocity").
 * Isinya peran dari profile.roles — baris kedua bergerak berlawanan dengan huruf outline.
 */
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import ScrollVelocity from "./reactbits/ScrollVelocity";

export default function RoleBand() {
  const { tx } = useLang();
  const roles = profile.roles.map(tx);
  const line = roles.join("  ✦  ") + "  ✦";

  return (
    <section aria-hidden className="py-16 overflow-hidden select-none">
      <ScrollVelocity
        texts={[line, line]}
        velocity={40}
        numCopies={4}
        gap={48}
        outlineAlternate
        fadeEdges
        fontSize="clamp(2.75rem, 8vw, 6.5rem)"
        fontWeight={800}
        color="var(--foreground)"
        className="uppercase tracking-[-0.04em] leading-[1.05]"
      />
    </section>
  );
}
