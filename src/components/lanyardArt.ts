/**
 * Menggambar kartu ID & tali lanyard dari data profile.ts (di browser, via <canvas>).
 * Jadi kalau nama / role / foto / handle diganti, kartunya otomatis ikut berubah.
 * Warna sengaja netral (hitam, putih, abu-abu).
 */

type CardData = { name: string; role: string; handle: string; avatarUrl: string; shortName: string };

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

/** Ambil nama font asli dari next/font (namanya di-hash) lewat elemen yang sudah memakainya */
function fontOf(selector: string, fallback: string) {
  const el = document.querySelector(selector);
  return el ? getComputedStyle(el).fontFamily : fallback;
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
  const heading = fontOf("h1", "system-ui");
  const mono = fontOf(".font-mono", "monospace");
  const photo = await loadImage(data.avatarUrl);

  // ---------- Depan ----------
  const front = document.createElement("canvas");
  front.width = W;
  front.height = H;
  let ctx = front.getContext("2d")!;
  ctx.fillStyle = "#111113";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#a1a1aa";
  ctx.font = `500 26px ${mono}`;
  ctx.letterSpacing = "5px";
  ctx.textBaseline = "middle";
  ctx.fillText("PLAYER CARD", 64, 60);
  ctx.textAlign = "right";
  ctx.fillText("ID · 001", W - 64, 60);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";

  const px = 64, py = 150, pw = W - 128, ph = 640;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.clip();
  ctx.fillStyle = "#27272a";
  ctx.fillRect(px, py, pw, ph);
  if (photo) {
    // object-fit: cover, fokus agak ke atas (wajah)
    const s = Math.max(pw / photo.width, ph / photo.height);
    const dw = photo.width * s, dh = photo.height * s;
    ctx.drawImage(photo, px + (pw - dw) / 2, py + (ph - dh) * 0.3, dw, dh);
  }
  ctx.restore();
  ctx.strokeStyle = "#27272a";
  ctx.lineWidth = 2;
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.stroke();

  ctx.fillStyle = "#fafafa";
  ctx.font = `700 76px ${heading}`;
  ctx.textBaseline = "alphabetic";
  const lines = nameLines(ctx, data.name, pw);
  lines.forEach((l, i) => ctx.fillText(l, 64, 900 + i * 80));
  ctx.fillStyle = "#d4d4d8";
  ctx.font = `500 40px ${heading}`;
  ctx.fillText(data.role, 64, 900 + lines.length * 80 + 10);

  ctx.fillStyle = "#a1a1aa";
  ctx.font = `500 28px ${mono}`;
  ctx.fillText(`@${data.handle}`, 64, H - 72);
  // "barcode" dekoratif
  ctx.fillStyle = "#fafafa";
  let x = W - 64;
  [6, 3, 12, 6, 3, 6, 12, 3, 6, 6, 12, 3, 6, 3, 6, 6].forEach((bw) => {
    x -= bw;
    ctx.fillRect(x, H - 130, bw, 60);
    x -= 6;
  });

  // ---------- Belakang ----------
  const back = document.createElement("canvas");
  back.width = W;
  back.height = H;
  ctx = back.getContext("2d")!;
  ctx.fillStyle = "#f4f4f5";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#d4d4d8";
  for (let yy = 18; yy < H; yy += 36) for (let xx = 18; xx < W; xx += 36) ctx.fillRect(xx - 1, yy - 1, 3, 3);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 110px ${mono}`;
  const logo = ["~/", data.shortName, "_"];
  const widths = logo.map((p) => ctx.measureText(p).width);
  let lx = W / 2 - widths.reduce((a, b) => a + b, 0) / 2;
  ctx.textAlign = "left";
  logo.forEach((p, i) => {
    ctx.fillStyle = i === 1 ? "#111113" : "#71717a";
    ctx.fillText(p, lx, H / 2 - 30);
    lx += widths[i];
  });
  ctx.textAlign = "center";
  ctx.fillStyle = "#52525b";
  ctx.font = `500 30px ${mono}`;
  ctx.letterSpacing = "5px";
  ctx.fillText(data.role.toUpperCase(), W / 2, H / 2 + 80);

  // ---------- Tali ----------
  const strap = document.createElement("canvas");
  strap.width = 1025;
  strap.height = 250;
  ctx = strap.getContext("2d")!;
  ctx.fillStyle = "#18181b";
  ctx.fillRect(0, 0, 1025, 250);
  ctx.font = `700 64px ${mono}`;
  ctx.letterSpacing = "8px";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const items = [data.shortName.toUpperCase(), "•", data.role.toUpperCase(), "•"];
  const slot = 1025 / items.length;
  items.forEach((it, i) => {
    ctx.fillStyle = it === "•" ? "#71717a" : "#fafafa";
    ctx.fillText(it, slot * i + slot / 2, 128, slot - 10);
  });

  return { front: front.toDataURL("image/png"), back: back.toDataURL("image/png"), strap: strap.toDataURL("image/png") };
}
