/** Daftar halaman — dipakai navbar, kartu di beranda, dan tombol "halaman berikutnya". */
export const pages = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "skills", href: "/skills" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/experience" },
  { key: "contact", href: "/contact" },
] as const;

export type PageKey = (typeof pages)[number]["key"];
