/**
 * Menggambar kartu ID & tali lanyard dari data profile.ts (di browser, via <canvas>).
 * Jadi kalau nama / role / foto / handle diganti, kartunya otomatis ikut berubah.
 * Warna mengikuti tema: malam = palet retro "dusk" ThreeUI (ungu, emas, koral, krem),
 * siang = palet kertas krem (tinta gelap, bata, ungu) seperti tema terang situs.
 */

type CardData = { name: string; role: string; handle: string; avatarUrl: string; shortName: string; light?: boolean };

const PALETTES = {
  dark: {
    bg: "#1a1030", frame: "#f4e6c8", header: "#241548", rule: "#4b2f7e", headerText: "#f9c74f",
    photoBg: "#241548", photoFrame: "#f9c74f", photoShadow: "#050310",
    name: "#f4e6c8", role: "#f47b5c", handle: "#b9a7e8", barcode: "#f9c74f",
    backBg: "#f4e6c8", backDots: "#c9b48a", logoMain: "#1a1030", logoAccent: "#c2410c", backRole: "#4b2f7e",
    strapBg: "#241548", strapEdge: "#f9c74f", strapText: "#f4e6c8", strapMark: "#f47b5c",
  },
  light: {
    bg: "#fff4d6", frame: "#1a1030", header: "#f4e6c8", rule: "#c9b48a", headerText: "#c2410c",
    photoBg: "#ead6ad", photoFrame: "#c2410c", photoShadow: "#1a1030",
    name: "#1a1030", role: "#6d28d9", handle: "#5b4a86", barcode: "#1a1030",
    backBg: "#1a1030", backDots: "#4b2f7e", logoMain: "#f4e6c8", logoAccent: "#f9c74f", backRole: "#b9a7e8",
    strapBg: "#f4e6c8", strapEdge: "#c2410c", strapText: "#1a1030", strapMark: "#6d28d9",
  },
};

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
  const heading = fontOf("h1", "monospace");
  const mono = fontOf(".font-mono", "monospace");
  const photo = await loadImage(data.avatarUrl);
  const c = data.light ? PALETTES.light : PALETTES.dark;

  // ---------- Depan ----------
  const front = document.createElement("canvas");
  front.width = W;
  front.height = H;
  let ctx = front.getContext("2d")!;
  ctx.fillStyle = c.bg;
  ctx.fillRect(0, 0, W, H);
  // bingkai krem + garis dalam ungu (gaya .atd-retro__bar)
  ctx.fillStyle = c.frame;
  ctx.fillRect(0, 0, W, 10); ctx.fillRect(0, H - 10, W, 10); ctx.fillRect(0, 0, 10, H); ctx.fillRect(W - 10, 0, 10, H);
  ctx.fillStyle = c.header;
  ctx.fillRect(10, 10, W - 20, 100);
  ctx.fillStyle = c.rule;
  ctx.fillRect(10, 110, W - 20, 4);

  ctx.fillStyle = c.headerText;
  ctx.font = `400 26px ${mono}`;
  ctx.letterSpacing = "5px";
  ctx.textBaseline = "middle";
  ctx.fillText("PLAYER CARD", 64, 62);
  ctx.textAlign = "right";
  ctx.fillText("P1 · LV 01", W - 64, 62);
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";

  const px = 64, py = 150, pw = W - 128, ph = 640;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 0);
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
  // bayangan keras + bingkai emas
  ctx.fillStyle = c.photoShadow;
  ctx.fillRect(px + 12, py + ph, pw, 12);
  ctx.fillRect(px + pw, py + 12, 12, ph);
  ctx.strokeStyle = c.photoFrame;
  ctx.lineWidth = 8;
  ctx.strokeRect(px, py, pw, ph);

  ctx.fillStyle = c.name;
  ctx.font = `400 64px ${heading}`;
  ctx.textBaseline = "alphabetic";
  const lines = nameLines(ctx, data.name, pw);
  lines.forEach((l, i) => ctx.fillText(l.toUpperCase(), 64, 900 + i * 76));
  ctx.fillStyle = c.role;
  ctx.font = `400 34px ${mono}`;
  ctx.letterSpacing = "4px";
  ctx.fillText(`> ${data.role.toUpperCase()}`, 64, 900 + lines.length * 76 + 14);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = c.handle;
  ctx.font = `400 28px ${mono}`;
  ctx.fillText(`@${data.handle}`, 64, H - 72);
  // "barcode" dekoratif
  ctx.fillStyle = c.barcode;
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
  ctx.fillStyle = c.backBg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = c.backDots;
  for (let yy = 18; yy < H; yy += 36) for (let xx = 18; xx < W; xx += 36) ctx.fillRect(xx - 1, yy - 1, 3, 3);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `400 96px ${heading}`;
  const logo = ["~/", data.shortName, "_"];
  const widths = logo.map((p) => ctx.measureText(p).width);
  let lx = W / 2 - widths.reduce((a, b) => a + b, 0) / 2;
  ctx.textAlign = "left";
  logo.forEach((p, i) => {
    ctx.fillStyle = i === 1 ? c.logoMain : c.logoAccent;
    ctx.fillText(p, lx, H / 2 - 30);
    lx += widths[i];
  });
  ctx.textAlign = "center";
  ctx.fillStyle = c.backRole;
  ctx.font = `400 30px ${mono}`;
  ctx.letterSpacing = "5px";
  ctx.fillText(data.role.toUpperCase(), W / 2, H / 2 + 80);

  // ---------- Tali ----------
  const strap = document.createElement("canvas");
  strap.width = 1025;
  strap.height = 250;
  ctx = strap.getContext("2d")!;
  ctx.fillStyle = c.strapBg;
  ctx.fillRect(0, 0, 1025, 250);
  ctx.fillStyle = c.strapEdge;
  ctx.fillRect(0, 0, 1025, 14); ctx.fillRect(0, 236, 1025, 14);
  ctx.font = `400 60px ${heading}`;
  ctx.letterSpacing = "8px";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const items = [data.shortName.toUpperCase(), "■", data.role.toUpperCase(), "■"];
  const slot = 1025 / items.length;
  items.forEach((it, i) => {
    const cx = slot * i + slot / 2;
    if (it === "■") {
      ctx.fillStyle = c.strapMark;
      ctx.fillRect(cx - 14, 114, 28, 28);
      return;
    }
    ctx.fillStyle = c.strapText;
    ctx.fillText(it, cx, 128, slot - 10);
  });

  return { front: front.toDataURL("image/png"), back: back.toDataURL("image/png"), strap: strap.toDataURL("image/png") };
}
