import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageNav from "@/components/PageNav";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="pt-10">
      <Contact />
      <PageNav />
    </div>
  );
}
