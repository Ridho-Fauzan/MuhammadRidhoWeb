import type { Metadata } from "next";
import Projects from "@/components/Projects";
import PageNav from "@/components/PageNav";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <Projects />
      <PageNav />
    </div>
  );
}
