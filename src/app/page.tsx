import Explore from "@/components/Explore";
import Hero from "@/components/Hero";
import HeroSpark from "@/components/HeroSpark";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <>
      <HeroSpark>
        <Hero />
      </HeroSpark>
      <TechMarquee />
      <Explore />
    </>
  );
}
