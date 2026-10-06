import type { Metadata } from "next";
import { CardRow } from "@/components/PickCards";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="pt-10">
      <Contact />
      <CardRow current="contact" />
    </div>
  );
}
