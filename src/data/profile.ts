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
  email: "muhammadridho@gmail.com",
  /** Taruh file CV di folder /public lalu isi path-nya, mis. "/cv.pdf". Kosongkan jika belum ada. */
  resumeUrl: "",
  /** Taruh foto di /public lalu isi path-nya, mis. "/foto.jpg". Kosong = tampil inisial. */
  avatarUrl: "",
  /** Teks yang bergantian diketik di hero ("Hi, I'm ...") */
  typewriter: ["Muhammad Ridho Fathi Fauzan", "a Game Developer", "a Dedicated Gamer"],
  tagline: "Membangun game yang imersif dan menyenangkan, sambil terus belajar dan berkembang di dunia game development.",
  heroBadges: ["Unity", "C#", 'three.js', "Unreal Engine"],
  openToWork: true,
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
  { key: "github", label: "GitHub", url: "https://github.com/username" },
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/username" },
  { key: "instagram", label: "Instagram", url: "https://instagram.com/username" },
  { key: "x", label: "X / Twitter", url: "https://x.com/username" },
  { key: "email", label: "Email", url: "mailto:email@contoh.com" },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "PHP", "Laravel", "REST API"] },
  { category: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { category: "Tools", items: ["Git", "GitHub", "Figma", "VS Code", "Docker"] },
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
    title: "Proyek Pertama",
    description: "Deskripsi singkat proyek: masalah apa yang diselesaikan, fitur utama, dan peranmu di proyek ini.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    demoUrl: "#",
    repoUrl: "#",
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
    role: "Frontend Developer Intern",
    company: "Nama Perusahaan",
    period: "2025 — Sekarang",
    description: "Ceritakan tanggung jawab dan pencapaianmu di posisi ini.",
    tech: ["React", "TypeScript"],
  },
  {
    role: "Freelance Web Developer",
    company: "Mandiri",
    period: "2024 — 2025",
    description: "Membuat website untuk klien UMKM, mulai dari desain hingga deployment.",
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    role: "S1 / SMK — Jurusan",
    company: "Nama Sekolah / Kampus",
    period: "2021 — 2024",
    description: "Pendidikan, organisasi, atau prestasi yang relevan.",
  },
];
