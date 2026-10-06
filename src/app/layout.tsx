import type { Metadata } from "next";
import { Fragment_Mono, Pixelify_Sans, Silkscreen } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { tr } from "@/i18n/types";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

// Tema retro: Silkscreen (pixel) untuk judul, Fragment Mono untuk teks — font yang dipakai ThreeUI retro dock
const pixel = Silkscreen({ variable: "--font-pixel", subsets: ["latin"], weight: ["400", "700"] });
const retro = Fragment_Mono({ variable: "--font-retro", subsets: ["latin"], weight: "400" });
// Navbar: Pixelify Sans — pixel tapi tetap tebal & mudah dibaca di ukuran kecil
const nav = Pixelify_Sans({ variable: "--font-nav", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: `${profile.name} | ${tr(profile.role, "en")}`, template: `%s | ${profile.name}` },
  description: tr(profile.tagline, "id"),
  openGraph: {
    title: `${profile.name} | ${tr(profile.role, "en")}`,
    description: tr(profile.tagline, "id"),
  },
};

// Set tema & bahasa sebelum render agar tidak berkedip.
// Tema default: dark. Bahasa: pilihan tersimpan, kalau belum ada ikut bahasa browser (selain Indonesia -> English).
const initScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'){d.classList.add('dark')}var l=localStorage.getItem('lang');if(l!=='id'&&l!=='en'){l=/^id|^ms/i.test(navigator.language||'')?'id':'en'}d.lang=l}catch(e){d.classList.add('dark')}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className={`${pixel.variable} ${retro.variable} ${nav.variable} font-sans antialiased`}>
        <SmoothScroll />
        <Navbar />
        <main className="min-h-[100svh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
