# MuhammadRidhoWeb

Website portfolio pribadi. Desainnya terinspirasi dari [augustopolonio-website](https://github.com/augustopolonio/augustopolonio-website) (gaya monospace, typewriter hero, dan terminal interaktif), tapi ditulis ulang dengan layout, warna, dan section sendiri.

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion / Motion · three.js · React Three Fiber · Rapier · OGL · lucide-react · react-icons

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

## Dua Bahasa (ID / EN)

Tombol **ID / EN** ada di navbar. Pilihan pengunjung disimpan di browser. Pengunjung pertama kali otomatis mengikuti bahasa browser-nya (Indonesia → ID, lainnya → EN). Di terminal juga bisa ketik `lang en` / `lang id`.

- **Isi data** (`src/data/profile.ts`): tulis `{ id: "...", en: "..." }` untuk teks yang berbeda per bahasa, atau string biasa kalau sama, mis. `"Unity"`.
- **Teks antarmuka** (tombol, judul section, footer, terminal): `src/i18n/ui.ts`.

## Kartu Lanyard

Gambar depan, belakang, dan tali kartu dibuat otomatis di browser dari `profile.ts` (`name`, `role`, `handle`, `avatarUrl`, `shortName`) lewat `src/components/lanyardArt.ts`. Ganti datanya, kartunya ikut berubah. Warna kartu sengaja netral (hitam/putih/abu).

## Komponen & Aset Pihak Ketiga

| Dipakai di | Komponen | Sumber | Lisensi |
|---|---|---|---|
| Latar hero (mode gelap) | Emerald Horizon | [ThreeUI Community](https://threeui.com) · `src/components/threeui/` | MIT |
| Kartu ID tergantung di hero (desktop) | Lanyard (model `public/lanyard/card.glb`) | [React Bits](https://reactbits.dev) · `src/components/reactbits/` | MIT + Commons Clause |
| Nama di hero | DecryptedText | React Bits | MIT + Commons Clause |
| Peran di hero | RotatingText | React Bits | MIT + Commons Clause |
| Tombol CTA | Magnet | React Bits | MIT + Commons Clause |
| Klik di hero | ClickSpark | React Bits | MIT + Commons Clause |
| Marquee teknologi | LogoLoop | React Bits | MIT + Commons Clause |
| Kartu skill / proyek / statistik | SpotlightCard | React Bits | MIT + Commons Clause |
| Statistik About | CountUp | React Bits | MIT + Commons Clause |
| Latar Contact | Particles | React Bits | MIT + Commons Clause |
| Logo teknologi | Simple Icons | [react-icons](https://react-icons.github.io/react-icons/) | MIT / CC0 |

Komponen pihak ketiga disalin ke `src/components/reactbits` dan `src/components/threeui` (beserta file lisensinya) dan dikecualikan dari ESLint. Commons Clause pada React Bits membolehkan pemakaian di website, tapi **tidak** boleh menjual/mendistribusikan ulang komponennya sendiri.

Font: Space Grotesk (judul), Inter (teks), JetBrains Mono (kode/terminal), via `next/font/google`.
