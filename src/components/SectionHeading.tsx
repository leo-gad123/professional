import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary font-medium mb-3">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground px-2 sm:px-0">
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-emerald-300 scale-in-x" />
    </Reveal>
  );
}
