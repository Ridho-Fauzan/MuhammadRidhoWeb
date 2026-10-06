# MuhammadRidhoWeb

Website portfolio pribadi. Desainnya terinspirasi dari [augustopolonio-website](https://github.com/augustopolonio/augustopolonio-website) (gaya monospace, typewriter hero, dan terminal interaktif), tapi ditulis ulang dengan layout, warna, dan section sendiri.

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
```

## Mengganti Data Diri

Semua konten ada di **`src/data/profile.ts`**: nama, tagline, about, skills, proyek, pengalaman, dan link sosial media.

- Foto profil: taruh di `public/` (mis. `public/foto.jpg`), lalu isi `avatarUrl: "/foto.jpg"`.
- CV: taruh di `public/` (mis. `public/cv.pdf`), lalu isi `resumeUrl: "/cv.pdf"`. Tombol CV akan muncul di navbar.
- Gambar proyek: taruh di `public/projects/`, lalu isi `image` pada tiap proyek.

## Section

Hero (typewriter) → About + terminal interaktif → Skills → Projects → Experience (timeline) → Contact. Tersedia mode gelap dan terang.
