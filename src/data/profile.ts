/**
 * ============================================================
 *  DATA PORTFOLIO — ganti semua isi di file ini dengan data dirimu.
 *  Semua komponen membaca dari sini, jadi kamu tidak perlu
 *  mengubah kode komponen sama sekali.
 * ============================================================
 */

export const profile = {
  name: "Muhammad Ridho Fathi Fauzan",
  shortName: "Ridho",
  role: "Game Developer",
  location: "Jakarta, Indonesia",
  email: "muhammadridhofathifauzan@gmail.com",
  /** Taruh file CV di folder /public lalu isi path-nya, mis. "/cv.pdf". Kosongkan jika belum ada. */
  resumeUrl: "",
  /** Taruh foto di /public lalu isi path-nya, mis. "/foto.jpg". Kosong = tampil inisial. */
  avatarUrl: "/plo.jpg",
  /** Teks yang bergantian diketik di hero ("Hi, I'm ...") */
  typewriter: ["Muhammad Ridho Fathi Fauzan", "a Game Developer", "a Dedicated Gamer", "a Tech Enthusiast", "Web Developer"],
  tagline: "Membangun game yang imersif dan menyenangkan, sambil terus belajar dan berkembang di dunia game development.",
  heroBadges: ["Unity", "C#", 'three.js'],
  about: [
    "Halo! Ini adalah paragraf perkenalan singkat. Ceritakan siapa kamu, apa yang sedang kamu pelajari atau kerjakan, dan apa yang membuatmu tertarik di dunia teknologi.",
    "Paragraf kedua bisa berisi latar belakang pendidikan, pengalaman organisasi, atau proyek yang paling kamu banggakan.",
    "Paragraf ketiga: tujuan karier dan jenis peluang yang sedang kamu cari.",
  ],
  stats: [
    { value: "2+", label: "Tahun Belajar" },
    { value: "10+", label: "Proyek Selesai" },
    { value: "5+", label: "Teknologi Dikuasai" },
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

export const skills: { category: string; items: string[] }[] = [
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
  title: string;
  description: string;
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
    description:
      "A web platform that connects volunteers with social activities hosted by local communities and NGOs. Users can browse events, view details (location, schedule, organizer, requirements), register as volunteers, and contact organizers.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/projects/kawanaksi.png",
    demoUrl: "https://kawanaksi.vercel.app",
    repoUrl: "https://github.com/Akashimoke/KawanAksi",
    featured: true,
  },
  {
    title: "Proyek Kedua",
    description: "Aplikasi contoh untuk mengelola data. Ganti dengan proyek nyata milikmu.",
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "Proyek Ketiga",
    description: "Landing page responsif dengan animasi halus dan skor Lighthouse tinggi.",
    tags: ["HTML", "CSS", "JavaScript"],
    repoUrl: "#",
  },
  {
    title: "Proyek Keempat",
    description: "REST API sederhana dengan autentikasi JWT dan dokumentasi Swagger.",
    tags: ["Express", "PostgreSQL", "JWT"],
    repoUrl: "#",
  },
];

export const experiences: {
  role: string;
  company: string;
  period: string;
  description: string;
  tech?: string[];
}[] = [

  {
    role: "Undergraduate Computer Science Student",
    company: "Bina Nusantara University",
    period: "2024 — Now",
    description: "Actively pursuing a degree in Computer Science, focusing on software development and game design.",
    tech: ["Study", "Projects", "Research"],
  },
  {
    role: "Junior High School - Senior High School Majoring in Natural Science",
    company: "Pondok Pesantren Modern Daar el-Qolam",
    period: "2018 — 2024",
    description: "Studying at Pondok Pesantren Modern Daar el-Qolam, focusing on both academic and extracurricular activities.",
  },
];
