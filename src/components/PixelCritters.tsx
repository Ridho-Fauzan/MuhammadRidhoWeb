"use client";

/**
 * Hiasan pixel art kecil yang "tinggal" di website:
 *  - NavSpider   : laba-laba bergelantungan di bawah navbar (naik saat disentuh)
 *  - PerchBird   : burung yang hinggap di huruf pertama judul section
 *  - TerminalSlime: slime yang mondar-mandir di atas jendela terminal
 *  - FormCat     : kucing yang duduk di atas form "Kirim pesan" (klik = ♥)
 * Sprite digambar dari peta karakter di bawah; garis tepi gelap ditambahkan otomatis
 * supaya terlihat di mode gelap maupun terang. Semua dekoratif (aria-hidden) dan diam kalau "reduce motion".
 */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PAL: Record<string, string> = {
  K: "#1a1030", // tinta / garis tepi
  W: "#fff4d6", // putih krem
  G: "#f9c74f", // emas
  R: "#f47b5c", // koral
  S: "#e8829b", // pink
  L: "#b9a7e8", // lila
  M: "#7fd1ae", // mint
  N: "#4fa383", // mint gelap
};

type PixelMap = string[];

/** Peta -> grid berwarna dengan padding 1 + garis tepi K di sekeliling piksel terisi */
function toGrid(map: PixelMap, outline: boolean) {
  const h = map.length;
  const w = Math.max(...map.map((r) => r.length));
  const grid: string[][] = Array.from({ length: h + 2 }, () => Array(w + 2).fill("."));
  map.forEach((row, y) => [...row].forEach((ch, x) => ch !== "." && (grid[y + 1][x + 1] = ch)));
  if (outline) {
    const filled = (x: number, y: number) => grid[y]?.[x] !== undefined && grid[y][x] !== "." && grid[y][x] !== "o";
    for (let y = 0; y < h + 2; y++)
      for (let x = 0; x < w + 2; x++)
        if (grid[y][x] === "." && (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1))) grid[y][x] = "o";
    for (const row of grid) for (let x = 0; x < row.length; x++) if (row[x] === "o") row[x] = "K";
  }
  return { grid, w: w + 2, h: h + 2 };
}

/** Grid -> <rect> (piksel bersebelahan dengan warna sama digabung per baris) */
function Rects({ map, outline = true }: { map: PixelMap; outline?: boolean }) {
  const { grid } = toGrid(map, outline);
  const out: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (c === ".") {
        x++;
        continue;
      }
      let len = 1;
      while (row[x + len] === c) len++;
      out.push(<rect key={`${x}-${y}`} x={x} y={y} width={len} height={1} fill={PAL[c]} />);
      x += len;
    }
  });
  return <>{out}</>;
}

/** Sprite: 1–2 frame (bergantian) + lapisan mata yang berkedip */
function Sprite({
  frames,
  eyes,
  frameMs = 600,
  blinkDelay = 0,
  className = "",
  style,
}: {
  frames: PixelMap[];
  eyes?: PixelMap;
  frameMs?: number;
  blinkDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { w, h } = toGrid(frames[0], true);
  const two = frames.length > 1;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={`block overflow-visible ${className}`}
      style={{ shapeRendering: "crispEdges", ["--spr-dur" as string]: `${frameMs}ms`, ...style }}
      aria-hidden
    >
      <g className={two ? "spr-a" : undefined}>
        <Rects map={frames[0]} />
      </g>
      {two && (
        <g className="spr-b">
          <Rects map={frames[1]} />
        </g>
      )}
      {eyes && (
        <g className="spr-blink" style={{ animationDelay: `${blinkDelay}ms` }}>
          <Rects map={eyes} outline={false} />
        </g>
      )}
    </svg>
  );
}

/* ---------------------------------- peta sprite ---------------------------------- */

const SPIDER: PixelMap[] = [
  ["L.L...L.L", ".L.RRR.L.", "LLRWRWRLL", ".LRRRRRL.", "L.LRRRL.L", "...L.L..."],
  [".L.....L.", "L.LRRRL.L", ".LRWRWRL.", "LLRRRRRLL", ".L.RRR.L.", "..L...L.."],
];

const BIRD: PixelMap = ["...MMM...", "..MMMMM..", "..MMMMMG.", "MMMMMSM..", ".MNNNMM..", "..MMMM...", "...G.G..."];
const BIRD_EYE: PixelMap = ["", "", ".....K..."];

const SLIME: PixelMap[] = [
  ["..LLLL..", ".LLLLLL.", "LLLWLLLL", "LLLLKLKL", "LLLLLLLL", ".LLLLLL."],
  ["........", "........", ".LLWLLL.", "LLLLKLKL", "LLLLLLLL", "LLLLLLLL"],
];

const CAT_BODY = [
  ".G.....G.",
  "GSG...GSG",
  "GGGGGGGGG",
  "GGGGGGGGG",
  "GGGGGGGGG",
  "GGGGSGGGG",
  ".GGGGGGG.",
  ".GGWWWGG.",
  "GGGWWWGGG",
  "GGGGGGGGG",
  ".GG...GG.",
];
const CAT_TAIL_UP = ["", "", "", "", "...........G.", "............G", "............G", "...........G.", "...........G.", ".........GG..", ""];
const CAT_TAIL_DOWN = ["", "", "", "", "", "", "", "", "", ".........GGG.", "...........GG"];
const merge = (a: string[], b: string[]) =>
  a.map((row, y) => {
    const r = row.padEnd(13, ".");
    const t = (b[y] ?? "").padEnd(13, ".");
    return [...r].map((c, x) => (t[x] !== "." ? t[x] : c)).join("");
  });
const CAT: PixelMap[] = [merge(CAT_BODY, CAT_TAIL_UP), merge(CAT_BODY, CAT_TAIL_DOWN)];
const CAT_EYES: PixelMap = ["", "", "", "", "..K...K.."];

const HEART: PixelMap = [".RR.RR.", "RRRRRRR", "RRRRRRR", ".RRRRR.", "..RRR..", "...R..."];

/* ---------------------------------- komponen ---------------------------------- */

/** Laba-laba di bawah navbar: turun-naik pelan di benangnya, naik saat disentuh */
export function NavSpider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [scared, setScared] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const scare = () => {
    setScared(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setScared(false), 1600);
  };

  return (
    <motion.div
      aria-hidden
      className={`absolute top-full flex flex-col items-center origin-top ${className}`}
      animate={reduce ? undefined : { rotate: [-4, 4] }}
      transition={{ duration: 3.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      <motion.span
        className="block w-[2px] bg-foreground/35"
        initial={{ height: 18 }}
        animate={scared ? { height: 3 } : reduce ? { height: 18 } : { height: [12, 30] }}
        transition={
          scared
            ? { type: "spring", stiffness: 400, damping: 22 }
            : { duration: 5.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
      />
      <span className="pointer-events-auto cursor-pointer -mt-px" onPointerEnter={scare} onClick={scare}>
        <Sprite frames={SPIDER} frameMs={scared ? 160 : 700} className="w-[27px] h-auto" />
      </span>
    </motion.div>
  );
}

/** Burung kecil yang hinggap; ukuran ikut font judul (em) */
export function PerchBird({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-auto absolute ${className}`}
      whileHover={{ y: "-0.12em", transition: { type: "spring", stiffness: 500, damping: 12 } }}
    >
      <Sprite frames={[BIRD]} eyes={BIRD_EYE} blinkDelay={1200} className="bird-hop w-[0.5em] h-auto" />
    </motion.span>
  );
}

/** Slime yang mondar-mandir di atas jendela terminal (berhenti saat terminal di-hover) */
export function TerminalSlime() {
  return (
    <span aria-hidden className="slime-walk pointer-events-none absolute bottom-full -mb-[2px] z-10">
      <span className="slime-face block">
        <Sprite frames={SLIME} frameMs={480} className="w-[30px] h-auto" />
      </span>
    </span>
  );
}

/** Kucing yang duduk di atas form. Klik = ♥, dan ikut senang saat pesan terkirim */
export function FormCat({ happy = false, className = "" }: { happy?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const [hearts, setHearts] = useState<number[]>([]);
  const lastHappy = useRef(false);

  const pet = () => setHearts((h) => [...h.slice(-2), Date.now()]);
  useEffect(() => {
    if (happy && !lastHappy.current) {
      const id = requestAnimationFrame(pet);
      lastHappy.current = true;
      return () => cancelAnimationFrame(id);
    }
    lastHappy.current = happy;
  }, [happy]);

  return (
    <motion.div
      aria-hidden
      className={`absolute bottom-full -mb-[2px] cursor-pointer select-none ${className}`}
      onClick={pet}
      whileTap={{ y: -4 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
    >
      <AnimatePresence>
        {hearts.map((id) => (
          <motion.span
            key={id}
            className="absolute left-1/2 -top-2 -ml-[10px] pointer-events-none"
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], y: reduce ? 0 : -26, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onAnimationComplete={() => setHearts((h) => h.filter((x) => x !== id))}
          >
            <Sprite frames={[HEART]} className="w-[20px] h-auto" />
          </motion.span>
        ))}
      </AnimatePresence>
      <Sprite frames={CAT} eyes={CAT_EYES} frameMs={900} blinkDelay={600} className="w-[45px] h-auto" />
    </motion.div>
  );
}
