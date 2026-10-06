import Reveal from "./Reveal";

export default function SectionTitle({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-14 ${center ? "text-center" : ""}`}>
      <h2 className="text-4xl sm:text-5xl font-bold">{title}</h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent-2 ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className={`mt-5 text-muted max-w-2xl text-lg ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </Reveal>
  );
}
