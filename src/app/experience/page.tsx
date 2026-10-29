import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import { CardRow } from "@/components/PickCards";
import PageBackground from "@/components/PageBackground";
import Experience from "@/components/Experience";

export const metadata: Metadata = pageMetadata("experience");

export default function ExperiencePage() {
  return (
    <div className="relative pt-10 min-h-[100svh]">
      <PageBackground variant="waves" />
      <div className="relative">
        <Experience />
        <CardRow current="experience" />
      </div>
    </div>
  );
}
