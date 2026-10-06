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
  whatsapp: string;
  whatsappMessage: string;
  resumeUrl: string;
  avatarUrl: string;
  handle: string;
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
  /**
   * Nomor WhatsApp format internasional TANPA "+", spasi, atau "0" di depan.
   * Contoh: 081234567890 → "6281234567890". Kosong = tombol WhatsApp disembunyikan.
   */
  whatsapp: "6285179621456",
  /** Pesan yang otomatis terisi saat pengunjung membuka chat WhatsApp */
  whatsappMessage: "Hi Ridho! I’d love to connect and get to know you better.",
  /** Taruh file CV di folder /public lalu isi path-nya, mis. "/cv.pdf". Kosongkan jika belum ada. */
  resumeUrl: "",
  /** Taruh foto di /public lalu isi path-nya, mis. "/foto.jpg". Kosong = tampil inisial. */
  avatarUrl: "/plo.jpg",
  /** Username yang tampil di kartu Lanyard (tanpa @) */
  handle: "Akashimoke",
  /** Peran yang berganti-ganti di hero: "Saya seorang ..." / "I'm a ..." */
  roles: [
    "Game Developer",
    "Web Developer",
    "Tech Enthusiast",
    "Dedicated Gamer" ,
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
  /** true = tampil sebagai kartu "Coming Soon" (tanpa link). Hapus/ganti saat proyeknya sudah ada. */
  comingSoon?: boolean;
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
    title: { id: "Proyek Berikutnya", en: "Next Project" },
    description: {
      id: "Proyek baru sedang dikerjakan. Nantikan, ya!",
      en: "A new project is in the works. Stay tuned!",
    },
    tags: [],
    comingSoon: true,
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
      id: "Sedang menempuh studi Ilmu Komputer dengan fokus pada pengembangan perangkat lunak dan multimedia interaktif.",
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
