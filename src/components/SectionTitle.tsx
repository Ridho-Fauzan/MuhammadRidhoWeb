import Reveal from "./Reveal";

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-3 text-muted max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}
