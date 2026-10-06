/**
 * ============================================================
 *  DATA PORTFOLIO — ganti semua isi di file ini dengan data dirimu.
 *  Semua komponen membaca dari sini, jadi kamu tidak perlu
 *  mengubah kode komponen sama sekali.
 *
 *  DUA BAHASA:
 *  - Teks yang sama di kedua bahasa cukup ditulis biasa:  "Unity"
 *  - Teks yang beda per bahasa ditulis:  { id: "Sekarang", en: "Now" }
 *  Keduanya boleh dicampur di mana saja yang bertipe `L`.
 * ============================================================
 */
import type { L } from "@/i18n/types";

export const profile: {
  name: string;
  shortName: string;
  role: L;
  location: L;
  email: string;
  resumeUrl: string;
  avatarUrl: string;
  handle: string;
  status: L;
  roles: L[];
  tagline: L;
  heroBadges: string[];
  about: L[];
  stats: { value: number; suffix?: string; label: L }[];
} = {
  name: "Muhammad Ridho Fathi Fauzan",
  shortName: "Ridho",
  role: "Game Developer",
  location: "Jakarta, Indonesia",
  email: "muhammadridhofathifauzan@gmail.com",
  /** Taruh file CV di folder /public lalu isi path-nya, mis. "/cv.pdf". Kosongkan jika belum ada. */
  resumeUrl: "",
  /** Taruh foto di /public lalu isi path-nya, mis. "/foto.jpg". Kosong = tampil inisial. */
  avatarUrl: "/plo.jpg",
  /** Username yang tampil di ProfileCard (tanpa @) */
  handle: "Akashimoke",
  /** Status kecil di ProfileCard */
  status: { id: "Terbuka untuk kolaborasi", en: "Open to collaborate" },
  /** Peran yang berganti-ganti di hero: "Saya seorang ..." / "I'm a ..." */
  roles: [
    "Game Developer",
    "Web Developer",
    "Tech Enthusiast",
    { id: "Gamer Sejati", en: "Dedicated Gamer" },
  ],
  tagline: {
    id: "Membangun game yang imersif dan menyenangkan, sambil terus belajar dan berkembang di dunia game development.",
    en: "Building immersive and fun games while continuously learning and growing in the world of game development.",
  },
  heroBadges: ["Unity", "C#", "three.js"],
  about: [
    {
      id: "Halo! Ini adalah paragraf perkenalan singkat. Ceritakan siapa kamu, apa yang sedang kamu pelajari atau kerjakan, dan apa yang membuatmu tertarik di dunia teknologi.",
      en: "Hi! This is a short introduction paragraph. Tell visitors who you are, what you are learning or working on, and what got you interested in technology.",
    },
    {
      id: "Paragraf kedua bisa berisi latar belakang pendidikan, pengalaman organisasi, atau proyek yang paling kamu banggakan.",
      en: "The second paragraph can cover your education, organizational experience, or the project you are most proud of.",
    },
    {
      id: "Paragraf ketiga: tujuan karier dan jenis peluang yang sedang kamu cari.",
      en: "Third paragraph: your career goals and the kind of opportunities you are looking for.",
    },
  ],
  stats: [
    { value: 2, suffix: "+", label: { id: "Tahun Belajar", en: "Years Learning" } },
    { value: 10, suffix: "+", label: { id: "Proyek Selesai", en: "Projects Done" } },
    { value: 5, suffix: "+", label: { id: "Teknologi Dikuasai", en: "Technologies" } },
  ],
};

export type SocialKey = "github" | "linkedin" | "instagram" | "x" | "email";

export const socials: { key: SocialKey; label: string; url: string }[] = [
  { key: "github", label: "GitHub", url: "https://github.com/Akashimoke" },
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-ridho-fathi-fauzan-6131bb327/" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/biasadipanggilepep/" },
  { key: "x", label: "X / Twitter", url: "https://x.com/Waswer____" },
  { key: "email", label: "Email", url: "mailto:muhammadridhofathifauzan@gmail.com" },
];

export const skills: { category: L; items: L[] }[] = [
  {
    category: "Game-Dev",
    items: ["Unity", "C#", "Gameplay Programming", "Game Mechanics", "2D / 3D Development", "Physics"],
  },
  {
    category: "Programming",
    items: ["Object-Oriented Programming", "Game Systems", "AI / Enemy Behavior", "Input System", "Collision & Interaction", "Debugging"],
  },
  {
    category: "Game Design",
    items: ["Level Design", "Game Design", "Prototyping", "UI/UX", "Game Balancing"],
  },
  {
    category: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Visual Studio", "Figma"],
  },
];

export type Project = {
  title: L;
  description: L;
  tags: string[];
  /** Path gambar di /public, mis. "/projects/proyek-1.png". Kosong = placeholder gradient. */
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
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
    title: { id: "Proyek Kedua", en: "Second Project" },
    description: {
      id: "Aplikasi contoh untuk mengelola data. Ganti dengan proyek nyata milikmu.",
      en: "A sample data management app. Replace it with one of your real projects.",
    },
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: { id: "Proyek Ketiga", en: "Third Project" },
    description: {
      id: "Landing page responsif dengan animasi halus dan skor Lighthouse tinggi.",
      en: "A responsive landing page with smooth animations and a high Lighthouse score.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    repoUrl: "#",
  },
  {
    title: { id: "Proyek Keempat", en: "Fourth Project" },
    description: {
      id: "REST API sederhana dengan autentikasi JWT dan dokumentasi Swagger.",
      en: "A simple REST API with JWT authentication and Swagger documentation.",
    },
    tags: ["Express", "PostgreSQL", "JWT"],
    repoUrl: "#",
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
      id: "Sedang menempuh studi Ilmu Komputer dengan fokus pada pengembangan perangkat lunak dan desain game.",
      en: "Actively pursuing a degree in Computer Science, focusing on software development and game design.",
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
