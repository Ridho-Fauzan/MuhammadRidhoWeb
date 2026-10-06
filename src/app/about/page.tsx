import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-10">
      <About />
    </div>
  );
}
