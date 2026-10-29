import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import { CardRow } from "@/components/PickCards";
import PageBackground from "@/components/PageBackground";
import Projects from "@/components/Projects";

export const metadata: Metadata = pageMetadata("projects");

export default function ProjectsPage() {
  return (
    <div className="relative pt-10 min-h-[100svh]">
      <PageBackground variant="grid" />
      <div className="relative">
        <Projects />
        <CardRow current="projects" />
      </div>
    </div>
  );
}
