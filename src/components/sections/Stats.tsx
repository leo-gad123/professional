import { Reveal } from "../Reveal";
import { Counter } from "../Counter";

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Technologies Used" },
  { value: 3, suffix: "+", label: "Years Learning" },
  { value: 100, suffix: "%", label: "Passion for Innovation" },
];

export function Stats() {
  return (
    <section className="section-alt relative px-4 sm:px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4 stagger-children">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl p-8 text-center card-shadow">
            <div className="font-serif text-4xl md:text-5xl font-medium text-gradient">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
