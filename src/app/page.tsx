import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import HeroSpark from "@/components/HeroSpark";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSpark>
          <Hero />
        </HeroSpark>
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
