/**
 * Karakter pixel 12x16 yang melambai (pengganti ilustrasi/foto di footer).
 * Digambar dari peta karakter di bawah; dua frame bergantian lewat CSS (steps) -> tangan melambai.
 */
const PALETTE: Record<string, string> = {
  H: "#1a1030", // rambut
  S: "#f2c39b", // kulit
  E: "#1a1030", // mata / mulut
  T: "#f47b5c", // baju
  Y: "#f9c74f", // logo baju
  P: "#4b2f7e", // celana
  B: "#0b0819", // sepatu
};

const BODY = [
  "....HHHH....",
  "...HHHHHH...",
  "..HHHHHHHH..",
  "..HSSSSSSH..",
  "..SSESSESS..",
  "..SSSSSSSS..",
  "...SSEESS...",
  "....SSSS....",
  "..TTTTTTTT..",
  "..TTTYYTTT..",
  "..TTTTTTTT..",
  "...TTTTTT...",
  "...PPPPPP...",
  "...PP..PP...",
  "...PP..PP...",
  "..BBB..BBB..",
];
// lengan kiri selalu turun; lengan kanan: frame A turun, frame B naik (melambai)
const LEFT_ARM = [".S", ".S", ".S"].map((c, i) => ({ x: 1, y: 8 + i, c: c[1] }));
const RIGHT_DOWN = [{ x: 10, y: 8 }, { x: 10, y: 9 }, { x: 10, y: 10 }];
const RIGHT_UP = [{ x: 10, y: 7 }, { x: 11, y: 6 }, { x: 11, y: 5 }];

function pixels(rows: string[]) {
  const out: { x: number; y: number; c: string }[] = [];
  rows.forEach((row, y) => [...row].forEach((ch, x) => ch !== "." && out.push({ x, y, c: PALETTE[ch] })));
  return out;
}

export default function PixelBuddy({ className = "" }: { className?: string }) {
  const body = pixels(BODY);
  return (
    <svg viewBox="0 0 12 16" className={`pixel-buddy ${className}`} style={{ shapeRendering: "crispEdges" }} aria-hidden>
      {body.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width="1" height="1" fill={p.c} />
      ))}
      {LEFT_ARM.map((p, i) => (
        <rect key={`l${i}`} x={p.x} y={p.y} width="1" height="1" fill={PALETTE.S} />
      ))}
      <g className="pixel-buddy__a">
        {RIGHT_DOWN.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width="1" height="1" fill={PALETTE.S} />
        ))}
      </g>
      <g className="pixel-buddy__b">
        {RIGHT_UP.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width="1" height="1" fill={PALETTE.S} />
        ))}
      </g>
    </svg>
  );
}
