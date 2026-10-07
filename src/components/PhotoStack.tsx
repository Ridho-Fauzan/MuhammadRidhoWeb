"use client";

/**
 * Tumpukan foto polaroid di halaman About (React Bits "Stack").
 * Desktop: seret kartu teratas untuk melemparnya ke belakang. Mobile: ketuk.
 * Foto & caption diambil dari `photos` di data/profile.ts.
 */
import Image from "next/image";
import { useCallback, useState } from "react";
import { photos } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Stack from "./reactbits/Stack";

const tapes = ["bg-accent/80", "bg-accent-2/80", "bg-muted/80"];

export default function PhotoStack() {
  const { t, tx } = useLang();
  const [top, setTop] = useState(0);
  const onChange = useCallback((i: number) => setTop(i), []);

  const cards = photos.map((p, i) => (
    <div key={p.src} className="relative w-full h-full flex flex-col bg-surface border-2 border-foreground p-3 pb-0 shadow-[6px_6px_0_var(--shadow)] select-none">
      {/* selotip */}
      <span aria-hidden className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-[-4deg] ${tapes[i % tapes.length]} border border-foreground/40`} />
      <div className="relative flex-1 overflow-hidden border-2 border-foreground bg-background">
        <Image
          src={p.src}
          alt={tx(p.alt)}
          fill
          sizes="(min-width: 1024px) 340px, 80vw"
          draggable={false}
          priority={i === 0}
          className="object-cover pointer-events-none"
          style={{ objectPosition: p.focus ?? "50% 50%" }}
        />
        <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] tracking-[0.2em] bg-foreground text-background font-mono">
          {String(i + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
        </span>
      </div>
      <p className="font-display text-lg text-foreground text-center py-3 truncate">~ {tx(p.caption)} ~</p>
    </div>
  ));

  if (!photos.length) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[min(300px,78vw)] sm:w-[340px] aspect-[4/5]">
        <Stack cards={cards} randomRotation sensitivity={140} sendToBackOnClick={false} mobileClickOnly autoplay autoplayDelay={4500} pauseOnHover onChange={onChange} ariaLabel={t.about.photosLabel} />
      </div>
      <p className="mt-10 text-sm text-muted font-mono text-center">
        <span className="text-accent">&gt;</span> {t.about.photoHint}
      </p>
      {/* indikator foto aktif */}
      <div className="mt-3 flex gap-2" aria-hidden>
        {photos.map((p, i) => (
          <span key={p.src} className={`h-2 transition-all duration-300 ${i === top ? "w-6 bg-accent" : "w-2 bg-muted/50"}`} />
        ))}
      </div>
    </div>
  );
}
