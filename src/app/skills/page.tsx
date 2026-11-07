import type { Metadata } from "next";
import Skills from "@/components/Skills";
import PageBackground from "@/components/PageBackground";
import PageIndex from "@/components/PageIndex";
import { pageMetadata } from "@/data/seo";

export const metadata: Metadata = pageMetadata("skills");

export default function SkillsPage() {
  return (
    <div className="relative pt-24 min-h-[100svh]">
      <PageBackground variant="matrix" />
      <div className="relative">
        <Skills />
        <PageIndex current="skills" />
      </div>
    </div>
  );
}
