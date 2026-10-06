import Reveal from "./Reveal";

export default function SectionTitle({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-12">
      <p className="text-accent text-sm mb-2">
        {index}. <span className="text-muted">{`// ${title.toLowerCase()}`}</span>
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-3 text-muted max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}
