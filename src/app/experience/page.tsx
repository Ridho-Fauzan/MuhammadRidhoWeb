import type { Metadata } from "next";
import Experience from "@/components/Experience";
import PageNav from "@/components/PageNav";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="pt-10">
      <Experience />
      <PageNav />
    </div>
  );
}
