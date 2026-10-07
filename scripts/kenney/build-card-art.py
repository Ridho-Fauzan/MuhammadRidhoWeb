"""
Membuat gambar pixel art untuk kartu "Pick your card" dari Kenney 1-Bit Pack (CC0).
Sumber tile: scripts/kenney/1bit-monochrome.png (tile 16x16, tanpa jarak) — https://kenney.nl/assets/1-bit-pack

Jalankan:  pip install pillow && python scripts/kenney/build-card-art.py
Hasil:     public/cards/<kartu>.pixel.png  (64x64 piksel, diperbesar x4 -> 256x256)
File berakhiran ".pixel.png" ditampilkan tajam (image-rendering: pixelated) oleh PickCards.tsx.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SHEET = Image.open(Path(__file__).with_name("1bit-monochrome.png")).convert("RGBA")
OUT = ROOT / "public" / "cards"
OUT.mkdir(parents=True, exist_ok=True)

BASE = 64  # ukuran adegan (piksel asli)
UPSCALE = 4

INK = (26, 16, 48, 255)  # latar = warna tinta kartu
NIGHT = (36, 21, 72, 255)
CREAM = (244, 230, 200, 255)
GOLD = (249, 199, 79, 255)
CORAL = (244, 123, 92, 255)
LILAC = (185, 167, 232, 255)
MINT = (127, 209, 174, 255)
PINK = (232, 130, 155, 255)


def tile(col: int, row: int, color, scale: int = 1) -> Image.Image:
    t = SHEET.crop((col * 16, row * 16, col * 16 + 16, row * 16 + 16))
    solid = Image.new("RGBA", t.size, color)
    out = Image.new("RGBA", t.size, (0, 0, 0, 0))
    out.paste(solid, mask=t.split()[3])
    return out.resize((16 * scale, 16 * scale), Image.NEAREST) if scale > 1 else out


def scene(accent) -> Image.Image:
    """Latar: langit malam + bintang kecil + lantai bertitik (warna aksen kartu)."""
    im = Image.new("RGBA", (BASE, BASE), INK)
    px = im.load()
    for x, y in [(6, 7), (17, 4), (29, 9), (44, 5), (55, 11), (10, 18), (58, 21), (3, 27)]:
        px[x, y] = NIGHT if (x + y) % 3 else CREAM[:3] + (110,)
    # lantai: garis + titik dither
    for x in range(BASE):
        px[x, 52] = accent
        if x % 2 == 0:
            px[x, 55] = NIGHT
        if x % 4 == 1:
            px[x, 58] = NIGHT
    return im


def put(im: Image.Image, sprite: Image.Image, x: int, y: int):
    im.alpha_composite(sprite, (x, y))


def save(name: str, im: Image.Image):
    im.convert("RGB").resize((BASE * UPSCALE, BASE * UPSCALE), Image.NEAREST).save(OUT / f"{name}.pixel.png", optimize=True)
    print("✓", OUT / f"{name}.pixel.png")


# 01 Tentang — karakter pemain + hati (HP) & bintang
im = scene(GOLD)
put(im, tile(25, 0, GOLD, 2), 16, 20)        # karakter
put(im, tile(39, 10, CORAL), 46, 12)         # hati
put(im, tile(39, 10, CORAL), 4, 30)
put(im, tile(36, 11, CREAM), 2, 6)           # kilau
save("about", im)

# 02 Keahlian — controller + palu & ramuan (tools)
im = scene(CORAL)
put(im, tile(31, 15, CORAL, 2), 16, 18)      # controller
put(im, tile(37, 7, CREAM), 3, 34)           # palu
put(im, tile(41, 11, GOLD), 45, 34)          # ramuan
put(im, tile(36, 11, GOLD), 46, 4)           # kilau
save("skills", im)

# 03 Proyek — peti harta + koin & kilau (hasil karya)
im = scene(LILAC)
put(im, tile(8, 6, LILAC, 2), 16, 20)        # peti
put(im, tile(15, 11, GOLD), 46, 36)          # koin
put(im, tile(36, 11, GOLD), 4, 8)            # kilau
put(im, tile(27, 11, CREAM), 44, 6)          # bintang
save("projects", im)

# 04 Pengalaman — peta perjalanan + bendera & piala
im = scene(MINT)
put(im, tile(32, 15, MINT, 2), 16, 18)       # peta
put(im, tile(17, 8, CORAL), 4, 36)           # bendera
put(im, tile(40, 16, GOLD), 45, 36)          # piala
put(im, tile(36, 11, CREAM), 46, 4)
save("experience", im)

# 05 Kontak — balon chat berisi hati + wajah senyum
im = scene(PINK)
put(im, tile(35, 15, PINK, 2), 16, 18)       # balon chat
put(im, tile(37, 14, GOLD), 4, 36)           # senyum
put(im, tile(36, 11, CREAM), 46, 6)
put(im, tile(39, 10, CORAL), 46, 36)         # hati
save("contact", im)
