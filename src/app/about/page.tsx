import type { Metadata } from "next";
import PageBackground from "@/components/PageBackground";
import About from "@/components/About";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="relative pt-10 min-h-[100svh]">
      <PageBackground variant="terminal" />
      <div className="relative">
        <About />
      </div>
    </div>
  );
}
