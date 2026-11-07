import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import PageIndex from "@/components/PageIndex";
import RoleBand from "@/components/RoleBand";
import Services from "@/components/Services";
import TechMarquee from "@/components/TechMarquee";
import TerminalSection from "@/components/TerminalSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <RoleBand />
      <FeaturedProjects />
      <PageIndex />
      <TerminalSection />
    </>
  );
}
