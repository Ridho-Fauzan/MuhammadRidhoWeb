'use client';
// Source: React Bits (https://reactbits.dev) by David Haz — MIT + Commons Clause. See ./LICENSE.md
// Diubah: rotasi acak dibuat deterministik (tidak berubah tiap render / aman untuk SSR),
// dukungan reduce-motion, tombol keyboard (Enter/Spasi = kartu berikutnya), tanpa gambar default.

import { motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { useEffect, useState } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return <motion.div className="absolute inset-0 cursor-pointer">{children}</motion.div>;
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  cards: React.ReactNode[];
  /** Kemiringan kecil per kartu (deterministik) supaya tumpukan terlihat natural */
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  /** Dipanggil saat kartu teratas berganti (indeks asli di `cards`) */
  onChange?: (topIndex: number) => void;
  ariaLabel?: string;
}

const tilt = (id: number) => (((id * 37) % 11) - 5) * 0.9; // -4.5° .. 4.5°

export default function Stack({
  cards,
  randomRotation = false,
  sensitivity = 200,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onChange,
  ariaLabel
}: StackProps) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  // urutan: elemen terakhir = kartu paling atas
  const [order, setOrder] = useState<number[]>(() => cards.map((_, i) => i).reverse());
  useEffect(() => {
    setOrder(cards.map((_, i) => i).reverse());
  }, [cards.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const top = order[order.length - 1];
  useEffect(() => {
    if (top !== undefined) onChange?.(top);
  }, [top, onChange]);

  const sendToBack = (id: number) =>
    setOrder(prev => {
      const next = prev.filter(i => i !== id);
      next.unshift(id);
      return next;
    });

  useEffect(() => {
    if (!autoplay || reduce || isPaused || order.length < 2) return;
    const t = setInterval(() => sendToBack(order[order.length - 1]), autoplayDelay);
    return () => clearInterval(t);
  }, [autoplay, autoplayDelay, order, isPaused, reduce]);

  return (
    <div
      className="relative w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ perspective: 600 }}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') && top !== undefined) {
          e.preventDefault();
          sendToBack(top);
        }
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {order.map((id, index) => (
        <CardRotate key={id} onSendToBack={() => sendToBack(id)} sensitivity={sensitivity} disableDrag={shouldDisableDrag}>
          <motion.div
            className="w-full h-full"
            aria-hidden={id !== top}
            onClick={() => shouldEnableClick && sendToBack(id)}
            animate={{
              rotateZ: (order.length - index - 1) * 4 + (randomRotation ? tilt(id) : 0),
              scale: 1 + index * 0.06 - order.length * 0.06,
              transformOrigin: '90% 90%'
            }}
            initial={false}
            transition={reduce ? { duration: 0 } : { type: 'spring', ...animationConfig }}
          >
            {cards[id]}
          </motion.div>
        </CardRotate>
      ))}
    </div>
  );
}
