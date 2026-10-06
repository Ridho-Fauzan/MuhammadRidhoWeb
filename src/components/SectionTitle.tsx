import Reveal from "./Reveal";

export default function SectionTitle({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-14 ${center ? "text-center" : ""}`}>
      <h2 className="text-3xl sm:text-5xl [text-shadow:3px_3px_0_var(--shadow)]">
        <span className="text-accent">&gt;</span> {title}
        <span className="text-accent animate-blink">_</span>
      </h2>
      {/* garis pixel bertingkat emas–koral–ungu */}
      <div className={`mt-5 flex h-2 w-28 ${center ? "mx-auto" : ""}`} aria-hidden>
        <span className="flex-[3] bg-accent" />
        <span className="flex-[2] bg-accent-2" />
        <span className="flex-1 bg-muted" />
      </div>
      {subtitle && <p className={`mt-5 text-muted max-w-2xl text-lg ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </Reveal>
  );
}
