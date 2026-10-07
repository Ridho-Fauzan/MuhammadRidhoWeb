'use client';
// Source: React Bits (https://reactbits.dev) by David Haz — MIT + Commons Clause. See ./LICENSE.md
// Diubah: memakai next/image, bingkai retro (border tebal + bayangan keras), tanpa peringatan mobile,
// tooltip bergaya pixel, dan tidak bergerak saat "reduce motion".

import type { SpringOptions } from 'motion/react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  width?: number;
  height?: number;
  imagePosition?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
  sizes?: string;
}

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({
  imageSrc,
  altText = '',
  captionText = '',
  width = 220,
  height = 290,
  imagePosition = '50% 50%',
  scaleOnHover = 1.06,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  className = '',
  sizes
}: TiltedCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY.current) * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    if (!reduce) scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`relative [perspective:800px] flex items-center justify-center ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="relative [transform-style:preserve-3d]" style={{ width, height, rotateX, rotateY, scale }}>
        <div className="absolute inset-0 overflow-hidden border-2 border-foreground bg-surface shadow-[6px_6px_0_var(--shadow)] [transform:translateZ(0)]">
          <Image src={imageSrc} alt={altText} fill sizes={sizes ?? `${width}px`} className="object-cover" style={{ objectPosition: imagePosition }} />
        </div>
        {overlayContent && (
          <div className="absolute inset-0 z-[2] pointer-events-none [transform:translateZ(30px)]">{overlayContent}</div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 z-[3] hidden sm:block px-2 py-1 text-[11px] uppercase tracking-[0.15em] bg-accent text-on-accent border-2 border-foreground"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
