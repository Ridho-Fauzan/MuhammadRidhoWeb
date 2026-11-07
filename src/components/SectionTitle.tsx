import Reveal from "./Reveal";

/**
 * Judul section bergaya editorial: label kecil (eyebrow) + judul besar,
 * subjudul di kanan pada layar lebar (atau di bawah saat `center`).
 */
export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  center = false,
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  if (center) {
    return (
      <Reveal className="mb-14 text-center">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag className="text-4xl sm:text-6xl font-extrabold uppercase text-ink">{title}</Tag>
        {subtitle && <p className="mt-5 mx-auto max-w-2xl text-muted text-base sm:text-lg">{subtitle}</p>}
      </Reveal>
    );
  }

  return (
    <Reveal className="mb-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-end">
      <div>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag className="text-5xl sm:text-7xl font-extrabold uppercase text-ink">{title}</Tag>
      </div>
      {subtitle && <p className="text-muted text-base sm:text-lg leading-relaxed lg:text-right">{subtitle}</p>}
    </Reveal>
  );
}
