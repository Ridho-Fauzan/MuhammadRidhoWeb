/**
 * Menggambar kartu ID & tali lanyard dari data profile.ts (di browser, via <canvas>).
 * Jadi kalau nama / role / foto / handle diganti, kartunya otomatis ikut berubah.
 * Gaya: kartu ID modern yang bersih — monokrom + aksen indigo.
 * Warna kartu berlawanan dengan tema supaya menonjol: situs gelap = kartu terang, situs terang = kartu gelap.
 */

type CardData = { name: string; role: string; handle: string; avatarUrl: string; shortName: string; light?: boolean };

const PALETTES = {
  // dipakai saat situs dalam mode gelap
  lightCard: {
    bg: "#f5f5f4", fg: "#0c0c0d", muted: "#6b6b72", rule: "#dcdbd8", photoBg: "#e7e6e3",
    accent: "#4f46e5", badgeBg: "#0c0c0d", badgeFg: "#f5f5f4",
    backBg: "#0c0c0d", backFg: "#f5f5f4", backMuted: "#8a8a92", backGrid: "rgba(255,255,255,0.06)",
  },
  // dipakai saat situs dalam mode terang
  darkCard: {
    bg: "#0c0c0d", fg: "#f5f5f4", muted: "#9a9aa2", rule: "#2a2a2f", photoBg: "#1a1a1d",
    accent: "#8b93ff", badgeBg: "#f5f5f4", badgeFg: "#0c0c0d",
    backBg: "#f5f5f4", backFg: "#0c0c0d", backMuted: "#6b6b72", backGrid: "rgba(0,0,0,0.06)",
  },
};
const STRAP = { bg: "#4f46e5", fg: "#ffffff", dot: "#c7caff" };

const W = 839;
const H = 1266;

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Ambil nama font asli dari next/font (namanya di-hash) lewat CSS variable di <body> */
function fontVar(name: string, fallback: string) {
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  return v || fallback;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Bagi nama jadi maksimal 2 baris yang muat di lebar kartu */
function nameLines(ctx: CanvasRenderingContext2D, name: string, maxW: number) {
  const words = name.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

export async function drawCardArt(data: CardData) {
  await document.fonts.ready;
  const sans = fontVar("--font-jakarta", "system-ui, sans-serif");
  const mono = fontVar("--font-mono-face", "ui-monospace, monospace");
  const photo = await loadImage(data.avatarUrl);
  const c = data.light ? PALETTES.darkCard : PALETTES.lightCard;
  const year = new Date().getFullYear();
  const initial = data.shortName.charAt(0).toUpperCase();
  const P = 64; // padding tepi

  // ---------- Depan ----------
  const front = document.createElement("canvas");
  front.width = W;
  front.height = H;
  let ctx = front.getContext("2d")!;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);

  // baris atas: monogram + label
  ctx.fillStyle = c.badgeBg;
  roundRect(ctx, P, 52, 76, 76, 20);
  ctx.fill();
  ctx.fillStyle = c.badgeFg;
  ctx.font = `800 44px ${sans}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initial, P + 38, 92);
  ctx.textAlign = "left";
  ctx.fillStyle = c.fg;
  ctx.font = `800 30px ${sans}`;
  ctx.letterSpacing = "1px";
  ctx.fillText(data.shortName.toUpperCase(), P + 100, 80);
  ctx.fillStyle = c.accent;
  ctx.fillText(".", P + 100 + ctx.measureText(data.shortName.toUpperCase()).width + 2, 80);
  ctx.fillStyle = c.muted;
  ctx.font = `400 20px ${mono}`;
  ctx.letterSpacing = "4px";
  ctx.fillText("PORTFOLIO", P + 100, 110);
  ctx.textAlign = "right";
  ctx.fillText(`ID · ${year}`, W - P, 92);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";

  // foto dengan sudut membulat
  const px = P, py = 168, pw = W - P * 2, ph = 600;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.clip();
  ctx.fillStyle = c.photoBg;
  ctx.fillRect(px, py, pw, ph);
  if (photo) {
    // object-fit: cover, fokus agak ke atas (wajah)
    const s = Math.max(pw / photo.width, ph / photo.height);
    const dw = photo.width * s, dh = photo.height * s;
    ctx.drawImage(photo, px + (pw - dw) / 2, py + (ph - dh) * 0.3, dw, dh);
  }
  ctx.restore();

  // nama + peran
  ctx.fillStyle = c.fg;
  ctx.font = `800 66px ${sans}`;
  ctx.letterSpacing = "-1.5px";
  ctx.textBaseline = "alphabetic";
  const lines = nameLines(ctx, data.name, pw);
  lines.forEach((l, i) => ctx.fillText(l, P, 870 + i * 74));
  ctx.letterSpacing = "0px";
  const roleY = 870 + (lines.length - 1) * 74 + 70;
  ctx.fillStyle = c.accent;
  ctx.font = `600 34px ${sans}`;
  ctx.fillText(data.role, P, roleY, pw);

  // baris bawah: garis + handle + status
  ctx.fillStyle = c.rule;
  ctx.fillRect(P, H - 150, pw, 2);
  ctx.fillStyle = c.muted;
  ctx.font = `400 28px ${mono}`;
  ctx.fillText(`@${data.handle}`, P, H - 82);
  ctx.textAlign = "right";
  ctx.letterSpacing = "3px";
  ctx.font = `400 22px ${mono}`;
  const status = "AVAILABLE";
  ctx.fillText(status, W - P, H - 84);
  const sw = ctx.measureText(status).width;
  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(W - P - sw - 22, H - 92, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";

  // ---------- Belakang ----------
  const back = document.createElement("canvas");
  back.width = W;
  back.height = H;
  ctx = back.getContext("2d")!;
  ctx.fillStyle = c.backBg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = c.backGrid;
  for (let x = 0; x < W; x += 60) ctx.fillRect(x, 0, 2, H);
  for (let y = 0; y < H; y += 60) ctx.fillRect(0, y, W, 2);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 300px ${sans}`;
  ctx.letterSpacing = "-10px";
  const iw = ctx.measureText(initial).width;
  ctx.fillStyle = c.backFg;
  ctx.fillText(initial, W / 2 - 30, H / 2 - 60);
  ctx.fillStyle = c.accent;
  ctx.beginPath();
  ctx.arc(W / 2 - 30 + iw / 2 + 36, H / 2 + 40, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.letterSpacing = "6px";
  ctx.fillStyle = c.backMuted;
  ctx.font = `400 28px ${mono}`;
  ctx.fillText(data.role.toUpperCase(), W / 2, H / 2 + 170, W - P * 2);
  ctx.fillText(`@${data.handle.toUpperCase()}`, W / 2, H - 110);
  ctx.letterSpacing = "0px";

  // ---------- Tali ----------
  const strap = document.createElement("canvas");
  strap.width = 1025;
  strap.height = 250;
  ctx = strap.getContext("2d")!;
  ctx.fillStyle = STRAP.bg;
  ctx.fillRect(0, 0, 1025, 250);
  ctx.font = `700 64px ${sans}`;
  ctx.letterSpacing = "6px";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const items = [data.shortName.toUpperCase(), "•", data.role.split(/\s*&\s*/)[0].toUpperCase(), "•"];
  const slot = 1025 / items.length;
  items.forEach((it, i) => {
    const cx = slot * i + slot / 2;
    if (it === "•") {
      ctx.fillStyle = STRAP.dot;
      ctx.beginPath();
      ctx.arc(cx, 125, 12, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.fillStyle = STRAP.fg;
    ctx.fillText(it, cx, 128, slot - 10);
  });

  return { front: front.toDataURL("image/png"), back: back.toDataURL("image/png"), strap: strap.toDataURL("image/png") };
}
