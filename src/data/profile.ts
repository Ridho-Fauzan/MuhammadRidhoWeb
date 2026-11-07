/**
 * ============================================================
 *  DATA PORTFOLIO — ganti semua isi di file ini dengan data dirimu.
 *  Semua komponen membaca dari sini, jadi kamu tidak perlu
 *  mengubah kode komponen sama sekali.
 *
 *  DUA BAHASA:
 *  - Teks yang sama di kedua bahasa cukup ditulis biasa:  "React"
 *  - Teks yang beda per bahasa ditulis:  { id: "Sekarang", en: "Now" }
 *  Keduanya boleh dicampur di mana saja yang bertipe `L`.
 * ============================================================
 */
import type { L } from "@/i18n/types";

/** Tahun mulai belajar (mulai kuliah Computer Science di BINUS) — dipakai untuk statistik "Tahun Belajar". */
const LEARNING_SINCE = 2024;

export const profile: {
  name: string;
  shortName: string;
  role: L;
  location: L;
  email: string;
  whatsapp: string;
  whatsappMessage: string;
  formspreeId: string;
  resumeUrl: string;
  avatarUrl: string;
  handle: string;
  roles: L[];
  tagline: L;
  heroBadges: string[];
  about: L[];
  stats: { value: number; suffix?: string; label: L }[];
  availability: L;
} = {
  name: "Muhammad Ridho Fathi Fauzan",
  shortName: "Ridho",
  role: "Frontend Developer & UI/UX Designer",
  location: "Jakarta, Indonesia",
  email: "muhammadridhofathifauzan@gmail.com",
  /**
   * Nomor WhatsApp format internasional TANPA "+", spasi, atau "0" di depan.
   * Contoh: 081234567890 → "6281234567890". Kosong = tombol WhatsApp disembunyikan.
   */
  whatsapp: "6285179621456",
  /** Pesan yang otomatis terisi saat pengunjung membuka chat WhatsApp */
  whatsappMessage: "Hi Ridho! I’d love to connect and get to know you better.",
  /**
   * ID form Formspree (https://formspree.io) untuk form "Kirim pesan" di /contact.
   * Pesan dari pengunjung langsung masuk ke email. Kosong = form membuka aplikasi email pengunjung (mailto).
   */
  formspreeId: "xbgddovk",
  /** Link CV: path di /public (mis. "/cv.pdf") atau URL luar (mis. Google Drive). Kosong = tombol CV disembunyikan. */
  resumeUrl: "https://drive.google.com/file/d/1LogQfSWozYEH9XgNhPPGIGhvlWALyj58/view?usp=sharing",
  /** Foto close-up untuk kartu ID (Lanyard & versi mobile). Taruh di /public lalu isi path-nya. */
  avatarUrl: "/profile/plo.jpg",
  /** Username yang tampil di kartu Lanyard (tanpa @) */
  handle: "Akashimoke",
  /** Peran yang berganti-ganti di hero: "Saya seorang ..." / "I'm a ..." */
  roles: [
    "Frontend Developer",
    "UI/UX Designer",
    "Web Developer",
    "Creative Technologist",
  ],
  tagline: {
    id: "Merancang dan membangun antarmuka web yang bersih, responsif, dan enak dipakai — dari wireframe di Figma sampai kode yang siap rilis.",
    en: "Designing and building clean, responsive, and delightful web interfaces — from Figma wireframes to production-ready code.",
  },
  heroBadges: ["React", "Next.js", "TypeScript", "Figma"],
  availability: { id: "Terbuka untuk magang & freelance", en: "Open to internships & freelance" },
  about: [
    {
      id: "Halo, saya Ridho, mahasiswa Computer Science di BINUS University yang saat ini mengambil penjurusan Interactive Multimedia melalui program mobility.",
      en: "Hello, I'm Ridho, a Computer Science student at BINUS University currently specializing in Interactive Multimedia through the mobility program.",
    },
    {
      id: "Saya fokus pada pengembangan frontend dengan React, Next.js, Vue, dan Tailwind CSS, serta desain UI/UX di Figma. Saya menikmati proses dari memahami kebutuhan pengguna, merancang alur dan tampilan, sampai mewujudkannya jadi produk web yang rapi, cepat, dan mudah diakses.",
      en: "I focus on frontend development with React, Next.js, Vue, and Tailwind CSS, along with UI/UX design in Figma. I enjoy the whole process: understanding user needs, designing flows and interfaces, and shipping them as polished, fast, and accessible web products.",
    },
    {
      id: "Saat ini, saya sedang mencari kesempatan magang, kerja remote, maupun freelance untuk mendapatkan pengalaman nyata, berkolaborasi dengan tim, dan terus berkembang sebagai frontend developer dan UI/UX designer.",
      en: "I'm currently open to internships, remote roles, and freelance work to gain real-world experience, collaborate with teams, and keep growing as a frontend developer and UI/UX designer.",
    },
  ],
  /**
   * Angka statistik di halaman About — dihitung otomatis dari data di bawah,
   * jadi tidak perlu diubah manual:
   * - Tahun Belajar   = tahun ini − LEARNING_SINCE (mulai kuliah di BINUS)
   * - Proyek Selesai  = jumlah `projects` yang bukan "Coming Soon"
   * - Teknologi       = jumlah tag unik dari proyek-proyek yang sudah selesai
   */
  get stats() {
    const done = projects.filter((p) => !p.comingSoon);
    const tech = new Set(done.flatMap((p) => p.tags));
    return [
      { value: Math.max(1, new Date().getFullYear() - LEARNING_SINCE), label: { id: "Tahun Belajar", en: "Years Learning" } },
      { value: done.length, label: { id: "Proyek Selesai", en: "Projects Done" } },
      { value: tech.size, label: { id: "Teknologi Dipakai", en: "Technologies Used" } },
    ];
  },
};

/**
 * Layanan / hal yang saya kerjakan — tampil sebagai daftar yang bisa dibuka-tutup di beranda.
 * `tools` = chip kecil di bawah deskripsi.
 */
export const services: { title: L; description: L; tools: string[] }[] = [
  {
    title: "UI/UX Design",
    description: {
      id: "Riset kebutuhan pengguna, menyusun alur, wireframe, sampai desain high-fidelity dan prototipe interaktif yang siap diuji.",
      en: "User research, flows, wireframes, all the way to high-fidelity designs and interactive prototypes ready for testing.",
    },
    tools: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    title: "Frontend Development",
    description: {
      id: "Mengubah desain jadi kode yang rapi dan mudah dirawat dengan komponen yang bisa dipakai ulang, performa cepat, dan aksesibilitas yang baik.",
      en: "Turning designs into clean, maintainable code with reusable components, fast performance, and solid accessibility.",
    },
    tools: ["React", "Next.js", "Vue 3", "TypeScript"],
  },
  {
    title: { id: "Website Responsif", en: "Responsive Websites" },
    description: {
      id: "Landing page dan web app yang tampil konsisten di HP, tablet, dan desktop, lengkap dengan animasi halus dan SEO dasar.",
      en: "Landing pages and web apps that look consistent on phones, tablets, and desktops, with smooth motion and solid SEO basics.",
    },
    tools: ["Tailwind CSS", "Motion", "SEO"],
  },
  {
    title: { id: "Pengalaman Interaktif", en: "Interactive Experiences" },
    description: {
      id: "Elemen 3D dan interaksi yang membuat produk terasa hidup, tanpa mengorbankan kecepatan halaman.",
      en: "3D elements and interactions that make a product feel alive without sacrificing page speed.",
    },
    tools: ["three.js", "React Three Fiber", "AR"],
  },
];

/**
 * Foto-foto diri (taruh di /public/profile).
 * - Semua foto tampil sebagai tumpukan foto di halaman About (bisa digeser / diklik).
 * - `contactPhoto` = indeks foto yang tampil di halaman Contact.
 * `focus` = posisi crop (CSS object-position), mis. "50% 20%" supaya wajah tidak terpotong.
 */
export const photos: { src: string; alt: L; caption: L; focus?: string }[] = [
  {
    src: "/profile/IMG_20240911_120911.jpg",
    alt: { id: "Ridho memakai jas, duduk di studio foto", en: "Ridho in a suit, seated in a photo studio" },
    caption: { id: "mode serius", en: "serious mode" },
    focus: "50% 30%",
  },
  {
    src: "/profile/IMG_20240417_212952.jpg",
    alt: { id: "Ridho berpose dengan kacamata hitam dan beanie", en: "Ridho posing with sunglasses and a beanie" },
    caption: { id: "akhir pekan", en: "off duty" },
    focus: "50% 25%",
  },
  {
    src: "/profile/plo.jpg",
    alt: { id: "Foto close-up Ridho", en: "Close-up photo of Ridho" },
    caption: { id: "mode santai", en: "chill mode" },
    focus: "50% 20%",
  },
];
export const contactPhoto = 1;

export type SocialKey = "github" | "linkedin" | "instagram" | "whatsapp" | "email";

/** Link chat WhatsApp dengan pesan otomatis (kosong jika nomor belum diisi) */
export const whatsappUrl = profile.whatsapp
  ? `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(profile.whatsappMessage)}`
  : "";

export const socials: { key: SocialKey; label: string; url: string }[] = [
  { key: "github", label: "GitHub", url: "https://github.com/Akashimoke" },
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-ridho-fathi-fauzan-6131bb327/" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/biasadipanggilepep/" },
  ...(whatsappUrl ? [{ key: "whatsapp" as const, label: "WhatsApp", url: whatsappUrl }] : []),
  { key: "email", label: "Email", url: "mailto:muhammadridhofathifauzan@gmail.com" },
];

export const skills: { category: L; items: L[] }[] = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue 3", "Tailwind CSS"],
  },
  {
    category: "UI/UX Design",
    items: ["Figma", "Wireframing", "Prototyping", "UI Design", "User Flow", "Design Systems"],
  },
  {
    category: { id: "Web & Interaksi", en: "Web & Interaction" },
    items: ["Responsive Design", { id: "Aksesibilitas", en: "Accessibility" }, "Motion / Animation", "three.js", "SEO"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Vite", "VS Code", "Vercel"],
  },
];

export type ProjectResource = {
  /** Label tombol. Bisa teks sama untuk dua bahasa atau diterjemahkan dengan { id, en }. */
  label: L;
  url: string;
  /** Tombol utama (warna penuh); gunakan hanya untuk aksi utama. */
  primary?: boolean;
};

export type Project = {
  title: L;
  description: L;
  tags: string[];
  /** Path gambar di /public, mis. "/projects/proyek-1.png". Kosong = placeholder gradient. */
  image?: string;
  /** Screenshot tambahan (opsional) — tampil sebagai thumbnail di detail proyek */
  gallery?: string[];
  demoUrl?: string;
  repoUrl?: string;
  /** Tautan eksternal bernama, misalnya file proyek atau desain poster. */
  resources?: ProjectResource[];
  featured?: boolean;
  /** true = tampil sebagai kartu "Coming Soon" (tanpa link). Hapus/ganti saat proyeknya sudah ada. */
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    title: "FloraDex — Fun 3D Learning",
    description: {
      id: "Proyek tugas kuliah tim: aplikasi mobile Augmented Reality untuk membantu siswa sekolah dasar belajar buah dan sayuran secara interaktif. Pengguna memindai gambar pada buku pelajaran untuk menampilkan model 3D secara real-time, lengkap dengan menu riwayat dan pengaturan.",
      en: "A university team project: a mobile Augmented Reality app that helps elementary-school students learn about fruit and vegetables interactively. Users scan images in a textbook to display real-time 3D models, with history and settings screens.",
    },
    tags: ["Unity 6", "Vuforia", "AR", "Figma", "Sketchfab"],
    // Poster dipakai sebagai cover; screenshot Unity tetap tersedia di galeri detail.
    image: "/projects/floradex-poster.png",
    gallery: ["/projects/floradex.png"],
    demoUrl: "https://drive.google.com/file/d/1bHFDKU9AxAHVx9sJva1fLaW7T7o_JUZ1/view",
    resources: [
      { label: "File Project", url: "https://lnkd.in/gTBz3ps9" },
      { label: "Poster Design", url: "https://lnkd.in/g-Er_tAP" },
    ],
    featured: true,
  },
  {
    title: "Kawan Aksi",
    description: {
      id: "Platform web yang menghubungkan relawan dengan kegiatan sosial dari komunitas lokal dan NGO. Pengguna bisa menjelajahi kegiatan, melihat detail (lokasi, jadwal, penyelenggara, syarat), mendaftar sebagai relawan, dan menghubungi penyelenggara.",
      en: "A web platform that connects volunteers with social activities hosted by local communities and NGOs. Users can browse events, view details (location, schedule, organizer, requirements), register as volunteers, and contact organizers.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/kawanaksi.png",
    demoUrl: "https://kawanaksi.vercel.app",
    repoUrl: "https://github.com/Akashimoke/KawanAksi",
    featured: true,
  },
  {
    title: "SpoJeDy",
    description: {
      id: "Tugas kuliah: aplikasi web pemutar musik bergaya Spotify. Jelajahi lagu, cari judul/artis/genre, filter berdasarkan mood, putar lagu dengan kontrol play/next/shuffle/volume, tonton music video, dan atur tema terang/gelap di halaman profil.",
      en: "A university assignment: a Spotify-style music player web app. Browse tracks, search by title/artist/genre, filter by mood, play songs with play/next/shuffle/volume controls, watch music videos, and switch light/dark theme from the profile page.",
    },
    tags: ["Vue 3", "Vue Router", "Tailwind CSS", "Vite"],
    image: "/projects/spojedy.png",
    gallery: ["/projects/spojedy-song.png", "/projects/spojedy-mv.png"],
    demoUrl: "https://spojedy1.vercel.app",
    repoUrl: "https://github.com/Akashimoke/Spojedy1",
    featured: true,
  },
  {
    title: { id: "Proyek Berikutnya", en: "Next Project" },
    description: {
      id: "Proyek baru sedang dikerjakan. Nantikan, ya!",
      en: "A new project is in the works. Stay tuned!",
    },
    tags: [],
    comingSoon: true,
  },
  {
    title: { id: "Proyek Berikutnya", en: "Next Project" },
    description: {
      id: "Proyek baru sedang dikerjakan. Nantikan, ya!",
      en: "A new project is in the works. Stay tuned!",
    },
    tags: [],
    comingSoon: true,
  },
];

export const experiences: {
  role: L;
  company: L;
  period: L;
  description: L;
  tech?: L[];
}[] = [
  {
    role: { id: "Mahasiswa S1 Ilmu Komputer", en: "Undergraduate Computer Science Student" },
    company: "Bina Nusantara University",
    period: { id: "2024 — Sekarang", en: "2024 — Now" },
    description: {
      id: "Sedang menempuh studi Computer Science dengan fokus pada pengembangan perangkat lunak dan multimedia interaktif.",
      en: "Actively pursuing a degree in Computer Science, focusing on software development and interactive multimedia.",
    },
    tech: [
      { id: "Studi", en: "Study" },
      { id: "Proyek", en: "Projects" },
      { id: "Riset", en: "Research" },
    ],
  },
  {
    role: {
      id: "SMP - SMA Jurusan IPA",
      en: "Junior High School - Senior High School Majoring in Natural Science",
    },
    company: "Pondok Pesantren Modern Daar el-Qolam",
    period: "2018 — 2024",
    description: {
      id: "Bersekolah di Pondok Pesantren Modern Daar el-Qolam, dengan fokus pada kegiatan akademik maupun ekstrakurikuler.",
      en: "Studying at Pondok Pesantren Modern Daar el-Qolam, focusing on both academic and extracurricular activities.",
    },
  },
];
