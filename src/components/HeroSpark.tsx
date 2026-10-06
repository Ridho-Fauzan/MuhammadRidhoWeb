"use client";

import ClickSpark from "./reactbits/ClickSpark";

/** Percikan saat area hero diklik (React Bits ClickSpark) */
export default function HeroSpark({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark sparkColor="#f9c74f" sparkSize={12} sparkRadius={22} sparkCount={10} duration={450}>
      {children}
    </ClickSpark>
  );
}
