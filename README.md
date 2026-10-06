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
- Gambar proyek: taruh di `public/projects/`, lalu isi `image` pada tiap proyek. Screenshot tambahan (opsional): `gallery: ["/projects/a-2.png", ...]` → tampil sebagai thumbnail di detail proyek.
- Kutipan footer: `quotes` di `profile` (bergantian otomatis; lama tiap kutipan = `quoteSeconds` detik). Tambah sebanyak yang kamu mau.
- Foto kartu "Pick your card" (opsional): isi `cardImages` (mis. `about: "/cards/about.jpg"`). Kosong = kartu memakai ikon pixel besar. Foto tampil hitam-putih dan berwarna saat di-hover.

## Form Kontak

Form "Kirim pesan" di `/contact` mengirim pesan lewat [Formspree](https://formspree.io); ID form-nya ada di `src/data/profile.ts` → `formspreeId`. Pesan masuk ke email akun Formspree, dan tombol **Reply** di email langsung membalas ke pengirim.

- Ganti form: ubah `formspreeId` (atau isi env `NEXT_PUBLIC_FORMSPREE_ID`, yang lebih diprioritaskan).
- Kosongkan `formspreeId` → tombol **Kirim** membuka aplikasi email pengunjung dengan pesan yang sudah terisi.

## Tema Retro

Seluruh situs memakai tema dari [ThreeUI Animated Top Dock — Retro](https://threeui.com/css/animated-top-dock/retro): palet *dusk* (ungu, emas, koral, krem), sudut kotak, garis tebal, bayangan keras, dan scanline CRT. Warna diatur di `src/app/globals.css` (`:root` = mode terang/kertas, `.dark` = mode gelap/CRT). Navbar: `src/components/RetroDock.tsx` + `RetroDock.css`. Latar animasi tiap halaman: `src/components/PageBackground.tsx` (`variant`: `terminal`, `dots`, `grid`, `grid-diagonal`, `snow`).

## Halaman

| URL | Isi |
|---|---|
| `/` | Hero (Lanyard), marquee teknologi, kartu "Pick your card" ke halaman lain |
| `/about` | Tentang saya, statistik, terminal interaktif |
| `/skills` | Keahlian per kategori |
| `/projects` | Kartu proyek kecil; diklik → detail (deskripsi, link kode & demo) |
| `/experience` | Timeline pendidikan & karier |
| `/contact` | Ajakan kontak + form "Kirim pesan" + latar partikel |

Di bawah tiap halaman ada baris "Pilih kartu berikutnya" ke halaman lain. Daftar halaman ada di `src/data/pages.ts` (dipakai navbar, kartu, dan footer). Navbar & footer ada di `src/app/layout.tsx`. Di terminal juga bisa ketik `cd projects`, `cd ~`, dst.

## Dua Bahasa (ID / EN)

Tombol **ID / EN** ada di navbar. Pilihan pengunjung disimpan di browser. Pengunjung pertama kali otomatis mengikuti bahasa browser-nya (Indonesia → ID, lainnya → EN). Di terminal juga bisa ketik `lang en` / `lang id`.

- **Isi data** (`src/data/profile.ts`): tulis `{ id: "...", en: "..." }` untuk teks yang berbeda per bahasa, atau string biasa kalau sama, mis. `"Unity"`.
- **Teks antarmuka** (tombol, judul section, footer, terminal): `src/i18n/ui.ts`.

## Kartu Lanyard

Gambar depan, belakang, dan tali kartu dibuat otomatis di browser dari `profile.ts` (`name`, `role`, `handle`, `avatarUrl`, `shortName`) lewat `src/components/lanyardArt.ts`. Ganti datanya, kartunya ikut berubah. Warna kartu sengaja netral (hitam/putih/abu).

## Komponen & Aset Pihak Ketiga

| Dipakai di | Komponen | Sumber | Lisensi |
|---|---|---|---|
| Kartu proyek (efek pixel saat hover) | PixelCard | React Bits | MIT + Commons Clause |
| Animasi hover/klik, navbar sembunyi saat scroll, detail proyek, kartu, kursor | Motion (`motion/react`) | [motion.dev](https://motion.dev) | MIT |
| Scroll halus (mouse/trackpad) | Lenis | [lenis](https://github.com/darkroomengineering/lenis) | MIT |
| Tema seluruh situs, navbar dock & latar dither (hero) | Animated Top Dock — Retro | [ThreeUI](https://threeui.com/css/animated-top-dock/retro) · `src/components/threeui/` | MIT |
| Kartu ID tergantung di hero (desktop) | Lanyard (model `public/lanyard/card.glb`) | [React Bits](https://reactbits.dev) · `src/components/reactbits/` | MIT + Commons Clause |
| Nama di hero | DecryptedText | React Bits | MIT + Commons Clause |
| Peran di hero | RotatingText | React Bits | MIT + Commons Clause |
| Klik di hero | ClickSpark | React Bits | MIT + Commons Clause |
| Marquee teknologi | LogoLoop | React Bits | MIT + Commons Clause |
| Kartu skill / statistik | SpotlightCard | React Bits | MIT + Commons Clause |
| Statistik About | CountUp | React Bits | MIT + Commons Clause |
| Latar Contact | Particles | React Bits | MIT + Commons Clause |
| Latar halaman About | FaultyTerminal | React Bits | MIT + Commons Clause |
| Latar halaman Skills | Dot Matrix (warna diubah ke palet retro) | [ThreeUI](https://threeui.com) · `src/components/threeui/` | MIT |
| Latar halaman Projects & bagian "Pick your card" | ShapeGrid | React Bits | MIT + Commons Clause |
| Latar halaman Experience | PixelSnow | React Bits | MIT + Commons Clause |
| Logo teknologi | Simple Icons | [react-icons](https://react-icons.github.io/react-icons/) | MIT / CC0 |

Komponen pihak ketiga disalin ke `src/components/reactbits` dan `src/components/threeui` (beserta file lisensinya) dan dikecualikan dari ESLint. Commons Clause pada React Bits membolehkan pemakaian di website, tapi **tidak** boleh menjual/mendistribusikan ulang komponennya sendiri.

Font: Silkscreen (judul, pixel), Fragment Mono (teks), dan Pixelify Sans (navbar) via `next/font/google` — semuanya SIL Open Font License.

## Detail Interaksi

- **Layar boot** (`BootScreen.tsx`): muncul sekali per sesi tab, bisa dilewati dengan klik/tombol apa saja; tidak tampil kalau pengunjung memilih *reduce motion* atau JavaScript mati.
- **Kursor retro** (`RetroCursor.tsx`): bingkai pixel yang mengikuti mouse; hanya di perangkat dengan mouse, kursor asli tetap tampil.
- **Karakter pixel di footer** (`PixelBuddy.tsx`): digambar dari peta karakter di file itu — ubah huruf/warna di `BODY` & `PALETTE` untuk mengganti penampilannya.

## Proyek "Coming Soon"

Di `src/data/profile.ts`, proyek dengan `comingSoon: true` tampil sebagai kartu **Segera Hadir / Coming Soon** tanpa link. Saat proyeknya sudah ada, hapus `comingSoon` lalu isi `title`, `description`, `tags`, `image`, `demoUrl`, dan `repoUrl`.
