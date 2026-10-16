# MuhammadRidhoWeb

Website portfolio pribadi **Muhammad Ridho Fathi Fauzan** (Ridho) — mahasiswa Computer Science di BINUS University dengan penjurusan Interactive Multimedia, yang berfokus pada **game development** dan pengalaman interaktif.

Situs ini menampilkan profil, keahlian, proyek, dan pengalaman Ridho dalam balutan tema **retro / pixel-art** yang interaktif: nuansa monospace, terminal yang bisa diketik, kartu ID bertali (lanyard) 3D, latar beranimasi, dan efek-efek kecil yang menghidupkan setiap halaman. Tersedia dalam **dua bahasa** (Indonesia & Inggris).

## Isi Situs

Situs terdiri dari beberapa halaman, masing-masing dengan latar beranimasi sendiri dan baris navigasi "pilih kartu berikutnya" di bawahnya.

| Halaman | Isi |
|---|---|
| **Beranda** (`/`) | Sambutan utama dengan kartu ID 3D yang tergantung di tali (lanyard), peran yang berganti otomatis ("Game Developer", "Web Developer", dll), marquee logo teknologi, dan deretan kartu "Pick your card" sebagai pintu ke halaman lain. |
| **About** (`/about`) | Perkenalan Ridho, statistik ringkas (mis. tahun belajar), dan terminal interaktif yang bisa diketik perintah seperti `cd projects` atau `lang en`. |
| **Skills** (`/skills`) | Keahlian yang dikelompokkan per kategori. |
| **Projects** (`/projects`) | Kartu-kartu proyek; diklik untuk membuka detail berisi deskripsi, tautan kode, dan demo. Mencakup proyek seperti FloraDex, KawanAksi, dan SpoJeDy, serta slot "Coming Soon" untuk karya yang akan datang. |
| **Experience** (`/experience`) | Linimasa pendidikan dan perjalanan karier. |
| **Contact** (`/contact`) | Ajakan untuk terhubung, pintasan WhatsApp & email, dan form "Kirim pesan" di atas latar partikel. |

## Pengalaman & Interaksi

Yang membuat situs ini terasa hidup:

- **Kartu ID bertali (Lanyard)** — kartu identitas 3D di beranda yang menggantung dan bergoyang mengikuti gerak, digambar otomatis dari data profil (nama, peran, username, foto). Versi ringkas tampil di perangkat mobile.
- **Terminal interaktif** — di halaman About, pengunjung bisa mengetik perintah untuk berpindah halaman atau mengganti bahasa.
- **Dua bahasa (ID / EN)** — tombol di navbar; pilihan pengunjung diingat, dan pengunjung baru otomatis mengikuti bahasa browser-nya.
- **Tema retro menyeluruh** — palet senja (ungu, emas, koral, krem), garis tebal, bayangan keras, dan scanline ala CRT, lengkap dengan mode terang (kertas) dan gelap (CRT).
- **Sentuhan kecil** — layar boot bergaya retro saat pertama membuka, kursor pixel yang mengikuti mouse, karakter pixel di footer, kutipan game yang bergantian, scroll yang halus, serta animasi hover dan klik di berbagai elemen.
- **Ramah aksesibilitas** — efek berat otomatis dinonaktifkan bila pengunjung memilih *reduce motion*, dan situs tetap bisa dibaca tanpa JavaScript.

## Teknologi

Dibangun dengan **Next.js (App Router)** dan **TypeScript**, ditata dengan **Tailwind CSS**. Animasi memakai **Motion / Framer Motion** dan scroll halus dari **Lenis**. Elemen 3D (kartu lanyard, latar beranimasi) memakai **three.js**, **React Three Fiber**, dan fisika **Rapier**, dengan sejumlah latar berbasis **OGL**. Ikon dari **lucide-react** dan **react-icons**.

Tema dan banyak efek visual mengadaptasi komponen dari **React Bits**, **ThreeUI (Animated Top Dock — Retro)**, serta aset pixel-art dari **Kenney 1-Bit Pack**. Semua komponen dan aset pihak ketiga disertai berkas lisensinya masing-masing di dalam proyek.

## Kredit & Inspirasi

Desain terinspirasi dari [augustopolonio-website](https://github.com/augustopolonio/augustopolonio-website) (gaya monospace, hero typewriter, dan terminal interaktif), lalu ditulis ulang dengan layout, warna, dan section sendiri.

Font yang dipakai: **Silkscreen**, **Fragment Mono**, dan **Pixelify Sans** (semuanya SIL Open Font License).
