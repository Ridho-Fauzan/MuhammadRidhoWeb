"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  texts,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  pause = 2500,
}: {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = texts[index % texts.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }, 300);
    } else {
      t = setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, texts, typingSpeed, deletingSpeed, pause]);

  return (
    <span>
      <span className={className}>{text}</span>
      <span className="animate-blink text-accent font-light">|</span>
    </span>
  );
}
