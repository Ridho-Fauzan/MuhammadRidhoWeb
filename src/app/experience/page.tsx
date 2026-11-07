import type { Metadata } from "next";
import Experience from "@/components/Experience";
import PageBackground from "@/components/PageBackground";
import PageIndex from "@/components/PageIndex";
import { pageMetadata } from "@/data/seo";

export const metadata: Metadata = pageMetadata("experience");

export default function ExperiencePage() {
  return (
    <div className="relative pt-24 min-h-[100svh]">
      <PageBackground variant="matrix" />
      <div className="relative">
        <Experience />
        <PageIndex current="experience" />
      </div>
    </div>
  );
}
