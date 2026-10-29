/**
 * Membuat src/app/icon.svg dan src/app/favicon.ico dari src/assets/pixelLogo.ts.
 * Jalankan:  npm run icons   (Node 22.18+ / 23.6+, tanpa dependency tambahan)
 */
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { LOGO_SIZE, logoColors, logoGrid } from "../src/assets/pixelLogo.ts";

const out = new URL("../src/app/", import.meta.url);

// ---------- icon.svg (tajam di semua ukuran) ----------
// pixel sewarna yang berderet digabung jadi satu <rect> supaya file kecil
const rects: string[] = [];
logoGrid.forEach((row, y) => {
  for (let x = 0; x < row.length; ) {
    const cell = row[x];
    let w = 1;
    while (row[x + w] === cell) w++;
    if (cell) rects.push(`<rect x="${x}" y="${y}" width="${w}" height="1" fill="${logoColors[cell]}"/>`);
    x += w;
  }
});
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_SIZE} ${LOGO_SIZE}" shape-rendering="crispEdges">${rects.join("")}</svg>\n`;
writeFileSync(new URL("icon.svg", out), svg);

// ---------- favicon.ico (PNG 16, 32, 48 px di dalam satu file .ico) ----------
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf: Buffer) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type: string, data: Buffer) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

function png(size: number) {
  const scale = size / LOGO_SIZE;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1); // byte pertama tiap baris = filter 0
    for (let x = 0; x < size; x++) {
      const cell = logoGrid[Math.floor(y / scale)][Math.floor(x / scale)];
      const [r, g, b] = cell ? hex(logoColors[cell]) : [0, 0, 0];
      raw.set([r, g, b, cell ? 255 : 0], rowStart + 1 + x * 4);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.set([8, 6, 0, 0, 0], 8); // 8-bit RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const sizes = [16, 32, 48];
const images = sizes.map(png);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2); // tipe 1 = ikon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bit per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
writeFileSync(new URL("favicon.ico", out), Buffer.concat([header, ...entries, ...images]));

console.log(`icon.svg + favicon.ico (${sizes.join(", ")} px) dibuat di src/app/`);
