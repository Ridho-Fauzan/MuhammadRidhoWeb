import type { Metadata } from "next";
import Projects from "@/components/Projects";
import PageBackground from "@/components/PageBackground";
import PageIndex from "@/components/PageIndex";
import { pageMetadata } from "@/data/seo";

export const metadata: Metadata = pageMetadata("projects");

export default function ProjectsPage() {
  return (
    <div className="relative pt-24 min-h-[100svh]">
      <PageBackground variant="dots" />
      <div className="relative">
        <Projects />
        <PageIndex current="projects" />
      </div>
    </div>
  );
}
