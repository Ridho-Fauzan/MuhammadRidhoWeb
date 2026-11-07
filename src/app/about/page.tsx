import type { Metadata } from "next";
import About from "@/components/About";
import PageBackground from "@/components/PageBackground";
import PageIndex from "@/components/PageIndex";
import { pageMetadata } from "@/data/seo";

export const metadata: Metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <div className="relative pt-24 min-h-[100svh]">
      <PageBackground variant="dots" />
      <div className="relative">
        <About />
        <PageIndex current="about" />
      </div>
    </div>
  );
}
