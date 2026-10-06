import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { tr } from "@/i18n/types";

const display = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.name} | ${tr(profile.role, "en")}`,
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
      <body className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
