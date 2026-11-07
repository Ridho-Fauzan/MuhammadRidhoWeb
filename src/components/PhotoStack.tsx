"use client";

/**
 * Tumpukan foto di halaman About (React Bits "Stack").
 * Desktop: seret kartu teratas untuk melemparnya ke belakang. Mobile: ketuk.
 * Foto & caption diambil dari `photos` di data/profile.ts.
 */
import Image from "next/image";
import { useCallback, useState } from "react";
import { photos } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import Stack from "./reactbits/Stack";

export default function PhotoStack() {
  const { t, tx } = useLang();
  const [top, setTop] = useState(0);
  const onChange = useCallback((i: number) => setTop(i), []);

  const cards = photos.map((p, i) => (
    <div
      key={p.src}
      className="relative w-full h-full flex flex-col rounded-[1.5rem] bg-surface border border-border p-2.5 pb-0 shadow-[0_30px_60px_-30px_rgb(var(--shadow-color)/0.45)] select-none"
    >
      <div className="relative flex-1 overflow-hidden rounded-[1.1rem] bg-surface-2">
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
      </div>
      <div className="flex items-center justify-between px-2 py-3">
        <p className="text-sm font-semibold truncate">{tx(p.caption)}</p>
        <span className="font-mono text-[11px] text-muted">
          {String(i + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  ));

  if (!photos.length) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[min(300px,78vw)] sm:w-[340px] aspect-[4/5]">
        <Stack cards={cards} randomRotation sensitivity={140} sendToBackOnClick={false} mobileClickOnly autoplay autoplayDelay={4500} pauseOnHover onChange={onChange} ariaLabel={t.about.photosLabel} />
      </div>
      <p className="mt-10 text-sm text-muted text-center">{t.about.photoHint}</p>
      {/* indikator foto aktif */}
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {photos.map((p, i) => (
          <span key={p.src} className={`h-1.5 rounded-full transition-all duration-300 ${i === top ? "w-6 bg-foreground" : "w-1.5 bg-border-strong"}`} />
        ))}
      </div>
    </div>
  );
}
