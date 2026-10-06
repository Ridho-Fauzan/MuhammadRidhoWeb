import type { Metadata } from "next";
import Skills from "@/components/Skills";
import PageNav from "@/components/PageNav";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div className="pt-10">
      <Skills />
      <PageNav />
    </div>
  );
}
