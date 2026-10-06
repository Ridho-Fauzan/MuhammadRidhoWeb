import type { Metadata } from "next";
import { CardRow } from "@/components/PickCards";
import PageBackground from "@/components/PageBackground";
import Skills from "@/components/Skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div className="relative pt-10 min-h-[100svh]">
      <PageBackground variant="dots" />
      <div className="relative">
        <Skills />
        <CardRow current="skills" />
      </div>
    </div>
  );
}
