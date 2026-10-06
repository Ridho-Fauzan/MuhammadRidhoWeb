import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { tr } from "@/i18n/types";

const mono = Poppins({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${mono.variable} font-mono antialiased`}>{children}</body>
    </html>
  );
}
