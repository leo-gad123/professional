import { Counter } from "../Counter";

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Technologies Used" },
  { value: 3, suffix: "+", label: "Years Learning" },
  { value: 100, suffix: "%", label: "Passion for Innovation" },
];

export function Stats() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-8 text-center glass-hover">
            <div className="font-serif text-5xl md:text-6xl text-primary glow-text">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
