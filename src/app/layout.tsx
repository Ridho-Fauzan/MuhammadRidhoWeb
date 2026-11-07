import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { jsonLd, rootMetadata } from "@/data/seo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

// Tema editorial: Plus Jakarta Sans untuk judul & teks, Fragment Mono untuk label kecil / kode
// Tanpa `weight` = variable font (200–800), dibutuhkan efek VariableProximity di footer
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const mono = Fragment_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = rootMetadata;

// Warna bar browser di HP = --background (globals.css), ikut tema perangkat
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  colorScheme: "dark light",
};

// Set tema & bahasa sebelum render agar tidak berkedip.
// Tema default: dark. Bahasa: pilihan tersimpan, kalau belum ada ikut bahasa browser (selain Indonesia -> English).
const initScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'){d.classList.add('dark')}var l=localStorage.getItem('lang');if(l!=='id'&&l!=='en'){l=/^id|^ms/i.test(navigator.language||'')?'id':'en'}d.lang=l}catch(e){d.classList.add('dark')}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${jakarta.variable} ${mono.variable} font-sans antialiased`}>
        <SmoothScroll />
        <Navbar />
        <main className="min-h-[100svh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
