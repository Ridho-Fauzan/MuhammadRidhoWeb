# Pixel art kartu "Pick your card"

Gambar di `public/cards/*.pixel.png` disusun dari **[Kenney 1-Bit Pack](https://kenney.nl/assets/1-bit-pack)** (lisensi CC0, lihat `License.txt`).

- `1bit-monochrome.png`: tilesheet asli (tile 16×16, tanpa jarak).
- `build-card-art.py`: menyusun tile menjadi adegan 64×64 berwarna palet situs, lalu menyimpannya diperbesar 4×.

Ubah adegan (tile, posisi, warna) di skrip, lalu jalankan:

```bash
pip install pillow
python scripts/kenney/build-card-art.py
```

Posisi tile ditulis `tile(kolom, baris, warna, skala)`. Kolom/baris bisa dilihat dari tilesheet (49 kolom × 22 baris).
