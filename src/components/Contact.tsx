import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import SocialIcons from "./SocialIcons";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <Reveal className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-sm mb-2">
          05. <span className="text-muted">{"// what's next?"}</span>
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold">
          Mari <span className="gradient-text">Terhubung</span>
        </h2>
        <p className="mt-6 text-muted text-lg">
          Punya proyek, tawaran kerja, atau sekadar ingin menyapa? Inbox saya selalu terbuka.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white dark:text-zinc-950 font-semibold hover:bg-accent-dark transition-colors"
        >
          <Mail className="w-5 h-5" /> Kirim Email
        </a>
        <SocialIcons className="mt-10 justify-center" />
      </Reveal>
    </section>
  );
}
