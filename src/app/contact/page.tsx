import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageBackground from "@/components/PageBackground";
import PageIndex from "@/components/PageIndex";
import { pageMetadata } from "@/data/seo";

export const metadata: Metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <div className="relative pt-24 min-h-[100svh]">
      <PageBackground variant="dots" />
      <div className="relative">
        <Contact />
        <PageIndex current="contact" />
      </div>
    </div>
  );
}
