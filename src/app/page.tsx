import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. Dibuat dengan Next.js & Tailwind CSS.
        </p>
      </footer>
    </>
  );
}
