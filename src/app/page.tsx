import Explore from "@/components/Explore";
import Hero from "@/components/Hero";
import HeroSpark from "@/components/HeroSpark";
import TechMarquee from "@/components/TechMarquee";
import TerminalSection from "@/components/TerminalSection";

export default function Home() {
  return (
    <>
      <HeroSpark>
        <Hero />
      </HeroSpark>
      <TechMarquee />
      <Explore />
      <TerminalSection />
    </>
  );
}
