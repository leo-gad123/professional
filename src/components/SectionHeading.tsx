export function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="mb-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">— {eyebrow} —</p>
      <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
        {title} {accent && <span className="italic text-primary">{accent}</span>}
      </h2>
    </div>
  );
}
