import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="pt-10">
      <Projects />
    </div>
  );
}
