import type { Metadata } from "next";
import { CardRow } from "@/components/PickCards";
import PageBackground from "@/components/PageBackground";
import Experience from "@/components/Experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="relative pt-10 min-h-[100svh]">
      <PageBackground variant="snow" />
      <div className="relative">
        <Experience />
        <CardRow current="experience" />
      </div>
    </div>
  );
}
