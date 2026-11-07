"use client";

/**
 * Kartu ID versi mobile (pengganti Lanyard 3D yang hanya tampil di desktop).
 * Ringan tanpa WebGL: kartu tergantung di tali dan bisa
 *  - digeser  -> berayun seperti bandul lalu memantul kembali,
 *  - diketuk  -> dibalik (depan / belakang),
 *  - dimiringkan HP (Android, giroskop) -> ikut miring.
 * Gambar depan/belakang memakai art yang sama dengan Lanyard (lanyardArt.ts).
 */
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  front?: string;
  back?: string;
  avatarUrl: string;
  name: string;
  shortName: string;
  flipLabel: string;
  hint: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function MobileIdCard({ front, back, avatarUrl, name, shortName, flipLabel, hint }: Props) {
  const reduce = useReducedMotion();

  // Nilai mentah dari jari; spring membuat gerakannya memantul alami
  const swingRaw = useMotionValue(0);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const swing = useSpring(swingRaw, { stiffness: 110, damping: 5, mass: 0.9 }); // redaman kecil = efek bandul
  const tiltX = useSpring(tiltXRaw, { stiffness: 180, damping: 14 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 180, damping: 14 });
  const flip = useSpring(0, { stiffness: 140, damping: 16 });
  const rotateY = useTransform(() => tiltY.get() + flip.get());

  // Kilau yang bergeser mengikuti kemiringan
  const glareX = useTransform(tiltY, [-30, 30], [0, 100]);
  const glareY = useTransform(tiltX, [-25, 25], [100, 0]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 55%)`;

  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    flip.set(flipped ? 180 : 0);
  }, [flipped, flip]);

  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const reset = () => {
    swingRaw.set(0);
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 6) d.moved = true;
    swingRaw.set(clamp(dx * 0.25, -26, 26));
    tiltYRaw.set(clamp(dx * 0.3, -30, 30));
    tiltXRaw.set(clamp(-dy * 0.3, -25, 25));
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) setFlipped((f) => !f);
    reset(); // dilepas -> spring membawa kartu berayun kembali ke tengah
  };

  // Giroskop (Android; iOS butuh izin khusus jadi dilewati)
  useEffect(() => {
    if (reduce || typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: unknown };
    if (typeof DOE.requestPermission === "function") return;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (drag.current || e.gamma == null || e.beta == null) return;
      tiltYRaw.set(clamp(e.gamma * 0.6, -20, 20));
      tiltXRaw.set(clamp((45 - e.beta) * 0.4, -15, 15));
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [reduce, tiltXRaw, tiltYRaw]);

  return (
    <div className="flex flex-col items-center">
      {/* Ayunan pelan saat diam */}
      <motion.div
        className="flex flex-col items-center origin-top"
        animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="flex flex-col items-center origin-top" style={{ rotate: swing }}>
          {/* Tali + penjepit */}
          <div aria-hidden className="w-5 h-16 bg-[#4f46e5] bg-[repeating-linear-gradient(180deg,transparent_0_14px,rgba(255,255,255,0.25)_14px_16px)]" />
          <div aria-hidden className="w-9 h-3 rounded-sm bg-gradient-to-b from-zinc-300 to-zinc-500" />
          <div aria-hidden className="w-2.5 h-2 bg-zinc-400" />

          {/* Kartu */}
          <div className="[perspective:900px]">
            <motion.div
              role="button"
              tabIndex={0}
              aria-label={`${flipLabel} — ${name}`}
              aria-pressed={flipped}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setFlipped((f) => !f);
                }
              }}
              whileTap={{ scale: 0.97 }}
              style={{ rotateX: tiltX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[180px] aspect-[839/1266] rounded-2xl cursor-grab active:cursor-grabbing touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Depan */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_48px_-20px_rgb(var(--shadow-color)/0.45)] [backface-visibility:hidden]">
                {front ? (
                  <Image src={front} alt={name} fill unoptimized draggable={false} className="object-cover" />
                ) : (
                  avatarUrl && <Image src={avatarUrl} alt={name} fill priority draggable={false} className="object-cover" />
                )}
                <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
              </div>
              {/* Belakang */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-foreground shadow-[0_24px_48px_-20px_rgb(var(--shadow-color)/0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {back ? (
                  <Image src={back} alt="" fill unoptimized draggable={false} className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-background">
                    {shortName.charAt(0)}
                    <span className="text-accent">.</span>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <p className="mt-5 eyebrow">{hint}</p>
    </div>
  );
}
