# MuhammadRidhoWeb

Website portfolio pribadi **Muhammad Ridho Fathi Fauzan** (Ridho), mahasiswa Computer Science di BINUS University yang berfokus pada **frontend development** dan **UI/UX design**. Situs ini tersedia dalam Bahasa Indonesia dan Inggris.

Desainnya memakai pendekatan **editorial web portfolio**: tipografi besar, banyak ruang kosong, palet monokrom netral dengan aksen indigo, serta animasi yang mendukung navigasi dan konten, bukan sekadar hiasan.

## Isi Situs

| Halaman | Isi |
|---|---|
| **Beranda** (`/`) | Hero dengan kartu ID lanyard 3D, peran yang berganti otomatis, tech marquee, layanan, proyek unggulan, indeks portfolio interaktif, dan command line. |
| **About** (`/about`) | Perkenalan Ridho, statistik ringkas, dan tumpukan foto interaktif. |
| **Skills** (`/skills`) | Keahlian frontend, UI/UX, web interaction, dan tools. |
| **Projects** (`/projects`) | Kartu-kartu proyek yang membuka modal berisi deskripsi, galeri, kode, dan demo. |
| **Experience** (`/experience`) | Linimasa pendidikan dan perjalanan karier. |
| **Contact** (`/contact`) | Ajakan berkolaborasi, pintasan WhatsApp & email, serta form kontak. |

## Pengalaman & Interaksi

- **Kartu ID lanyard 3D** — kartu ID personal yang digambar otomatis dari data profil, menggantung dan bergerak secara fisik di desktop. Versi ringan dan interaktif tersedia di mobile.
- **Navigasi dock proximity** — menu desktop mengadopsi pegas proximity dari ThreeUI. Item menu melebar saat pointer mendekat.
- **Indeks portfolio FlowingMenu** — baris navigasi berubah menjadi pita marquee saat di-hover, menampilkan deskripsi dan foto terkait.
- **Background interaktif** — React Bits DotGrid pada beberapa halaman merespons posisi pointer; ThreeUI Dot Matrix menambah gerakan halus pada halaman lain.
- **Micro-interactions** — magnet pada CTA utama, kata yang menebal berdasarkan kedekatan pointer, headline bergerak mengikuti kecepatan scroll, dan animasi masuk yang menghormati preferensi *reduce motion*.
- **Command line** — pengunjung dapat memakai perintah seperti `help`, `whoami`, dan `cd projects` untuk menjelajahi portfolio via keyboard.
- **Dua bahasa dan mode terang/gelap** — kedua preferensi disimpan di browser. Light mode memakai `#FAFAF9`; dark mode memakai `#0A0A0B`.

## Palet Warna

| Token | Light | Dark | Peran |
|---|---:|---:|---|
| Background | `#FAFAF9` | `#0A0A0B` | Latar utama |
| Surface | `#FFFFFF` | `#121214` | Kartu dan panel |
| Foreground | `#0C0C0D` | `#F5F5F4` | Teks utama |
| Muted | `#5F5F66` | `#A1A1AA` | Teks sekunder |
| Accent | `#4F46E5` | `#8B93FF` | Aksi dan status |

Semua pasangan teks utama dan latar memenuhi kontras WCAG AA minimal 4.5:1.

## Teknologi

Dibangun dengan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Motion memakai **Motion / Framer Motion**, scroll halus memakai **Lenis**, dan kartu lanyard 3D memakai **three.js**, **React Three Fiber**, serta fisika **Rapier**. Ikon dari **lucide-react** dan **react-icons**.

Komponen interaktif diadaptasi dari [React Bits](https://reactbits.dev) dan [ThreeUI](https://threeui.com). Berkas lisensi tersedia bersama kode yang diadaptasi: `src/components/reactbits/LICENSE.md` dan `src/components/threeui/LICENSE`.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Untuk build produksi:

```bash
npm run build
npm start
```
