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
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,244,214,0.45), transparent 55%)`;

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
          <div
            aria-hidden
            className="w-6 h-16 border-x-2 border-[#c2410c] bg-[#f4e6c8] bg-[repeating-linear-gradient(180deg,transparent_0_10px,#6d28d9_10px_14px)] dark:border-[#f9c74f] dark:bg-[#241548] dark:bg-[repeating-linear-gradient(180deg,transparent_0_10px,#f47b5c_10px_14px)]"
          />
          <div aria-hidden className="w-10 h-3 bg-[#b9a7e8] border-2 border-[#1a1030]" />
          <div aria-hidden className="w-3 h-2 bg-[#b9a7e8] border-x-2 border-[#1a1030]" />

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
              className="relative w-[180px] aspect-[839/1266] cursor-grab active:cursor-grabbing touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Depan */}
              <div className="absolute inset-0 overflow-hidden border-2 border-foreground bg-[#fff4d6] dark:bg-[#1a1030] shadow-[6px_6px_0_var(--shadow)] [backface-visibility:hidden]">
                {front ? (
                  <Image src={front} alt={name} fill unoptimized draggable={false} className="object-cover" />
                ) : (
                  avatarUrl && <Image src={avatarUrl} alt={name} fill priority draggable={false} className="object-cover" />
                )}
                <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
              </div>
              {/* Belakang */}
              <div className="absolute inset-0 overflow-hidden border-2 border-[#1a1030] bg-[#1a1030] dark:bg-[#f4e6c8] shadow-[6px_6px_0_var(--shadow)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {back ? (
                  <Image src={back} alt="" fill unoptimized draggable={false} className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-[#f4e6c8] dark:text-[#1a1030]">
                    ~/{shortName}_
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">{hint}</p>
    </div>
  );
}
