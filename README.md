# MuhammadRidhoWeb

Website portfolio pribadi. Desainnya terinspirasi dari [augustopolonio-website](https://github.com/augustopolonio/augustopolonio-website) (gaya monospace, typewriter hero, dan terminal interaktif), tapi ditulis ulang dengan layout, warna, dan section sendiri.

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion / Motion · three.js · React Three Fiber · Rapier · OGL · GSAP · lucide-react · react-icons

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

## Tema Retro

Seluruh situs memakai tema dari [ThreeUI Animated Top Dock — Retro](https://threeui.com/css/animated-top-dock/retro): palet *dusk* (ungu, emas, koral, krem), sudut kotak, garis tebal, bayangan keras, dan scanline CRT. Warna diatur di `src/app/globals.css` (`:root` = mode terang/kertas, `.dark` = mode gelap/CRT). Navbar: `src/components/RetroDock.tsx` + `RetroDock.css`.

## Halaman

| URL | Isi |
|---|---|
| `/` | Hero (Lanyard), marquee teknologi, kartu "Jelajahi" ke halaman lain |
| `/about` | Tentang saya, statistik, terminal interaktif |
| `/skills` | Keahlian per kategori |
| `/projects` | Proyek unggulan & lainnya |
| `/experience` | Timeline pendidikan & karier |
| `/contact` | Ajakan kontak + latar partikel |

Daftar halaman ada di `src/data/pages.ts` (dipakai navbar dan kartu Jelajahi). Navbar & footer ada di `src/app/layout.tsx`. Di terminal juga bisa ketik `cd projects`, `cd ~`, dst.

## Dua Bahasa (ID / EN)

Tombol **ID / EN** ada di navbar. Pilihan pengunjung disimpan di browser. Pengunjung pertama kali otomatis mengikuti bahasa browser-nya (Indonesia → ID, lainnya → EN). Di terminal juga bisa ketik `lang en` / `lang id`.

- **Isi data** (`src/data/profile.ts`): tulis `{ id: "...", en: "..." }` untuk teks yang berbeda per bahasa, atau string biasa kalau sama, mis. `"Unity"`.
- **Teks antarmuka** (tombol, judul section, footer, terminal): `src/i18n/ui.ts`.

## Kartu Lanyard

Gambar depan, belakang, dan tali kartu dibuat otomatis di browser dari `profile.ts` (`name`, `role`, `handle`, `avatarUrl`, `shortName`) lewat `src/components/lanyardArt.ts`. Ganti datanya, kartunya ikut berubah. Warna kartu sengaja netral (hitam/putih/abu).

## Komponen & Aset Pihak Ketiga

| Dipakai di | Komponen | Sumber | Lisensi |
|---|---|---|---|
| Kartu proyek "Coming Soon" | ShinyText | React Bits | MIT + Commons Clause |
| Tema seluruh situs, navbar dock & latar dither (hero) | Animated Top Dock — Retro | [ThreeUI](https://threeui.com/css/animated-top-dock/retro) · `src/components/threeui/` | MIT |
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

Font: Silkscreen (judul, pixel) dan Fragment Mono (teks) via `next/font/google` — keduanya SIL Open Font License.

## Proyek "Coming Soon"

Di `src/data/profile.ts`, proyek dengan `comingSoon: true` tampil sebagai kartu **Segera Hadir / Coming Soon** tanpa link. Saat proyeknya sudah ada, hapus `comingSoon` lalu isi `title`, `description`, `tags`, `image`, `demoUrl`, dan `repoUrl`.
